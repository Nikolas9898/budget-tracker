import {RequestHandler, Request, Response} from 'express';
import Category, {DUMMY_EXPENSE_CATEGORIES, DUMMY_INCOME_CATEGORIES} from '../../models/category';
import ExpenseCategories from '../../dbModels/category/expenseCategory.model';
import IncomeCategories from '../../dbModels/category/incomeCategory.model';
import {tokenDecoder} from '../../helpers/tokenDecoder';

export const addCategories = async (
  userId: string
): Promise<{expenseCategories: Category; incomeCategories: Category}> => {
  try {
    const expenseCategories: Category = await new ExpenseCategories({
      userId,
      expenseCategories: DUMMY_EXPENSE_CATEGORIES
    });
    const incomeCategories: Category = await new IncomeCategories({
      userId,
      incomeCategories: DUMMY_INCOME_CATEGORIES
    });

    expenseCategories.save();
    incomeCategories.save();

    return {expenseCategories, incomeCategories};
  } catch (error) {
    return error;
  }
};

export const getUserCategories: RequestHandler = async (req: Request, res: Response) => {
  const userId: string = tokenDecoder(req.headers.authorization);

  try {
    const incomeCategories: Category[] = await IncomeCategories.find({userId});
    const expenseCategories: Category[] = await ExpenseCategories.find({userId});

    return res.json({incomeCategories, expenseCategories});
  } catch (error) {
    return res.json(error.message);
  }
};
