import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrderById } from '../controllers/order.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/id/:id', getOrderById); //searces for the object at localhost:5000/products/id/$id to get the single, calling getOrderById to do so
router.patch('/id/:id', updateOrderById);

export default router;