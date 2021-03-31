import React from "react";
import YearlyContainer from "../../modules/transaction/yearlyContainer/YearlyContainer";
import NavBar from "../../layout/header/Header";
import AddTransactionButton from "../../layout/addTranasctionButton/AddTransactionButton";

const YearlyPage = (props: any) => {
  return (
    <div>
      <NavBar />
      <YearlyContainer />
      <AddTransactionButton />
    </div>
  );
};

export default YearlyPage;
