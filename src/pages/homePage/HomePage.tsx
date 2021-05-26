import React from 'react';

import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';

const HomePage = (): JSX.Element => {
  return (
    <div style={{display: 'flex'}}>
      <SideBar />
      <div style={{width: '100%'}}>
        <NavBar />
      </div>
    </div>
  );
};

export default HomePage;
