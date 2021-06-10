import React from 'react';
import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';
import WeeklyContainer from '../../modules/transaction/weeklyContainer/WeeklyContainer';

const WeeklyPage = (): JSX.Element => {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="w-100">
        <NavBar />
        <WeeklyContainer />
      </div>
    </div>
  );
};

export default WeeklyPage;
