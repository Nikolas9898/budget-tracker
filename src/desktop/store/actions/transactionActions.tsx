import {
  HANDLE_NEXT_MONTH,
  HANDLE_PREVIOUS_MONTH
} from "../types";

export const handleNextMonth = () => ({
  type: HANDLE_NEXT_MONTH,
});
export const handlePreviousMonth = () => ({
  type: HANDLE_PREVIOUS_MONTH,
});


