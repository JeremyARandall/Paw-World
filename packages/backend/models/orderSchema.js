import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
	userId: String,
	total: Number,
	Address1: String,
	Address2: String,
	Apt: Number,
	City: String,
	State: String,
	ZIP: Number,
	Instructions: String,
	products: [{
		productId: Number,
		quantity: Number,
		price: Number
	}],
	datePlaced: {
		type: Date,
		default: new Date()
	},
	dateFulfilled: {
		type: Date,
		default: null
	}
});

const Order = mongoose.model('Order', orderSchema);

export default Order;