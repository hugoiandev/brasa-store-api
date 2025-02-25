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
      orderstatus_id: Yup.number().required(),
      address_id: Yup.number().required(),
    });

    const token = req.headers.authorization as string;
    const user = decodeToken(token);

    const order = req.body;

    try {
      await orderSchema.validate(order);

      await this._orderService.createOrder({ ...order, user_id: user.id });

      res
        .status(200)
        .json(new ResponseModel({ message: "Pedido criado com sucesso." }));
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
