import React from 'react';
import {PieChart} from 'react-minimal-pie-chart';
import './StatsFormStyle.css';

type Props = {
  stats: any;
  isIncome: boolean;
};
const StatsForm: React.FC<Props> = ({stats, isIncome}) => {
  return (
    <div className="form_wrapper">
      <div className="title">{isIncome ? 'Income' : 'Expense'}</div>
      <div className="pie_wrapper">
        <PieChart
          labelStyle={(index) => ({
            fontSize: '8px',
            fontFamily: 'sans-serif'
          })}
          radius={42}
          labelPosition={112}
          animate
          label={({dataEntry}) => dataEntry.category}
          data={stats}
        />
      </div>
      <div>
        <table className="content_table">
          <tbody>
            {stats.map((stat: any) => (
              <tr>
                <td className="percent_content">
                  <div className="percent" style={{backgroundColor: stat.color}}>
                    63%
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
