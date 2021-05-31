import React from 'react';
import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';
import DailyContainer from '../../modules/stats/periodContainer/DailyContainer';

const PeriodPage = (): JSX.Element => {
  return (
    <div style={{display: 'flex'}}>
      <SideBar />
      <div style={{width: '100%'}}>
        <NavBar />
        <DailyContainer />
      </div>
    </div>
  );
};

export default PeriodPage;
