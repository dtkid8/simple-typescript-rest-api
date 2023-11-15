"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../shared/config/config"));
const response_factory_1 = __importDefault(require("../../shared/response/response.factory"));
const error_1 = require("../../shared/error/error");
const verifyToken = (req, res, next) => {
    const secret = config_1.default.JWT_SECRET;
    try {
        const token = req.headers.authorization?.split(" ")[1] ?? "";
        const verify = jsonwebtoken_1.default.verify(token, secret);
        if (!verify) {
            throw new error_1.UnauthorizedError(req.path, verify);
        }
        next();
    }
    catch (error) {
        response_factory_1.default.error(res, error);
    }
};
exports.verifyToken = verifyToken;
