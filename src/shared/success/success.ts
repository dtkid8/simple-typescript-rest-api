import { ExtraResponse } from "../response/api.response";

export class BaseSuccess {
    constructor(public status: string, public message: string, public statusCode: number = 200, public path: string = "/", public data?: any, public extra?: ExtraResponse) {
    }
}

export class Success extends BaseSuccess {
    constructor(public path: string = "/", public data?: any, public extra?: ExtraResponse) {
        super("Success","Success Request", 200, path, data, extra,);
    }
}