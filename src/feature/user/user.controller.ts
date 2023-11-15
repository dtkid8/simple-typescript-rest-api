import { Request, Response } from "express";
import User from "./user.model";
import ResponseFactory from "../../shared/response/response.factory";
import { Success } from "../../shared/success/success";
import { BadRequestError, InternalServerError } from "../../shared/error/error";
import { userValidatorUpdateSchema } from "./user.validator";

export const allUsers = async (req: Request, res: Response) => {
    try {
        let users = await User.find().select('-_id -__v -password');
        if (users) {
            ResponseFactory.success(res, new Success(req.path, users));
        }
        else {
            throw new InternalServerError("Server Error", req.path);
        }
    } catch (error) {
        ResponseFactory.error(res, error);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let findUser = await User.findById(id);
        if (findUser) {
            ResponseFactory.success(res, new Success(req.path, findUser));
        }
        else {
            throw new BadRequestError("User Not Found", req.path);
        }
    } catch (error) {
        ResponseFactory.error(res, error);;
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, email } = req.body;
    try {
        const { error } = userValidatorUpdateSchema.validate(req.body);
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
        
        let findUser = await User.findById(id);
        if (findUser) {
            const userUpdate = await User.findByIdAndUpdate(id, {
                username, password, email
            }, { new: true, }).select("-_id -__v -password");
            ResponseFactory.success(res, new Success(req.path, userUpdate));
        }
        else {
            throw new BadRequestError("User Not Found", req.path);
        }
    } catch (error) {
        ResponseFactory.error(res, error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleteUser = await User.findByIdAndDelete(id, { new: true, });
        ResponseFactory.success(res, new Success(req.path, deleteUser));
    } catch (error) {
        ResponseFactory.error(res, error);
    }

}
