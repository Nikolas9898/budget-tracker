import { RequestHandler, Request, Response } from "express";
import { tokenDecoder } from "../../helpers/tokenDecoder";
import { IUser, ResponseUser } from "../../interfaces/user";
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

      let foundUser: ResponseUser = {
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

export const editUser: RequestHandler = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  const userId: string = tokenDecoder(authorization);

  let user: IUser | null;
  try {
    user = await User.findById(userId);

    if (user) {
      user.username = req.body.username;
      user.password = req.body.password;
      user.email = req.body.email;
      user.categories = req.body.categories;
      user.type = req.body.type;

      await user.save();

      res.json(user);
    }
  } catch (error) {
    res.json(error.message);
  }
};
