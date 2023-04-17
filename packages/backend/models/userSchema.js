import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	username: String,
	passwordHash: String,
	email: String,
	phone: Number,
	cart: [{
		productId: Number,
		quantity: Number
	}],
	isAdmin: Boolean
});

const User = mongoose.model('User', userSchema);

export default User;