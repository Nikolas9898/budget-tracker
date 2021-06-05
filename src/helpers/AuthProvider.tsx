import React, {ReactNode, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getUserByJWToken} from '../modules/transaction/service/TransactionService';
import {saveUser} from '../modules/login/actions/usersActions';

type Props = {
  children: ReactNode;
};
const AuthProvider = ({children}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await getUserByJWToken();

      const {data} = response;

      if (!data.user) {
        localStorage.removeItem('jwt');
        setIsLoading(false);
      } else {
        dispatch(saveUser(data));
        setIsLoading(false);
      }
    } catch (error) {
      localStorage.removeItem('jwt');
      setIsLoading(false);
      throw new Error(error.message);
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
