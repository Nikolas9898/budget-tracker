import React from "react";
import NavBar from "../../layout/header/Header";
import MonthlyContainer from "../../modules/transaction/monthlyContainer/MonthlyContainer";
import queryString from "query-string";

const MonthlyPage = (props: any) => {
  let filters = queryString.parse(props.location.search);
  return (
    <div>
      <NavBar />
      <MonthlyContainer filters={filters} />
    </div>
  );
};

export default MonthlyPage;
