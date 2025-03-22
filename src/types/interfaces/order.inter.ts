import { Document, Schema } from "mongoose";
import { ilocation } from "./location.inter";
import { OrderStatus } from "../enums/order";


export interface IOrder extends Document {
    _user: Schema.Types.ObjectId | string,
    status: OrderStatus,
    isPaid: boolean,
    total: number,
    paymentDate: Date,
    createdAt: Date,
    updatedAt: Date,
    items: {
        product: Schema.Types.ObjectId | string,
        quantity: number,
        price: number
    }[],
    paymentReference?: string,
    shippingAddress?: string
}
