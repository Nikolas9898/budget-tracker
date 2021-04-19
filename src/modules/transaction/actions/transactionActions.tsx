import {TransactionEvent} from '../../../models/Transaction';
import {HandleInput} from '../../../models/Function';
import {ActionTypes} from '../actionTypes';

export const handleNextMonth = (): {
  type: ActionTypes;
} => ({
  type: ActionTypes.HANDLE_NEXT_MONTH
});
export const handlePreviousMonth = (): {
  type: ActionTypes;
} => ({
  type: ActionTypes.HANDLE_PREVIOUS_MONTH
});
export const handleNextYear = (): {
  type: ActionTypes;
} => ({
  type: ActionTypes.HANDLE_NEXT_YEAR
});
export const handlePreviousYear = (): {
  type: ActionTypes;
} => ({
  type: ActionTypes.HANDLE_PREVIOUS_YEAR
});
export const handleInput = (
  event: HandleInput
): {
  type: ActionTypes;
  payload: {
    name: string;
    value: string | number | Date;
  };
} => ({
  type: ActionTypes.HANDLE_INPUT,
  payload: {name: event.target.name, value: event.target.value}
});
export const setTransaction = (
  event: TransactionEvent
): {
  type: ActionTypes;
  payload: TransactionEvent;
} => ({
  type: ActionTypes.SET_TRANSACTION,
  payload: event
});
export const setDate = (
  date: Date
): {
  type: ActionTypes;
  payload: Date;
} => ({
  type: ActionTypes.SET_DATE,
  payload: date
});
export const setIsTransactionOpen = (): {
  type: ActionTypes;
} => ({
  type: ActionTypes.SET_IS_TRANSACTION_OPEN
});
