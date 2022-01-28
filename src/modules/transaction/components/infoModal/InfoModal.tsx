import React, {useCallback} from 'react';
import Moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {TransactionEventWithAmountNumber, TransactionWithAmountNumber} from '../../../../models/Transaction';
import classes from './infoModalStyle.module.css';

type Props = {
  handleOpenTransaction: (date: Date) => void;
  handleOpenInfoModal: (date: Date) => void;
  handleDelete: (eventId: string) => void;
  selectedTransaction: TransactionWithAmountNumber;
  handlePreviousDay: () => void;
  handleNextDay: () => void;
  handleOpenEdit: (event: TransactionEventWithAmountNumber) => void;
};

const InfoModal: React.FC<Props> = ({
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
        <div className={`container row align-items-center ${classes.modal_container_wrapper}`}>
          <FontAwesomeIcon
            onClick={handlePreviousDay}
            icon={faAngleLeft}
            className={`col-2 ${classes.change_previous_date}`}
          />
          <div className={`col-8 ${classes.modal_info_wrapper}`}>
            <FontAwesomeIcon onClick={openInfoModal} icon={faTimesCircle} className={classes.close_button} />

            <div className="text-center font-weight-bold">
              {Moment(selectedTransaction.createdAt).format('DD.MM.YYYY(dddd)')}
            </div>

            {/* <table className="container mt-2">
              {selectedTransaction.events.map((event) => (
                <TableRow event={event} handleDelete={handleDelete} handleOpenEdit={handleOpenEdit} />
              ))}
            </table> */}

            <FontAwesomeIcon
              onClick={() => handleOpenTransaction(Moment().toDate())}
              icon={faPlusCircle}
              className={classes.add_button}
            />
          </div>
          <FontAwesomeIcon
            onClick={handleNextDay}
            icon={faAngleRight}
            className={`col-2 ${classes.change_previous_date}`}
          />
        </div>
      </div>
    </>
  );
};
export default InfoModal;
