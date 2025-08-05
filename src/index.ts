import express, { Request, Response } from "express";
import AirQualityRouter from "./router/air-quality.router";
import { globalErrorHandler } from "../src/middlewares/error.middleware";
import dotenv from 'dotenv';
import {connectDB} from "./dbconfig";
import { startGetParisAirQualityJob } from './cronJobs/air-quality';
dotenv.config();

connectDB()

startGetParisAirQualityJob()
const app = express();
const port = process.env.PORT || 3000;

app.use("/api", AirQualityRouter);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
