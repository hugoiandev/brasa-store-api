interface CreateAddressDto {
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  userId: number;
}

export default CreateAddressDto;
