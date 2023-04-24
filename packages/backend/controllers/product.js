import expressAsyncHandler from 'express-async-handler';
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

export const searchProducts = expressAsyncHandler(async (req, res) => {


	const { query } = req;
	const order = query.order;
	const searchQuery = query.query;
	const queryFilter =
		searchQuery && searchQuery !== 'all'
			? {
				tags: {
					$regex: searchQuery,
					$options: 'i',
				},
			} : {};
	const sortOrder =
		order === 'lowest'
			? { price: 1 }
			: order === 'highest'
				? { price: -1 }
				: order === 'most'
					? { stockRemaining: -1 }
					: order === 'fewest'
						? { stockRemaining: 1 }
						: { _id: -1 };

	const products = await Product.find({ ...queryFilter }).sort(sortOrder);
	res.status(200).json(products);

});

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
	const updated = { name, description, brand, price, tags, productImage, stockRemaining, dateCreated, _id: id };

	try {
		await Product.findByIdAndUpdate(id, updated, { new: true });
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(304).json({ message: error.message });
	}
};

export const deleteProductById = async (req, res) => {

	const { id } = req.params;

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(204).json({ message: error.message });
	}
};