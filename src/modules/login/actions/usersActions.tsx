import { SIGN_IN } from "../actionTypes";

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
  }
};
