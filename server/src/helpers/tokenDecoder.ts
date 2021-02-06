import jwt from "jsonwebtoken";

export const tokenDecoder = (token: any) => {
  token = token.split(" ").pop();

  let decodedToken: any = jwt.decode(token);

  return decodedToken.id;
};
