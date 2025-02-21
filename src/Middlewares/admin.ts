import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ResponseModel from "../Models/ResponseModel";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "") as string;

  const decodedToken = jwt.decode(token) as { role: string };

  if (!(decodedToken.role === "ADMIN")) {
    res.status(403).json(
      new ResponseModel({
        message: "Você não tem permissão para acessar essa área.",
      })
    );
    return;
  }

  next();
};

export default isAdmin;
