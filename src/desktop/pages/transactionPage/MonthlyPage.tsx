import React from 'react';
import NavBar from "../../layout/navBar/NavBar";
import TransactionContainer from "../../modules/transaction/monthlyContainer/TransactionContainer";
import queryString from 'query-string';

const MonthlyPage = (props:any) => {
    let filters = queryString.parse(props.location.search);
    return (
        <div>
            <NavBar/>
            <TransactionContainer filters={filters} />
        </div>
    );
};


export default MonthlyPage;
