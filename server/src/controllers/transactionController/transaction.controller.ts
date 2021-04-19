import {RequestHandler, Request, Response} from 'express';
import moment from 'moment';
import {Months, Month} from '../../interfaces/month';
import {tokenDecoder} from '../../helpers/tokenDecoder';
import TransactionType, {
  ErrorMessages,
  EventTypes,
  MomentConstants,
  SuccessMessages,
  TransactionEvent
} from '../../interfaces/transactions';
import Transaction from '../../models/transaction/transaction.model';
import {calculateTotalExpenseAndIncome} from '../../helpers/calculateTotalExpenseAndIncome';
import {
  createOrdinaryEvent,
  saveAndSendResponse,
  createTransferWithFees,
  deleteTransaction,
  removeTransactionEvent,
  editIntoTransfer
} from '../../helpers/transactionHelpers/transactionHelpers';

export const createTransaction: RequestHandler = async (req: Request, res: Response) => {
  const userId: string = tokenDecoder(req.headers.authorization);
  const {events, createdAt} = req.body;
  const transaction: TransactionType | null = await Transaction.findOne({
    createdAt: createdAt,
    userId
  });
  const income = 0;
  const expense = 0;
  const eventFees = events[0].fees;

  if (!transaction) {
    //Here it enters when transaction is not found then checks if it is transfer

    if (eventFees && eventFees > 0) {
      // here it makes expense and transfer

      const transfer = createTransferWithFees(events, createdAt, userId, income, expense);

      saveAndSendResponse(transfer, res);
    } else {
      //here enters when there are not fees and just ordinary event is sent

      const transaction = createOrdinaryEvent(events, createdAt, userId, income, expense);

      saveAndSendResponse(transaction, res);
    }
  } else {
    //It enters here when there is found transaction on the same date and it needs to push in this transaction events
    if (eventFees && eventFees > 0) {
      const transfer = createTransferWithFees(events, createdAt, userId, income, expense);

      transaction.events.push(transfer.events[0]);
      transaction.events.push(transfer.events[1]);

      calculateTotalExpenseAndIncome(transaction, income, expense);

      saveAndSendResponse(transaction, res);
    } else {
      //here is when there is transaction but the event is ordinary without fees
      transaction.events.push(events[0]);

      calculateTotalExpenseAndIncome(transaction, income, expense);

      saveAndSendResponse(transaction, res);
    }
  }
};

export const getTransactionInSpecificDatePeriod: RequestHandler = async (req: Request, res: Response) => {
  const from: string = req.params.from;
  const to: string = req.params.to;
  const userId: string = tokenDecoder(req.headers.authorization);
  let sumExpense = 0;
  let sumIncome = 0;

  if (from === '' || to === '') {
    return res.status(400).json({
      errorMSG: ErrorMessages.TWO_DATES_PICKET
    });
  }

  Transaction.find(
    {
      createdAt: {
        $gte: moment(from).startOf(MomentConstants.DAY).toDate(),
        $lt: moment(to).endOf(MomentConstants.DAY).toDate()
      },
      userId
    },
    (err, transactions) => {
      try {
        transactions.forEach((transaction: TransactionType) => {
          sumExpense += transaction.expense;
          sumIncome += transaction.income;
        });

        return res.json({transactions, sumExpense, sumIncome});
      } catch (error) {
        return res.status(400).json({errorMsg: error});
      }
    }
  );
};

export const getTransactionById: RequestHandler = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const userId: string = tokenDecoder(req.headers.authorization);

  Transaction.findOne({_id: id, userId}, (err, transaction: TransactionType) => {
    try {
      if (!transaction) {
        return res.status(400).json({errorMsg: ErrorMessages.NO_TRANSACTION});
      }
      return res.json(transaction);
    } catch (error) {
      return res.status(400).json({errorMsg: err});
    }
  });
};

