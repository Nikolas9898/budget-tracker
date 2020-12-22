import jwt from "jsonwebtoken";
import User from "../models/user/user.model";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserInterface } from "../models/user/user.model";

export const tokenAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: any = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  token = token.split(" ").pop();

  try {
    let decodedToken: any = jwt.decode(token);

    if (!decodedToken) return res.status(401).json({ msg: "Wrong token" });

    await User.findOne(
      { _id: decodedToken.id },
      (err: any, user: UserInterface) => {
        try {
          next();
        } catch (error) {
          res.json({ msg: error });
        }
      }
    );
  } catch (error) {}
};
