import { RequestHandler, Request, Response } from "express";
import { tokenDecoder } from "../../middleware/tokenDecoder";
import User, { UserInterface } from "../../models/user/user.model";

export const getLoggedUser: RequestHandler = (req: Request, res: Response) => {
  const userId = tokenDecoder(req.headers.authorization);

  User.findById({ _id: userId }, (err: any, user: UserInterface) => {
    try {
      if (!user) return res.json({ errorMSG: "No existing user" });

      let foundUser = {
        id: user._id,
        username: user.username,
        email: user.email,
        type: user.type,
        categories: user.categories,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      res.json({ user: foundUser });
    } catch (error) {
      res.json(error);
    }
  });
};

export const editTransaction = async (req: Request, res: Response) => {
  const id: any = req.params.id;

  const type = req.body.type.toLowerCase();
  const fees = req.body.fees;
  const note = req.body.note;
  const amount = req.body.amount;
  const from = req.body.from;
  const to = req.body.to;
  const currency = req.body.currency;
  const category = req.body.category;
  const description = req.body.description;
  const createdAt = req.body.createdAt;

  const userId = tokenDecoder(req.headers.authorization);

  // const transaction: any = await Transaction.findOne({
  //   _id: id,
  // });

  // if (!transaction) {
  //   let error = "No such transaction available";
  //   return res.status(400).json({ errorMsg: error });
  // }

  // if (transaction.userId !== userId) {
  //   return res.status(400).json({
  //     errorMsg: "You are not authorized to update other people tranzactions",
  //   });
  // }

  // if (type == "transfer") {
  //   transaction.type = type;
  //   transaction.from = from;
  //   transaction.to = to;
  //   transaction.fees = fees;
  //   transaction.note = note;
  //   transaction.amount = amount;
  //   transaction.currency = currency;
  //   transaction.category = category;
  //   transaction.description = description;
  //   transaction.createdAt = createdAt;
  // } else {
  //   transaction.type = type;
  //   transaction.fees = fees;
  //   transaction.note = note;
  //   transaction.from = "";
  //   transaction.to = "";
  //   transaction.amount = amount;
  //   transaction.currency = currency;
  //   transaction.category = category;
  //   transaction.description = description;
  //   transaction.createdAt = createdAt;
  // }

  // await transaction.save();

  res.json("Update successful");
};
