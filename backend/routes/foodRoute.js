import express from 'express';
import { addFood, listFood, updateFood, deleteFood } from '../controllers/foodController.js';
import upload from '../middleware/multer.js';
import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';

const foodRouter = express.Router();

// Add food item (admin only)
foodRouter.post('/add', authMiddleware, adminMiddleware, upload.single('image'), addFood);

// Get all food items (public)
foodRouter.get('/list', listFood);

// Update food item (admin only)
foodRouter.put('/update/:id', authMiddleware, adminMiddleware, upload.single('image'), updateFood);

// Delete food item (admin only)
foodRouter.delete('/delete/:id', authMiddleware, adminMiddleware, deleteFood);

export default foodRouter;
