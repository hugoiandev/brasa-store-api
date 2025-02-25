import CreateShoppingCartItem from "../Dtos/CreateShoppingCartItemDto";

interface IShoppingCartItem {
  createCartItem(createCartItem: CreateShoppingCartItem): Promise<void>;
}

export default IShoppingCartItem;
