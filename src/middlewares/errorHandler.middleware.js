import { logger } from "./logger.middleware.js";

export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  let code = 500;
  let errMsg = 'Internal server Error. Oops! Something went wrong... Please try again later!';
  let logData = "Timestamp: " + new Date().toString() + "Req URL :" + req.url +" Error message: " ;

  code = (err instanceof customErrorHandler) ?  err.statusCode : code;
  errMsg = (err instanceof customErrorHandler) ? JSON.parse(err.message) : errMsg;
  logData = logData + ((err instanceof customErrorHandler) ? (err.message).replaceAll("\""," ") : errMsg);
  
  logger.error(logData);
  res.status(code).send(errMsg);
};
