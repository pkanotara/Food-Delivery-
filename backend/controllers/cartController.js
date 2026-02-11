import User from '../models/User.js';

/**
 * Add item to cart
 * POST /api/cart/add
 */
export const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    
    if (!itemId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item ID is required' 
      });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    let cartData = user.cartData || {};
    
    // Increment quantity or add new item
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    res.json({
      success: true,
      message: 'Item added to cart',
      cartData
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while adding to cart' 
    });
  }
};

/**
 * Remove item from cart
 * POST /api/cart/remove
 */
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    
    if (!itemId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item ID is required' 
      });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    let cartData = user.cartData || {};
    
    // Decrement quantity or remove item
    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    res.json({
      success: true,
      message: 'Item removed from cart',
      cartData
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while removing from cart' 
    });
  }
};

/**
 * Get cart items
 * GET /api/cart/get
 */
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      cartData: user.cartData || {}
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching cart' 
    });
  }
};

/**
 * Clear cart
 * POST /api/cart/clear
 */
export const clearCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      cartData: {}
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while clearing cart' 
    });
  }
};
