import React, {useState} from 'react';
import NavBarMenu from '../../../layout/navBar/NavBar';
import StatsForm from '../components/StatsForm';

const YearlyContainer = () => {
  const [date, setDate] = useState(new Date());
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);

  const data = [
    {
      category: 'food',
      value: 16900,
      color: '#E38627',
      label: 'category'
    },
    {category: 'beauty', value: 4000, color: 'red', label: 'beauty'},
    {category: 'culture', value: 45699, color: 'blue', label: 'culture'}
  ];
  return (
    <div className="wrapper">
      <NavBarMenu />
      <div className="stats_container">
        <StatsForm stats={data} isIncome />
        <StatsForm stats={data} isIncome={false} />
      </div>
    </div>
  );
};

export default YearlyContainer;
