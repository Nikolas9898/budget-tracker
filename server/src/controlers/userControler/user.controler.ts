import { RequestHandler, Request, Response } from "express";
import User from "../../models/user/user.model";

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

  console.log(newUser);

  await newUser
    .save()
    .then(() => res.json(registeredUser))
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
};

export const getById: RequestHandler = (req, res) => {
  console.log("tova e functiqta");
};
