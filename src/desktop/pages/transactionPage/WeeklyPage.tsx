import React from 'react';
import PropTypes from 'prop-types';
import NavBar from "../../layout/navBar/NavBar";
import WeeklyContainer from "../../modules/transaction/weeklyContainer/WeeklyContainer";


const WeeklyPage = () => {
    return (
        <div>
            <NavBar/>
            <WeeklyContainer/>
        </div>
    );
};

export default WeeklyPage;
