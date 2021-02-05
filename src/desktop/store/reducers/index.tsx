import { combineReducers } from "redux";
import userReducer from "./userReducer";
import transactionReducer from "./transactionReducer";

export default combineReducers({
  user: userReducer,
  transaction:transactionReducer
});
