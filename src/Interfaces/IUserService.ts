import CreateUserDto from "../Dtos/CreateUserDto";

interface IUserService {
  createUser(
    user: CreateUserDto
  ): Promise<{ name: string; email: string; id: number }>;
}

export default IUserService;
