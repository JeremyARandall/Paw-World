import mongoose from 'mongoose';
//lays out formatting for products within DB.
const productSchema = mongoose.Schema({
	name: String,
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