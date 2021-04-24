import axios, {AxiosResponse, AxiosRequestConfig, AxiosError} from 'axios';
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

export const getSpecificDatePeriod = async (from: Date, to: Date): Promise<any> => {
  const url = `http://localhost:5000/transaction/specificDatePeriod/${from}/${to}`;

  const request: AxiosRequestConfig = {
    method: 'GET',
    headers: config.headers,
    url
  };

  try {
    const response = await axios(request);
    return response.data;
  } catch (e) {
    return {error: e};
  }
};

export const getYearlyOrWeekly = async (
  data: {
    from: Date;
    to: Date;
    expense: number;
    income: number;
  }[]
): Promise<any> => {
  const url = `http://localhost:5000/transaction/getYearlyOrWeekly`;

  const request: AxiosRequestConfig = {
    method: 'POST',
    data,
    headers: config.headers,
    url
  };
  try {
    const response = await axios(request);
    return response.data;
  } catch (e) {
    return {error: e};
  }
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
export const getUserByJWToken = async (): Promise<any> => {
  const url = `http://localhost:5000/user/logged`;

  const request: AxiosRequestConfig = {
    method: 'GET',
    headers: config.headers,
    url
  };
  try {
    const response = await axios(request);

    return response.data;
  } catch (e) {
    return {error: e};
  }
};
