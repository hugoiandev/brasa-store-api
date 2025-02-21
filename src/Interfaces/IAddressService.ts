import CreateAddressDto from "../Dtos/CreateAddressDto";

interface IAddressService {
  createAddress(address: CreateAddressDto): Promise<void>;
}

export default IAddressService;
