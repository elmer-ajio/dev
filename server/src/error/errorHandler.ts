import { Request, Response, NextFunction } from 'express';
import CustomError from './CustomError';




const errorHandler = (error: CustomError | Error, req: Request, res: Response, next: NextFunction): void => {
    let errorCode: number = 500;
    let message: string = "Internal Server Error";

    if (error instanceof CustomError) {
        errorCode = error.errorCode;
        message = error.message;
      }else if (error instanceof TypeError) {
        errorCode = 400;
        message = "Bad Request: Type error occurred";
       
      } else if (error instanceof SyntaxError) {
        errorCode = 400;
        message = "Bad Request: Syntax error in the request payload";
      }

    res.status(errorCode).json({
        message,
        errorCode: errorCode,
      });
}

export default errorHandler;