import express from 'express';
import { createProduct, getProducts, getProductById, updateProductById } from '../controllers/product.js';

const router = express.Router();

router.post('/', createProduct)
router.get('/', getProducts);
router.get('/id/:id', getProductById); //searces for the object at localhost:5000/products/id/$id to get the single, calling getProductById to do so
router.patch('/id/:id', updateProductById)

export default router;