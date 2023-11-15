import { ExtraResponse } from "../response/api.response";

export abstract class BaseError extends Error {
    message: string;
    constructor(public status: string, message?: string, public statusCode: number = 500, public path: string = "/", public data?: any, public extra?: ExtraResponse) {
        super(message ?? "");
        this.message = message ?? "";
    }
}

export class BadRequestError extends BaseError {
    constructor(message?: string, public path: string = "/", public data?: any, public extra?: ExtraResponse) {
        super("Bad Request", message ?? "Bad Request", 400, path, data, extra);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message?: string, public path: string = "/", public data?: any, public extra?: ExtraResponse) {
        super("Unauthorized Error", message ?? "Bad Unauthorized Error", 401, path, data, extra);
    }
}

export class ForbiddenError extends BaseError {
    constructor(message?: string, public path: string = "/", public data?: any, public extra?: ExtraResponse) {
        super("Forbidden Error", message ?? "Forbidden Error", 403, path, data, extra);
    }
}

export class NotFoundError extends BaseError {
    constructor(message?: string, public path: string = "/", public data?: any, public extra?: ExtraResponse) {
        super("Not Found Error", message ?? "Not Found Error", 404, path, data, extra);
    }
}

export class InternalServerError extends BaseError {
    constructor(message?: string, public path: string = "/", public data?: any, public extra?: ExtraResponse) {
        super("Internal Server Error", message ?? "Internal Server Error", 500, path, data, extra);
    }
}

export class ServiceUnavailableError extends BaseError {
    constructor(message?: string, public statusCode: number = 500, public path: string = "/", public data?: any, public extra?: ExtraResponse) {
        super("Service Unavailable", message ?? "Service Unavailable", 503, path, data, extra);
    }
}