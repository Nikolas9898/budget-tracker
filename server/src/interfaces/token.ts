export interface Token {
  id?: string;
  iat?: number;
}

export enum TokenMessages {
  NO_TOKEN = "No token, access denied",
  WRONG_TOKEN = "Wrong token",
}
