import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
	name: String,
	id: { type: String, require: true, unique: true },
	description: String,
	brand: String,
	price: Number,
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

var Product = mongoose.model('Product', productSchema);

export default Product;