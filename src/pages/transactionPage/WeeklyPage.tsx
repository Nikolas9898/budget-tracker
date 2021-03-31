import React from "react";
import AddTransactionButton from "../../layout/addTranasctionButton/AddTransactionButton";
import NavBar from "../../layout/header/Header";
import WeeklyContainer from "../../modules/transaction/weeklyContainer/WeeklyContainer";

const WeeklyPage = (props: any) => {
  return (
    <div>
      <NavBar />
      <WeeklyContainer />
      <AddTransactionButton />
    </div>
  );
};

export default WeeklyPage;
