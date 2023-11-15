import { Router } from "express";
import * as userController from "./user.controller";
import * as authMiddleware from "../auth/auth.middleware";

export class UserRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.use(authMiddleware.verifyJWTToken);
        this.router.get("/users", userController.allUsers);
        this.router.get("/users/:id", userController.getUserById);
        this.router.put("/users/:id", userController.updateUser);
        this.router.delete("/users/:id", userController.deleteUser);
    }
}
export default new UserRouter().router;
