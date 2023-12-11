import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../../config.js";

export const createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
      if (token) {
        resolve(token);
      } else {
        reject(err);
      }
    });
  });
};
