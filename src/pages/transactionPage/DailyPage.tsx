import React from 'react';
import AddTransactionButton from '../../layout/addTranasctionButton/AddTransactionButton';
import NavBar from '../../layout/header/Header';
import DailyContainer from '../../modules/transaction/dailyContainer/DailyContainer';

const DailyPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <DailyContainer />
      <AddTransactionButton />
    </>
  );
};

export default DailyPage;
