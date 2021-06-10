import React from 'react';
import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';
import DailyContainer from '../../modules/transaction/dailyContainer/DailyContainer';

const DailyPage = (): JSX.Element => {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="w-100">
        <NavBar />
        <DailyContainer />
      </div>
    </div>
  );
};

export default DailyPage;
