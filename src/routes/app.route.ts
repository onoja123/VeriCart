import express from "express";
import { Routes } from "../types/interfaces/app.inter";
import AuthRoute from "./auth.route";
import NotificationRoute from "./notification.route";
import ProductRoute from "./product.route";
import ProfileRoute from "./profile.route";
import OrderRoute from "./order.route";

const AppRouter = express.Router();

const appRoutes: Routes = [
    {
        path: "/auth",
        router: AuthRoute,
    },
    {
        path: "/profile",
        router: ProfileRoute,
    },
    {
        path: "/notification",
        router: NotificationRoute,
    },
    {
        path: "/product",
        router: ProductRoute,
    },
    {
        path: "/order",
        router: OrderRoute,
    },
];

appRoutes.forEach((route) => {
    AppRouter.use(route.path, route.router);
});

export default AppRouter;
