import React from "react";
import InfoModalStyle from "./infoModalStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPen,
  faTrash,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import Moment from "moment";
import {
  Transaction,
  TransactionEvent,
} from "../../../../helpers/ITransactions";
import {
  transactionTypeIsIncome,
  transactionTypeIsExpense,
} from "../../../../helpers/Variables";
type Props = {
  isInfoTransactionOpen: boolean;
  handleOpenTransaction: (date: Date) => void;
  handleOpenInfoModal: (date: Date) => void;
  handleDelete: (eventId: string) => void;
  selectedDay: Transaction;
  handlePreviousDay: () => void;
  handleNextDay: () => void;
  handleOpenEdit: (event: TransactionEvent) => void;
};

const InfoModal: React.FC<Props> = ({
  isInfoTransactionOpen,
  handleOpenTransaction,
  handleDelete,
  handleOpenInfoModal,
  selectedDay,
  handleNextDay,
  handlePreviousDay,
  handleOpenEdit,
}) => {
  return (
    <div>
      {isInfoTransactionOpen ? (
        <div className={InfoModalStyle.modal_wrapper}>
          <div className={InfoModalStyle.wrapper_container}>
            <FontAwesomeIcon
              onClick={handlePreviousDay}
              className={InfoModalStyle.change_date}
              icon={faAngleLeft}
            />
            <div>
              <FontAwesomeIcon
                onClick={() => handleOpenInfoModal(new Date())}
                className={InfoModalStyle.close_button}
                icon={faTimesCircle}
              />
              <div className={InfoModalStyle.container}>
                <div className={InfoModalStyle.date}>
                  {Moment(selectedDay.createdAt).format("DD.MM.YYYY(dddd)")}
                </div>
                <div className={InfoModalStyle.content}>
                  <table>
                    {selectedDay.events.map(transaction => (
                      <tr>
                        <th className={InfoModalStyle.content_row}>
                          {transaction.category}
                          {transaction.from}
                        </th>
                        <th className={InfoModalStyle.content_row}>
                          {transaction.account}
                          {transaction.to}
                        </th>
                        <th className={InfoModalStyle.content_row}>
                          {transactionTypeIsIncome(
                            transaction.type,
                            transaction.amount
                          )}
                        </th>
                        <th className={InfoModalStyle.content_row}>
                          {transactionTypeIsExpense(
                            transaction.type,
                            transaction.amount
                          )}
                        </th>
                        <th className={InfoModalStyle.content_row}>
                          <div className={InfoModalStyle.function_container}>
                            <FontAwesomeIcon
                              className={InfoModalStyle.edit}
                              onClick={() => handleOpenEdit(transaction)}
                              icon={faPen}
                            />
                            <FontAwesomeIcon
                              className={InfoModalStyle.delete}
                              onClick={() => handleDelete(transaction._id)}
                              icon={faTrash}
                            />
                          </div>
                        </th>
                      </tr>
                    ))}
                  </table>
                </div>

                <FontAwesomeIcon
                  onClick={() => handleOpenTransaction(new Date())}
                  className={InfoModalStyle.add_button}
                  icon={faPlusCircle}
                />
              </div>
            </div>
            <FontAwesomeIcon
              onClick={handleNextDay}
              className={InfoModalStyle.change_date}
              icon={faAngleRight}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InfoModal;
