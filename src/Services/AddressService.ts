import { Address, PrismaClient } from "@prisma/client";
import IAddressService from "../Interfaces/IAddressService";
import CreateAddressDto from "../Dtos/CreateAddressDto";

class AddressService implements IAddressService {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async createAddress(address: CreateAddressDto): Promise<void> {
    const userAddress = await this._prisma.address.findMany({
      where: {
        userId: address.userId,
      },
    });

    if (userAddress.length === 0) {
      await this._prisma.address.create({
        data: { ...address, default: true },
      });

      return;
    }

    await this._prisma.address.create({ data: address });

    return;
  }
}

export default AddressService;
