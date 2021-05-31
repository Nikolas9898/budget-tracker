import {RequestHandler, Request, Response} from 'express';
import {tokenDecoder} from '../../helpers/tokenDecoder';
import {UserType, ResponseUser, succsessMessages, UserErrors} from '../../models/user';
import User from '../../dbModels/user/user.model';

export const getLoggedUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {authorization} = req.headers;
    const userId: string = tokenDecoder(authorization);

    await User.findById({_id: userId}, (err, user: UserType) => {
      const {_id, username, email, type, createdAt, updatedAt} = user;

      if (!user) return res.json({errorMSG: UserErrors.NOT_EXISTING_USER});

      const foundUser: ResponseUser = {
        _id,
        username,
        password: undefined,
        email,
        type,
        createdAt,
        updatedAt
      };

      return res.json({user: foundUser});
    });
  } catch (error) {
    return res.json(error);
  }
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
