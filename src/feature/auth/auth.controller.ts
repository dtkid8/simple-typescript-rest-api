import { Request, Response, } from "express";
import User from "../user/user.model";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Config from "../../shared/config/config";
import { ExtraResponse, } from "../../shared/response/api.response";
import { authValidatorLoginSchema, authValidatorRegisterSchema } from "./auth.validator";
import { BadRequestError, InternalServerError } from "../../shared/error/error";
import ResponseFactory from "../../shared/response/response.factory";
import { Success } from "../../shared/success/success";


export const register = async (req: Request, res: Response) => {
    try {
        const { error } = authValidatorRegisterSchema.validate(req.body);
        if (error) {
            let errorData = error.details.map(
                (e) => {
                    return {
                        "message": e.message,
                        "field": e.path[0]
                    }
                }
            );
            throw new BadRequestError("Validation Error", req.path, errorData);
        }

        let user = new User(req.body);
        try {
            await user.save();
        } catch (error) {
            throw new InternalServerError("Database Error", req.path, error);
        }

        try {
            const resultUser = await User.findById(user.id);
            ResponseFactory.success(res, new Success(req.path, resultUser));
        } catch (error) {
            throw new InternalServerError("Database Error", req.path, error);
        }

    } catch (error) {
        ResponseFactory.error(res, error);
    }
}

export const login = async (req: Request, res: Response) => {

    try {
        const { error } = authValidatorLoginSchema.validate(req.body);
        if (error) {
            let errorData = error.details.map(
                (e) => {
                    return {
                        "message": e.message,
                        "field": e.path[0]
                    }
                }
            );
            throw new BadRequestError("Validation Error", req.path, errorData);
        }

        let user = new User(req.body);
        const secret = Config.JWT_SECRET;
        const resultUser = await User.findOne({ username: user.username, }).select('-_id -__v');
        if (resultUser) {
            const checkPassword = bcrypt.compareSync(user.password, resultUser.password);
            if (checkPassword) {
                const token = jwt.sign(
                    {
                        _id: resultUser?._id,
                    }, secret, { expiresIn: "1d", });

                const extra: ExtraResponse = {
                    key: "token",
                    value: token,
                };
                ResponseFactory.success(res, new Success(req.path, undefined, extra))
            }
            else {
                throw new BadRequestError("Password Not Match", req.path,);
            }
        }
        else {
            throw new BadRequestError("Username not found", req.path,);
        }
    } catch (error) {
        ResponseFactory.error(res, error);
    }
}