import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import ResponseHelper from '../utils/response';
import { UserType } from '../types/enums/user';
import { Feature } from '../types/enums/admin';

export default class MiddlewareService {
  static restrictByAccessType(userType: UserType) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;

      // Check if user exists and is authenticated
      if (!user) {
        return next(new AppError("User not authenticated", ResponseHelper.UNAUTHORIZED));
      }

      // If the user is an Admin, allow access to all routes
      if (user.userType === UserType.ADMIN) {
        return next();
      }

      // For SubAdmins, ensure they have the required access
      if (user.userType === UserType.SUBADMIN) {
        return next();
      }

      // If the user is neither Admin nor SubAdmin
      return next(new AppError("You do not have permission to perform this action", ResponseHelper.FORBIDDEN));
    };
  }

  static restrictTo(...allowedFeatures: Feature[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;

      if (!user) {
        return next(new AppError("User not authenticated", ResponseHelper.UNAUTHORIZED));
      }

      // Admins have access to everything, so no need to check features
      if (user.userType === UserType.ADMIN) {
        return next();
      }

      // For SubAdmins, check if they have the required features
      const hasAccess = allowedFeatures.every(feature => user.features.includes(feature));

      if (!hasAccess) {
        return next(new AppError("You do not have permission to perform this action", ResponseHelper.FORBIDDEN));
      }

      next();
    };
  }
}
