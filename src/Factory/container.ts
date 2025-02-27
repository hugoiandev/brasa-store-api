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
import AddressService from "../Services/AddressService";
import AddressController from "../Controllers/AddressController";
import WishListService from "../Services/WishListService";
import WishListController from "../Controllers/WishListController";
import WishListItemService from "../Services/WishListItemService";
import WishListItemController from "../Controllers/WishListItemController";
import OrderStatusService from "../Services/OrderStatusService";
import OrderStatusController from "../Controllers/OrderStatusController";
import OrderService from "../Services/OrderService";
import OrderController from "../Controllers/OrderController";

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

const createAddressController = () => {
  const addressService = new AddressService(prisma);
  return new AddressController(addressService);
};

const createWishListController = () => {
  const wishListService = new WishListService(prisma);
  return new WishListController(wishListService);
};

const createWishListItemController = () => {
  const wishListItemService = new WishListItemService(prisma);
  return new WishListItemController(wishListItemService);
};

const createOrderStatusController = () => {
  const orderStatusService = new OrderStatusService(prisma);
  return new OrderStatusController(orderStatusService);
};

const createOrderController = () => {
  const orderService = new OrderService(prisma);
  return new OrderController(orderService);
};

export {
  createUserController,
  createAuthController,
  createCategoryController,
  createProductController,
  createAddressController,
  createWishListController,
  createWishListItemController,
  createOrderStatusController,
  createOrderController,
};
