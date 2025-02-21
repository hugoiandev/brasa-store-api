import { Request, Response } from "express";
import * as Yup from "yup";
import CreateProductDto from "../Dtos/CreateProductDto";
import IProductService from "../Interfaces/IProductService";
import ResponseModel from "../Models/ResponseModel";

class ProductController {
  private readonly _productService: IProductService;

  constructor(productService: IProductService) {
    this._productService = productService;
  }

  public async create(req: Request, res: Response) {
    const productSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, "No mínimo 2 caracteres.")
        .required("Nome é obrigatório."),
      description: Yup.string().optional(),
      price: Yup.number().required("Preço é obrigatório."),
      stock: Yup.number().required("Estoque é obrigatório."),
      category_id: Yup.number().required("Id da categoria é obrigatório."),
    });

    const productImg = req.file;
    const product = new CreateProductDto(req.body);

    try {
      await productSchema.validate(product);

      const response = await this._productService.createProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        file: productImg,
      });

      res.status(201).json(
        new ResponseModel({
          message: "Produto criado com sucesso.",
          data: response,
        })
      );

      return;
    } catch (error: any) {
      console.log(error);

      res.status(500).json(
        new ResponseModel({
          message: "Ocorreu um erro ao cadastrar o produto.",
          success: false,
          errors: error.message,
        })
      );
      return;
    }
  }
}

export default ProductController;
