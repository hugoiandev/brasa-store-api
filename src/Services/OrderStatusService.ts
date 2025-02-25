import { PrismaClient } from "@prisma/client";
import CreateOrderStatusDto from "../Dtos/CreateOrderStatusDto";
import IOrderStatusService from "../Interfaces/IOrderStatusService";

class OrderStatusService implements IOrderStatusService {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async createOrderStatus(
    createOrderStatusDto: CreateOrderStatusDto
  ): Promise<void> {
    await this._prisma.orderStatus.create({
      data: createOrderStatusDto,
    });
  }
}

export default OrderStatusService;
