import React from 'react';
import {PieChart} from 'react-minimal-pie-chart';
import {Stat} from '../../../models/Stat';
import './StatsFormStyle.css';

type Props = {
  stats: Stat[];
  isIncome: boolean;
};
const StatsForm: React.FC<Props> = ({stats, isIncome}) => {
  let sumValue = 0;
  stats.forEach((stat) => {
    sumValue += stat.value;
  });
  return (
    <div className="col text-center form_wrapper">
      <div className="row justify-content-center title">{isIncome ? 'Income' : 'Expense'}</div>
      <div className="row justify-content-center">
        <PieChart
          labelStyle={() => ({
            fontSize: '8px',
            fontFamily: 'sans-serif'
          })}
          radius={42}
          // labelPosition={112}
          animate
          // label={({dataEntry}) => dataEntry.category}
          data={stats}
        />
      </div>
      <div className="row justify-content-center">
        <table className="content_table">
          <tbody>
            {stats.map((stat: Stat) => (
              <tr className="border-bottom ">
                <td className="percent_content">
                  <div className="percent" style={{backgroundColor: stat.color}}>
                    {((stat.value / sumValue) * 100).toFixed(1)}%
                  </div>
                </td>
                <td>{stat.category.charAt(0).toUpperCase() + stat.category.slice(1)}</td>
                <td className="amount">{(stat.value / 100).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsForm;
