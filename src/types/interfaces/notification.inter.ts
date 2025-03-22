import { Document, Schema } from "mongoose";


export interface NotifOptions {
    title: string;
    body: string;
    fcmToken: string;
}

export interface Inotification{
  _user: Schema.Types.ObjectId | string;
  title: string;
  message: string;
  seen: boolean;
  createdAt: Date;
}