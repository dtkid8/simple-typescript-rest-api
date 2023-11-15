import dotenv from "dotenv";

export class Config {
    PORT:number;
    MONGO_DB_URL: string;
    MONGO_DB_USERNAME: string;
    MONGO_DB_PASSWORD: string;
    MONGO_DB_DATABASE: string;
    JWT_SECRET: string;
    JWT_SALT: number;
    constructor() {
        dotenv.config();
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

export default new Config();

