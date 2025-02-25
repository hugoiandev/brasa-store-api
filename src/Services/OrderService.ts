import { PrismaClient } from "@prisma/client";
import CreateOrderDto from "../Dtos/CreateOrderDto";
import IOrderService from "../Interfaces/IOrderService";

class OrderService implements IOrderService {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    await this._prisma.order.create({
      data: createOrderDto,
    });
    return;
  }
}

export default OrderService;
