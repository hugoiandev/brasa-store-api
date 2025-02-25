import * as Yup from "yup";
import CreateWishListItemDto from "../Dtos/CreateWishListItemDto";
import IWishListItemService from "../Interfaces/IWishListItem";
import { Request, Response } from "express";
import ResponseModel from "../Models/ResponseModel";

class WishListItemController {
  private readonly _wishListItemService: IWishListItemService;

  constructor(wishListItemService: IWishListItemService) {
    this._wishListItemService = wishListItemService;
  }

  async create(req: Request<{}, {}, CreateWishListItemDto>, res: Response) {
    const wishListItemSchema = Yup.object().shape({
      wishlist_id: Yup.number().required(
        "Id da lista de desejos é obrigratório."
      ),
      product_id: Yup.number().required("Id do produto é obrigratório."),
    });

    const wishListItem = req.body;

    try {
      await wishListItemSchema.validate(wishListItem);

      await this._wishListItemService.createWishListItem(wishListItem);

      res.status(201).json(
        new ResponseModel({
          message: "item da lista de desejos criado com sucesso.",
        })
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

export default WishListItemController;
