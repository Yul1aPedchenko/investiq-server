import { User } from "../models/user.js";
import { Transaction } from "../models/transactions.js";
import { addTransaction, getTransactions, deleteTransaction } from "../db/db.js";

export const addTransactionHandler = async (req, res) => {
  try {
    const transaction = await addTransaction({ ...req.body, userId: req.user.userId });

    const user = await User.findById(req.user.userId);

    if (transaction.type === "expense") {
      user.balance -= transaction.amount;
    } else {
      user.balance += transaction.amount;
    }

    await user.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionsHandler = async (req, res) => {
  try {
    console.log(req.user);

    const transactions = await getTransactions(req.user.userId);

    res.json(transactions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTransactionHandler = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    const user = await User.findById(req.user.userId);

    if (transaction.type === "expense") {
      user.balance += transaction.amount;
    } else {
      user.balance -= transaction.amount;
    }

    await user.save();
    await transaction.deleteOne();

    res.json({
      message: "Transaction deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
