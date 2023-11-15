"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = exports.InternalServerError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.BaseError = void 0;
class BaseError extends Error {
    message;
    statusCode;
    path;
    data;
    extra;
    constructor(message, statusCode = 500, path = "/", data, extra) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.path = path;
        this.data = data;
        this.extra = extra;
    }
}
exports.BaseError = BaseError;
class BadRequestError extends BaseError {
    path;
    data;
    extra;
    constructor(path = "/", data, extra) {
        super("Bad Request", 400, path, data, extra);
        this.path = path;
        this.data = data;
        this.extra = extra;
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends BaseError {
    path;
    data;
    extra;
    constructor(path = "/", data, extra) {
        super("Unauthorized Error", 401, path, data, extra);
        this.path = path;
        this.data = data;
        this.extra = extra;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends BaseError {
    path;
    data;
    extra;
    constructor(path = "/", data, extra) {
        super("Forbidden Error", 403, path, data, extra);
        this.path = path;
        this.data = data;
        this.extra = extra;
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends BaseError {
    path;
    data;
    extra;
    constructor(path = "/", data, extra) {
        super("Not Found Error", 404, path, data, extra);
        this.path = path;
        this.data = data;
        this.extra = extra;
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends BaseError {
    path;
    data;
    extra;
    constructor(path = "/", data, extra) {
        super("Internal Server Error", 500, path, data, extra);
        this.path = path;
        this.data = data;
        this.extra = extra;
    }
}
exports.InternalServerError = InternalServerError;
class ServiceUnavailableError extends BaseError {
    statusCode;
    path;
    data;
    extra;
    constructor(statusCode = 500, path = "/", data, extra) {
        super("Service Unavailable", 503, path, data, extra);
        this.statusCode = statusCode;
        this.path = path;
        this.data = data;
        this.extra = extra;
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
