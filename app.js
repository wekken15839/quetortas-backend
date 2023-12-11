import { join } from "path";
import express from "express";
import authRouter from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
// EXPRESS.STATIC RECIBE UN PATH
app.use("/api", express.static(join("./src/public/uploads")));
app.get("/ping", (req, res) => res.send({ message: "pong" }));
app.use("/api", authRouter);
export default app;
