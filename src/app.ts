import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import router from "./router";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(router);

export default app;
