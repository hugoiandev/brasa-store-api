import CreateShoppingCartDto from "../Dtos/CreateShoppingCartDto";

interface IShoppingCartService {
  createCart(user: CreateShoppingCartDto): Promise<void>;
}

export default IShoppingCartService;
