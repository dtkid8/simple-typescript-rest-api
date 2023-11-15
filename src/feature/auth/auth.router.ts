import { Router } from "express";
import * as authController from "./auth.controller";

export class AuthRouter{
    router: Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/auth/register", authController.register);
        this.router.post("/auth/login", authController.login);
    }
}
 export default new AuthRouter().router;