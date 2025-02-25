import { Request, Response } from "express";
import * as Yup from "yup";
import IOrderStatusService from "../Interfaces/IOrderStatusService";
import CreateOrderStatusDto from "../Dtos/CreateOrderStatusDto";
import ResponseModel from "../Models/ResponseModel";

class OrderStatusController {
  private readonly _orderStatusService: IOrderStatusService;

  constructor(orderStatusService: IOrderStatusService) {
    this._orderStatusService = orderStatusService;
  }

  async create(req: Request<{}, {}, CreateOrderStatusDto>, res: Response) {
    const orderStatusSchema = Yup.object().shape({
      name: Yup.string().required("O nome do status do pedido é obrigatório."),
    });

    const orderStatus = req.body;

    try {
      await orderStatusSchema.validate(orderStatus);

      await this._orderStatusService.createOrderStatus(orderStatus);

      res.status(201).json(
        new ResponseModel({
          message: "Status do pedido foi criado com sucesso.",
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

export default OrderStatusController;
