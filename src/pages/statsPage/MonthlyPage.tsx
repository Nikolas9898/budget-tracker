import React from "react";
import NavBar from "../../layout/header/Header";
import MonthlyContainer from "../../modules/stats/monthlyContainer/MonthlyContainer";
import "../../scss/variables.scss";
const MonthlyPage = () => {
  return (
    <div>
      <NavBar />
      <MonthlyContainer />
    </div>
  );
};

export default MonthlyPage;
