import productMessage from '../models/productMessage.js';

export const getProducts = async (req, res) => {
    try {
        const productMessages = await productMessage.find();
        res.status(200).json(productMessage);
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createProduct = async (req, res) => {
	
    const newProduct = new productMessage(req.body);
	
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(409).json({message: error.message});
    }
}