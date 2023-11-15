"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../shared/config/config"));
const auth_validator_1 = __importDefault(require("./auth.validator"));
const error_1 = require("../../shared/error/error");
const response_factory_1 = __importDefault(require("../../shared/response/response.factory"));
const success_1 = require("../../shared/success/success");
const register = async (req, res) => {
    try {
        const { error } = auth_validator_1.default.validate(req.body);
        let user = new user_model_1.default(req.body);
        if (error) {
            let message = error.details.map((e) => {
                return {
                    "message": e.message,
                    "field": e.path[0]
                };
            });
            throw new error_1.BadRequestError(req.path, message);
        }
        await user.save();
        const resultUser = await user_model_1.default.findById(user.id);
        response_factory_1.default.success(res, new success_1.Success(req.path, resultUser));
    }
    catch (error) {
        response_factory_1.default.error(res, error);
    }
};
exports.register = register;
const login = async (req, res) => {
    let user = new user_model_1.default(req.body);
    const secret = config_1.default.JWT_SECRET;
    try {
        let resultUser = await user_model_1.default.findOne({ username: user.username, }).select('-_id -__v');
        const checkUserAndComparePassword = resultUser && bcrypt_1.default.compareSync(user.password, resultUser.password);
        const token = jsonwebtoken_1.default.sign({
            _id: resultUser?._id,
        }, secret, { expiresIn: "1h", });
        const extra = {
            key: "token",
            value: token,
        };
        if (checkUserAndComparePassword) {
            response_factory_1.default.success(res, new success_1.Success(req.path, resultUser, extra));
        }
        else {
            throw new error_1.BadRequestError(req.path, "User Not Found");
        }
    }
    catch (error) {
        response_factory_1.default.error(res, error);
    }
};
exports.login = login;
