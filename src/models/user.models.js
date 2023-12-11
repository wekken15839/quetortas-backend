import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String },
    photo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
