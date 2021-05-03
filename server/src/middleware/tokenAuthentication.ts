import jwt_decode from 'jwt-decode';
import {NextFunction, Request, RequestHandler, Response} from 'express';
import User from '../dbModels/user/user.model';
import {Token, TokenMessages} from '../models/token';
import {UserType} from '../models/user';

export const tokenAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const {authorization} = req.headers;
  let token: string | undefined = authorization;

  if (!token) return res.status(401).json({msg: TokenMessages.NO_TOKEN});

  token = token.split(' ').pop();

  try {
    const decodedToken: Token = jwt_decode(token ? token : '');
    const user: UserType | null = await User.findOne({_id: decodedToken.sub});

    if (user) {
      return next();
    }
    return res.status(400).json({msg: TokenMessages.WRONG_TOKEN});
  } catch (error) {
    return res.json({msg: error});
  }
};
