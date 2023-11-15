"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFactory = void 0;
const api_response_1 = require("./api.response");
const error_1 = require("../error/error");
class ResponseFactory {
    static error(response, error) {
        response.setHeader('Content-Type', 'application/json');
        if (error instanceof error_1.BaseError) {
            response.status(error.statusCode).send(api_response_1.ApiResponse.JSON(error.statusCode, error.message, error.data, error.extra, error.path));
        }
        else {
            response.status(503).send(api_response_1.ApiResponse.JSON(503, error.message));
        }
    }
    static success(response, success) {
        response.setHeader('Content-Type', 'application/json');
        response.status(success.statusCode).send(api_response_1.ApiResponse.JSON(success.statusCode, success.message, success.data, success.extra, success.path));
    }
}
exports.ResponseFactory = ResponseFactory;
exports.default = ResponseFactory;
