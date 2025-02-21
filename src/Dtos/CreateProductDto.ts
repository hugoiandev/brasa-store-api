import IMulterFile from "../Interfaces/IMulterFile";

class CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  file?: IMulterFile;
  category_id: number;

  constructor({
    name,
    description,
    price,
    stock,
    file,
    category_id,
  }: {
    name: string;
    description: string;
    price: string;
    stock: string;
    category_id: string;
    file?: IMulterFile;
  }) {
    this.name = name;
    this.description = description;
    this.price = Number.parseFloat(price);
    this.stock = Number(stock);
    this.category_id = Number(category_id);
    this.file = file;
  }
}

export default CreateProductDto;
