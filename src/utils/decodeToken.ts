import jwt from "jsonwebtoken";

const decodeToken = (token: string) => {
  const formatToken = token.replace("Bearer ", "");

  const decodedToken = jwt.decode(formatToken) as { id: number; role: string };

  return decodedToken;
};

export default decodeToken;
