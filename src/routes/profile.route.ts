import express from "express";
import {
    DeleteProfile,
    GetProfile,
    UpdateProfile,
    UploadImage,
} from "../controllers/profile.controller";

import AuthMiddlewareService from "../middlewares/auth.middleware";



const ProfileRouter = express.Router()

ProfileRouter.use(AuthMiddlewareService.Protect)

ProfileRouter.get('/get-profile', GetProfile)

ProfileRouter.patch('/update-profile', UpdateProfile);

ProfileRouter.put('/upload-image', UploadImage);

ProfileRouter.delete('/delete-profile', DeleteProfile)

export default ProfileRouter;