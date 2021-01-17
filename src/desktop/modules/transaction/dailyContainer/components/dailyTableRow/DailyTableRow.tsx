import React from "react";
import DailyTableRowStyle from "./DailyTableRow.module.css";

type Props = {
  event: {
    _id?: string;
    type: string;
    date: any;
    account?: string;
    from?: string;
    to?: string;
    fees: number;
    category?: string;
    amount: number;
    note: string;
    description: string;
  };
};
const DailyTableRow: React.FC<Props> = ({ event }) => {
  return (
    <tr>
      <th className={DailyTableRowStyle.account}>
        {event.type == "transfer" ? "Transfer" : event.category}
      </th>
      <th className={DailyTableRowStyle.category}>
        <div>{event.note}</div>
        <div>
          {event.type == "transfer" ? (
            <div>
              {event.from}
              {"--->"}
              {event.to}
            </div>
          ) : (
            event.account
          )}
        </div>
      </th>
      <th className={DailyTableRowStyle.income}>
        {event.type === "income" ? (event.amount / 100).toFixed(2) : null}
      </th>
      <th
        className={
          event.type === "expense"
            ? DailyTableRowStyle.expense
            : DailyTableRowStyle.transfer
        }
      >
        <div>
          {event.type === "expense" || event.type === "transfer"
            ? (event.amount / 100).toFixed(2)
            : null}
        </div>
      </th>
    </tr>
  );
};

export default DailyTableRow;
