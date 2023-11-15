import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Config from "../../shared/config/config";
import ResponseFactory from "../../shared/response/response.factory";
import { UnauthorizedError } from "../../shared/error/error";


export const verifyJWTToken = (req: Request, res: Response, next: NextFunction) => {

    try {
        const secret = Config.JWT_SECRET;
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const verify = jwt.verify(token, secret, function (error, decoded) {
                if (error) {
                    throw new UnauthorizedError(
                        error?.message,
                        req.path
                    );
                }
            });
        }
        else {
            throw new UnauthorizedError(
                "JWT Token is empty",
                req.path
            );
        }
        next();
    } catch (error) {
        console.log(`masuk ${error}`);
        ResponseFactory.error(res, error);
    }
}