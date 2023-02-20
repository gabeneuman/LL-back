import { Document } from "mongoose";

export interface UserI extends Document {
  id?: string;
  name: string;
  email: string;
  mobile?: string;
  imageUrl?: string;
  password: string;
}
