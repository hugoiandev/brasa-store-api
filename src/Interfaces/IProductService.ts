import { Product } from "@prisma/client";
import CreateProductDto from "../Dtos/CreateProductDto";

interface IProductService {
  createProduct(product: CreateProductDto): Promise<Product>;
}

export default IProductService;
