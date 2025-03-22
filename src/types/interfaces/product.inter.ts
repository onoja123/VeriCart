import { Schema } from "mongoose";


export interface IProduct {
    _user: Schema.Types.ObjectId | string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    createdAt: Date;
}