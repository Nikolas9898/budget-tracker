import {AxiosResponse} from 'axios';
import moment from 'moment';
import axiosConfig from '../../../axiosConfig';
import {STATS} from '../../../helpers/axiosRoutes.ts/statRoutes';

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
};
// eslint-disable-next-line import/prefer-default-export
export const getStatsInSpecificDatePeriod = async (from: Date, to: Date): Promise<AxiosResponse> => {
  return axiosConfig.get(`${STATS}/${moment(from).toISOString()}/${moment(to).toISOString()}`, config);
};
