import { TOKEN_KEY } from "../../../app";
import jwt from "jsonwebtoken";

export const getUserId = function (req) {
  try {
    const authorizationHeader = req.header("authorization");
    const token = authorizationHeader.split(" ")[1];
    const userId = jwt.verify(token, TOKEN_KEY).id;
    return userId;
  } catch (err) {
    return err;
  }
};
