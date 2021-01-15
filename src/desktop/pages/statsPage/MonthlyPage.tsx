import React from 'react';
import NavBar from "../../layout/navBar/NavBar";
import MonthlyContainer from "../../modules/stats/monthlyContainer/MonthlyContainer";


const MonthlyPage = () => {
    return (
        <div>
            <NavBar />
            <MonthlyContainer/>
        </div>
    );
};


export default MonthlyPage;
