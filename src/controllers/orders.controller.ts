import { NextFunction, Request, Response } from "express";
import OrderService from "../services/order.service";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import ResponseHelper from "../utils/response";


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get all orders
 * @route `/api/v1/order`
 * @access Private
 * @type GET
 **/
export const GetAllOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const response = await OrderService.getAll();

        if (!response) {
            return next(new AppError("Please try again.", ResponseHelper.BAD_REQUEST));
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: response,
            statusCode: ResponseHelper.OK,
        });

    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});
/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get one order
 * @route `/api/v1/order`
 * @access Private
 * @type GET
 **/
export const GetOneOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const response = await OrderService.getOneOrder(req.params.id);

        if (!response) {
            return next(new AppError("Please try again.", ResponseHelper.BAD_REQUEST));
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: response,
            statusCode: ResponseHelper.OK,
        });

    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred. Please try again", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Create an order
 * @route `/api/v1/order`
 * @access Private
 * @type POST
 **/
export const CreateOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {...orderData } = req.body;

        const { order, paymentLink } = await OrderService.createOrder(req?.user.id, orderData);

        if (!order) {
            return next(new AppError("Failed to create order. Please try again.", ResponseHelper.BAD_REQUEST));
        }


        ResponseHelper.sendSuccessResponse(res, {
            data: {
                order,
                paymentLink
            },
            statusCode: ResponseHelper.OK,
        });

    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
    }
});

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Update an order
 * @route `/api/v1/order`
 * @access Private
 * @type PATCH
 **/
export const UpdateOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderData = req.body;

        const updatedOrder = await OrderService.updateOrder(req.params.id, orderData);

        if (!updatedOrder) {
            return next(new AppError("Failed to update order. Please try again.", ResponseHelper.BAD_REQUEST));
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: updatedOrder,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
    }
});