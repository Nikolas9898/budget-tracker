import React from 'react';
import YearlyContainer from '../../modules/transaction/yearlyContainer/YearlyContainer';
import NavBar from '../../layout/header/Header';
import AddTransactionButton from '../../layout/addTranasctionButton/AddTransactionButton';

const YearlyPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <YearlyContainer />
      <AddTransactionButton />
    </>
  );
};

export default YearlyPage;
