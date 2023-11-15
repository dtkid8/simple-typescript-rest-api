"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
class Config {
    PORT;
    MONGO_DB_URL;
    MONGO_DB_USERNAME;
    MONGO_DB_PASSWORD;
    MONGO_DB_DATABASE;
    JWT_SECRET;
    JWT_SALT;
    constructor() {
        dotenv_1.default.config();
        const env = process.env;
        this.MONGO_DB_URL = env.MONGO_DB_URL ?? "";
        this.MONGO_DB_USERNAME = env.MONGO_DB_USERNAME ?? "";
        this.MONGO_DB_PASSWORD = env.MONGO_DB_PASSWORD ?? "";
        this.MONGO_DB_DATABASE = env.MONGO_DB_DATABASE ?? "";
        this.PORT = +(env.PORT ?? 0);
        this.JWT_SECRET = env.JWT_SECRET ?? "";
        this.JWT_SALT = +(env.JWT_SALT ?? 0);
    }
}
exports.Config = Config;
exports.default = new Config();
