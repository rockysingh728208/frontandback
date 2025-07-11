import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js"
import cartRouter from "./routes/cartroutes.js";
// import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config'
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ✅ Static path for serving images
app.use('/images', express.static(path.join(__dirname, 'upload')));

// app config
// const app = express();
const port = 4000;



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// connect db
connectDb();

// api endpoint
app.use("/api/food", foodRouter);
// app.use('/images',express.static('upload'))
app.use('/images', express.static(path.join(__dirname, 'upload')));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
// app.use("/api/order",orderRouter)
// test route
app.get("/", (req, res) => {
    res.send("API Working");
});

// start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
