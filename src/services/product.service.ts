import Product from '../models/product.model';
import User from '../models/user.model';
import { IProduct } from '../types/interfaces/product.inter';


export default class ProductProduct {

    static async getAll(): Promise<IProduct[]> {
        const products = await Product.find()
        .populate('_user')
        return products;
    }

    static async getOneProduct(
        id: string
    ): Promise<IProduct | null> {
        const product = await Product.findById(id)
        .populate('_user')
        return product;
    }

    static async createProduct(
        userId: string,
        data: IProduct
    ): Promise<IProduct | null>{
        const user = await User.findById(userId);

        if (!user) {
          return null;
        }

        const newProduct = await Product.create({
            ...data,
            _user: userId,
        });

        await newProduct.save()

        await user.save();

        return newProduct;
    }

    static async updateProduct(
        id: string,
        payload: IProduct
    ): Promise<IProduct | null> {
        const productDetails= await Product.findByIdAndUpdate(id, payload,{ new: true })
        return productDetails;
    }

    static async deleteProduct(
        id: string
    ): Promise<IProduct | null> {
        const deleteProduct = await Product.findByIdAndDelete(id, {new: true});
        return deleteProduct;
    }

}