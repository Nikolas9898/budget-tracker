import React from 'react';
import NavBarMenu from '../../../layout/navBar/NavBar';
import StatsForm from '../components/StatsForm';

const WeeklyContainer = (): JSX.Element => {
  // TODO/mockup state//
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
    <div className="container-fluid">
      <NavBarMenu />
      <div className="row justify-content-center">
        <StatsForm stats={data} isIncome />
        <StatsForm stats={data} isIncome={false} />
      </div>
    </div>
  );
};

export default WeeklyContainer;
