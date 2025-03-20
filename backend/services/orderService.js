import mongoose from 'mongoose';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { ERROR_STATUS_CODES } from '../static/errorStatsCodes.js';

export const createOrder = async (orderData) => {
  const { userId, productId, quantity } = orderData;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error('User not found');
    }

    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock < quantity) {
      throw new Error('Not enough product in stock');
    }

    const totalPrice = product.price * quantity;

    if (user.balance < totalPrice) {
      throw new Error('Insufficient balance');
    }

    const order = new Order({
      userId,
      productId,
      quantity,
      totalPrice,
    });

    await order.save({ session });

    user.balance -= totalPrice;
    await user.save({ session });

    product.stock -= quantity;
    await product.save({ session });

    await session.commitTransaction();

    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getUserOrders = async (userId) => {
  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    throw new Error('User not found');
  }

  const orders = await Order.find({ userId })
    .populate('productId', 'name price')
    .sort({ createdAt: -1 });

  return orders;
};
