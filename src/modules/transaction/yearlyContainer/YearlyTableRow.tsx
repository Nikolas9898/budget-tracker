import React from "react";
import Moment from "moment";
import YearlyStyle from "./YearlyStyle.module.css";
import { useHistory } from "react-router-dom";

type Props = {
  month: { from: Date; to: Date; expense: number; income: number };
};

const YearlyTableRow: React.FC<Props> = ({ month }) => {
  const history = useHistory();
  return (
    <tr onClick={() => history.push(`/transaction/monthly?date=${month.from}`)}>
      {" "}
      <td className={YearlyStyle.month_content}>
        <div
          className={
            new Date().getMonth() === new Date(month.from).getMonth() &&
            new Date().getFullYear() === new Date(month.from).getFullYear()
              ? YearlyStyle.month_selected
              : YearlyStyle.month
          }
        >
          {Moment(month.from).format("MMM")}
        </div>
      </td>
      <td className={YearlyStyle.income}>{(month.income / 100).toFixed(2)}</td>
      <td className={YearlyStyle.expense}>
        {(month.expense / 100).toFixed(2)}
      </td>
    </tr>
  );
};

YearlyTableRow.propTypes = {};

export default YearlyTableRow;
