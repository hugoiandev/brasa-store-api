import { Router } from "express";
import {
  createUserController,
  createAuthController,
} from "./Factory/container";

const routes = Router();

const userController = createUserController();
routes.post("/api/users", (req, res) => userController.create(req, res));

const authController = createAuthController();
routes.post("/api/auth/login", (req, res) => authController.login(req, res));

export default routes;
