import jwt from 'jsonwebtoken';
import {Request, RequestHandler, Response} from 'express';
import User from '../../dbModels/user/user.model';
import MoneyAccounts from '../../dbModels/moneyAccounts/moneyAccounts.model';
import {UserType, ResponseUser, UserErrors, accounts} from '../../models/user';
import {addCategories} from '../categoryController/category.controller';
import ExpenseCategories from '../../dbModels/category/expenseCategory.model';
import IncomeCategories from '../../dbModels/category/incomeCategory.model';

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  let user: UserType | null;

  try {
    const newUser = await new User({
      ...req.body
    });
    const moneyAccounts = await new MoneyAccounts({userId: newUser._id, accounts});

    newUser.accounts.push(moneyAccounts._id);

    await moneyAccounts.save();
    await newUser.save();

    user = await User.findOne({email: req.body.email}).populate('accounts');
  } catch (err) {
    return res.status(400).json({errorMSG: err.message});
  }
  if (user) {
    const {password, _id, username, email, type, accounts, createdAt, updatedAt} = user;
    const passMatch: boolean = password === req.body.password;

    if (!passMatch) {
      return res.json({errorMSG: UserErrors.WRONG_EMAIL_OR_PASSWORD});
    }

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
    const {expenseCategories, incomeCategories} = await addCategories(_id);
    const token: string = jwt.sign(
      {
        sub: _id
      },
      'somesecretkeyforjsonwebtoken'
    );

    return res.json({user: foundUser, token, expenseCategories, incomeCategories});
  }
};

export const signIn: RequestHandler = async (req: Request, res: Response) => {
  let user: UserType | null;

  try {
    const {email} = req.body;

    user = await User.findOne({email}).populate('accounts');
  } catch (error) {
    return res.json({errorMSG: UserErrors.WRONG_EMAIL_OR_PASSWORD});
  }

  if (!user) {
    return res.json({errorMSG: UserErrors.NOT_EXISTING_USER});
  }

  const {password, _id, username, email, type, createdAt, accounts, updatedAt} = user;
  const passMatch: boolean = password === req.body.password;

  if (!passMatch) {
    return res.json({errorMSG: UserErrors.WRONG_EMAIL_OR_PASSWORD});
  }

  const foundUser: ResponseUser = {
    _id,
    username,
    accounts,
    password: undefined,
    email,
    type,
    createdAt,
    updatedAt
  };
  const token: string = jwt.sign(
    {
      sub: user._id
    },
    'somesecretkeyforjsonwebtoken'
  );
  const expenseCategories = await ExpenseCategories.findOne({userId: foundUser._id});
  const incomeCategories = await IncomeCategories.findOne({userId: foundUser._id});

  return res.json({user: foundUser, token, expenseCategories, incomeCategories});
};
