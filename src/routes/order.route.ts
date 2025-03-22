import { Router } from 'express';

import {
    CreateOrder,
    GetAllOrders,
    GetOneOrder,
    UpdateOrder,
} from '../controllers/orders.controller';

import AuthMiddlewareService from '../middlewares/auth.middleware';

const OrderRouter = Router();

OrderRouter.use(AuthMiddlewareService.Protect)

OrderRouter.get('/all-order', GetAllOrders);

OrderRouter.get('/one-order/:id', GetOneOrder);

OrderRouter.post('/create-order', CreateOrder);

OrderRouter.patch('/update-order/:id', UpdateOrder);


export default OrderRouter;
