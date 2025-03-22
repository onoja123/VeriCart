import Order from '../models/order.model';
import User from '../models/user.model';
import { IOrder } from '../types/interfaces/order.inter';
import { connectRabbitMQ, getChannel } from './messageQueue';
import NotificationService from './notification.service';
import PaymentService from './payment.service';

connectRabbitMQ();

export default class OrderOrder {

    static async getAll(): Promise<IOrder[]> {
        const orders = await Order.find()
        .populate('_user')
        return orders;
    }

    static async getOneOrder(
        id: string
    ): Promise<IOrder | null> {
        const orders = await Order.findById(id)
        .populate('_user')
        return orders;
    }

    static async createOrder(
        userId: string,
        data: IOrder
    ): Promise<{ order: IOrder | null, paymentLink: string | null }> {
        const user = await User.findById(userId);

        if (!user) {
            return { order: null, paymentLink: null };
        }

        const newOrder = await Order.create({
            ...data,
            _user: userId,
        });

        await newOrder.save()

        const channel = getChannel();
        if (channel) {
            channel.sendToQueue('orderQueue', Buffer.from(JSON.stringify(newOrder)), {
                persistent: true,
            });
        }

        await user.save();

        const payment = await PaymentService.initializePaystackPayment(data.total, userId, 'your-callback-url');
        const paymentLink = payment.authorizationUrl;

        // Create notification
        await NotificationService.createNotification(userId, 'Order Created', `Your order with ID ${newOrder._id} has been created.`, false);

        return { order: newOrder, paymentLink };
    }

    static async updateOrder(
        id: string,
        payload: IOrder
    ): Promise<IOrder | null> {
        const orderDetails = await Order.findByIdAndUpdate(id, payload, { new: true });

        if (orderDetails) {
            const channel = getChannel();
            if (channel) {
                channel.sendToQueue('orderUpdateQueue', Buffer.from(JSON.stringify(orderDetails)), {
                    persistent: true,
                });
            }
            await NotificationService.createNotification(orderDetails._user.toString(), 'Order Updated', `Your order with ID ${orderDetails._id} has been updated.`, false);
        }

        return orderDetails;
    }

}