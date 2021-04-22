import jwt from 'jsonwebtoken';
import {Request, RequestHandler, Response} from 'express';
import User from '../../dbModels/user/user.model';
import {UserType, ResponseUser, UserErrors} from '../../models/user';
import {addCategories} from '../../helpers/userHelpers/userHelpers';

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newUser = await new User({
      ...req.body
    });

    await newUser.save();
    await User.findOne({email: req.body.email}, (err, user: UserType) => {
      const {password, _id, username, email, type, createdAt, updatedAt} = user;
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
        createdAt,
        updatedAt
      };

      addCategories(_id);

      const token: string = jwt.sign(
        {
          sub: _id
        },
        'somesecretkeyforjsonwebtoken'
      );

      return res.json({user: foundUser, token});
    });
  } catch (err) {
    return res.status(400).json({errorMSG: err});
  }
};

export const signIn: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {email} = req.body;

    await User.findOne({email}, (err, user: UserType) => {
      if (!user) {
        return res.json({errorMSG: UserErrors.NOT_EXISTING_USER});
      }

      const {password, _id, username, email, type, createdAt, updatedAt} = user;
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
        createdAt,
        updatedAt
      };
      const token: string = jwt.sign(
        {
          sub: user._id
        },
        'somesecretkeyforjsonwebtoken'
      );

      return res.json({user: foundUser, token});
    });
  } catch (error) {
    return res.json({errorMSG: UserErrors.WRONG_EMAIL_OR_PASSWORD});
  }
};
