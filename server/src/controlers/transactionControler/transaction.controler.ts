import { RequestHandler, Request, Response } from "express";
import Transaction, {
  TransactionInterface,
} from "../../models/transaction/transaction.model";

export const createTransfer: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const to = req.body.to;
  const type = req.body.type.toLowerCase();
  const from = req.body.from;
  const note = req.body.note;
  const fees = req.body.fees;
  const userId = req.body.userId;
  const amount = req.body.amount;
  const currency = req.body.currency;
  const category = req.body.category;
  const description = req.body.description;

  const newTransfer = new Transaction({
    to,
    type,
    from,
    note,
    fees,
    userId,
    amount,
    currency,
    category,
    description,
  });

  await newTransfer
    .save()
    .then(() => res.json(newTransfer))
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
};

export const createTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const type = req.params.type.toLowerCase();
  const note = req.body.note;
  const fees = req.body.fees;
  const userId = req.body.userId;
  const amount = req.body.amount;
  const currency = req.body.currency;
  const category = req.body.category;
  const description = req.body.description;

  const newTransaction = new Transaction({
    type,
    note,
    fees,
    userId,
    amount,
    currency,
    category,
    description,
  });

  await newTransaction
    .save()
    .then(() => res.json(newTransaction))
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
};
