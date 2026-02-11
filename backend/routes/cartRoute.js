import express from 'express';
import { addToCart, removeFromCart, getCart, clearCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const cartRouter = express.Router();

// All cart routes require authentication and are rate limited
cartRouter.post('/add', apiLimiter, authMiddleware, addToCart);
cartRouter.post('/remove', apiLimiter, authMiddleware, removeFromCart);
cartRouter.get('/get', apiLimiter, authMiddleware, getCart);
cartRouter.post('/clear', apiLimiter, authMiddleware, clearCart);

export default cartRouter;
