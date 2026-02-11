import Food from '../models/Food.js';
import fs from 'fs';

/**
 * Add a new food item (admin only)
 * POST /api/foods/add
 */
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Validate inputs
    if (!name || !description || !price || !category) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Food image is required' 
      });
    }

    // Create new food item
    const food = new Food({
      name,
      description,
      price: Number(price),
      category,
      image: req.file.filename
    });

    await food.save();

    res.status(201).json({
      success: true,
      message: 'Food item added successfully',
      food
    });
  } catch (error) {
    console.error('Add food error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while adding food item' 
    });
  }
};

/**
 * Get all food items
 * GET /api/foods/list
 */
export const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    
    res.json({
      success: true,
      foods
    });
  } catch (error) {
    console.error('List food error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching food items' 
    });
  }
};

/**
 * Update a food item (admin only)
 * PUT /api/foods/update/:id
 */
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const food = await Food.findById(id);
    
    if (!food) {
      return res.status(404).json({ 
        success: false, 
        message: 'Food item not found' 
      });
    }

    // Update fields
    if (name) food.name = name;
    if (description) food.description = description;
    if (price) food.price = Number(price);
    if (category) food.category = category;
    
    // Update image if new file uploaded
    if (req.file) {
      // Delete old image
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.error('Error deleting old image:', err);
      });
      food.image = req.file.filename;
    }

    await food.save();

    res.json({
      success: true,
      message: 'Food item updated successfully',
      food
    });
  } catch (error) {
    console.error('Update food error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating food item' 
    });
  }
};

/**
 * Delete a food item (admin only)
 * DELETE /api/foods/delete/:id
 */
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);
    
    if (!food) {
      return res.status(404).json({ 
        success: false, 
        message: 'Food item not found' 
      });
    }

    // Delete image file
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.error('Error deleting image:', err);
    });

    // Delete food item
    await Food.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Food item deleted successfully'
    });
  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting food item' 
    });
  }
};
