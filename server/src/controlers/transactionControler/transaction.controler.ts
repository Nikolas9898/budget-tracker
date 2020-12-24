import { RequestHandler, Request, Response } from "express";
import User, { UserInterface } from "../../models/user/user.model";

export const createTransfer: RequestHandler = async (
  req: Request,
  res: Response
) => {
  console.log(req.body);

  const to = req.body.to;
  const type = req.body.type;
  const from = req.body.from;
  const note = req.body.note;
  const fees = req.body.fees;
  const userId = req.body.userId;
  const amount = req.body.amount;
  const currency = req.body.currency;
  const category = req.body.category;
  const description = req.body.description;

  // const newUser = new User({
  //   username,
  //   password,
  //   email,
  //   type,
  //   currency,
  // });

  // let registeredUser = {
  //   username,
  //   email,
  //   type,
  //   currency,
  // };

  // await newUser
  //   .save()
  //   .then(() => res.json(registeredUser))
  //   .catch((err) => {
  //     res.status(400).json("Error: " + err);
  //   });
};
