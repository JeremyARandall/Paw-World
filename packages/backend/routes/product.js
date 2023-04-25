import express from 'express';
import { searchProducts, createProduct, getProducts, getProductById, updateProductById, deleteProductById } from '../controllers/product.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/id/:id', getProductById);
router.patch('/id/:id', updateProductById);
router.delete('/id/:id', deleteProductById);
router.get('/search', searchProducts);

export default router;