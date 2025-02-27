import { PrismaClient } from "@prisma/client";
import CreateOrderDto from "../Dtos/CreateOrderDto";
import IOrderService from "../Interfaces/IOrderService";

class OrderService implements IOrderService {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    let totalOrder: number | undefined = 0;

    for (let i = 0; i < createOrderDto.itens.length; i++) {
      const product = await this._prisma.product.findUnique({
        where: {
          id: createOrderDto.itens[i].product_id,
        },
      });

      totalOrder += Number(product?.price);
    }

    const order = await this._prisma.order.create({
      data: {
        address_id: createOrderDto.address_id,
        user_id: createOrderDto.user_id,
        total_price: totalOrder,
      },
    });

    for (let i = 0; i < createOrderDto.itens.length; i++) {
      const product = await this._prisma.product.findUnique({
        where: {
          id: createOrderDto.itens[i].product_id,
        },
      });

      if (!product) {
        throw new Error("Ocorreu um erro interno.");
      }

      await this._prisma.orderItem.create({
        data: {
          product_id: createOrderDto.itens[i].product_id,
          order_id: order.id,
          quantity: createOrderDto.itens[i].quantity,
          unit_price: product?.price,
        },
      });
    }
  }
}

export default OrderService;
