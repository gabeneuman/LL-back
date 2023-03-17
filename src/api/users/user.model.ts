import { Schema, model } from "mongoose";
import { UserI } from "./user.interface";

const userSchema: Schema<UserI> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: false },
  imageUrl: { type: String, required: false },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

export = model("User", userSchema);
