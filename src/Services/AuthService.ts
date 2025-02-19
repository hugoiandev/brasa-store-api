import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import IAuthService from "../Interfaces/IAuthService";
import LoginDto from "../Dtos/LoginDto";
import { PrismaClient } from "@prisma/client";

class AuthService implements IAuthService {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async loginUser(user: LoginDto): Promise<string> {
    const response = await this._prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!response) throw new Error("Email ou senha incorretos.");

    const decodePassword = await bcrypt.compare(
      user.password,
      response.password_hash
    );

    if (!decodePassword) {
      throw new Error("Email ou senha incorretos.");
    }

    const jwtSecret = process.env.JWT_SECRET as string;

    const generateToken = jwt.sign(
      {
        id: response.id,
        role: response.role,
      },
      jwtSecret,
      { expiresIn: "2h" }
    );

    return generateToken;
  }
}

export default AuthService;
