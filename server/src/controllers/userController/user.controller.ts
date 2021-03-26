import { RequestHandler, Request, Response } from "express";
import { tokenDecoder } from "../../helpers/tokenDecoder";
import { IUser, ResponseUser, userErrors } from "../../interfaces/user";
import User from "../../models/user/user.model";

export const getLoggedUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { authorization } = req.headers;
    const userId: string = tokenDecoder(authorization);
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

      if (!user) return res.json({ errorMSG: userErrors.notExistingUser });

      let foundUser: ResponseUser = {
        _id,
        username,
        password: undefined,
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
  try {
    console.log("udrqm");
    const { authorization } = req.headers;
    const userId: string = tokenDecoder(authorization);
    const user: IUser | null = await User.findById(userId);
    const {
      username: reqUsername,
      password: reqPassword,
      email: reqEmail,
      categories: reqCategories,
      type: reqType,
    } = req.body;
    if (user) {
      user.username = reqUsername;
      user.password = reqPassword;
      user.email = reqEmail;
      user.categories = reqCategories;
      user.type = reqType;

      await user.save();

      res.json(user);
    }
  } catch (error) {
    res.json(error.message);
  }
};
