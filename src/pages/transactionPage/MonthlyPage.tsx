import React from 'react';
import AddTransactionButton from '../../layout/addTranasctionButton/AddTransactionButton';
import NavBar from '../../layout/header/Header';
import SideBar from '../../layout/sideBar/SideBar';
import MonthlyContainer from '../../modules/transaction/monthlyContainer/MonthlyContainer';

const MonthlyPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <div className="container-fluid min-vw-100">
        <div className="row flex-nowrap">
          <div className="row">
            <SideBar />
            <MonthlyContainer />
          </div>
        </div>
      </div>
      <AddTransactionButton />
    </>
  );
};

export default MonthlyPage;
