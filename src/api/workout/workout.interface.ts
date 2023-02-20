import { Document } from "mongoose";

export interface WorkoutI extends Document {
  id?: string;
  userId?: string;
  name: string;
  notes: string;
  exerciseGroup: ExerciseGroupI[];
  completed: boolean;
  isDeleted: boolean;
  createdBy: string;
  modifiedBy: string;
  createdAt: string;
  updatedAt: string;
}



export interface ExerciseGroupI {
    exercises: ExerciseI[];
    noOfSets: number;
    completed?: boolean;
  }
  
  export interface ExerciseI {
    name: string;
    type: string;
    noOfSets: string;
    sets: ExerciseSetsI[];
    reps?: number;
    weight?: number;
    time?: string;
    notes?: string;
    completed?: boolean;
    coreType?: string;
  }
  
  export interface ExerciseSetsI {
    reps?: number;
    minutes?: string;
    seconds?: string;
    weight?: number;
    completed?: boolean;
  }
  