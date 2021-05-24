import React from 'react';

import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';

const HomePage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <div className="container-fluid min-vw-100">
        <div className="row flex-nowrap">
          <div className="row">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
