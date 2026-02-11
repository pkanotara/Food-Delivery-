import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const userRouter = express.Router();

// Register new user (with strict rate limiting)
userRouter.post('/register', authLimiter, registerUser);

// Login user (with strict rate limiting)
userRouter.post('/login', authLimiter, loginUser);

export default userRouter;
