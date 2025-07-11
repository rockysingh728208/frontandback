import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  cartData: {
    type: Object,
    default: {}
  }
}, { minimize: false });

const userModels = mongoose.models.user || mongoose.model("user", userSchema);

export default userModels;
