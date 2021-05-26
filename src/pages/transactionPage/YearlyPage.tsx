import React from 'react';
import YearlyContainer from '../../modules/transaction/yearlyContainer/YearlyContainer';
import NavBar from '../../layout/header/Header';
import AddTransactionButton from '../../layout/addTranasctionButton/AddTransactionButton';
import SideBar from '../../layout/sideBar/SideBar';

const YearlyPage = (): JSX.Element => {
  return (
    <div style={{display: 'flex'}}>
      <SideBar />
      <div style={{width: '100%'}}>
        <NavBar />
        <YearlyContainer />
        <AddTransactionButton />
      </div>
    </div>
  );
};

export default YearlyPage;
