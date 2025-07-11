import express from "express";
import { addToCart,removeFromCart,getCart } from "../controllers/cartControllers.js";
import authMiddleware from "../middlewares/auth.js";
const cartRouter=express.Router();



// 3 api  end points hai ye mera
cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove", authMiddleware,removeFromCart)
cartRouter.post("/get", authMiddleware,getCart)

export default cartRouter;
