import  {   StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/customError.js";


export const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
    });
}