import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
	username: String,
	passwordHash: String,
	email: String,
	phone: Number,
	cart: [{
		productId: Number,
		quantity: Number
	}],
	isAdmin: boolean
});

const accountMessage = mongoose.model('AccountMessage', accountSchema);

export default accountMessage;