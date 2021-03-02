import {
  HANDLE_PREVIOUS_MONTH,
  HANDLE_NEXT_MONTH,
  HANDLE_NEXT_YEAR,
  HANDLE_PREVIOUS_YEAR,
  HANDLE_INPUT,
  SET_TRANSACTION,
} from "../actionTypes";
import { TransactionEvent } from "../../../helpers/ITransactions";

export interface State {
  date: any;
  transaction: TransactionEvent;
}

const initialState = {
  date: new Date(),
  transaction: {
    _id: "",
    type: "income",
    date: "",
    account: "",
    from: "",
    category: "",
    fees: "0",
    transferId: "",
    to: "",
    amount: "0",
    note: "",
    description: "",
  },
};
export default function (state = initialState, action: any) {
  let month = new Date(state.date).getMonth();
  let year = state.date.getFullYear();
  switch (action.type) {
    case HANDLE_NEXT_MONTH:
      let nextMonth = new Date(year, month + 1);
      return {
        ...state,
        date: nextMonth,
      };
    case HANDLE_PREVIOUS_MONTH:
      let previousMonth = new Date(year, month - 1);
      return {
        ...state,
        date: previousMonth,
      };
    case HANDLE_NEXT_YEAR:
      let nextYear = new Date(year + 1, new Date().getMonth(), 1);

      return {
        ...state,
        date: nextYear,
      };
    case HANDLE_PREVIOUS_YEAR:
      let previousYear = new Date(year - 1, new Date().getMonth(), 1);
      return {
        ...state,
        date: previousYear,
      };

    case HANDLE_INPUT:
      if (action.payload.name === "type") {
        return {
          ...state,
          transaction: {
            ...state.transaction,
            [action.payload.name]: action.payload.value,
            category: "",
            to: "",
          },
        };
      } else {
        return {
          ...state,
          transaction: {
            ...state.transaction,
            [action.payload.name]: action.payload.value,
          },
        };
      }
    case SET_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
      };
    default:
      return state;
  }
}
