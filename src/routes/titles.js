import express from "express";
import { getTitles } from "../controller/titles.js";

const titlesRouter = express.Router()

titlesRouter.route("/").get(getTitles)

export default titlesRouter


