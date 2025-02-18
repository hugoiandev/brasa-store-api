import { Request, Response } from "express";
import CreateUserDto from "../Dtos/CreateUserDto";
import IUserService from "../Interfaces/IUserService";
import * as Yup from "yup";
import ResponseModel from "../Models/ResponseModel";
import { Prisma } from "@prisma/client";

class UserController {
  private _userService: IUserService;

  constructor(userService: IUserService) {
    this._userService = userService;
  }

  public async create(req: Request<{}, {}, CreateUserDto>, res: Response) {
    const userSchema = Yup.object().shape({
      name: Yup.string().max(100).required("É obrigatório informar um nome."),
      email: Yup.string().email().required("É obrigatório informar um email."),
      password: Yup.string()
        .max(255)
        .min(8, "A senha deve ter minimo 8 caracteres.")
        .required("É obrigatório informar uma senha."),
      phone_number: Yup.string().max(20).optional(),
    });

    const user = req.body;

    try {
      await userSchema.validate(user, { abortEarly: false });

      const response = await this._userService.createUser(user);

      res.status(201).json(
        new ResponseModel({
          message: "Usuário criado com sucesso.",
          data: response,
        })
      );
      return;
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          res.status(400).json(
            new ResponseModel({
              message: "Usuário já cadastrado.",
              success: false,
              errors: error.message,
            })
          );
          return;
        }
      }

      if (error instanceof Yup.ValidationError) {
        res.status(400).json(
          new ResponseModel({
            message: "Ocorreu um erro na validação dos dados.",
            success: false,
            errors: error.errors,
          })
        );
        return;
      }

      res
        .status(500)
        .json(new ResponseModel({ message: error.message, success: false }));
      return;
    }
  }
}

export default UserController;
