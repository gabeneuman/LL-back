import WORKOUT from "./workout.model";
import { getUserId } from "./utility/utility";

export const createWorkout = async function (req, res) {
  try {
    const workout = req.body;
    workout.createdBy = getUserId(req);
    workout.isDeleted = false;
    workout.createdAt = new Date().toISOString();
    workout.updatedAt = new Date().toISOString();
    const newWorkout = await WORKOUT.create(workout);
    res.status(201).json(newWorkout);
  } catch (err) {
    console.log(err);
  }
};

export const getWorkouts = async function (req, res) {
  try {
    const userId = getUserId(req);
    const workouts = await WORKOUT.aggregate([
      {
        $match: {
          $and: [{ createdBy: userId }, { isDeleted: false }],
        },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          exerciseGroupLength: { $size: "$exerciseGroup" },
          completed: 1,
        },
      },
    ]).sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
  }
};

export const getCompletedWorkouts = async function (req, res) {
  try {
    const userId = getUserId(req);
    const workouts = await WORKOUT.aggregate([
      {
        $match: {
          $and: [
            { createdBy: userId },
            { isDeleted: false },
            { completed: true },
          ],
        },
      },
      {
        $project: {
          name: 1,
          updatedAt: 1,
          exerciseGroupLength: { $size: "$exerciseGroup" },
          completed: 1,
        },
      },
    ]).sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
  }
};

export const getWorkoutById = async function (req, res) {
  try {
    const workout = await WORKOUT.findById(req.params.id);
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
  }
};

export const updateWorkoutById = async function (req, res) {
  try {
    req.body.updatedAt = new Date().toISOString();
    req.body.modifiedBy = getUserId(req);
    const workout = await WORKOUT.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
  }
};

export const deleteWorkoutById = async function (req, res) {
  try {
    const workout = await WORKOUT.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
  }
};

// GET ALL WORKOUTS
export const getAllWorkouts = async function (req, res) {
  try {
    const pageSize = 5;
    const skip = (req.body.page - 1) * pageSize;
    const totalCount = await WORKOUT.countDocuments({
      isDeleted: false,
    });
    return WORKOUT.find({ isDeleted: false })
      .skip(skip)
      .limit(pageSize)
      .populate("createdBy", "name email")
      .sort({
        createdAt: -1,
      })
      .then((response) => {
        return res.status(200).json({ response, totalCount });
      });
  } catch (err) {
    console.log(err);
  }
};
