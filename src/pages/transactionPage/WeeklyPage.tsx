import React from 'react';
import AddTransactionButton from '../../layout/addTranasctionButton/AddTransactionButton';
import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';
import WeeklyContainer from '../../modules/transaction/weeklyContainer/WeeklyContainer';

const WeeklyPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <div className="container-fluid min-vw-100">
        <div className="row flex-nowrap">
          <div className="row">
            <SideBar />
            <WeeklyContainer />
          </div>
        </div>
      </div>

      <AddTransactionButton />
    </>
  );
};

export default WeeklyPage;
