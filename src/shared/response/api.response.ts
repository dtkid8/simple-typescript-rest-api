import { Response } from "express";

export type ExtraResponse = {
    key: string;
    value: any;
}

export class ApiResponse {
    static JSON(status?: string, statusCode?: number, message?: string, data?: any, extra?: ExtraResponse, path?: String) {
        let json: any = {};
        if (typeof status !== "undefined") {
            json.status = status;
        }
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



