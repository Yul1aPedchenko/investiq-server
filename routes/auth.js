import express from 'express';

import { loginHandler, registerHandler, currentUserHandler } from '../handlers/auth.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.get('/current', authMiddleware, currentUserHandler);

export default router