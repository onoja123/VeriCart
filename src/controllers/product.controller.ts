import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import ProductService from "../services/product.service";
import ResponseHelper from "../utils/response";
import ProductValidator from "../validators/product.validator";


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get all products
 * @route `/api/v1/product/all-products`
 * @access Private
 * @type GET
 **/
export const GetAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await ProductService.getAll();

        if(!products || products.length === 0) {
            return next(new AppError("Service not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: products,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred while trying to get all products. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get one product by id
 * @route `/api/v1/product/one-product/:id`
 * @access Private
 * @type GET
 **/
export const GetOneProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;

        const validationResult = ProductValidator.validateId({ id });

        if (validationResult.error) {
            return next(new AppError(validationResult.error.details[0].message, ResponseHelper.BAD_REQUEST));
        }

        const product = await ProductService.getOneProduct(id);

        if(!product) {
            return next(new AppError("product not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: product,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description create/add product
 * @route `/api/v1/product/add-product`
 * @access Private
 * @type POST
 **/
export const CreateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {


        const validationResult = ProductValidator.createProduct(req.body);

        if (validationResult.error) {

            return next(new AppError(validationResult.error.details[0].message, ResponseHelper.BAD_REQUEST));
        }


        const createproduct = await ProductService.createProduct(req.user?.id, req.body);

        if (!createproduct) {
            return next(new AppError("product not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Product created successfully",
            statusCode: ResponseHelper.RESOURCE_CREATED,
            data: createproduct,
        });
    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description edit/update a product
 * @route `/api/v1/product/edit-product/:id`
 * @access Private
 * @type PATCH
 **/
export const UpdateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const validationResult = ProductValidator.validateId({ id });

        if (validationResult.error) {
            return next(new AppError(validationResult.error.details[0].message, ResponseHelper.BAD_REQUEST));
        }

        const updatedService = await ProductService.updateProduct(id, req.body);

        if (!updatedService) {
            return next(new AppError("Service not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Profile updated successfully",
            data: updatedService ,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred while trying to update a product. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description delete a product
 * @route `/api/v1/product/delete-product/:id`
 * @access Private
 * @type DELETE
 **/
export const DeleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const validationResult = ProductValidator.validateId({ id });

        if (validationResult.error) {
            return next(new AppError(validationResult.error.details[0].message, ResponseHelper.BAD_REQUEST));
        }

        const deletedService = await ProductService.deleteProduct(id);

        if (!deletedService) {
            return next(new AppError("Product not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Product deleted successfully",
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred while trying to delete a product. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});