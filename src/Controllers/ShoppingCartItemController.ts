import { json, Request, Response } from "express";
import CreateShoppingCartItemDto from "../Dtos/CreateShoppingCartItemDto";
import IShoppingCartItem from "../Interfaces/IShoppingCartItemService";
import * as Yup from "yup";
import ResponseModel from "../Models/ResponseModel";

class ShoppingCartItemController {
  private readonly _shoppingCartItemService: IShoppingCartItem;

  constructor(shoppingCartItemService: IShoppingCartItem) {
    this._shoppingCartItemService = shoppingCartItemService;
  }

  public async create(
    req: Request<{}, {}, CreateShoppingCartItemDto>,
    res: Response
  ) {
    const shoppingCartItemSchema = Yup.object().shape({
      quantity: Yup.number().required("Quantidade 'e obrigatório."),
      shoppingcart_id: Yup.number().required("Id do carrinho é obrigatório"),
      product_id: Yup.number().required("Id do produto é obrigatório."),
    });

    const shoppingCartItem = req.body;

    try {
      await shoppingCartItemSchema.validate(shoppingCartItem);

      await this._shoppingCartItemService.createCartItem(shoppingCartItem);

      res
        .status(201)
        .json(
          new ResponseModel({ message: "Item do carrinho criado com sucesso." })
        );
      return;
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        res.status(400).json(
          new ResponseModel({
            message: "Dados inválidos.",
            success: false,
            errors: error.errors,
          })
        );
        return;
      }

      res.status(500).json(
        new ResponseModel({
          message: "Ocorreu um erro interno.",
          success: false,
          errors: error.message,
        })
      );
      return;
    }
  }
}

export default ShoppingCartItemController;
