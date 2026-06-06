import express from 'express';

import { authMiddleware } from '../middleware/auth.js';

import { updateBalanceHandler } from '../handlers/user.js';

const router = express.Router();

router.patch('/balance',authMiddleware, updateBalanceHandler);

export default router;