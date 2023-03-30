import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
	name: String,
	id: Number,
	description: String,
	brand: String,
	tags: [String],
	productImage: String,
	stockRemaining: {
		type: Number,
		default: 0
	},
	dateCreated: {
		type: Date,
		default: new Date()
	}, 
});

const productMessage = mongoose.model('ProductMessage', productSchema);

export default productMessage;