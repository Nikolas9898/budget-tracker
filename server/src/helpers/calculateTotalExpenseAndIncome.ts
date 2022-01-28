import TransactionType, {EventTypes} from '../models/transactions';

export const calculateTotalExpenseAndIncome = async (
  transaction: TransactionType,
  income: number,
  expense: number
): Promise<void> => {
  const {events} = transaction;

  await Promise.all(
    events.map((event) => {
      if (event.type.toLowerCase() === EventTypes.INCOME) {
        income += event.amount;
      }
      if (event.type.toLowerCase() === EventTypes.EXPENSE) {
        expense += event.amount;
      }
    })
  );
  transaction.income = income;
  transaction.expense = expense;
};
