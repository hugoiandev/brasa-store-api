interface CreateOrderDto {
  user_id: number;
  address_id: number;
  itens: { product_id: number; quantity: number }[];
}

export default CreateOrderDto;
