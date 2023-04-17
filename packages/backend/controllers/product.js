import Product from '../models/productSchema.js';

export const createProduct = async (req, res) => {

	const newProduct = new Product(req.body);

	try {
		await newProduct.save();
		res.status(201).json(newProduct);
	}
	catch (error) {
		console.error(error);
		res.status(409).json({ message: error.message });
	}
};

export const getProducts = async (req, res) => {

	try {
		const products = await Product.find({});
		res.status(200).json(products);
	}
	catch (error) {
		console.error(error);
		res.status(404).json({ message: error.message });
	}
};

export const getProductById = async (req, res) => {
	
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			res.send(product);
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

export const updateProductById = async (req, res) => {

	const { id } = req.params;
	const { name, description, brand, price, tags, productImage, stockRemaining, dateCreated } = req.body;
	const updated = { name, description, brand, price, tags, productImage, stockRemaining, dateCreated, _id: id};

	try{
		await Product.findByIdAndUpdate(id, updated, {new: true});
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(304).json({ message: error.message });
	}
};

export const deleteProductById = async (req, res) => {
	
	const { id } = req.params;

	try{
		await Product.findByIdAndDelete(id);
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(204).json({ message: error.message });
	}
};