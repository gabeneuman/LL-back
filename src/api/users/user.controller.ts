import { UserI } from "./user.interface";
import USER from "./user.model";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../../app";
import { getUserId } from "../workout/utility/utility";
import WORKOUT from "../workout/workout.model";
import mongoose from "mongoose";

export const createUser = async function (req, res) {
  try {
    const user = req.body;
    user.email = user.email.toLowerCase();
    const oldUser = await USER.findOne({ email: user.email });
    if (oldUser) {
      return res.status(400).json({ message: "User Already Exist. Try login" });
    }
    const newUser = await USER.create(user);
    const token = jwt.sign(
      { user_id: newUser._id, email: newUser.email },
      TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.status(201).json(token);
  } catch (err) {
    console.log(err);
  }
};

export const login = function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  return USER.findOne({ email: email }).then((response: UserI) => {
    if (!response) {
      return res.status(400).json({ message: "User Not Available" });
    }
    if (response.email == email && response.password == password) {
      const data = jwt.sign(
        {
          id: response._id,
          email: response.email,
        },
        TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      return res.status(200).json(data);
    } else {
      return res.status(400).json({ message: "Wrong Email or Password" });
    }
  });
};

export const getUser = async function (req, res) {
  try {
    let workout = [];
    let stat = {};

    const date = new Date();
    date.setDate(date.getDate() - 30);

    const userId = new mongoose.Types.ObjectId(getUserId(req));
    const workoutData = await WORKOUT.find({
      $and: [{ createdBy: userId }, { isDeleted: false }],
      createdAt: {
        $gte: date.toISOString(),
      }
    });

    if (workoutData.length) {
      const completed = workoutData.filter((item) => item.completed).length;
      const todo = workoutData.filter((item) => !item.completed).length;
      workout = [workoutData];
      stat = { completed, todo };
    }
    const user = await USER.find({ _id: userId }, {
      password: 0,
    });
    res.status(200).json({ user, workout, stat });
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async function (req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    let workout = [];
    let stat = {};

    const date = new Date();
    date.setDate(date.getDate() - 30);

    const workoutData = await WORKOUT.find({
      $and: [{ createdBy: userId }, { isDeleted: false }],
      createdAt: {
        $gte: date.toISOString(),
      }
    });

    if (workoutData.length) {
      const completed = workoutData.filter((item) => item.completed).length;
      const todo = workoutData.filter((item) => !item.completed).length;
      workout = [workoutData];
      stat = { completed, todo };
    }
    const user = await USER.find({ _id: userId }, {
      password: 0,
    });
    res.status(200).json({ user, workout, stat });
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async function (req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(getUserId(req));
    const userData = req.body;
    const user = await USER.findByIdAndUpdate(userId, userData);
    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
  }
};
