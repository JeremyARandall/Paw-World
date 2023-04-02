import Product from '../models/productSchema.js';

export const getProducts = async (req, res) => {

    try {


        const products = await Product.find({}); //have the DB find products
        res.json(products); //return the products to calling function
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.find(req.params.id); //find product by its id and respond with it in json form
        res.json(product);
    } catch (error) {
        console.error(error); //write error
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {

    const newProduct = new Product(req.body);

    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};