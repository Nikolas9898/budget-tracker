import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import TransactionPage from "./pages/transactionPage/TransactionPage";
import WeeklyPage from "./pages/transactionPage/WeeklyPage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/transaction/monthly" exact component={TransactionPage} />
        <Route path="/transaction/daily" exact component={TransactionPage} />
        <Route path="/transaction/yearly" exact component={TransactionPage} />
        <Route path="/transaction/weekly" exact component={WeeklyPage}/>
        <Route path="/transaction/period" exact component={TransactionPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
