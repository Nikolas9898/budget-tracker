export interface Token {
  id?: string;
  iat?: number;
}

export enum tokenMessages {
  noToken = "No token, access denied",
  wrongToken = "Wrong token",
}
