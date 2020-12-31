import React from 'react';
import NavBar from "../../layout/navBar/NavBar";
import TransactionContainer from "../../modules/transaction/monthlyContainer/TransactionContainer";


const TransactionPage = () => {
    return (
        <div>
        <NavBar/>
        <TransactionContainer/>
        </div>
    );
};


export default TransactionPage;
