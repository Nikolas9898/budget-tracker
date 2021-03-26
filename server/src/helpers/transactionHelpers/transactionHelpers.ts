import { calculateTotalExpenseAndIncome } from "../calculateTotalExpenseAndIncome";
import Transaction from "../../models/transaction/transaction.model";
import ITransaction, {
  TransactionEvent,
  Expense,
  DummyExpenseEvents,
} from "../../interfaces/transactions";
import { Response } from "express";

export const createTransferWithFees = (
  events: TransactionEvent,
  createdAt: string,
  userId: string,
  income: number,
  expense: number
): ITransaction => {
  let transfer = new Transaction({
    events,
    createdAt,
    userId,
    expense: 0,
    income: 0,
  });

  const { type, note, category, currency } = Expense;

  if (transfer.events[0].from && transfer.events[0].fees) {
    let expenseEvent: DummyExpenseEvents = {
      transferId: transfer.events[0]._id,
      type,
      currency,
      date: transfer.events[0].date,
      category,
      account: transfer.events[0].from,
      amount: transfer.events[0].fees,
      note,
      description: transfer.events[0].description,
    };
    transfer.events.push(expenseEvent);
  }

  calculateTotalExpenseAndIncome(transfer, income, expense);

  return transfer;
};

export const createOrdinaryEvent = (
  events: [TransactionEvent],
  createdAt: string,
  userId: string,
  income: number,
  expense: number
): ITransaction => {
  events.forEach((event: TransactionEvent) => {
    if (event.type.toLowerCase() === "income") {
      income += event.amount;
    }
    if (event.type.toLowerCase() === "expense") {
      expense += event.amount;
    }
  });

  let transaction = new Transaction({
    events,
    createdAt,
    userId,
    income,
    expense,
  });

  return transaction;
};

export const deleteTransaction = (transaction: ITransaction, res: Response) => {
  try {
    transaction.remove();
    return res.json({ msg: "Deleted successfullu" });
  } catch (error) {
    return res.json({ errroMsg: error });
  }
};

export const removeTransactionEvent = async (
  res: Response,
  transaction: ITransaction,
  event_id: string
) => {
  let expense: number = 0;
  let income: number = 0;

  const newEvents = transaction.events.filter(
    (event: TransactionEvent) => event._id != event_id
  );

  transaction.events = newEvents;

  calculateTotalExpenseAndIncome(transaction, income, expense);

  transaction.expense = expense;
  transaction.income = income;

  await transaction.save();
  return res.json(transaction);
};

export const saveAndSendResponse = async (
  resItem: ITransaction,
  res: Response
) => {
  try {
    await resItem.save();
    return res.json(resItem);
  } catch (error) {
    return res.json(error);
  }
};
