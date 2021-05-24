import React from 'react';
import YearlyContainer from '../../modules/transaction/yearlyContainer/YearlyContainer';
import NavBar from '../../layout/header/Header';
import AddTransactionButton from '../../layout/addTranasctionButton/AddTransactionButton';
import SideBar from '../../layout/sideBar/SideBar';

const YearlyPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <div className="container-fluid min-vw-100">
        <div className="row flex-nowrap">
          <div className="row">
            <SideBar />
            <YearlyContainer />
          </div>
        </div>
      </div>
      <AddTransactionButton />
    </>
  );
};

export default YearlyPage;
