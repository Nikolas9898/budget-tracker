import React from 'react';
import AddTransactionButton from '../../layout/addTranasctionButton/AddTransactionButton';
import NavBar from '../../layout/header/Header';
import WeeklyContainer from '../../modules/transaction/weeklyContainer/WeeklyContainer';

const WeeklyPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <WeeklyContainer />
      <AddTransactionButton />
    </>
  );
};

export default WeeklyPage;
