import { PrismaClient } from "@prisma/client";
import CreateOrderDto from "../Dtos/CreateOrderDto";
import IOrderService from "../Interfaces/IOrderService";
import Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRAPI_KEY_DEV);
class OrderService implements IOrderService {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async createOrder(
    createOrderDto: CreateOrderDto
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const order = await this._prisma.order.create({
      data: {
        address_id: createOrderDto.address_id,
        user_id: createOrderDto.user_id,
        total_price: createOrderDto.itens[0].price,
      },
    });

    const domain = process.env.DOMAIN as string;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: createOrderDto.itens[0].product_id,
          quantity: createOrderDto.itens[0].quantity,
        },
      ],
      mode: "payment",
      success_url: `${domain}?success=true`,
      cancel_url: `${domain}?canceled=true`,
    });

    return session;
  }
}

export default OrderService;
