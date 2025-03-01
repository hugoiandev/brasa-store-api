import { Request, Response } from "express";
import * as Yup from "yup";
import decodeToken from "../utils/decodeToken";
import CreateOrderDto from "../Dtos/CreateOrderDto";
import ResponseModel from "../Models/ResponseModel";
import IOrderService from "../Interfaces/IOrderService";

class OrderController {
  private readonly _orderService: IOrderService;

  constructor(orderService: IOrderService) {
    this._orderService = orderService;
  }

  async create(req: Request<{}, {}, CreateOrderDto>, res: Response) {
    const orderSchema = Yup.object().shape({
      address_id: Yup.number().required(),
      itens: Yup.array().of(Yup.object()),
    });

    const token = req.headers.authorization as string;
    const user = decodeToken(token);

    const order = req.body;

    try {
      await orderSchema.validate(order);

      const response = await this._orderService.createOrder({
        ...order,
        user_id: user.id,
      });

      console.log(response.url);

      res.redirect(303, response.url as string);
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

export default OrderController;
