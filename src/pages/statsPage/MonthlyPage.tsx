import React from 'react';
import NavBar from '../../layout/header/Header';
import MonthlyContainer from '../../modules/stats/monthlyContainer/MonthlyContainer';

const MonthlyPage = () => {
  return (
    <>
      <NavBar />
      <MonthlyContainer />
    </>
  );
};

export default MonthlyPage;
