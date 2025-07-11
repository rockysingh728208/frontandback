import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://balajikumar7061:balajikumar70@cluster0.jxckgrw.mongodb.net', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); 
  }
};
