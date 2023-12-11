import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../../config.js";
export const validateAuth = (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    if (!authToken) return res.status(401).json({ message: "no token" });

    jwt.verify(authToken, TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "invalid token, unauthorized" });
      }
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
