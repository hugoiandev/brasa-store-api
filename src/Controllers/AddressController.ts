import { Request, Response } from "express";
import * as Yup from "yup";
import IAddressService from "../Interfaces/IAddressService";
import decodeToken from "../utils/decodeToken";
import CreateAddressDto from "../Dtos/CreateAddressDto";
import ResponseModel from "../Models/ResponseModel";

class AddressController {
  private readonly _addressService: IAddressService;

  constructor(addressService: IAddressService) {
    this._addressService = addressService;
  }

  public async create(req: Request<{}, {}, CreateAddressDto>, res: Response) {
    const addressSchema = Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().optional(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip_code: Yup.string().required(),
      default: Yup.boolean().optional(),
    });
    const userPayload = decodeToken(req.headers.authorization as string);
    const address = req.body;

    try {
      await addressSchema.validate(address);

      await this._addressService.createAddress({
        ...address,
        userId: userPayload.id,
      });

      res
        .status(200)
        .json(
          new ResponseModel({ message: "Endereço cadastrado com sucesso." })
        );
      return;
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        res.status(400).json(
          new ResponseModel({
            message: "Ocorreu um erro com a validação dos dados.",
            success: false,
            errors: error.errors,
          })
        );
        return;
      }

      res.status(500).json(
        new ResponseModel({
          message: "Ocorreu um erro interno.",
          success: false,
          errors: error.message,
        })
      );
      return;
    }
  }
}

export default AddressController;
