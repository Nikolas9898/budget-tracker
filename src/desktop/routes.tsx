import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import WeeklyPage from "./pages/transactionPage/WeeklyPage";
import DailyPage from "./pages/transactionPage/DailyPage";
import YearlyPage from "./pages/transactionPage/YearlyPage";
import HomePage from "./pages/homePage/HomePage";
import MonthlyPage from "./pages/transactionPage/MonthlyPage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/authentication" exact component={LoginPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/transaction/monthly" exact component={MonthlyPage} />
        <Route path="/transaction/daily" exact component={DailyPage} />
        <Route path="/transaction/yearly" exact component={YearlyPage} />
        <Route path="/transaction/weekly" exact component={WeeklyPage} />
        <Route path="/transaction/period" exact component={MonthlyPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
