import { Router } from "express";
import UserService from "./Services/UserService";
import { PrismaClient } from "@prisma/client";
import UserController from "./Controllers/UserController";

const routes = Router();

const prisma = new PrismaClient();
const userService = new UserService(prisma);
const userController = new UserController(userService);

routes.post("/api/user", (req, res) => userController.create(req, res));

export default routes;
