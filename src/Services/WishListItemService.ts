import { PrismaClient } from "@prisma/client";
import CreateWishListItemDto from "../Dtos/CreateWishListItemDto";
import IWishListItemService from "../Interfaces/IWishListItem";

class WishListItemService implements IWishListItemService {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async createWishListItem(
    createWishListItemDto: CreateWishListItemDto
  ): Promise<void> {
    await this._prisma.wishListItem.create({
      data: createWishListItemDto,
    });

    return;
  }
}

export default WishListItemService;
