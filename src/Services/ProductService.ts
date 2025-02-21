import { PrismaClient, Product } from "@prisma/client";
import IS3Service from "../Interfaces/IS3Service";
import IProductService from "../Interfaces/IProductService";
import CreateProductDto from "../Dtos/CreateProductDto";

class ProductService implements IProductService {
  private readonly _prisma: PrismaClient;
  private readonly _s3: IS3Service;

  constructor(prisma: PrismaClient, s3: IS3Service) {
    this._prisma = prisma;
    this._s3 = s3;
  }

  public async createProduct(product: CreateProductDto): Promise<Product> {
    const image = product.file;

    let imgUrl: string | null = null;

    if (image) {
      imgUrl = await this._s3.uploadFile(`../uploads/${image?.filename}`);

      if (!imgUrl) {
        throw new Error("Não foi possível concluir o upload da imagem.");
      }
    }

    const productResponse = await this._prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image_url: imgUrl,
      },
    });

    if (!productResponse) {
      throw new Error("Ocorreu um erro ao cadastrar o produto.");
    }

    return productResponse;
  }
}

export default ProductService;
