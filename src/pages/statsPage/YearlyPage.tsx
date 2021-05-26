import React from 'react';
import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';
import YearlyContainer from '../../modules/stats/yearlyContainer/YearlyContainer';

const YearlyPage = (): JSX.Element => {
  return (
    <div style={{display: 'flex'}}>
      <SideBar />
      <div style={{width: '100%'}}>
        <NavBar />
        <YearlyContainer />
      </div>
    </div>
  );
};

export default YearlyPage;
