import LoginDto from "../Dtos/LoginDto";

interface IAuthService {
  loginUser(user: LoginDto): Promise<string>;
}

export default IAuthService;
