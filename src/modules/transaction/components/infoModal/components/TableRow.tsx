import React from "react";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  isTransactionTypeIncome,
  isTransactionTypeExpense,
} from "../../../../../helpers/Variables";
import { TransactionEvent } from "../../../../../interfaces/Transaction";
import styles from "../infoModalStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  handleDelete: (eventId: string) => void;
  handleOpenEdit: (event: TransactionEvent) => void;
  event: TransactionEvent;
};
const TableRow: React.FC<Props> = ({ handleDelete, handleOpenEdit, event }) => {
  const { category, from, account, to, type, amount, _id } = event;
  return (
    <tr>
      <th className={styles.content_row}>
        {category}
        {from}
      </th>
      <th className={styles.content_row}>
        {account}
        {to}
      </th>
      <th className={styles.content_row}>
        {isTransactionTypeIncome(type, amount)}
      </th>
      <th className={styles.content_row}>
        {isTransactionTypeExpense(type, amount)}
      </th>
      <th className={styles.content_row}>
        <div className={styles.function_container}>
          <FontAwesomeIcon
            className={styles.edit}
            onClick={() => handleOpenEdit(event)}
            icon={faPen}
          />
          <FontAwesomeIcon
            className={styles.delete}
            onClick={() => handleDelete(_id)}
            icon={faTrash}
          />
        </div>
      </th>
    </tr>
  );
};
export default TableRow;
