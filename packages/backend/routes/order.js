import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrderById, deleteOrderById } from '../controllers/order.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/id/:id', getOrderById);
router.patch('/id/:id', updateOrderById);
router.delete('/id/:id', deleteOrderById);

export default router;