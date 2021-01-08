import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import TransactionPage from "./pages/transactionPage/TransactionPage";
import WeeklyPage from "./pages/transactionPage/WeeklyPage";
import DailyPage from "./pages/transactionPage/DailyPage";
import HomePage from "./pages/homePage/HomePage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/authentication" exact component={LoginPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/transaction/monthly" exact component={TransactionPage} />
        <Route path="/transaction/daily" exact component={DailyPage} />
        <Route path="/transaction/yearly" exact component={TransactionPage} />
        <Route path="/transaction/weekly" exact component={WeeklyPage} />
        <Route path="/transaction/period" exact component={TransactionPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
