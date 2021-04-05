import jwt from "jsonwebtoken";
import User from "../models/user/user.model";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { Token, TokenMessages } from "../interfaces/token";

export const tokenAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  let token: string | any = authorization;

  if (!token) return res.status(401).json({ msg: TokenMessages.NO_TOKEN });

  token = token.split(" ").pop();

  try {
    let decodedToken: Token | any;

    decodedToken = jwt.decode(token);

    if (!decodedToken)
      return res.status(401).json({ msg: TokenMessages.WRONG_TOKEN });

    await User.findOne({ _id: decodedToken.id }, () => {
      return next();
    });
  } catch (error) {
    return res.json({ msg: error });
  }
};
