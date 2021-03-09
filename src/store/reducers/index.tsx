import { combineReducers } from "redux";
import userReducer from "./userReducer";
import transactionReducer from "../../modules/transaction/reducers/transactionReducer";

export default combineReducers({
  userReducer: userReducer,
  transactionReducer: transactionReducer,
});
