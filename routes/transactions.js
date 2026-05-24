import express from 'express';

import { authMiddleware } from '../middleware/auth.js';

import { addTransactionHandler, getTransactionsHandler, deleteTransactionHandler } from '../handlers/transactions.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTransactionsHandler);
router.post('/', addTransactionHandler);
router.delete('/:id', deleteTransactionHandler);

export default router