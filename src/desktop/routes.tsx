import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import WeeklyPage from "./pages/transactionPage/WeeklyPage";
import DailyPage from "./pages/transactionPage/DailyPage";
import YearlyPage from "./pages/transactionPage/YearlyPage";
import HomePage from "./pages/homePage/HomePage";
import MonthlyPage from "./pages/transactionPage/MonthlyPage";
import WeeklyStatsPage from "./pages/statsPage/WeeklyPage";
import DailyStatsPage from "./pages/statsPage/DailyPage";
import YearlyStatsPage from "./pages/statsPage/YearlyPage";
import MonthlyStatsPage from "./pages/statsPage/MonthlyPage";
import { AuthenticatedRoute } from "./helpers/AuthRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/authentication" exact component={LoginPage} />
        <AuthenticatedRoute path="/" exact component={HomePage} />
        <AuthenticatedRoute
          path="/transaction/monthly"
          exact
          component={MonthlyPage}
        />
        <AuthenticatedRoute
          path="/transaction/daily"
          exact
          component={DailyPage}
        />
        <AuthenticatedRoute
          path="/transaction/yearly"
          exact
          component={YearlyPage}
        />
        <AuthenticatedRoute
          path="/transaction/weekly"
          exact
          component={WeeklyPage}
        />
        <AuthenticatedRoute
          path="/transaction/period"
          exact
          component={MonthlyPage}
        />
        <AuthenticatedRoute
          path="/stats/monthly"
          exact
          component={MonthlyStatsPage}
        />
        <AuthenticatedRoute
          path="/stats/daily"
          exact
          component={DailyStatsPage}
        />
        <AuthenticatedRoute
          path="/stats/yearly"
          exact
          component={YearlyStatsPage}
        />
        <AuthenticatedRoute
          path="/stats/weekly"
          exact
          component={WeeklyStatsPage}
        />
        {/* <Route path="/stats/period" exact component={MonthlyStatsPage} /> */}

        <AuthenticatedRoute path="/stats/period" component={MonthlyStatsPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
