import CreateWishListDto from "../Dtos/CreateWishListDto";

interface IWishListService {
  createWishList(createWishListDto: CreateWishListDto): Promise<void>;
}

export default IWishListService;
