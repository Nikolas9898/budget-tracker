import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getUserByJWToken} from '../modules/transaction/service/TransactionService';
import {singIn} from '../modules/login/actions/usersActions';

const AuthProvider = (props: any): any => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const getUser = async () => {
    const user = await getUserByJWToken();

    if (!user.user) {
      localStorage.removeItem('jwt');
      setIsLoading(false);
    } else {
      dispatch(singIn(user));
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

  return props.children;
};
export default AuthProvider;
