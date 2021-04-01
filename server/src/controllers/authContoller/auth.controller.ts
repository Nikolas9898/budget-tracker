import User from "../../models/user/user.model";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { UserType, ResponseUser, userErrors } from "../../interfaces/user";
import { addCategories } from "../../helpers/userHelpers/userHelpers";

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newUser = await new User({
      ...req.body,
    });
    await newUser.save();
    await User.findOne({ email: req.body.email }, (err, user: UserType) => {
      let { password, _id, username, email, type, createdAt, updatedAt } = user;

      const passMatch: boolean = password === req.body.password;

      if (!passMatch) {
        return res.json({ errorMSG: userErrors.wrongEmailOrPassword });
      }

      const foundUser: ResponseUser = {
        _id,
        username,
        password: undefined,
        email,
        type,
        createdAt,
        updatedAt,
      };
      addCategories(_id);

      const token: string = jwt.sign(
        {
          id: _id,
        },
        "somesecretkeyforjsonwebtoken"
      );

      return res.json({ user: foundUser, token });
    });
  } catch (err) {
    return res.status(400).json({ errorMSG: err });
  }
};

export const signIn: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await User.findOne({ email }, (err, user: UserType) => {
      if (!user) {
        return res.json({ errorMSG: userErrors.notExistingUser });
      }

      let { password, _id, username, email, type, createdAt, updatedAt } = user;

      const passMatch: boolean = password === req.body.password;

      if (!passMatch) {
        return res.json({ errorMSG: userErrors.wrongEmailOrPassword });
      }

      const foundUser: ResponseUser = {
        _id,
        username,
        password: undefined,
        email,
        type,
        createdAt,
        updatedAt,
      };

      const token: string = jwt.sign(
        {
          id: user._id,
        },
        "somesecretkeyforjsonwebtoken"
      );

      return res.json({ user: foundUser, token });
    });
  } catch (error) {
    return res.json({ errorMSG: userErrors.wrongEmailOrPassword });
  }
};
