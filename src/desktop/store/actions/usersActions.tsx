import { SIGN_IN } from "../types";
import axios from "axios";

interface User {
  email: string;
  password: string;
}

export const singIn = (user: { email: string; password: string }) => async (
  dispatch: any
) => {
  try {
    const res = await axios.post<User>(`http://localhost:5000/signIn`, user);

    dispatch({
      type: SIGN_IN,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    // dispatch({
    //   type: USERS_ERROR,
    //   payload: console.log(e),
    // });
  }
};
