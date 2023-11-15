"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.allUsers = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const response_factory_1 = __importDefault(require("../../shared/response/response.factory"));
const success_1 = require("../../shared/success/success");
const error_1 = require("../../shared/error/error");
const allUsers = async (req, res) => {
    try {
        let users = await user_model_1.default.find().select('-_id -__v -password');
        if (!users) {
            throw new error_1.InternalServerError(req.path);
        }
        response_factory_1.default.success(res, new success_1.Success(req.path, users));
    }
    catch (error) {
        response_factory_1.default.error(res, error);
    }
};
exports.allUsers = allUsers;
// export const addUser = async (req: Request, res: Response) => {
//     const responseService = new ResponseService(res);
//     let user = new User(req.body);
//     try {
//         await user.save();
//         let resultUsers = await User.find({ _id: user.id, }).select('-_id -__v -password');
//         responseService.result(200, "Success", resultUsers);
//     } catch (error) {
//         responseService.result(400, "Error", error);
//     }
// }
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        let findUser = await user_model_1.default.findById(id);
        if (findUser) {
            response_factory_1.default.success(res, new success_1.Success(req.path, findUser));
        }
        else {
            throw new error_1.BadRequestError();
        }
    }
    catch (error) {
        response_factory_1.default.error(res, error);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, email } = req.body;
    try {
        let findUser = await user_model_1.default.findById(id);
        if (findUser) {
            const userUpdate = await user_model_1.default.findOneAndUpdate({ _id: id }, { username, password, email }, { new: true, }).select("-_id -__v");
            response_factory_1.default.success(res, new success_1.Success(req.path, userUpdate));
        }
        else {
            throw new error_1.BadRequestError();
        }
    }
    catch (error) {
        response_factory_1.default.error(res, error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await user_model_1.default.findByIdAndDelete(id, { new: true, });
        response_factory_1.default.success(res, new success_1.Success(req.path, deleteUser));
    }
    catch (error) {
        response_factory_1.default.error(res, error);
    }
};
exports.deleteUser = deleteUser;
