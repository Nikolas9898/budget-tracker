import {RequestHandler, Request, Response} from 'express';
import {tokenDecoder} from '../../helpers/tokenDecoder';
import {UserType, ResponseUser, succsessMessages, UserErrors} from '../../models/user';
import User from '../../dbModels/user/user.model';
import ExpenseCategories from '../../dbModels/category/expenseCategory.model';
import IncomeCategories from '../../dbModels/category/incomeCategory.model';

export const getLoggedUser: RequestHandler = async (req: Request, res: Response) => {
  let user: UserType | null;

  try {
    const {authorization} = req.headers;
    const userId: string = tokenDecoder(authorization);

    user = await User.findById({_id: userId}).populate('accounts');
  } catch (error) {
    return res.json(error.message);
  }

  if (!user) return res.json({errorMSG: UserErrors.NOT_EXISTING_USER});
  const {_id, username, email, type, accounts, createdAt, updatedAt} = user;
  const foundUser: ResponseUser = {
    _id,
    username,
    password: undefined,
    email,
    type,
    accounts,
    createdAt,
    updatedAt
  };
  const expenseCategories = await ExpenseCategories.findOne({userId: foundUser._id});
  const incomeCategories = await IncomeCategories.findOne({userId: foundUser._id});

  return res.json({user: foundUser, expenseCategories, incomeCategories});
};

export const editUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {authorization} = req.headers;
    const userId: string = tokenDecoder(authorization);

    await User.findByIdAndUpdate(userId, req.body, {new: true, useFindAndModify: false});
    return res.json(succsessMessages.UPDATED_SUCCESSFULLY);
  } catch (error) {
    return res.json(error.message);
  }
};
