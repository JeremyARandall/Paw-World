import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	username: String,
	passwordHash: String,
	salt: String,
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	cart: [{
		productId: Number,
		quantity: Number
	}],
	isAdmin: Boolean
});

const User = mongoose.model('User', userSchema);

export default User;

