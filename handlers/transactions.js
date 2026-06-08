import { addTransaction, getTransactions, deleteTransaction } from "../db/db.js";

export const addTransactionHandler = async (req, res) => {
  try {
    const transaction = await addTransaction({ ...req.body, userId: req.user.userId });

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
    await deleteTransaction(req.params.id, req.params.userId);

    res.json({
      message: "Transaction deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
