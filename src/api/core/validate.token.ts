import { TOKEN_KEY } from "../../app";
import jwt from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyToken = (req: any, res: any, next: any) => {
  let token =
    req?.body?.token || req?.query?.token || req?.headers["authorization"];
  if (!token) {
    return res?.status(403).send("A token is required for authentication");
  }
  try {
    token = token.split(" ")[1]
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res?.status(401).send("Invalid Token");
  }
  return next();
};
