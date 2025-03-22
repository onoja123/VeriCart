import express from 'express';
import {
    ForgotPassword,
    Login,
    LogOut,
    ResendVerification,
    ResetPassword,
    Signup,
    UpdatePassword,
    Verify,
} from '../controllers/auth.controller';

import AuthMiddlewareService from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup-individual', Signup)

router.post('/verify', Verify)

router.post('/login', Login)

router.post('/resendverification', ResendVerification)

router.post('/forgotpassword', ForgotPassword)

router.post('/resetpassword', ResetPassword)

router.post('/logout', LogOut)


router.use(AuthMiddlewareService.Protect)

router.post('/updatepassword', UpdatePassword)


export default router;