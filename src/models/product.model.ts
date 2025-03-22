import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/interfaces/product.inter';

const productSchema = new Schema<IProduct>({
    _user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    image: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
