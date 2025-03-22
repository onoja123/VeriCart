import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import NotificationService from "../services/notification.service";
import ResponseHelper from "../utils/response";


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get all notification
 * @route `/api/notification/all-notification`
 * @access Private
 * @type GET
 **/
export const GetAllNotification = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const { page, limit } = req.query;
    try {
        if ((page && isNaN(Number(page))) || (limit && isNaN(Number(limit)))) {
            return next(new AppError("Page and limit values must be numbers", ResponseHelper.BAD_REQUEST))
        }
        const notification = await NotificationService.getAll(req.user?.id, {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
        });

        if(!notification || notification.length === 0) {
            return next(new AppError("No notification not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res,
            {
                data: notification,
                statusCode: ResponseHelper.OK
            });
    } catch (error) {
        console.log(error)
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get one notification
 * @route `/api/notification/one-notification/:id`
 * @access Private
 * @type GET
 **/
export const GetOneNotification = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;


        const notification = await NotificationService.getNotificationById(id);

        if (!notification) {
            return next(new AppError("Notification not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res,
            {
                data: notification,
                statusCode: ResponseHelper.OK,
            });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get a notification. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Mark notification as seen
 * @route `/api/notification/markasseen/:id`
 * @access Private
 * @type GET
 **/
export const MarkAsSeen = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;


        const notification = await NotificationService.markAsSeen(id);

        if (!notification) {
            return next(new AppError("Notification not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res,
            {
                data: notification,
                message: "Mark as seen successfully",
                statusCode: ResponseHelper.OK,
            });
    } catch (error) {
        return next(new AppError("An error occurred while trying to update the notification. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});

