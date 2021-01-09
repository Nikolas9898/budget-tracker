import { useHistory } from "react-router-dom";

import { SIGN_IN } from "../types";
import axios from "axios";

interface User {
  email: string;
  password: string;
}

export const singIn = (user: {
  email: string;
  password: string;
  categories: [];
  createdAt: string;
  username: string;
  updatedAt: string;
  type: string;
  id: string;
}) => async (dispatch: any) => {
  try {
    await dispatch({
      type: SIGN_IN,
      payload: user,
    });
  } catch (e) {
    console.log(e);
    // dispatch({
    //   type: USERS_ERROR,
    //   payload: console.log(e),
    // });
  }
};
