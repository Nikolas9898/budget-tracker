import jwt from 'jsonwebtoken';

export const tokenDecoder = (token: any): string => {
  token = token.split(' ').pop();

  const decodedToken: any = jwt.decode(token);

  return decodedToken.id;
};
