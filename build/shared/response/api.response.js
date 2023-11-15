"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static JSON(statusCode, message, data, extra, path) {
        let json = {};
        if (typeof statusCode !== "undefined") {
            json.statusCode = statusCode;
        }
        if (typeof message !== "undefined") {
            json.message = message;
        }
        if (typeof path !== "undefined") {
            json.path = path;
        }
        if (typeof extra !== "undefined") {
            json[extra.key] = extra.value;
        }
        if (typeof data !== "undefined") {
            json.data = data;
        }
        return json;
    }
}
exports.ApiResponse = ApiResponse;
