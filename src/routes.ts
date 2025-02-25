import { Router } from "express";
import {
  createUserController,
  createAuthController,
  createCategoryController,
  createProductController,
  createAddressController,
  createShoppingCartController,
  createShoppingCartItemController,
  createWishListController,
  createWishListItemController,
} from "./Factory/container";
import authenticateToken from "./Middlewares/auth";
import isAdmin from "./Middlewares/admin";
import upload from "./Middlewares/multer";

const routes = Router();

const userController = createUserController();
const authController = createAuthController();
const categoryController = createCategoryController();
const productController = createProductController();
const addressController = createAddressController();
const shoppingCartController = createShoppingCartController();
const shoppingCartItemController = createShoppingCartItemController();
const wishListController = createWishListController();
const wishListItemController = createWishListItemController();

routes.post("/api/users", (req, res) => userController.create(req, res));
routes.post("/api/auth/login", (req, res) => authController.login(req, res));

routes.post("/api/users/address", authenticateToken, (req, res) =>
  addressController.create(req, res)
);

routes.post("/api/users/shoppingcarts", authenticateToken, (req, res) =>
  shoppingCartController.create(req, res)
);

routes.post("/api/users/shoppingcartitens", authenticateToken, (req, res) =>
  shoppingCartItemController.create(req, res)
);

routes.post("/api/users/wishlists", authenticateToken, (req, res) =>
  wishListController.create(req, res)
);

routes.post("/api/users/wishlistitens", authenticateToken, (req, res) =>
  wishListItemController.create(req, res)
);

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
