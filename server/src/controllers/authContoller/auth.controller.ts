import User, { UserInterface } from "../../models/user/user.model";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const {
    username,
    bodyPassword,
    email,
    type,
    currency,
    categories,
  } = req.body;

  let token: string;
  let foundUser: UserInterface;
  const newUser = new User({
    username,
    bodyPassword,
    email,
    type,
    currency,
    categories,
  });

  await newUser
    .save()
    .then(async () => {
      await User.findOne(
        { email: req.body.email },
        (err, user: UserInterface) => {
          let {
            password,
            _id,
            username,
            email,
            type,
            categories,
            createdAt,
            updatedAt,
          } = user;

          const passMatch = password === req.body.password;

          if (!passMatch) {
            return res.json({ errorMSG: "Wrong email or password" });
          }

          foundUser = {
            _id,
            username,
            password: "",
            email,
            type,
            categories,
            createdAt,
            updatedAt,
          };

          token = jwt.sign(
            {
              id: _id,
            },
            "somesecretkeyforjsonwebtoken"
          );
        }
      );

      return res.json({ user: foundUser, token });
    })
    .catch((err) => {
      return res.status(400).json({ errorMSG: err });
    });
};

export const signIn: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  await User.findOne({ email }, (err, user: UserInterface) => {
    let {
      password,
      _id,
      username,
      email,
      type,
      categories,
      createdAt,
      updatedAt,
    } = user;

    try {
      const passMatch = password === req.body.password;

      if (!passMatch) {
        return res.json({ errorMSG: "Wrong email or password" });
      }

      let foundUser: UserInterface = {
        _id,
        username,
        password: "",
        email,
        type,
        categories,
        createdAt,
        updatedAt,
      };

      const token: string = jwt.sign(
        {
          id: user._id,
        },
        "somesecretkeyforjsonwebtoken"
      );

      res.json({ user: foundUser, token });
    } catch (error) {
      res.json({ errorMSG: "Wrong email or password" });
    }
  });
};
