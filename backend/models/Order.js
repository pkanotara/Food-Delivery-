import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    },
    name: String,
    price: Number,
    quantity: Number
  }],
  amount: {
    type: Number,
    required: true
  },
  address: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    phone: String
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'out for delivery', 'delivered'],
    default: 'pending'
  },
  paymentStatus: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
