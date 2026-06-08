import bcrypt from "bcrypt";

import { User } from "../models/user.js";
import { Transaction } from "../models/transactions.js";

export const addUser = async (name, email, password) => {
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new Error("User with this email already exists");
  }
  const hash = await bcrypt.hash(password, 10);

  return await User.create({ name, email, password: hash });
};

export const getUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User with this email wasn't found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const updateBalance = async (userId, balance) => {
  return User.findByIdAndUpdate(userId, { balance }, { new: true }).select("-password");
};

export const addTransaction = async (data) => {
  return await Transaction.create(data);
};

export const getTransactions = async (userId) => {
  return await Transaction.find({ userId }).sort({ date: -1 });
};

export const deleteTransaction = async (id) => {
  return await Transaction.findOneAndDelete({ _id: id, userId });
};
