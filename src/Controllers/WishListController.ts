import { Request, Response } from "express";
import * as Yup from "yup";
import IWishListService from "../Interfaces/IWishListService";
import CreateWishListDto from "../Dtos/CreateWishListDto";
import ResponseModel from "../Models/ResponseModel";

class WishListController {
  private readonly _wishListService: IWishListService;

  constructor(wishListService: IWishListService) {
    this._wishListService = wishListService;
  }

  public async create(req: Request<{}, {}, CreateWishListDto>, res: Response) {
    const wishListSchema = Yup.object().shape({
      name: Yup.string().required(),
      user_id: Yup.number().required(),
    });

    const wishList = req.body;

    try {
      await wishListSchema.validate(wishList);

      await this._wishListService.createWishList(wishList);

      res
        .status(201)
        .json(
          new ResponseModel({ message: "Lista de desejo criada com sucesso." })
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
    }
  }
}

export default WishListController;
