import React from 'react';
import YearlyContainer from '../../modules/transaction/yearlyContainer/YearlyContainer';
import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';

const YearlyPage = (): JSX.Element => {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="w-100">
        <NavBar />
        <YearlyContainer />
      </div>
    </div>
  );
};

export default YearlyPage;
