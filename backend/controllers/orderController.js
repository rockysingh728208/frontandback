import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModels from "../models/userModels.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeorder = async (req, res) => {
    const frontend_url="http://localhost5173"
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    
    await userModels.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80, 
      },
      quantity: item.quantity,
    }));

    // ✅ Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    // ✅ Create Stripe session
    const session = await stripe.checkout.session.create({
    
      line_items:line_items,
      mode: "payment",
      success_url:`${frontend_url}/verify?success=true&orderId=&{newOrder._Id}`,
      cancel_url:`${frontend_url}/verify?success=false&orderId=&{newOrder._Id}`
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("❌ Order placement error:", error.message);
    res.json({ success: false, message: "Something went wrong" });
  }
};

export { placeorder };
