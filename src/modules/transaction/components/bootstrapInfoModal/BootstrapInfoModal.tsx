import React, {useCallback} from 'react';
import Moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import BootstrapTableRow from './components/BootstrapTableRow';
import {TransactionEventWithAmountNumber, TransactionWithAmountNumber} from '../../../../models/Transaction';
import classes from '../infoModal/infoModalStyle.module.css';

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

const BootstrapInfoModal: React.FC<Props> = ({
  handleOpenTransaction,
  handleDelete,
  handleOpenInfoModal,
  selectedTransaction,
  handleNextDay,
  handlePreviousDay,
  handleOpenEdit
}) => {
  const openInfoModal = useCallback(() => {
    handleOpenInfoModal(Moment().toDate());
  }, [handleOpenInfoModal]);
  return (
    <>
      <div className={classes.modal_wrapper}>
        <div className={classes.wrapper_container}>
          {/* <FontAwesomeIcon onClick={handlePreviousDay} className={classes.change_date} icon={faAngleLeft} /> */}
          <div>
            <FontAwesomeIcon onClick={openInfoModal} className={classes.close_button} icon={faTimesCircle} />
            <div className={classes.container}>
              <div className={classes.date}>{Moment(selectedTransaction.createdAt).format('DD.MM.YYYY(dddd)')}</div>
              <div className={classes.content}>
                <table>
                  {selectedTransaction.events.map((event) => (
                    <BootstrapTableRow event={event} handleDelete={handleDelete} handleOpenEdit={handleOpenEdit} />
                  ))}
                </table>
              </div>

              {/* <FontAwesomeIcon
                onClick={() => handleOpenTransaction(Moment().toDate())}
                className={classes.add_button}
                icon={faPlusCircle}
              /> */}
            </div>
          </div>
          {/* <FontAwesomeIcon onClick={handleNextDay} className={classes.change_date} icon={faAngleRight} /> */}
        </div>
      </div>
    </>
  );
};
export default BootstrapInfoModal;
