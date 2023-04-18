import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
	userId: String,
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