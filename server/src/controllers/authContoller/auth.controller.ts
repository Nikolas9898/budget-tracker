import User from "../../models/user/user.model";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, ResponseUser } from "../../interfaces/user";

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { username, password, email, type, currency, categories } = req.body;

  let token: string;
  let foundUser: ResponseUser;
  const newUser = new User({
    username,
    password,
    email,
    type,
    currency,
    categories,
  });

  try {
    await newUser.save();
    await User.findOne({ email: req.body.email }, (err, user: IUser) => {
      let {
        password,
        _id,
        username,
        email,
        type,
        categories,
        createdAt,
        updatedAt,
      } = user;

      const passMatch: boolean = password === req.body.password;

      if (!passMatch) {
        return res.json({ errorMSG: "Wrong email or password" });
      }

      foundUser = {
        _id,
        username,
        password: "",
        email,
        type,
        categories,
        createdAt,
        updatedAt,
      };

      token = jwt.sign(
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
  const { email } = req.body;

  try {
    await User.findOne({ email }, (err, user: IUser) => {
      let {
        password,
        _id,
        username,
        email,
        type,
        categories,
        createdAt,
        updatedAt,
      } = user;

      const passMatch: boolean = password === req.body.password;

      if (!passMatch) {
        return res.json({ errorMSG: "Wrong email or password" });
      }

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

      const token: string = jwt.sign(
        {
          id: user._id,
        },
        "somesecretkeyforjsonwebtoken"
      );

      return res.json({ user: foundUser, token });
    });
  } catch (error) {
    return res.json({ errorMSG: "Wrong email or password" });
  }
};
