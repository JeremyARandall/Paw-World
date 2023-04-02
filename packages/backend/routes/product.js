import express from 'express';
import { getProducts, createProduct, getProductById } from '../controllers/product.js';

const router = express.Router();

router.get('/:id', getProductById);
router.get('/', getProducts);
router.post('/', createProduct)

export default router;