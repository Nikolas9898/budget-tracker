import {ChangeInputAction, SetTransactionAction, TransactionEvent, SetDateAction} from '../../../models/Transaction';
import {HandleInputChange} from '../../../models/Function';
import {ActionTypes} from '../actionTypes';

export const handlePreviousWeek = (): {
  type: ActionTypes;
} => ({
  type: ActionTypes.HANDLE_NEXT_WEEK
});
export const handleNextWeek = (): {
  type: ActionTypes;
} => ({
  type: ActionTypes.HANDLE_PREVIOUS_WEEK
});
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
export const transactionInputChange = (event: HandleInputChange): ChangeInputAction => ({
  type: ActionTypes.TRANSACTION_INPUT_CHANGE,
  payload: {name: event.target.name, value: event.target.value}
});
export const setTransaction = (event: TransactionEvent): SetTransactionAction => ({
  type: ActionTypes.SET_TRANSACTION,
  payload: event
});
export const setDate = (date: Date): SetDateAction => ({
  type: ActionTypes.SET_DATE,
  payload: date
});
export const setIsTransactionOpen = (): {
  type: ActionTypes;
} => ({
  type: ActionTypes.SET_IS_TRANSACTION_OPEN
});
