import { Schema, model } from "mongoose";

export interface UserInterface {
  _id: string;
  username: string;
  password: string;
  email: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

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
      require: true,
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

export default model("User", userSchema);
