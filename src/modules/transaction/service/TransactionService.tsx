import axios, {AxiosResponse, AxiosRequestConfig, AxiosError} from 'axios';
import axiosConfig from '../../../axiosConfig';
import {GET_YERALY_OR_WEEKLY, SPECIFIC_DATE_PERIOD} from '../../../helpers/axiosRoutes.ts/transactionRoutes';
import GET_LOGGED_USER from '../../../helpers/axiosRoutes.ts/userRoutes';
import {ServiceTransaction, ServiceTransactionEvent} from '../../../models/Transaction';

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
};

export const createTransactionRequest = async (
  data: ServiceTransaction
): Promise<
  | AxiosResponse
  | {
      error: AxiosError;
    }
> => {
  const url = `http://localhost:5000/transaction/create`;

  const request: AxiosRequestConfig = {
    method: 'POST',
    data,
    headers: config.headers,
    url
  };

  try {
    return await axios(request);
  } catch (e) {
    return {error: e};
  }
};

export const getSpecificDatePeriod = async (from: Date, to: Date): Promise<AxiosResponse> => {
  return axiosConfig.get(`${SPECIFIC_DATE_PERIOD}/${from}/${to}`, config);
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
): Promise<
  | AxiosResponse
  | {
      error: AxiosError;
    }
> => {
  const url = `http://localhost:5000/transaction/event/edit/${selectedDayId}/${transactionId}`;

  const request: AxiosRequestConfig = {
    method: 'PUT',
    data,
    headers: config.headers,
    url
  };

  try {
    return await axios(request);
  } catch (e) {
    return {error: e};
  }
};
export const deleteTransaction = async (
  selectedDayId: string,
  transactionId: string
): Promise<
  | AxiosResponse
  | {
      error: AxiosError;
    }
> => {
  const url = `http://localhost:5000/transaction/event/delete/${selectedDayId}/${transactionId}`;

  const request: AxiosRequestConfig = {
    method: 'PUT',
    data: {},
    headers: config.headers,
    url
  };

  try {
    return await axios(request);
  } catch (e) {
    return {error: e};
  }
};
export const getUserByJWToken = async (): Promise<AxiosResponse> => {
  return axiosConfig.get(`${GET_LOGGED_USER}`, config);
};
