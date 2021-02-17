import React from "react";
import DailyStyle from "../../DailyStyle.module.css";
import { Transaction } from "../../../../../helpers/Typeses";
import Moment from "moment";
type Props = {
  transaction: Transaction;
};
const DailyTableHeader: React.FC<Props> = ({ transaction }) => {
  return (
    <tr>
      <th>
        <div className={DailyStyle.date_content}>
          <div className={DailyStyle.date}>
            {Moment(transaction.createdAt).format("DD")}
          </div>
          <div>
            <div className={DailyStyle.date_year}>
              {Moment(transaction.createdAt).format("MM.YYYY")}
            </div>
            <div
              className={
                new Date(transaction.createdAt).toISOString() ===
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate()
                ).toISOString()
                  ? DailyStyle.date_day_select
                  : DailyStyle.date_day
              }
            >
              {Moment(transaction.createdAt).format("ddd")}
            </div>
          </div>
        </div>
      </th>
      <th>
        <div className={DailyStyle.income}>
          {(transaction.income / 100).toFixed(2)}
        </div>
      </th>
      <th>
        <div className={DailyStyle.expense}>
          {(transaction.expense / 100).toFixed(2)}
        </div>
      </th>
    </tr>
  );
};

export default DailyTableHeader;
