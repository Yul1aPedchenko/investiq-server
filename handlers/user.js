import { updateBalance } from "../db/db.js";

export const updateBalanceHandler = async (req, res) => {
  try {
    const { balance } = req.body;

    const user = await updateBalance(req.user.userId, balance);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
