import foodModel from "../models/foodModels.js";
import fs from "fs";


const addFood = async (req, res) => {
  try {
    const image_filename = req.file ? req.file.filename : null;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
      
    });

    await food.save();
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error("Add food error:", error);
    res.json({ success: false, message: "Error adding food", error: error.message });
  }
};

//all food_item
const listFood=async(req,res)=>{
try {
  const foods=await foodModel.find({})
  res.json({success:true,data:foods})
  console.log("Fetched foods:", foods);

} catch (error) {
  console.log(error);
  res.json({success:false,message:"error"})
}
}


// item ko delete krne ka logic hai yaha
const removeFood=async(req,res)=>{
   console.log("req.body:", req.body);
  try {
    const food=await foodModel.findById(req.body.id)
    fs.unlink(`upload/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food removed"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}



export { addFood,listFood,removeFood };
