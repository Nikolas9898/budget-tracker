import React from 'react';
import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';
import WeeklyContainer from '../../modules/stats/weeklyContainer/WeeklyContainer';

const WeeklyPage = (): JSX.Element => {
  return (
    <div style={{display: 'flex'}}>
      <SideBar />
      <div style={{width: '100%'}}>
        <NavBar />
        <WeeklyContainer />
      </div>
    </div>
  );
};

export default WeeklyPage;
