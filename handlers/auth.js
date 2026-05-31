import jwt from "jsonwebtoken";

import { addUser, getUser, getUserById } from "../db/db.js";

export const registerHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await addUser(name, email, password);
    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
    };

    res.status(201).json({
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUser(email, password);
    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
    };

    res.status(201).json({
      token,
      user: userData,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const currentUserHandler = async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
