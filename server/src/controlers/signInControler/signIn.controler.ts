import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/user/user.model";
import { UserInterface } from "../../models/user/user.model";

export const signIn: RequestHandler = async (req: Request, res: Response) => {
  User.findOne(
    { username: req.body.username },
    (err: any, user: UserInterface) => {
      try {
        const passMatch = user.password === req.body.password;

        if (!passMatch) {
          res.json({ errorMSG: "Wrong email or password" });
        }

        let foundUser = {
          id: user._id,
          username: user.username,
          email: user.email,
          type: user.type,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        let token: string = jwt.sign(
          {
            id: user._id,
          },
          "somesecretkeyforjsonwebtoken"
        );

        res.json({ user: foundUser, token });
      } catch (error) {
        res.json({ errorMSG: "Wrong email or password" });
      }
    }
  );
};
