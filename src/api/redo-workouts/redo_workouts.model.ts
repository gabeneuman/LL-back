import { Schema, model } from "mongoose";

const RedoWorkoutSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    workout: {}
},

    { timestamps: true }

);

export = model("RedoWorkout", RedoWorkoutSchema);
