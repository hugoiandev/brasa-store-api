import { PrismaClient } from "@prisma/client";
import CreateShoppingCartDto from "../Dtos/CreateShoppingCartDto";
import IShoppingCartService from "../Interfaces/IShoppingCartService";

class ShoppingCartService implements IShoppingCartService {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async createCart(user: CreateShoppingCartDto): Promise<void> {
    await this._prisma.shoppingCart.create({
      data: user,
    });

    return;
  }
}

export default ShoppingCartService;
