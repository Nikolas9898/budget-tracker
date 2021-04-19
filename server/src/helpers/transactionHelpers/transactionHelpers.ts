import {Response} from 'express';
import {calculateTotalExpenseAndIncome} from '../calculateTotalExpenseAndIncome';
import Transaction from '../../models/transaction/transaction.model';
import TransactionType, {
  TransactionEvent,
  Expense,
  DummyExpenseEvent,
  TransferWithFees,
  SuccessMessages
} from '../../interfaces/transactions';

export const createTransferWithFees = (
  events: TransactionEvent,
  createdAt: string,
  userId: string,
  income: number,
  expense: number
): TransactionType => {
  const transfer = new Transaction({
    events,
    createdAt,
    userId,
    expense: 0,
    income: 0
  });
  const {TYPE, NOTE, CATEGORY, CURRENCY} = Expense;

  if (transfer.events[0].from && transfer.events[0].fees) {
    const expenseEvent: DummyExpenseEvent = {
      transferId: transfer.events[0]._id,
      type: TYPE,
      currency: CURRENCY,
      date: transfer.events[0].date,
      category: CATEGORY,
      account: transfer.events[0].from,
      amount: transfer.events[0].fees,
      note: NOTE,
      description: transfer.events[0].description
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
): TransactionType => {
  const transaction: TransactionType = new Transaction({
    events,
    createdAt,
    userId,
    income,
    expense
  });

  calculateTotalExpenseAndIncome(transaction, income, expense);

  return transaction;
};

export const deleteTransaction = (transaction: TransactionType, res: Response): Response<any> => {
  try {
    transaction.remove();
    return res.json({msg: SuccessMessages.DELETED_SUCCESSFULLY});
  } catch (error) {
    return res.json({errroMsg: error});
  }
};

export const removeTransactionEvent = async (
  res: Response,
  transaction: TransactionType,
  event_id: string
): Promise<Response<TransactionType>> => {
  const expense = 0;
  const income = 0;
  const newEvents: TransactionEvent[] = transaction.events.filter((event: TransactionEvent) => event._id != event_id);

  transaction.events = newEvents;

  calculateTotalExpenseAndIncome(transaction, income, expense);

  transaction.expense = expense;
  transaction.income = income;

  await transaction.save();
  return res.json(transaction);
};

export const editIntoTransfer = async (
  transaction: TransactionType,
  event_id: string,
  eventFromBody: TransferWithFees
): Promise<TransactionType> => {
  const {fees, from} = eventFromBody;
  let dummyExpenseEvent: TransactionEvent | undefined = undefined;

  transaction.events = transaction.events.map((oldEvent: TransactionEvent) => {
    if (oldEvent._id?.toString() === event_id) {
      //when editing event into transfer with fees
      if (fees > 0 && oldEvent.fees == 0) {
        dummyExpenseEvent = {
          transferId: oldEvent._id,
          type: Expense.TYPE,
          currency: Expense.CURRENCY,
          date: oldEvent.date,
          category: Expense.CATEGORY,
          account: from,
          amount: fees,
          note: Expense.NOTE,
          description: oldEvent.description
        };
      }

      // ordinary transfer

      oldEvent = {
        ...eventFromBody,
        _id: oldEvent._id,
        category: undefined,
        account: undefined
      };
    }

    if (oldEvent.transferId === event_id) {
      oldEvent.amount = fees;
    }

    return oldEvent;
  });
  if (dummyExpenseEvent) transaction.events.push(dummyExpenseEvent);

  return transaction;
};

export const saveAndSendResponse = async (resItem: TransactionType, res: Response): Promise<Response<any>> => {
  try {
    await resItem.save();
    return res.json(resItem);
  } catch (error) {
    return res.json(error);
  }
};
