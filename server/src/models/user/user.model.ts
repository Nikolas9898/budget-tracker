import { Schema, model } from "mongoose";
import { IUser } from "../../interfaces/user";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    categories: {
      type: [
        {
          name: String,
        },
      ],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
