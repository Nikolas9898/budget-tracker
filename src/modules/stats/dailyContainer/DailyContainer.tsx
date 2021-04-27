import React, {useEffect, useState} from 'react';
import axiosConfig from '../../../axiosConfig';
import NavBarMenu from '../../../layout/navBar/NavBar';
import StatsForm from '../components/StatsForm';

const DailyContainer = (): JSX.Element => {
  const [incomeStats, setIncomeStats] = useState([]);
  const [expenseStats, setExpenseStats] = useState([]);
  const getDailyStats = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    };
    try {
      const response = await axiosConfig.get(`/stats/2020-01-28T22:00:00.000Z/2021-12-30T21:00:00.000Z`, config);

      setIncomeStats(response.data.incomeStats);
      setExpenseStats(response.data.expenseStats);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getDailyStats();
  }, []);
  return (
    <div className="wrapper">
      <NavBarMenu />
      <div className="stats_container">
        <StatsForm stats={incomeStats} isIncome />
        <StatsForm stats={expenseStats} isIncome={false} />
      </div>
    </div>
  );
};

export default DailyContainer;
