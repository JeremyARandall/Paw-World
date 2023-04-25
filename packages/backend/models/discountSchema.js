import mongoose from 'mongoose';

const discountSchema = mongoose.Schema({
	name: String,
	percent: Number,
	code: String,
	expiration: Date,
	productIds: [String],
	userIds: [String]
});

var Discount = mongoose.model('Discount', discountSchema);

export default Discount;