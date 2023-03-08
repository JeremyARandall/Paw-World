import ProductMessage from '../models/productMessage.js';

export const getProducts = async (req, res) =>{
    try{
        const productMessages = await productMessage.find();
        
        res.status(200).json(productMessages);
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
}

export const createProducts = async(req, res) =>{
    const product = req.body;

    const newProduct = new PostMessage(product);
    try{
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(409).json({ message: error.message});
    }
}