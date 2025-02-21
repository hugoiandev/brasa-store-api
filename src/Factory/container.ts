import UserService from "../Services/UserService";
import { PrismaClient } from "@prisma/client";
import s3 from "../config/s3Client";
import S3Service from "../Services/S3Service";
import UserController from "../Controllers/UserController";
import AuthService from "../Services/AuthService";
import AuthController from "../Controllers/AuthController";
import CategoryService from "../Services/CategoryService";
import CategoryController from "../Controllers/CategoryController";
import ProductService from "../Services/ProductService";
import ProductController from "../Controllers/ProductController";

const prisma = new PrismaClient();

const createUserController = () => {
  const userService = new UserService(prisma);
  return new UserController(userService);
};

const createAuthController = () => {
  const authService = new AuthService(prisma);
  return new AuthController(authService);
};

const createCategoryController = () => {
  const categoryService = new CategoryService(prisma);
  return new CategoryController(categoryService);
};

const createProductController = () => {
  const s3Service = new S3Service(s3, "brasa-store");
  const productService = new ProductService(prisma, s3Service);

  return new ProductController(productService);
};

export {
  createUserController,
  createAuthController,
  createCategoryController,
  createProductController,
};
