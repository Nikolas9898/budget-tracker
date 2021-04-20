import {combineReducers} from 'redux';
import {userReducer} from '../../modules/login/reducer/userReducer';
import {transactionReducer} from '../../modules/transaction/reducers/transactionReducer';

export default combineReducers({
  userReducer,
  transactionReducer
});
