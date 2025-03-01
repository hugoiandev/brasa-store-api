interface CreateOrderDto {
  user_id: number;
  address_id: number;
  itens: {
    product_name: string;
    product_id: string;
    quantity: number;
    price: string;
  }[];
}

export default CreateOrderDto;
