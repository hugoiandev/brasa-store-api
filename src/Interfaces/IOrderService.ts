import Stripe from "stripe";
import CreateOrderDto from "../Dtos/CreateOrderDto";

interface IOrderService {
  createOrder(
    createOrderDto: CreateOrderDto
  ): Promise<Stripe.Response<Stripe.Checkout.Session>>;
}

export default IOrderService;
