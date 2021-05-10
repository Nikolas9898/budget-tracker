import React from 'react';
import NavBar from '../layout/header/Header';
import BootstrapWeeklyContainer from '../modules/transaction/bootstrapWeekly/BootstrapWeeklyContainer';

const BootstrapWeekly = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <BootstrapWeeklyContainer />
    </>
  );
};

export default BootstrapWeekly;
