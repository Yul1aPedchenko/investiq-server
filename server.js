import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import transactionsRoutes from "./routes/transactions.js";
import userRouter from './routes/user.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/transactions", transactionsRoutes);

app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
connectDb();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
