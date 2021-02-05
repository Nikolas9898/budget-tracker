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
import {
  faTimesCircle
} from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import { State } from "../../monthlyContainer/TransactionContainer";


type Props = {
  isInfoTransactionOpen: boolean;
  handleOpenTransaction: (date: any) => void;
  handleOpenInfoModal: (date: any) => void;
  handleDelete: (transactionId: any, eventId: any) => void;
  selectedDay: State["selectedDay"];
  handlePreviousDay: () => void;
  handleNextDay: () => void;
  handleOpenEdit: (event: any) => void;
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
              onClick={() => handlePreviousDay()}
              className={InfoModalStyle.change_date}
              icon={faAngleLeft}
            />
            <div>
              <FontAwesomeIcon
                  onClick={() => handleOpenInfoModal("")}
                  className={InfoModalStyle.close_button}
                  icon={faTimesCircle}
              />
              <div className={InfoModalStyle.container}>

                <div className={InfoModalStyle.date}>
                  {moment(selectedDay.createdAt).format("DD.MM.YYYY(dddd)")}
                </div>
                <div className={InfoModalStyle.content}>
                  <table>
                    {selectedDay.events.map((transaction) => (
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
                            {transaction.type === "income"
                                ? (parseFloat(transaction.amount) / 100).toFixed(2)
                                : ""}
                          </th>
                          <th className={InfoModalStyle.content_row}>
                            {transaction.type !== "income"
                                ? (parseFloat(transaction.amount) / 100).toFixed(2)
                                : ""}
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
                                  onClick={() =>
                                      handleDelete(selectedDay._id, transaction._id)
                                  }
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
              onClick={() => handleNextDay()}
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
