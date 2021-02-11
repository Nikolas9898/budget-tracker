import { calculateTotalExpenseAndIncome } from "../calculateTotalExpenseAndIncome";
import Transaction from "../../models/transaction/transaction.model";
import { TransactionEvent } from "../../interfaces/transactions";

export const createTransferWithFees = (
  events: TransactionEvent,
  createdAt: string,
  userId: string,
  income: number,
  expense: number
) => {
  let transfer = new Transaction({
    events,
    createdAt,
    userId,
    expense: 0,
    income: 0,
  });

  if (transfer.events[0].from && transfer.events[0].fees) {
    let expenseEvent: TransactionEvent = {
      transferId: transfer.events[0]._id,
      type: "expense",
      currency: "BG",
      date: transfer.events[0].date,
      category: "other",
      account: transfer.events[0].from,
      amount: transfer.events[0].fees,
      note: "fees",
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
) => {
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
