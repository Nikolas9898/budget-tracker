import React from 'react';
import NavBar from '../../layout/header/Header';
import MonthlyContainer from '../../modules/transaction/monthlyContainer/MonthlyContainer';

const MonthlyPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <MonthlyContainer />
    </>
  );
};

export default MonthlyPage;
