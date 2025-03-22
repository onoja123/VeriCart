import { Inotification } from "../types/interfaces/notification.inter";
import Notification from "../models/notification.model";


export default class NotificationService{

    static async getAll(
        userId: string, 
        paginationParams: { page?: number, limit?: number}
    ): Promise<Inotification[]> {
        const { limit=10, page=1 } = paginationParams;
        const skip = (page - 1) * limit
        const notification = await Notification.find({_user: userId}).sort('-createdAt').skip(skip).limit(limit);
        return notification;
    }

    static async getNotificationById(
        id: string
    ): Promise<Inotification | null> {

        const notification = await Notification.findById(id)
        .populate({
            path: '_user',
            select: 'fullname email phone'
        });
        return notification;
    }

    static async createNotification(
        userId: string, 
        title: string, 
        message: string, 
        seen: boolean
    ): Promise<Inotification | null> {

        const newNotification = await Notification.create({
          _user: userId,
          title,
          message,
          seen
        });
        return newNotification;
      
    }    

    static async markAsSeen(
        id: string
    ): Promise<Inotification | null> {

        const notification = await Notification.findByIdAndUpdate(
            id,
            { $set: { seen: true } },
            { new: true }
        );
        return notification;
    }

    static async createNotificationTest(
        notificationParams: Inotification
    ): Promise<Inotification> {
        const notification =  await Notification.create({ ...notificationParams });
        return notification
    }
}