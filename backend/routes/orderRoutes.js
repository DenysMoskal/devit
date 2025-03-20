import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/', orderController.createOrder);

router.get('/:userId', orderController.getUserOrders);

export default router;
