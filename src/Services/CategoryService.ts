import { PrismaClient } from "@prisma/client";
import ICategoryService from "../Interfaces/ICategoryService";
import CreateCategoryDto from "../Dtos/CreateCategoryDto";

class CategoryService implements ICategoryService {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  public async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<{ name: string; id: number }> {
    const response = await this._prisma.category.create({
      data: createCategoryDto,
      select: {
        id: true,
        name: true,
      },
    });

    return response;
  }
}

export default CategoryService;
