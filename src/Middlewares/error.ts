import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ResponseModel from "../Models/ResponseModel";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error:", err);
};
