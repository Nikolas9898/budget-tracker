import User, { UserInterface } from "../../models/user/user.model";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const type = req.body.type;
  const currency = req.body.currency;
  const categories = req.body.categories;

  const newUser = new User({
    username,
    password,
    email,
    type,
    currency,
    categories,
  });

  let registeredUser = {
    username,
    email,
    type,
    currency,
    categories,
  };

  await newUser
    .save()
    .then(() => res.json(registeredUser))
    .catch((err) => {
      res.status(400).json({ errorMSG: err });
    });
};

export const signIn: RequestHandler = async (req: Request, res: Response) => {
  await User.findOne(
    { email: req.body.email },
    (err: any, user: UserInterface) => {
      try {
        const passMatch = user.password === req.body.password;

        if (!passMatch) {
          res.json({ errorMSG: "Wrong email or password" });
        }

        let foundUser = {
          id: user._id,
          username: user.username,
          email: user.email,
          type: user.type,
          categorie: user.categories,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        let token: string = jwt.sign(
          {
            id: user._id,
          },
          "somesecretkeyforjsonwebtoken"
        );

        res.json({ user: foundUser, token });
      } catch (error) {
        res.json({ errorMSG: "Wrong email or password" });
      }
    }
  );
};
