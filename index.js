import express from "express";
import cors from "cors";
import { mongoConnect } from "./src/config/db.js";
import dotenv from "dotenv";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import { error } from "./src/middleware/error.js";

import authRouter from "./src/routes/auth.js";
import treksRouter from "./src/routes/treks.js";
import toursRouter from "./src/routes/tours.js";
import titlesRouter from "./src/routes/titles.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    exposedHeaders: ["*", "Authorization"],
  })
);

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/treks", treksRouter);
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/titles", titlesRouter);



app.use(error);

app.listen(PORT, () => {
  console.log(chalk.blue(`Connected to port ${process.env.PORT}`));
  mongoConnect();
});