export const deleteTransactionById: RequestHandler = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const userId: string = tokenDecoder(req.headers.authorization);

  try {
    const transaction = await Transaction.findOne({
      _id: id,
      userId
    });

    if (transaction) {
      transaction.remove();
      return res.json({msg: SuccessMessages.DELETED_SUCCESSFULLY});
    }
  } catch (error) {
    res.json({errroMsg: error});
  }
};

// Edits specifid transaction event

export const editTransactionEvent: RequestHandler = async (req: Request, res: Response) => {
  const id: string = req.params.transactionId;
  const event_id: string = req.params.event_id;
  const eventFromBody = req.body;
  const {type, amount, transferId} = eventFromBody;
  const userId: string = tokenDecoder(req.headers.authorization);
  const expense = 0;
  const income = 0;

  try {
    let transaction: TransactionType | null;

    try {
      transaction = await Transaction.findOne({
        _id: id,
        userId
      });
    } catch (error) {
      return res.json({error});
    }

    if (transaction)
      if (type === EventTypes.TRANSFER) {
        // when eventFrom body is transfer

        editIntoTransfer(transaction, event_id, eventFromBody);

        calculateTotalExpenseAndIncome(transaction, income, expense);

        saveAndSendResponse(transaction, res);
      } else {
        if (transferId) {
          await Promise.all(
            //enters when editing expense with transferId in it
            (transaction.events = transaction.events.map((oldEvent: TransactionEvent) => {
              if (oldEvent._id?.toString() === event_id) {
                oldEvent = {...eventFromBody, _id: oldEvent._id};

                type === EventTypes.INCOME && (oldEvent.transferId = undefined);
              }

              if (oldEvent._id?.toString() === transferId) {
                if (type === EventTypes.INCOME) {
                  oldEvent.fees = 0;
                } else {
                  oldEvent.fees = amount;
                }
              }

              return oldEvent;
            }))
          );
          calculateTotalExpenseAndIncome(transaction, income, expense);

          saveAndSendResponse(transaction, res);
        } else {
          const foundIndex = transaction.events.findIndex(
            (foundEvent: TransactionEvent) => foundEvent._id?.toString() === event_id
          );

          transaction.events.splice(foundIndex, 1, eventFromBody);
          calculateTotalExpenseAndIncome(transaction, income, expense);

          saveAndSendResponse(transaction, res);
        }
      }
  } catch (error) {
    return res.json({errorMsg: error});
  }
};

// delete specific transaction event

export const deleteTransactionEvent: RequestHandler = async (req: Request, res: Response) => {
  const id: string = req.params.transactionId;
  const event_id: string = req.params.event_id;
  const userId: string = tokenDecoder(req.headers.authorization);
  let transaction: TransactionType | null;

  try {
    transaction = await Transaction.findOne({
      _id: id,
      userId
    });
  } catch (error) {
    return res.json({errorMsg: error});
  }

  if (transaction === null) {
    return res.json({
      errorMsg: ErrorMessages.NO_EXISTING_TRANSACTION
    });
  }

  if (transaction.events.length === 1) {
    return deleteTransaction(transaction, res);
  }

  return removeTransactionEvent(res, transaction, event_id);
};

export const getYearlyAndWeekly: RequestHandler = async (req: Request, res: Response) => {
  const userId: string = tokenDecoder(req.headers.authorization);
  const months: Months = req.body;
  let sumExpense = 0;
  let sumIncome = 0;

  await Promise.all(
    months.map(async (month: Month, index) => {
      const transactions = await Promise.all(
        await Transaction.find({
          createdAt: {
            $gte: moment(month.from).startOf(MomentConstants.DAY).toDate(),
            $lt: moment(month.to).endOf(MomentConstants.DAY).toDate()
          },
          userId
        })
      );

      try {
        transactions.forEach(({expense, income}) => {
          months[index].expense += expense;
          months[index].income += income;
        });
      } catch (error) {
        res.status(400).json({errorMsg: error});
      }
    })
  );
  months.forEach(({expense, income}) => {
    sumExpense += expense;
    sumIncome += income;
  });

  return res.json({months, sumExpense, sumIncome});
};
