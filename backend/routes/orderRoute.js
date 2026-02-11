import express from 'express';
import { 
  placeOrder, 
  verifyOrder, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus 
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const orderRouter = express.Router();

// User routes (rate limited)
orderRouter.post('/place', apiLimiter, authMiddleware, placeOrder);
orderRouter.post('/verify', apiLimiter, verifyOrder);
orderRouter.get('/user', apiLimiter, authMiddleware, getUserOrders);

// Admin routes (rate limited)
orderRouter.get('/all', apiLimiter, authMiddleware, adminMiddleware, getAllOrders);
orderRouter.put('/status/:id', apiLimiter, authMiddleware, adminMiddleware, updateOrderStatus);

export default orderRouter;
