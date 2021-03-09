import React from "react";
import DailyTableRowStyle from "./DailyTableRow.module.css";

type Props = {
  handleSelectEvent: (event: Props["event"]) => void;
  event: {
    _id: string;
    type: string;
    date: Date;
    account?: string;
    from?: string;
    to?: string;
    category?: string;
    amount: number;
    fees: number;
    note: string;
    description: string;
  };
};
const DailyTableRow: React.FC<Props> = ({ event, handleSelectEvent }) => {
  return (
    <tr onClick={() => handleSelectEvent(event)}>
      <td>
        <div className={DailyTableRowStyle.account_container}>
          <div className={DailyTableRowStyle.account}>
            {event.type === "transfer" ? "Transfer" : event.category}
          </div>
          <div className={DailyTableRowStyle.category}>
            <div>{event.note}</div>
            {event.type === "transfer" ? (
              <div>
                {event.from}
                {" ---> "}
                {event.to}
              </div>
            ) : (
              event.account
            )}
          </div>
        </div>
      </td>
      <td className={DailyTableRowStyle.income}>
        {event.type === "income" ? (event.amount / 100).toFixed(2) : null}
      </td>
      <td
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
      </td>
    </tr>
  );
};

export default DailyTableRow;
