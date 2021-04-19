import React from 'react';
import queryString from 'query-string';
import NavBar from '../../layout/header/Header';
import MonthlyContainer from '../../modules/transaction/monthlyContainer/MonthlyContainer';

const MonthlyPage = (props: any): JSX.Element => {
  const {location} = props;
  const filters = queryString.parse(location.search);
  return (
    <>
      <NavBar />
      <MonthlyContainer filters={filters} />
    </>
  );
};

export default MonthlyPage;
