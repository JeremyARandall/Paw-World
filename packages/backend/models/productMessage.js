import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
   title: String,
   message: String,
   creator: String,
   tags: [String],
   selectedFile: String,
   inventoryCount: {
    type: Number,
    default: 0
   },
   createdAt: {
    type: Date,
    default: new Date()
   }, 
});

const ProductMessage = mongoose.model('ProductMessage', productSchema);

export default ProductMessage;