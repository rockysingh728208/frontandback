import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import userModels from "../models/userModels.js";


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModels.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log("Login error:", error);
    res.json({ success: false, message: "Error" });
  }
};








const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}



// registeruser
const registerUser=async(req,res)=>{
const{name,password,email}=req.body;
  console.log("EMAIL FROM CLIENT:", email);
try {
    // is mtlb hai ki user allready exists hai ki nhi
    const exists=await userModels.findOne({email})
    if(exists){
return res.json({success:false,message:"User already exists"})
    }

// validating email formate and strong password
if(!validator.isEmail(email)){
    return res.json({success:false,message:"please enter a valid email"})
}


if(password.length<8){
     return res.json({success:false,message:"please enter a strong password"})
}
// hashing user password
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt);
const newUser=new userModels({
    name:name,
    email:email,
    password:hashedPassword
})
const user=await newUser.save()
const token=createToken(user._id)
res.json({success:true,token});
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}




export {loginUser,registerUser}