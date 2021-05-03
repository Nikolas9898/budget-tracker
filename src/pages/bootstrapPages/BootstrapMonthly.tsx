import React from 'react';
import NavBar from '../../layout/header/Header';
import MonthlyContainer from '../../modules/transaction/monthlyContainer/MonthlyContainer';

const BootstrapMonthly = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <MonthlyContainer />
    </>
  );
};

export default BootstrapMonthly;
