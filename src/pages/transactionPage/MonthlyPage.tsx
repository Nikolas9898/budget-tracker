import React from 'react';
import queryString from 'query-string';
import {RouteComponentProps} from 'react-router';
import NavBar from '../../layout/header/Header';
import MonthlyContainer from '../../modules/transaction/monthlyContainer/MonthlyContainer';

const MonthlyPage = (props: RouteComponentProps): JSX.Element => {
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
