import {AxiosResponse} from 'axios';
import moment from 'moment';
import axiosConfig from '../../../axiosConfig';
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION_EVENT,
  EDIT_TRANSACTION_EVENT,
  GET_YERALY_OR_WEEKLY,
  SPECIFIC_DATE_PERIOD,
  GET_USER_ACCOUNTS
} from '../../../helpers/axiosRoutes.ts/transactionRoutes';
import GET_LOGGED_USER from '../../../helpers/axiosRoutes.ts/userRoutes';
import {ServiceTransaction, ServiceTransactionEvent} from '../../../models/Transaction';

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
};

export const createTransactionRequest = async (data: ServiceTransaction): Promise<AxiosResponse> => {
  return axiosConfig.post(`${CREATE_TRANSACTION}`, data, config);
};

export const getSpecificDatePeriod = async (from: Date, to: Date): Promise<AxiosResponse> => {
  return axiosConfig.get(`${SPECIFIC_DATE_PERIOD}/${moment(from).toISOString()}/${moment(to).toISOString()}`, config);
};

export const getYearlyOrWeekly = async (
  data: {
    from: Date;
    to: Date;
    expense: number;
    income: number;
  }[]
): Promise<AxiosResponse> => {
  return axiosConfig.post(`${GET_YERALY_OR_WEEKLY}`, data, config);
};
export const editTransaction = async (
  selectedDayId: string,
  transactionId: string,
  data: ServiceTransactionEvent
): Promise<AxiosResponse> => {
  return axiosConfig.put(`${EDIT_TRANSACTION_EVENT}/${selectedDayId}/${transactionId}`, data, config);
};
export const deleteTransaction = async (selectedDayId: string, transactionId: string): Promise<AxiosResponse> => {
  return axiosConfig.put(`${DELETE_TRANSACTION_EVENT}/${selectedDayId}/${transactionId}`, {}, config);
};
export const getUserByJWToken = async (): Promise<AxiosResponse> => {
  return axiosConfig.get(`${GET_LOGGED_USER}`, config);
};
export const getAccounts = async (): Promise<AxiosResponse> => {
  return axiosConfig.get(`${GET_USER_ACCOUNTS}`, config);
};
