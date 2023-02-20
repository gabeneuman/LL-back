import { Schema, model } from "mongoose";
import { WorkoutI } from "./workout.interface";

const WorkoutSchema: Schema<WorkoutI> = new Schema({
  id: String,
  userId: String,
  name: {
    type: String,
    required: true,
  },
  exerciseGroup: [
    {
      exercises: [
        {
          name: {
            type: String,
            required: true,
          },
          type: {
            type: String,
            required: true,
          },
          noOfSets: {
            type: Number,
          },
          sets: [
            {
              reps: Number,
              minutes: String,
              seconds: String,
              weight: Number,
              completed: Boolean,
            },
          ],
          reps: Number,
          weight: Number,
          time: String,
          notes: String,
          completed: Boolean,
          coreType: String,
        },
      ],
      noOfSets: {
        type: Number,
        required: true,
      },
      completed: Boolean,
    },
  ],
  notes: String,
  completed: Boolean,
  isDeleted: Boolean,
  createdBy: String,
  modifiedBy: String,
  createdAt: String,
  updatedAt: String,
});

export = model("Workout", WorkoutSchema);
