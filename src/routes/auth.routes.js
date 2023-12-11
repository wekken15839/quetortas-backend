import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controllers/auth.controllers.js";
import { validateAuth } from "../middlewares/validateAuth.middlewares.js";
import {
  handleFileSizeError,
  multerUpload,
} from "../middlewares/multer.middlewares.js";
import { validatePhoto } from "../middlewares/validatePhoto.middlewares.js";

const authRouter = Router();
authRouter.post(
  "/register",
  multerUpload.single("photo"),
  handleFileSizeError,
  validatePhoto,
  register
);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/profile", validateAuth, profile);

export default authRouter;
