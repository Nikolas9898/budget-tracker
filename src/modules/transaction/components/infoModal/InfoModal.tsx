import React from 'react';
import Moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import TableRow from './components/TableRow';
import {
  Transaction,
  TransactionEvent,
  TransactionEventWithAmountNumber,
  TransactionWithAmountNumber
} from '../../../../models/Transaction';
import styles from './infoModalStyle.module.css';

type Props = {
  isInfoTransactionOpen: boolean;
  handleOpenTransaction: (date: Date) => void;
  handleOpenInfoModal: (date: Date) => void;
  handleDelete: (eventId: string) => void;
  selectedTransaction: TransactionWithAmountNumber;
  handlePreviousDay: () => void;
  handleNextDay: () => void;
  handleOpenEdit: (event: TransactionEventWithAmountNumber) => void;
};

const InfoModal: React.FC<Props> = ({
  isInfoTransactionOpen,
  handleOpenTransaction,
  handleDelete,
  handleOpenInfoModal,
  selectedTransaction,
  handleNextDay,
  handlePreviousDay,
  handleOpenEdit
}) => (
  <>
    {isInfoTransactionOpen ? (
      <div className={styles.modal_wrapper}>
        <div className={styles.wrapper_container}>
          <FontAwesomeIcon onClick={() => handlePreviousDay()} className={styles.change_date} icon={faAngleLeft} />
          <div>
            <FontAwesomeIcon
              onClick={() => handleOpenInfoModal(Moment().toDate())}
              className={styles.close_button}
              icon={faTimesCircle}
            />
            <div className={styles.container}>
              <div className={styles.date}>{Moment(selectedTransaction.createdAt).format('DD.MM.YYYY(dddd)')}</div>
              <div className={styles.content}>
                <table>
                  {selectedTransaction.events.map((event) => (
                    <TableRow event={event} handleDelete={handleDelete} handleOpenEdit={handleOpenEdit} />
                  ))}
                </table>
              </div>

              <FontAwesomeIcon
                onClick={() => handleOpenTransaction(Moment().toDate())}
                className={styles.add_button}
                icon={faPlusCircle}
              />
            </div>
          </div>
          <FontAwesomeIcon onClick={() => handleNextDay()} className={styles.change_date} icon={faAngleRight} />
        </div>
      </div>
    ) : null}
  </>
);

export default InfoModal;
