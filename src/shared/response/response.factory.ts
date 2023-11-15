import { Response } from "express";
import { ApiResponse } from "./api.response";
import { BadRequestError, BaseError } from "../error/error";
import { Success } from "../success/success";

export class ResponseFactory {
    static error(response: Response, error: any) {
        response.setHeader('Content-Type', 'application/json');
        if (error instanceof BaseError) {
            response.status(error.statusCode).send(ApiResponse.JSON(
                error.status,
                error.statusCode,
                error.message,
                error.data,
                error.extra,
                error.path,
            ));
        }
        else {
            response.status(503).send(ApiResponse.JSON(
                "Internal Server Error",
                503,
                error.message,
                error
            ));
        }
    }
    static success(response: Response, success: Success) {
        response.setHeader('Content-Type', 'application/json');
        response.status(success.statusCode).send(ApiResponse.JSON(
            success.status,
            success.statusCode,
            success.message,
            success.data,
            success.extra,
            success.path,
        ));
    }
}

export default ResponseFactory;