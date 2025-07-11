import express from "express";
import multer from "multer";
import { addFood,listFood,removeFood } from "../controllers/foodControllers.js";

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood)


export default foodRouter;
