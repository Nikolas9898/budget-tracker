import React, {useCallback} from 'react';
import Moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import BootstrapTableRow from './components/BootstrapTableRow';
import {TransactionEventWithAmountNumber, TransactionWithAmountNumber} from '../../../../models/Transaction';
import './bootstrapInfoModalStyle.css';

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
      <div className="modal_wrapper">
        <div className="container row align-items-center">
          <FontAwesomeIcon onClick={handlePreviousDay} icon={faAngleLeft} className="col-2 change_previous_date" />
          <div className="col-8 modal_info_wrapper">
            <FontAwesomeIcon onClick={openInfoModal} icon={faTimesCircle} />
            <div>
              <div>{Moment(selectedTransaction.createdAt).format('DD.MM.YYYY(dddd)')}</div>
              <div>
                <table>
                  {selectedTransaction.events.map((event) => (
                    <BootstrapTableRow event={event} handleDelete={handleDelete} handleOpenEdit={handleOpenEdit} />
                  ))}
                </table>
              </div>

              <FontAwesomeIcon
                onClick={() => handleOpenTransaction(Moment().toDate())}
                icon={faPlusCircle}
                className="add_button"
              />
            </div>
          </div>
          <FontAwesomeIcon onClick={handleNextDay} icon={faAngleRight} className="col-2 change_previous_date" />
        </div>
      </div>
    </>
  );
};
export default BootstrapInfoModal;
