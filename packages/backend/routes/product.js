import express from 'express';
import { getProducts, createProduct, getProductById } from '../controllers/product.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/id/:id', getProductById);
router.post('/', createProduct)

export default router;