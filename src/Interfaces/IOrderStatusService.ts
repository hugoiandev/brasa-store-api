import CreateOrderStatusDto from "../Dtos/CreateOrderStatusDto";

interface IOrderStatusService {
  createOrderStatus(createOrderStatusDto: CreateOrderStatusDto): Promise<void>;
}

export default IOrderStatusService;
