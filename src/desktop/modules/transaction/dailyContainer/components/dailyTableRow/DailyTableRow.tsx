import React from "react";
import DailyStyle from "../../DailyStyle.module.css";
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
  const handleViewAmount = (event: Props["event"]) => {
    switch (event.type) {
      case "expense":
        return (
          <div className={DailyTableRowStyle.expense}>
            {(event.amount / 100).toFixed(2)}
          </div>
        );
      case "transfer":
        return (
          <div className={DailyTableRowStyle.transfer}>
            {(event.amount / 100).toFixed(2)}
          </div>
        );
    }
  };
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
          {event.type === "expense"||event.type === "transfer" ? (event.amount / 100).toFixed(2) : null}
      </th>
    </tr>
  );
};

export default DailyTableRow;
