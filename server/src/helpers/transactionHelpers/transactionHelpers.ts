import { calculateTotalExpenseAndIncome } from "../calculateTotalExpenseAndIncome";
import Transaction from "../../models/transaction/transaction.model";
import ITransaction, {
  TransactionEvent,
  Expense,
  DummyExpenseEvents,
  TransferWithFees,
  eventTypes,
  successMessages,
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
    if (event.type.toLowerCase() === eventTypes.income) {
      income += event.amount;
    }
    if (event.type.toLowerCase() === eventTypes.expense) {
      expense += event.amount;
    }
  });

  let transaction: ITransaction = new Transaction({
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
    return res.json({ msg: successMessages.deletedSuccessfully });
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

  const newEvents: TransactionEvent[] = transaction.events.filter(
    (event: TransactionEvent) => event._id != event_id
  );

  transaction.events = newEvents;

  calculateTotalExpenseAndIncome(transaction, income, expense);

  transaction.expense = expense;
  transaction.income = income;

  await transaction.save();
  return res.json(transaction);
};

export const editIntoTransfer = async (
  transaction: ITransaction,
  event_id: string,
  eventFromBody: TransferWithFees
) => {
  const { type, fees, from } = eventFromBody;

  transaction.events.forEach((oldEvent: TransactionEvent) => {
    if (oldEvent._id?.toString() === event_id) {
      //when editing event into transfer with fees
      if (fees > 0 && oldEvent.fees == 0) {
        transaction.events.push({
          transferId: oldEvent._id,
          type: Expense.type,
          currency: Expense.currency,
          date: oldEvent.date,
          category: Expense.category,
          account: from,
          amount: fees,
          note: Expense.note,
          description: oldEvent.description,
        });
      }

      // ordinary transfer

      for (let key of Object.keys(eventFromBody)) {
        oldEvent[key] = eventFromBody[key];
      }
      oldEvent.category = undefined;
      oldEvent.account = undefined;
    }

    if (oldEvent.transferId === event_id) {
      oldEvent.amount = fees;
    }
  });

  return transaction;
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
