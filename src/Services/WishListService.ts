import { PrismaClient } from "@prisma/client";
import CreateWishListDto from "../Dtos/CreateWishListDto";
import IWishListService from "../Interfaces/IWishListService";

class WishListService implements IWishListService {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  public async createWishList(
    createWishListDto: CreateWishListDto
  ): Promise<void> {
    await this._prisma.wishList.create({
      data: createWishListDto,
    });
    return;
  }
}

export default WishListService;
