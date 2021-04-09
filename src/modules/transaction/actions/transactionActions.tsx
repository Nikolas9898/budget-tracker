import { TransactionEvent } from "../../../interfaces/Transaction";
import { HandleInput } from "../../../interfaces/Function";
import { ActionTypes } from "../actionTypes";

export const handleNextMonth = () => ({
  type: ActionTypes.HANDLE_NEXT_MONTH,
});
export const handlePreviousMonth = () => ({
  type: ActionTypes.HANDLE_PREVIOUS_MONTH,
});
export const handleNextYear = () => ({
  type: ActionTypes.HANDLE_NEXT_YEAR,
});
export const handlePreviousYear = () => ({
  type: ActionTypes.HANDLE_PREVIOUS_YEAR,
});
export const handleInput = (event: HandleInput) => ({
  type: ActionTypes.HANDLE_INPUT,
  payload: { name: event.target.name, value: event.target.value },
});
export const setTransaction = (event: TransactionEvent) => ({
  type: ActionTypes.SET_TRANSACTION,
  payload: event,
});
export const setDate = (date: Date) => ({
  type: ActionTypes.SET_DATE,
  payload: date,
});
