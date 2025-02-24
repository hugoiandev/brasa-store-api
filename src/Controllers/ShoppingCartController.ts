import { Request, Response } from "express";
import CreateShoppingCartDto from "../Dtos/CreateShoppingCartDto";
import IShoppingCartService from "../Interfaces/IShoppingCartService";
import decodeToken from "../utils/decodeToken";
import ResponseModel from "../Models/ResponseModel";

class ShoppingCartController {
  private readonly _shoppingCartService: IShoppingCartService;

  constructor(shoppingCartService: IShoppingCartService) {
    this._shoppingCartService = shoppingCartService;
  }

  public async create(
    req: Request<{}, {}, CreateShoppingCartDto>,
    res: Response
  ) {
    const userPayload = decodeToken(req.headers.authorization as string);

    try {
      await this._shoppingCartService.createCart({ user_id: userPayload.id });

      res.status(201).json(new ResponseModel({ message: "Carrinho criado." }));
      return;
    } catch (error: any) {
      res.status(500).json(
        new ResponseModel({
          message: "Erro ao criar carrinho de compras.",
          success: false,
          errors: error.message,
        })
      );
      return;
    }
  }
}

export default ShoppingCartController;
