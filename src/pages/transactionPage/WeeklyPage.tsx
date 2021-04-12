import React from 'react';
import AddTransactionButton from '../../layout/addTranasctionButton/AddTransactionButton';
import NavBar from '../../layout/header/Header';
import WeeklyContainer from '../../modules/transaction/weeklyContainer/WeeklyContainer';

const WeeklyPage = () => {
  return (
    <>
      <NavBar />
      <WeeklyContainer />
      <AddTransactionButton />
    </>
  );
};

export default WeeklyPage;
