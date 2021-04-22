import jwt_decode from 'jwt-decode';
import {Token} from '../models/token';

export const tokenDecoder = (token: string | undefined): string => {
  token = token ? token.split(' ').pop() : '';

  const decodedToken: Token = jwt_decode(token ? token : '');
  // const decodedToken: Token | any = jwt.decode(token ? token : '');

  return decodedToken.sub;
};
