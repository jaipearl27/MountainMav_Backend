import express from "express";
import cors from "cors";
import { mongoConnect } from "./src/config/db.js";
import dotenv from "dotenv";
import paymentsRouter from "./src/routes/paymentsRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import freeHeadshotRouter from "./src/routes/freeHeadshotRoute.js";
import authRouter from "./src/routes/authRoute.js";
import blogsRouter from "./src/routes/blogsRoute.js";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import { error } from "./src/middleware/error.js";
import reviewsRouter from "./src/routes/reviewsRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://headgen-mern-2.vercel.app",
      "https://headgen-mern.vercel.app",
      "https://headgen.ai",
      "https://admin.headgen.ai"
    ],
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    exposedHeaders: ["*", "Authorization"],
  })
);

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/payment", paymentsRouter);
app.use("/api/v1/freeHeadshot", freeHeadshotRouter);
app.use("/api/v1/blogs", blogsRouter);
app.use("/api/v1/reviews", reviewsRouter);

app.use(error);

app.listen(PORT, () => {
  console.log(chalk.blue(`Connected to port ${process.env.PORT}`));
  mongoConnect();
});
