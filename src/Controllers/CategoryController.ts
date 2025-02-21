import { Request, Response } from "express";
import * as Yup from "yup";
import ResponseModel from "../Models/ResponseModel";
import ICategoryService from "../Interfaces/ICategoryService";
import CreateCategoryDto from "../Dtos/CreateCategoryDto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class CategoryController {
  private readonly _categoryService: ICategoryService;

  constructor(categoryService: ICategoryService) {
    this._categoryService = categoryService;
  }

  public async create(req: Request<{}, {}, CreateCategoryDto>, res: Response) {
    const categorySchema = Yup.object().shape({
      name: Yup.string().min(2, "No mínimo 2 caracteres").required(),
      description: Yup.string().optional(),
    });

    const category = req.body;

    try {
      await categorySchema.validate(category);

      const response = await this._categoryService.createCategory(category);

      res.status(201).json(
        new ResponseModel({
          message: "Categoria criada com sucesso.",
          data: response,
        })
      );
      return;
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        res.status(400).json(
          new ResponseModel({
            message: error.message,
            success: false,
            errors: error.errors,
          })
        );
        return;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          res.status(400).json(
            new ResponseModel({
              message: "Essa categoria já existe.",
              success: false,
              errors: error.message,
            })
          );
          return;
        }
      }

      res.status(500).json(
        new ResponseModel({
          message: "Os dados informados são invalidos.",
          success: false,
          errors: error.errors,
        })
      );
      return;
    }
  }
}

export default CategoryController;
