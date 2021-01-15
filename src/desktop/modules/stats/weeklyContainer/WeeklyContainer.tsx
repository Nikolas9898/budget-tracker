import React, {useState} from 'react';
import NavBarMenu from "../../../layout/navBarMenu/NavBarMenu";

const WeeklyContainer = () => {
    const [date, setDate] = useState(new Date());


    const handlePreviousMonth = () => {
        let Month = new Date(date).getMonth();
        let Year = date.getFullYear();
        let newMonth = new Date(Year, Month - 1);
        setDate(new Date(newMonth));
    };
    const handleNextMonth = () => {
        let Month = new Date(date).getMonth();
        let Year = date.getFullYear();
        let newMonth = new Date(Year, Month + 1);
        setDate(new Date(newMonth));
    };
    return (
        <div>
            <NavBarMenu
                handlePreviousMonth={handlePreviousMonth}
                handleNextMonth={handleNextMonth}
                date={date}
            />
        </div>
    );
};


export default WeeklyContainer;
