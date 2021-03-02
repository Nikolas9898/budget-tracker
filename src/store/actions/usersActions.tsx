import { SIGN_IN } from "../types";

export const singIn = (user: {
  email: string;
  password: string;
  categories: [];
  createdAt: string;
  username: string;
  updatedAt: string;
  type: string;
  id: string;
  token: string;
}) => async (dispatch: any) => {
  try {
    await dispatch({
      type: SIGN_IN,
      payload: user,
    });
  } catch (e) {
    console.log(e);
  }
};
