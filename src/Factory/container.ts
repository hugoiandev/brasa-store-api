import UserService from "../Services/UserService";
import { PrismaClient } from "@prisma/client";
import UserController from "../Controllers/UserController";
import AuthService from "../Services/AuthService";
import AuthController from "../Controllers/AuthController";

const prisma = new PrismaClient();

const createUserController = () => {
  const userService = new UserService(prisma);
  return new UserController(userService);
};

const createAuthController = () => {
  const authService = new AuthService(prisma);
  return new AuthController(authService);
};

export { createUserController, createAuthController };
