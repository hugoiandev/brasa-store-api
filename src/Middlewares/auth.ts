import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ResponseModel from "../Models/ResponseModel";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "") as string;

  if (!token) {
    res
      .status(401)
      .json(new ResponseModel({ message: "Token não fornecido." }));
    return;
  }

  const jwtSecret = process.env.JWT_SECRET as string;

  const tokenIsValid = jwt.verify(token, jwtSecret);

  if (!tokenIsValid) {
    res
      .status(403)
      .json(new ResponseModel({ message: "Acesso negado, token inválido." }));
    return;
  }

  next();
};

export default authenticateToken;
