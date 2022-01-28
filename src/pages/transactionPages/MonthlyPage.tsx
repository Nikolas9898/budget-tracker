import React from 'react';
import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';
import MonthlyContainer from '../../modules/transaction/monthlyContainer/MonthlyContainer';

const MonthlyPage = (): JSX.Element => {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="w-100">
        <NavBar />
        <MonthlyContainer />
      </div>
    </div>
  );
};

export default MonthlyPage;
