import { Router } from "express";
import {
  createUserController,
  createAuthController,
  createCategoryController,
  createProductController,
} from "./Factory/container";
import authenticateToken from "./Middlewares/auth";
import isAdmin from "./Middlewares/admin";
import upload from "./Middlewares/multer";

const routes = Router();

const userController = createUserController();
const authController = createAuthController();
const categoryController = createCategoryController();
const productController = createProductController();

routes.post("/api/users", (req, res) => userController.create(req, res));
routes.post("/api/auth/login", (req, res) => authController.login(req, res));
routes.post("/api/admin/categories", authenticateToken, isAdmin, (req, res) =>
  categoryController.create(req, res)
);

routes.post(
  "/api/admin/products",
  authenticateToken,
  isAdmin,
  upload.single("photo"),
  (req, res) => productController.create(req, res)
);

export default routes;
