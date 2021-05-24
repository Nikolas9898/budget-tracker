import {AxiosResponse} from 'axios';
import moment from 'moment';
import {OptionsType, OptionTypeBase} from 'react-select';
import axiosConfig from '../../../axiosConfig';
import {EXPORT} from '../../../helpers/axiosRoutes.ts/exportRoutes';

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
};
export const getExportApiData = async (
  from: Date,
  to: Date,
  type: string,
  selectedAccounts: OptionTypeBase | OptionsType<OptionTypeBase> | null
): Promise<AxiosResponse> => {
  return axiosConfig.post(
    `${EXPORT}/${moment(from).toISOString()}/${moment(to).toISOString()}/${type}`,
    selectedAccounts,
    config
  );
};
