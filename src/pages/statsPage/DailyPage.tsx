import React from 'react';
import NavBar from '../../layout/header/Header';
import DailyContainer from '../../modules/stats/dailyContainer/DailyContainer';

const DailyPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <DailyContainer />
    </>
  );
};

export default DailyPage;
