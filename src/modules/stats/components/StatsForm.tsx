import React from 'react';
import {PieChart} from 'react-minimal-pie-chart';
import {Stat} from '../../../models/Stat';
import './StatsFormStyle.css';

type Props = {
  stats: Stat[];
  isIncome: boolean;
  selected: number | undefined;
  handleSelect: (value: {index: number | undefined; isIncome: boolean}) => void;
};
const StatsForm: React.FC<Props> = ({stats, isIncome, selected, handleSelect}) => {
  let sumValue = 0;
  stats.forEach((stat) => {
    sumValue += stat.value;
  });

  const data = stats.map((entry, i) => {
    if (selected === i) {
      return {
        ...entry,
        color: 'grey'
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <div className="col text-center form_wrapper">
      <div className="row justify-content-center title_stats">{isIncome ? 'Income' : 'Expense'}</div>
      <div className="row justify-content-center">
        <PieChart
          style={{
            fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
            fontSize: '8px'
          }}
          data={data}
          radius={PieChart.defaultProps.radius - 6}
          lineWidth={60}
          segmentsStyle={{transition: 'stroke .3s', cursor: 'pointer'}}
          segmentsShift={(index) => (index === selected ? 6 : 1)}
          animate
          label={({dataEntry}) => dataEntry.percentage.toFixed(1)}
          labelPosition={100 - lineWidth / 2}
          labelStyle={{
            fill: '#fff',
            opacity: 0.75,
            pointerEvents: 'none'
          }}
          onMouseOver={(_, index) => {
            handleSelect({index, isIncome});
          }}
          onMouseOut={() => {
            handleSelect({index: undefined, isIncome});
          }}
        />
      </div>
      <div className="row justify-content-center mt-5">
        <table className="content_table">
          <tbody>
            {stats.map((stat: Stat, index: number) => (
              <tr
                className={`border-bottom  ${index === selected ? 'table_row_selected' : 'table_row'}`}
                onMouseEnter={() => handleSelect({index, isIncome})}
                onMouseLeave={() => handleSelect({index: undefined, isIncome})}
              >
                <td className="percent_container">
                  <div className="percent" style={{backgroundColor: stat.color}} />
                </td>
                <td>{((stat.value / sumValue) * 100).toFixed(1)}%</td>
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
