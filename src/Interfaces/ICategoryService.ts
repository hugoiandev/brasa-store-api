import CreateCategoryDto from "../Dtos/CreateCategoryDto";

interface ICategoryService {
  createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<{ name: string; id: number }>;
}

export default ICategoryService;
