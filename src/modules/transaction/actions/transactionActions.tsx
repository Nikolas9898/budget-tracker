import { HandleInput, TransactionEvent } from "../../../helpers/ITransactions";
import {
  HANDLE_NEXT_MONTH,
  HANDLE_PREVIOUS_MONTH,
  HANDLE_NEXT_YEAR,
  HANDLE_PREVIOUS_YEAR,
  HANDLE_INPUT,
  SET_TRANSACTION,
} from "../actionTypes";

export const handleNextMonth = () => ({
  type: HANDLE_NEXT_MONTH,
});
export const handlePreviousMonth = () => ({
  type: HANDLE_PREVIOUS_MONTH,
});
export const handleNextYear = () => ({
  type: HANDLE_NEXT_YEAR,
});
export const handlePreviousYear = () => ({
  type: HANDLE_PREVIOUS_YEAR,
});
export const handleInput = (event: HandleInput) => ({
  type: HANDLE_INPUT,
  payload: { name: event.target.name, value: event.target.value },
});
export const setTransaction = (event: TransactionEvent) => ({
  type: SET_TRANSACTION,
  payload: event,
});
