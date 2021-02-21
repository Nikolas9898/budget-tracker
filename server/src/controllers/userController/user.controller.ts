import { RequestHandler, Request, Response } from "express";
import { tokenDecoder } from "../../helpers/tokenDecoder";
import { IUser } from "../../interfaces/user";
import User from "../../models/user/user.model";

export const getLoggedUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { authorization } = req.headers;

  const userId: string = tokenDecoder(authorization);
  try {
    await User.findById({ _id: userId }, (err, user: IUser) => {
      let {
        _id,
        username,
        email,
        type,
        categories,
        createdAt,
        updatedAt,
      } = user;

      if (!user) return res.json({ errorMSG: "No existing user" });

      let foundUser: IUser = {
        _id,
        username,
        password: "",
        email,
        type,
        categories,
        createdAt,
        updatedAt,
      };

      return res.json({ user: foundUser });
    });
  } catch (error) {
    return res.json(error);
  }
};
