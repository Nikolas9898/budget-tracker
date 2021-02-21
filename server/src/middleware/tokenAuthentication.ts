import jwt from "jsonwebtoken";
import User from "../models/user/user.model";
import { NextFunction, Request, RequestHandler, Response } from "express";

export interface Token {
  id?: string;
  iat?: number;
}

export const tokenAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  let token: string | any = authorization;

  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  token = token.split(" ").pop();

  try {
    let decodedToken: Token | any;

    decodedToken = jwt.decode(token);

    if (!decodedToken) return res.status(401).json({ msg: "Wrong token" });

    await User.findOne({ _id: decodedToken.id }, () => {
      return next();
    });
  } catch (error) {
    return res.json({ msg: error });
  }
};
