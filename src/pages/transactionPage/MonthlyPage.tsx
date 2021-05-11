import React from 'react';
import AddTransactionButton from '../../layout/addTranasctionButton/AddTransactionButton';
import NavBar from '../../layout/header/Header';
import MonthlyContainer from '../../modules/transaction/monthlyContainer/MonthlyContainer';

const MonthlyPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <MonthlyContainer />
      <AddTransactionButton />
    </>
  );
};

export default MonthlyPage;
