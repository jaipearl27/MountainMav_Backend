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
import galleryRouter from "./src/routes/gallery.js";
import importantDocRouter from "./src/routes/importantDocs.js";
import specialProgramsRouter from "./src/routes/specialPrograms.js";
import contactRouter from "./src/routes/contact.js";

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
      "https://mountainmavericks.in",
      "https://admin.mountainmavericks.in",
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
app.use("/api/v1/gallery",galleryRouter);
app.use("/api/v1/importantDocs",importantDocRouter);
app.use("/api/v1/specialPrograms",specialProgramsRouter);
app.use("/api/v1/contact",contactRouter);




app.use(error);

app.listen(PORT, () => {
  console.log(chalk.blue(`Connected to port ${process.env.PORT}`));
  mongoConnect();
});
