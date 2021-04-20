import Category, {DUMMY_EXPENSE_CATEGORIES, DUMMY_INCOME_CATEGORIES} from '../../models/category';
import ExpenseCategories from '../../dbModels/category/expenseCategory';
import IncomeCategories from '../../dbModels/category/incomeCategory';

export const addCategories = async (userId: string): Promise<unknown> => {
  try {
    const expenseCategories: Category = await new ExpenseCategories({
      userId,
      expenseCategories: DUMMY_EXPENSE_CATEGORIES
    });
    const incomeCategories: Category = await new IncomeCategories({
      userId,
      DUMMY_INCOME_CATEGORIES
    });

    expenseCategories.save();
    incomeCategories.save();
  } catch (error) {
    return error;
  }
};
