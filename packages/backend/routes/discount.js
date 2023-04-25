import express from 'express';
import { createDiscount, getDiscounts, getDiscountById, updateDiscountById, deleteDiscountById, getDiscountByName } from '../controllers/discount.js';

const router = express.Router();

router.post('/', createDiscount);
router.get('/', getDiscounts);
router.get('/id/:id', getDiscountById);
router.patch('/id/:id', updateDiscountById);
router.delete('/id/:id', deleteDiscountById);
router.get('/code/:code', getDiscountByName);

export default router;