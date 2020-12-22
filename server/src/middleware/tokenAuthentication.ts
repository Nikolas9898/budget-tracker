import jwt from "jsonwebtoken";
import User from "../models/user/user.model";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { User as UserInterface } from "../controlers/signInControler/signIn.controler";

type Id = {
  id: string;
  iat: number;
};

export const tokenAuth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: any = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  token = token.split(" ").pop();

  try {
    let decodedToken: any = jwt.decode(token);
    User.findOne(
      { username: req.body.username },
      (err: any, user: UserInterface) => {
        try {
        } catch (error) {
          res.json(error);
        }
      }
    );
  } catch (error) {}
};
