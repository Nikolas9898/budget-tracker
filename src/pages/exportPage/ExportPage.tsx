import React from 'react';
import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';
import ExportContainer from '../../modules/export/ExportContainer';

const ExportPage = (): JSX.Element => {
  return (
    <div style={{display: 'flex'}}>
      <SideBar />
      <div style={{width: '100%'}}>
        <NavBar />
        <ExportContainer />
      </div>
    </div>
  );
};

export default ExportPage;
