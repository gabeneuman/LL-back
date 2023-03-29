import { getUserId } from "../workout/utility/utility";
import WORKOUT_REDO from "./redo_workouts.model";


export const workoutRedo = async function (req, res) {
    const body = req.body;
    const isExist = await WORKOUT_REDO.findOne({ _id: body._id });
    if (isExist) {
        const update = await WORKOUT_REDO.findOneAndUpdate(body._id, body);
        res.status(200).json({
            message: "Workout updated successfully",
            update
        });
        return;
    }
    const RedoWorkout = await WORKOUT_REDO.create(body);
    res.status(201).json(RedoWorkout);
}

export const getRedoWorkouts = async function (req, res) {
    const userId = getUserId(req);
    const workout = await WORKOUT_REDO.find({ user: userId }).populate("workout");
    res.status(200).json(workout);
}