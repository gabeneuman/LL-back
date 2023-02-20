import { UserI } from "./user.interface";
import USER from "./user.model";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../../app";
import { getUserId } from "../workout/utility/utility";

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
    const userId = getUserId(req);
    const user = await USER.findById(userId, {
      password: 0,
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async function (req, res) {
  try {
    const userId = getUserId(req);
    const userData = req.body;
    const user = await USER.findByIdAndUpdate(userId, userData);
    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
  }
};
