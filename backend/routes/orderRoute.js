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

const orderRouter = express.Router();

// User routes
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.get('/user', authMiddleware, getUserOrders);

// Admin routes
orderRouter.get('/all', authMiddleware, adminMiddleware, getAllOrders);
orderRouter.put('/status/:id', authMiddleware, adminMiddleware, updateOrderStatus);

export default orderRouter;
