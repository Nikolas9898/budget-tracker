import {
  HANDLE_PREVIOUS_MONTH,
  HANDLE_NEXT_MONTH,
} from "../types";

export interface State {
  date: any;
}

const initialState = {
  date: new Date(),
};
export default function  (state = initialState, action: any){
   switch (action.type) {
    case HANDLE_NEXT_MONTH:
      let nextMonth = new Date(state.date).getMonth();
      let nextYear = state.date.getFullYear();
      let nextNewMonth = new Date(nextYear, nextMonth + 1);
      return {
        ...state,
        date: nextNewMonth,
      };
    case HANDLE_PREVIOUS_MONTH:
      let Month = new Date(state.date).getMonth();
      let Year = state.date.getFullYear();
      let previousMonth = new Date(Year, Month - 1);
      return {
        ...state,
        date: previousMonth,
      };

    default:
      return state;
  }
}
