import axios, {AxiosResponse} from 'axios';

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
};

export const createTransactionRequest = async (
  data: any
): Promise<
  | AxiosResponse<any>
  | {
      error: any;
    }
> => {
  const url = `http://localhost:5000/transaction/create`;

  const request: any = {
    method: 'POST',
    data,
    headers: config.headers,
    url
  };

  try {
    const response = await axios(request);
    return response;
  } catch (e) {
    return {error: e};
  }
};

export const getSpecificDatePeriod = async (from: Date, to: Date): Promise<any> => {
  const url = `http://localhost:5000/transaction/specificDatePeriod/${from}/${to}`;

  const request: any = {
    method: 'GET',
    headers: config.headers,
    url
  };
  try {
    const response = await axios(request);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
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

  const request: any = {
    method: 'POST',
    data,
    headers: config.headers,
    url
  };
  try {
    const response = await axios(request);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
export const editTransaction = async (
  selectedDayId: string,
  transactionId: string,
  data: any
): Promise<
  | AxiosResponse<any>
  | {
      error: any;
    }
> => {
  const url = `http://localhost:5000/transaction/event/edit/${selectedDayId}/${transactionId}`;

  const request: any = {
    method: 'PUT',
    data,
    headers: config.headers,
    url
  };

  try {
    const response = await axios(request);
    return response;
  } catch (e) {
    return {error: e};
  }
};
export const deleteTransaction = async (
  selectedDayId: string,
  transactionId: string
): Promise<
  | AxiosResponse<any>
  | {
      error: any;
    }
> => {
  const url = `http://localhost:5000/transaction/event/delete/${selectedDayId}/${transactionId}`;

  const request: any = {
    method: 'PUT',
    data: {},
    headers: config.headers,
    url
  };

  try {
    const response = await axios(request);
    return response;
  } catch (e) {
    return {error: e};
  }
};
export const getUserByJWToken = async (): Promise<any> => {
  const url = `http://localhost:5000/user/logged`;

  const request: any = {
    method: 'GET',
    headers: config.headers,
    url
  };
  try {
    const response = await axios(request);

    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
