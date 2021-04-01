import { RequestHandler, Request, Response } from "express";
import { tokenDecoder } from "../../helpers/tokenDecoder";
import {
  UserType,
  ResponseUser,
  succsessMessages,
  userErrors,
} from "../../interfaces/user";
import User from "../../models/user/user.model";

export const getLoggedUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { authorization } = req.headers;
    const userId: string = tokenDecoder(authorization);
    await User.findById({ _id: userId }, (err, user: UserType) => {
      let { _id, username, email, type, createdAt, updatedAt } = user;

      if (!user) return res.json({ errorMSG: userErrors.notExistingUser });

      let foundUser: ResponseUser = {
        _id,
        username,
        password: undefined,
        email,
        type,
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
    const { authorization } = req.headers;
    const { username, email, password, createdAt, type } = req.body;
    const userId: string = tokenDecoder(authorization);

    await User.updateOne(
      {
        userId,

        $set: {
          username,
          email,
          type,
          createdAt,
          password,
        },
      },
      (err: any, user: UserType) => {
        if (err) {
          return res.json(err);
        }
        res.json(succsessMessages.updatedSuccessfully);
      }
    );
  } catch (error) {
    res.json(error.message);
  }
};
