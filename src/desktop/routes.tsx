import React from "react";
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import TransactionPage from './pages/transactionPage/TransactionPage';


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={LoginPage} />
                <Route path="/" exact component={TransactionPage} />
            </Switch>
        </Router>
    );
};


export default Routes;
