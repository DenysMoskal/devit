import * as orderService from '../services/orderService.js';
import { ERROR_STATUS_CODES } from '../static/errorStatsCodes.js';

export const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    const statusCode = ERROR_STATUS_CODES[error.message] || 500;

    res.status(statusCode).json({
      success: false,
      error: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log(userId, 'userId');
    const orders = await orderService.getUserOrders(userId);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    const statusCode = ERROR_STATUS_CODES[error.message] || 500;

    res.status(statusCode).json({
      success: false,
      error: error.message,
    });
  }
};
