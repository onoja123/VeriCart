import express from 'express';
import {
    GetAllNotification,
    GetOneNotification,
    MarkAsSeen,
} from '../controllers/notification.controller';

import AuthMiddlewareService from '../middlewares/auth.middleware';

const NotificationRouter = express.Router()

NotificationRouter.use(AuthMiddlewareService.Protect)

NotificationRouter.get('/all-notification', GetAllNotification)

NotificationRouter.get('/one-notification/:id', GetOneNotification)

NotificationRouter.put('/markasseen/:id', MarkAsSeen)

export default NotificationRouter;