import { RequestHandler, Request, Response } from "express";
import User, { UserInterface } from "../../models/user/user.model";

export const getById: RequestHandler = (req, res) => {
  User.findById({ _id: req.params.id }, (err: any, user: UserInterface) => {
    try {
      if (!user) return res.json({ errorMSG: "No existing user" });

      let foundUser = {
        id: user._id,
        username: user.username,
        email: user.email,
        type: user.type,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      res.json({ user: foundUser });
    } catch (error) {
      res.json(error);
    }
  });
};
