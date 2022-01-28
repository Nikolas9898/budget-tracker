import {Response} from 'express';
import {calculateTotalExpenseAndIncome} from '../calculateTotalExpenseAndIncome';
import Transaction from '../../dbModels/transaction/transaction.model';
import TransactionType, {
  TransactionEvent,
  Expense,
  DummyExpenseEvent,
  TransferWithFees,
  DELETED_SUCCESSFULLY
} from '../../models/transactions';

export const createTransferWithFees = (
  events: TransactionEvent[],
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
      fees: 0,
      from: '',
      to: '',
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
  events: TransactionEvent[],
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

export const deleteTransaction = (transaction: TransactionType, res: Response): Response<unknown> => {
  try {
    transaction.remove();
    return res.json({msg: DELETED_SUCCESSFULLY});
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
  const foundIndex = transaction.events.findIndex(
    (foundEvent: TransactionEvent) => foundEvent._id?.toString() === event_id
  );
  const eventFromDB = transaction.events[foundIndex];

  if (eventFromDB.transferId) {
    const transferIndex = transaction.events.findIndex(
      (foundEvent: TransactionEvent) => foundEvent._id?.toString() === eventFromDB.transferId
    );

    if (newEvents[transferIndex]) {
      newEvents[transferIndex].fees = 0;
    }
  }

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
  const expenseWithTransferIdIndex = transaction.events.findIndex(
    (foundEvent: TransactionEvent) => foundEvent.transferId === event_id
  );

  transaction.events = transaction.events.map((oldEvent: TransactionEvent) => {
    if (oldEvent._id?.toString() === event_id) {
      //when editing event into transfer with fees

      if (fees > 0 && oldEvent.fees == 0) {
        dummyExpenseEvent = {
          transferId: fees < 0 ? '' : oldEvent._id,
          type: Expense.TYPE,
          currency: Expense.CURRENCY,
          date: oldEvent.date,
          category: Expense.CATEGORY,
          account: from,
          fees: 0,
          from: '',
          to: '',
          amount: fees,
          note: Expense.NOTE,
          description: oldEvent.description
        };
      }

      oldEvent = {
        ...eventFromBody,
        _id: oldEvent._id,
        category: undefined,
        account: ''
      };
    }

    // Opravi utre expence kato se premahne ot transfer!!!!!!!!!!!!!!!!!!!

    if (oldEvent.transferId === event_id) {
      if (fees <= 0) {
        oldEvent.transferId = undefined;
      } else {
        oldEvent.amount = fees;
      }
    }

    return oldEvent;
  });
  if (dummyExpenseEvent) transaction.events.push(dummyExpenseEvent);

  if (expenseWithTransferIdIndex > 0 && fees <= 0) {
    for (let i = 0; i < transaction.events.length; i++) {
      if (i === expenseWithTransferIdIndex) {
        transaction.events.splice(i, 1);
      }
    }
  }

  return transaction;
};

export const saveAndSendResponse = async (resItem: TransactionType, res: Response): Promise<Response<unknown>> => {
  try {
    await resItem.save();
    return res.json(resItem);
  } catch (error) {
    return res.json(error);
  }
};
