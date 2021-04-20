import jwt from 'jsonwebtoken';
import {NextFunction, Request, RequestHandler, Response} from 'express';
import User from '../dbModels/user/user.model';
import {Token, TokenMessages} from '../models/token';

export const tokenAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const {authorization} = req.headers;
  let token: string | any = authorization;

  if (!token) return res.status(401).json({msg: TokenMessages.NO_TOKEN});

  token = token.split(' ').pop();

  try {
    const decodedToken: Token | any = jwt.decode(token);

    if (!decodedToken) return res.status(401).json({msg: TokenMessages.WRONG_TOKEN});

    await User.findOne({_id: decodedToken.id}, () => {
      return next();
    });
  } catch (error) {
    return res.json({msg: error});
  }
};
