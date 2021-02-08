export const calculateTotalExpenseAndIncome = (
  transfer: any,
  income: number,
  expense: number
) => {
  Promise.all(
    transfer.events.map((event: any) => {
      if (event.type.toLowerCase() === "income") {
        income += event.amount;
      }
      if (event.type.toLowerCase() === "expense") {
        expense += event.amount;
      }
    })
  ).then(() => {
    transfer.income = income;
    transfer.expense = expense;
  });
};
