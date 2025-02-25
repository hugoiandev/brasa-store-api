import CreateOrderDto from "../Dtos/CreateOrderDto";

interface IOrderService {
  createOrder(createOrderDto: CreateOrderDto): Promise<void>;
}

export default IOrderService;
