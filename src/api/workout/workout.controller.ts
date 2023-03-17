import WORKOUT from "./workout.model";
import { getUserId } from "./utility/utility";
import mongoose from "mongoose";

export const createWorkout = async function (req, res) {
  try {
    const workout = req.body;
    workout.createdBy = new mongoose.Types.ObjectId(getUserId(req));
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
    const userId = new mongoose.Types.ObjectId(getUserId(req));
    const workouts = await WORKOUT.find({
      $and: [{ createdBy: userId }, { isDeleted: false }],
    }).populate("createdBy", "name").sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
  }
};

export const getCompletedWorkouts = async function (req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(getUserId(req));
    const workouts = await WORKOUT.find({
      $and: [{ createdBy: userId }, { isDeleted: false }, { completed: true }],
    }).populate("createdBy", "name").sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
  }
};

export const getWorkoutById = async function (req, res) {
  try {
    const workout = await WORKOUT.findById(req.params.id).populate("createdBy", "name");
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
    const userId = new mongoose.Types.ObjectId(getUserId(req));
    // get all workouts except current user's workouts

    return WORKOUT.find({
      isDeleted: false,
      createdBy: { $ne: userId },
      isImported: false,
    })
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
