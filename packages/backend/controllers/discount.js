import Discount from '../models/discountSchema.js';

export const createDiscount = async (req, res) => {

	const newDiscount = new Discount(req.body);

	try {
		await newDiscount.save();
		res.status(201).json(newDiscount);
	}
	catch (error) {
		console.error(error);
		res.status(409).json({ message: error.message });
	}
};

export const getDiscounts = async (req, res) => {

	try {
		const discounts = await Discount.find({});
		res.status(200).json(discounts);
	}
	catch (error) {
		console.error(error);
		res.status(404).json({ message: error.message });
	}
};

export const getDiscountById = async (req, res) => {
	
	try {
		const discount = await Discount.findById(req.params.id);
		if (discount) {
			res.send(discount);
		} else {
			res.status(404).send({ message: 'Discount Not Found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

export const updateDiscountById = async (req, res) => {

	const { id } = req.params;
	const { name, percent, code, expiration, productIds, userIds } = req.body;
	const updated = { name, percent, code, expiration, productIds, userIds, _id: id};

	try{
		await Discount.findByIdAndUpdate(id, updated, {new: true});
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(304).json({ message: error.message });
	}
};

export const deleteDiscountById = async (req, res) => {
	
	const { id } = req.params;

	try{
		await Discount.findByIdAndDelete(id);
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(204).json({ message: error.message });
	}
};