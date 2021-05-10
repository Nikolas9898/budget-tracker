import React from 'react';
import NavBar from '../layout/header/Header';
import BootstrapDailyContainer from '../modules/transaction/bootstrapDailyContainer/BootstrapDailyContainer';

const BootstrapDaily = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <BootstrapDailyContainer />
    </>
  );
};

export default BootstrapDaily;
