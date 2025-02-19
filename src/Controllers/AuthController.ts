import { Request, Response } from "express";
import * as Yup from "yup";
import IAuthService from "../Interfaces/IAuthService";
import LoginDto from "../Dtos/LoginDto";
import ResponseModel from "../Models/ResponseModel";

class AuthController {
  private readonly _authService: IAuthService;

  constructor(authService: IAuthService) {
    this._authService = authService;
  }

  async login(req: Request<{}, {}, LoginDto>, res: Response) {
    const loginSchema = Yup.object().shape({
      email: Yup.string()
        .email("Digite um email válido.")
        .required("Informar o email é obrigatório."),
      password: Yup.string().required("Informar a senha é obrigatório."),
    });

    const user = req.body;

    try {
      await loginSchema.validate(user, { abortEarly: false });

      const token = await this._authService.loginUser(user);

      res.status(200).json(
        new ResponseModel<string>({
          message: "Login realizado com sucesso.",
          data: token,
        })
      );
      return;
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        res.status(400).json(
          new ResponseModel({
            message: "Dados inválidos.",
            success: false,
            errors: error.errors,
          })
        );
        return;
      }

      res
        .status(401)
        .json(new ResponseModel({ message: error.message, success: false }));
      return;
    }
  }
}

export default AuthController;
