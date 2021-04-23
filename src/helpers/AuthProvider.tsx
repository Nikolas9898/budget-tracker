import React, {ReactNode, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getUserByJWToken} from '../modules/transaction/service/TransactionService';
import {signIn} from '../modules/login/actions/usersActions';

type Props = {
  children: ReactNode;
};
const AuthProvider = ({children}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const getUser = async () => {
    const user = await getUserByJWToken();

    if (!user.user) {
      localStorage.removeItem('jwt');
      setIsLoading(false);
    } else {
      dispatch(signIn(user));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  });

  if (isLoading) {
    return <div />;
  }
  if (!localStorage.getItem('jwt') && !(window.location.pathname === '/authentication')) {
    window.location.pathname = '/authentication';
    return <div />;
  }

  return <>{children}</>;
};
export default AuthProvider;
