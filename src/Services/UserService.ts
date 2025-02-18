import CreateUserDto from "../Dtos/CreateUserDto";
import IUserService from "../Interfaces/IUserService";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

class UserService implements IUserService {
  private _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  public async createUser(
    userDto: CreateUserDto
  ): Promise<{ name: string; email: string; id: number }> {
    const encryptedPassword = await bcrypt.hash(userDto.password, 8);

    const user = await this._prisma.user.create({
      data: {
        name: userDto.name,
        email: userDto.email,
        password_hash: encryptedPassword,
        phone_number: userDto.phone_number,
      },
      select: {
        email: true,
        id: true,
        name: true,
      },
    });

    if (!user) {
      throw new Error("Ocorreu um erro ao cadastrar.");
    }

    return user;
  }
}

export default UserService;
