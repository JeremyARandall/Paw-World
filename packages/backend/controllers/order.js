import Order from '../models/orderSchema.js';

export const createOrder = async (req, res) => {

	const newOrder = new Order(req.body);

	try {
		await newOrder.save();
		res.status(201).json(newOrder);
	}
	catch (error) {
		console.error(error);
		res.status(409).json({ message: error.message });
	}
};

export const getOrders = async (req, res) => {

	var query;

	if (req.query.type == 'current'){
		query = Order.where("dateFulfilled", null);
	}
	
	else if (req.query.type == 'past'){
		query = Order.where("dateFulfilled").ne(null);
	}
	
	else{
		query = Order.find({});
	}
	
	try {
		const orders = await query.exec();
		res.status(200).json(orders);
	}
	catch (error) {
		console.error(error);
		res.status(404).json({ message: error.message });
	}
};

export const getOrderById = async (req, res) => {
	
	try {
		const order = await Order.findById(req.params.id);
		if (order) {
			res.send(order);
		} else {
			res.status(404).send({ message: 'Order Not Found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

export const updateOrderById = async (req, res) => {

	const { id } = req.params;
	const { userId, products, datePlaced, dateFulfilled } = req.body;
	const updated = { userId, products, datePlaced, dateFulfilled, _id: id};

	try{
		await Order.findByIdAndUpdate(id, updated, {new: true});
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(304).json({ message: error.message });
	}
};

export const deleteOrderById = async (req, res) => {
	
	const { id } = req.params;

	try{
		await Order.findByIdAndDelete(id);
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(204).json({ message: error.message });
	}
};