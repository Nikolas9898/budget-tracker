import React from 'react';
import NavBar from '../layout/header/Header';
import BootstrapMonthlyContainer from '../modules/transaction/bootstrapMonthlyContainer/BootstrapMonthlyContainer';

const BootstrapMonthly = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <BootstrapMonthlyContainer />
    </>
  );
};

export default BootstrapMonthly;
