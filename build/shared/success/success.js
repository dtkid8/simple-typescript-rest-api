"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Success = exports.BaseSuccess = void 0;
class BaseSuccess {
    message;
    statusCode;
    path;
    data;
    extra;
    constructor(message, statusCode = 200, path = "/", data, extra) {
        this.message = message;
        this.statusCode = statusCode;
        this.path = path;
        this.data = data;
        this.extra = extra;
    }
}
exports.BaseSuccess = BaseSuccess;
class Success extends BaseSuccess {
    path;
    data;
    extra;
    constructor(path = "/", data, extra) {
        super("success", 200, path, data, extra);
        this.path = path;
        this.data = data;
        this.extra = extra;
    }
}
exports.Success = Success;
