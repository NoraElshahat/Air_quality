import { Request, Response, NextFunction } from "express";
import airQualityService from "../service/air-quality.service";
import { HttpStatusCode } from "../utils/status-codes";

class AirQualityController {
  async getAirQuality(req: Request, res: Response, next: NextFunction) {
    if (!req.params.lat || !req.params.lon) {
      throw new Error("Latitude and Longitude are required");
    }
    const { lat, lon } = req.params;
    try {
      const airQualityData = await airQualityService.getAirQualityData(
        lat,
        lon
      );
      const pollution = airQualityData?.current.pollution;
      res.status(HttpStatusCode.OK).json({ Result: { Pollution: pollution } });
    } catch (error) {
      next(error);
    }
  }

  async getMostPollutedTimeOfParis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mostPollutedTimeInParis =
        await airQualityService.getMostPollutedTimeInParis();

      if (!mostPollutedTimeInParis) {
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "No Data Found" });
      }
      res
        .status(HttpStatusCode.OK)
        .json({ parisMostPollutedTime: mostPollutedTimeInParis });
    } catch (error) {
      next(error);
    }
  }
}

export default new AirQualityController();
