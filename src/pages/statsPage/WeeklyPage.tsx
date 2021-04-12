import React from 'react';
import NavBar from '../../layout/header/Header';
import WeeklyContainer from '../../modules/stats/weeklyContainer/WeeklyContainer';

const WeeklyPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <WeeklyContainer />
    </>
  );
};

export default WeeklyPage;
