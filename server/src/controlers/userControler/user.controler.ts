import { RequestHandler, Request, Response } from "express";
import User, { UserInterface } from "../../models/user/user.model";

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const type = req.body.type;
  const currency = req.body.currency;

  const newUser = new User({
    username,
    password,
    email,
    type,
    currency,
  });

  let registeredUser = {
    username,
    email,
    type,
    currency,
  };

  await newUser
    .save()
    .then(() => res.json(registeredUser))
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
};

export const getById: RequestHandler = (req, res) => {
  User.findById({ _id: req.params.id }, (err: any, user: UserInterface) => {
    try {
      if (!user) return res.json({ errorMSG: "No existing user" });

      let foundUser = {
        id: user._id,
        username: user.username,
        email: user.email,
        type: user.type,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      res.json({ user: foundUser });
    } catch (error) {
      res.json(error);
    }
  });
};
