import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IsAuthorizedUser from "./helpers/Authorization/IsAuthorizedUser";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import WeeklyPage from "./pages/transactionPage/WeeklyPage";
import DailyPage from "./pages/transactionPage/DailyPage";
import YearlyPage from "./pages/transactionPage/YearlyPage";
import MonthlyPage from "./pages/transactionPage/MonthlyPage";
import WeeklyStatsPage from "./pages/statsPage/WeeklyPage";
import DailyStatsPage from "./pages/statsPage/DailyPage";
import YearlyStatsPage from "./pages/statsPage/YearlyPage";
import MonthlyStatsPage from "./pages/statsPage/MonthlyPage";

const AuthorizedPage = (props: any) => {
  return (
    <IsAuthorizedUser onUnAuthorized={"/authentication"} pageReload={true}>
      {props.children}
    </IsAuthorizedUser>
  );
};
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/authentication"
          exact
          render={props => {
            return (
              <IsAuthorizedUser onAuthorized={"/"} pageReload={true}>
                <LoginPage />
              </IsAuthorizedUser>
            );
          }}
        />
        <Route
          path="/"
          exact
          render={props => {
            return (
              <AuthorizedPage>
                <HomePage {...props} />
              </AuthorizedPage>
            );
          }}
        />
        <Route
          path="/transaction/monthly"
          exact
          render={props => {
            return (
              <AuthorizedPage>
                <MonthlyPage {...props} />
              </AuthorizedPage>
            );
          }}
        />
        <Route
          path="/transaction/daily"
          exact
          render={props => {
            return (
              <AuthorizedPage>
                <DailyPage {...props} />
              </AuthorizedPage>
            );
          }}
        />
        <Route
          path="/transaction/yearly"
          exact
          render={props => {
            return (
              <AuthorizedPage>
                <YearlyPage {...props} />
              </AuthorizedPage>
            );
          }}
        />
        <Route
          path="/transaction/weekly"
          exact
          render={props => {
            return (
              <AuthorizedPage>
                <WeeklyPage {...props} />
              </AuthorizedPage>
            );
          }}
        />
        <Route
          path="/transaction/period"
          exact
          render={props => {
            return (
              <AuthorizedPage>
                <MonthlyPage {...props} />
              </AuthorizedPage>
            );
          }}
        />
        <Route path="/stats/monthly" exact component={MonthlyStatsPage} />
        <Route path="/stats/daily" exact component={DailyStatsPage} />
        <Route path="/stats/yearly" exact component={YearlyStatsPage} />
        <Route path="/stats/weekly" exact component={WeeklyStatsPage} />
        {/* <Route path="/stats/period" exact component={MonthlyStatsPage} /> */}

        <Route path="/stats/period" component={MonthlyStatsPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
