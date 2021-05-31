import React, {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import WeeklyPage from './pages/transactionPage/WeeklyPage';
import DailyPage from './pages/transactionPage/DailyPage';
import YearlyPage from './pages/transactionPage/YearlyPage';
import MonthlyPage from './pages/transactionPage/MonthlyPage';
import WeeklyStatsPage from './pages/statsPage/WeeklyPage';
import PeriodStatsPage from './pages/statsPage/PeriodPage';
import YearlyStatsPage from './pages/statsPage/YearlyPage';
import MonthlyStatsPage from './pages/statsPage/MonthlyPage';
import ExportPage from './pages/exportPage/ExportPage';

const Routes = (): JSX.Element => {
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
        <Route path="/stats/monthly" exact component={MonthlyStatsPage} />
        <Route path="/stats/yearly" exact component={YearlyStatsPage} />
        <Route path="/stats/weekly" exact component={WeeklyStatsPage} />
        <Route path="/stats/period" exact component={PeriodStatsPage} />
        <Route path="/export" exact component={ExportPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
