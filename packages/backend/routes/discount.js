import express from 'express';
import { getDiscounts, createDiscount, getDiscountById } from '../controllers/discount.js';

const router = express.Router();

router.get('/', getDiscounts);
router.get('/id/:id', getDiscountById);
router.post('/', createDiscount)

export default router;