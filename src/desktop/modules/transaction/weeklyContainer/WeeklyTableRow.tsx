import React from "react";
import Moment from "moment";
import WeeklyStyle from "./WeeklyStyle.module.css";
import { currentDay } from "../../../helpers/Variables";

type Props = {
  week: { from: any; to: any; income: number; expense: number };
};

const WeeklyTableRow: React.FC<Props> = ({ week }) => {
  const isDateInWeek = (week: any) => {
    if (
      new Date(week.from).getDate() <= new Date().getDate() &&
      new Date(week.from).getMonth() === new Date().getMonth() &&
      new Date(week.to).getDate() >= new Date().getDate() &&
      new Date(week.to).getMonth() === new Date().getMonth()
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <tr>
      <td className={WeeklyStyle.date_container}>
        <div
          className={
            isDateInWeek(week) ? WeeklyStyle.selected_date : WeeklyStyle.date
          }
        >
          {Moment(week.from).format("DD.MM")} ~{" "}
          {Moment(week.to).format("DD.MM")}
        </div>
      </td>
      <td className={WeeklyStyle.income}>{(week.income / 100).toFixed(2)}</td>
      <td className={WeeklyStyle.expense}>{(week.expense / 100).toFixed(2)}</td>
    </tr>
  );
};

export default WeeklyTableRow;
