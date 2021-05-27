import React, {useState} from 'react';
import NavBarMenu from '../../../layout/navBar/NavBar';
import StatsForm from '../components/StatsForm';

const WeeklyContainer = (): JSX.Element => {
  // TODO/mockup state//
  const [selectedIncome, setSelectedIncome] = useState<number | undefined>();
  const [selectedExpense, setSelectedExpense] = useState<number | undefined>();
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
  const handleSelect = (value: {index: number | undefined; isIncome: boolean}) => {
    if (value.isIncome) {
      setSelectedIncome(value.index);
    } else {
      setSelectedExpense(value.index);
    }
  };
  return (
    <div className="wrapper_stats">
      <NavBarMenu />
      <div className="row justify-content-evenly">
        <StatsForm stats={data} isIncome selected={selectedIncome} handleSelect={handleSelect} />
        <StatsForm stats={data} isIncome={false} selected={selectedExpense} handleSelect={handleSelect} />
      </div>
    </div>
  );
};

export default WeeklyContainer;
