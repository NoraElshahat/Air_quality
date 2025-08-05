import { Router } from "express";
import airQualityController from "../controller/air-quality.controller";

const router = Router();

router.get("/air-quality/:lat/:lon", airQualityController.getAirQuality);
router.get("/paris/most-polluted" , airQualityController.getMostPollutedTimeOfParis)

export default router;