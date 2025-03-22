import { Router } from 'express';

import {
    GetAllProducts,
    GetOneProduct,
    CreateProduct,
    UpdateProduct,
    DeleteProduct
} from '../controllers/product.controller';

import AuthMiddlewareService from '../middlewares/auth.middleware';

const ProductRouter = Router();

ProductRouter.use(AuthMiddlewareService.Protect)

ProductRouter.get('/all-services', GetAllProducts);

ProductRouter.get('/one-service/:id', GetOneProduct);

ProductRouter.post('/add-service', CreateProduct);

ProductRouter.patch('/edit-service/:id', UpdateProduct);

ProductRouter.delete('/delete-service/:id', DeleteProduct);

export default ProductRouter;
