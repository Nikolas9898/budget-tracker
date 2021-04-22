import {JwtPayload} from 'jwt-decode';

export interface Token extends JwtPayload {
  sub: string;
  iat: number;
}

export enum TokenMessages {
  NO_TOKEN = 'No token, access denied',
  WRONG_TOKEN = 'Wrong token'
}
