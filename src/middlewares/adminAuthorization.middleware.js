import { customErrorHandler } from "./errorHandler.middleware.js";

export const authByUserRole = (...roles) => {
    return async (req, res, next) => {
      if (!(roles.includes("user"))&& req.user.role !== "admin") {
        return next(
          new customErrorHandler(
            403,
            JSON.stringify({ success: false, message: `Role: ${req.user.role} is not allowed to access this resource`})
          )
        );
      }
      next();
    };
};