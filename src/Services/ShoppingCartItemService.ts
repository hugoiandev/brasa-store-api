import { PrismaClient } from "@prisma/client";
import CreateShoppingCartItem from "../Dtos/CreateShoppingCartItemDto";
import IShoppingCartItem from "../Interfaces/IShoppingCartItemService";

class ShoppingCartItemService implements IShoppingCartItem {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  public async createCartItem(cartItem: CreateShoppingCartItem) {
    await this._prisma.shoppingCartItem.create({
      data: cartItem,
    });

    return;
  }
}

export default ShoppingCartItemService;
