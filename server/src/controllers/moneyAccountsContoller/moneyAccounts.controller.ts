import {RequestHandler, Request, Response} from 'express';
import {MoneyAccount} from '../../models/user';
import MoneyAccounts from '../../dbModels/moneyAccounts/moneyAccounts.model';
import {tokenDecoder} from '../../helpers/tokenDecoder';

export const getMoneyAccountsByUserId: RequestHandler = async (req: Request, res: Response) => {
  let moneyAccounts: MoneyAccount | null;
  const userId: string = tokenDecoder(req.headers.authorization);

  try {
    moneyAccounts = await MoneyAccounts.findOne({userId});
  } catch (error) {
    return res.json(error.message);
  }

  return res.json(moneyAccounts);
};
