import jwt from "jsonwebtoken";
import userModels from "../models/userModels.js";


const getUserIdFromToken = (req) => {
  const token = req.headers.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (err) {
    console.error("❌ Invalid token");
    return null;
  }
};


const addToCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const user = await userModels.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    user.cartData = user.cartData || {};

    user.cartData[itemId] = (user.cartData[itemId] || 0) + 1;

    user.markModified("cartData");
    await user.save();

    res.json({ success: true, message: "✅ Item added to cart", cartData: user.cartData });

  } catch (err) {
    console.error("❌ Error in addToCart:", err.message);
    res.status(500).json({ success: false, message: "Error in addToCart" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const user = await userModels.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    user.cartData = user.cartData || {};

    if (user.cartData[itemId]) {
      user.cartData[itemId] -= 1;

      if (user.cartData[itemId] <= 0) {
        delete user.cartData[itemId];
      }

      user.markModified("cartData");
      await user.save();

      return res.json({ success: true, message: "✅ Item removed", cartData: user.cartData });
    } else {
      return res.json({ success: false, message: "Item not in cart" });
    }

  } catch (err) {
    console.error(" Error in removeFromCart:", err.message);
    res.status(500).json({ success: false, message: "Error in removeFromCart" });
  }
};


const getCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await userModels.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, cartData: user.cartData || {} });

  } catch (err) {
    console.error(" Error in getCart:", err.message);
    res.status(500).json({ success: false, message: "Error in getCart" });
  }
};

export { addToCart, removeFromCart, getCart };
