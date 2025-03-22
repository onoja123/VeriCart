import mongoose, { Schema } from "mongoose";
import { OrderStatus } from "../types/enums/order";
import { IOrder } from "../types/interfaces/order.inter";

const orderSchema = new Schema<IOrder>({
  _user: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  total: {
    type: Number
  },
  items: [{
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  paymentReference: {
    type: String,
    required: false
  },
  shippingAddress: {
    type: String,
    required: false
  }
}, { timestamps: true });

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;