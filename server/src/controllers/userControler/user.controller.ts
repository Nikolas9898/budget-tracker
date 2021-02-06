import { RequestHandler, Request, Response } from "express";
import { tokenDecoder } from "../../helpers/tokenDecoder";
import User, { UserInterface } from "../../models/user/user.model";

export const getLoggedUser: RequestHandler = (req: Request, res: Response) => {
  const { authorization } = req.headers;

  const userId: string = tokenDecoder(authorization);

  User.findById({ _id: userId }, (err: any, user: UserInterface) => {
    const {
      _id,
      username,
      email,
      type,
      categories,
      createdAt,
      updatedAt,
    } = user;
    try {
      if (!user) return res.json({ errorMSG: "No existing user" });

      let foundUser: UserInterface = {
        _id,
        username,
        email,
        type,
        categories,
        createdAt,
        updatedAt,
      };

      return res.json({ user: foundUser });
    } catch (error) {
      return res.json(error);
    }
  });
};
