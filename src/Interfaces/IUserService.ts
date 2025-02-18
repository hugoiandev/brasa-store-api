import CreateUserDto from "../Dtos/CreateUserDto";
import { User } from "@prisma/client";

interface IUserService {
  createUser(
    user: CreateUserDto
  ): Promise<{ name: string; email: string; id: number }>;
}

export default IUserService;
