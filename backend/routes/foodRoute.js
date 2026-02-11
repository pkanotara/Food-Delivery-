import express from 'express';
import { addFood, listFood, updateFood, deleteFood } from '../controllers/foodController.js';
import upload from '../middleware/multer.js';
import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const foodRouter = express.Router();

// Add food item (admin only, rate limited)
foodRouter.post('/add', apiLimiter, authMiddleware, adminMiddleware, upload.single('image'), addFood);

// Get all food items (public)
foodRouter.get('/list', listFood);

// Update food item (admin only, rate limited)
foodRouter.put('/update/:id', apiLimiter, authMiddleware, adminMiddleware, upload.single('image'), updateFood);

// Delete food item (admin only, rate limited)
foodRouter.delete('/delete/:id', apiLimiter, authMiddleware, adminMiddleware, deleteFood);

export default foodRouter;
