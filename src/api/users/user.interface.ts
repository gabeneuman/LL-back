import { Document } from "mongoose";
import { WorkoutI } from "../workout/workout.interface";

export interface UserI extends Document {
  id?: string;
  name: string;
  email: string;
  mobile?: string;
  imageUrl?: string;
  password: string;
  workouts?: WorkoutI[];
  createdAt?: Date;
  updatedAt?: Date;
}
