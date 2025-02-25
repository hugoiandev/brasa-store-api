import CreateWishListItemDto from "../Dtos/CreateWishListItemDto";

interface IWishListItemService {
  createWishListItem(
    createWishListItemDto: CreateWishListItemDto
  ): Promise<void>;
}

export default IWishListItemService;
