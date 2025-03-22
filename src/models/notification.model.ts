import mongoose, { Document, Schema, Types } from "mongoose";
import { Inotification } from '../types/interfaces/notification.inter';

const NotificationSchema = new Schema<Inotification>({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
    },
    message: {
        type: String,
    },
    seen: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: true });


const Notification = mongoose.model<Inotification>('Notification', NotificationSchema)

export default Notification;