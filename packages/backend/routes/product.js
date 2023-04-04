import express from 'express';
import { getProducts, createProduct, getProductById } from '../controllers/product.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/id/:id', getProductById); //searces for the object at localhost:5000/products/id/$id to get the single, calling getProductById to do so
router.post('/', createProduct)

export default router;