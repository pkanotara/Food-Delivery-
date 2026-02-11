import Order from '../models/Order.js';
import User from '../models/User.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Place a new order and create Stripe checkout session
 * POST /api/orders/place
 */
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    // Validate inputs
    if (!items || !amount || !address) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Create new order
    const newOrder = new Order({
      userId: req.userId,
      items,
      amount,
      address
    });

    await newOrder.save();

    // Clear user's cart
    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    // Create Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name
        },
        unit_amount: Math.floor(item.price * 100) // Convert to cents
      },
      quantity: item.quantity
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Delivery Charges'
        },
        unit_amount: 200 // $2.00 delivery charge
      },
      quantity: 1
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.CLIENT_URL}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({
      success: true,
      session_url: session.url,
      orderId: newOrder._id
    });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while placing order' 
    });
  }
};

/**
 * Verify Stripe payment
 * POST /api/orders/verify
 */
export const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    if (!orderId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order ID is required' 
      });
    }

    if (success === 'true') {
      // Payment successful - update order
      await Order.findByIdAndUpdate(orderId, { paymentStatus: true });
      res.json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      // Payment failed - delete order
      await Order.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: 'Payment failed'
      });
    }
  } catch (error) {
    console.error('Verify order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while verifying payment' 
    });
  }
};

/**
 * Get user's orders
 * GET /api/orders/user
 */
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching orders' 
    });
  }
};

/**
 * Get all orders (admin only)
 * GET /api/orders/all
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching orders' 
    });
  }
};

/**
 * Update order status (admin only)
 * PUT /api/orders/status/:id
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'preparing', 'out for delivery', 'delivered'];
    
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status' 
      });
    }

    const order = await Order.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating order status' 
    });
  }
};
