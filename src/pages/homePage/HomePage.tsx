import React from 'react';

import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';
import TotalContainer from '../../modules/transaction/total/TotalContainer';

const HomePage = (): JSX.Element => {
  return (
    <div className="d-flex">
      <SideBar />

      <div className="w-100">
        <NavBar />
        <TotalContainer />
      </div>
    </div>
  );
};

export default HomePage;
