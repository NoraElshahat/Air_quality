import request from "supertest";
import express from "express";
import router from "../router/air-quality.router";
import airQualityService from "../service/air-quality.service";

jest.mock("../service/air-quality.service");

const app = express();
app.use("/api", router);

describe("AirQuality Routes", () => {
  it("should return pollution data for valid coordinates", async () => {
    (airQualityService.getAirQualityData as jest.Mock).mockResolvedValue({
      current: {
        pollution: {
          aqius: 90,
          mainus: "pm10"
        }
      }
    });

    const res = await request(app).get("/api/air-quality/30/31");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      Result: {
        Pollution: {
          aqius: 90,
          mainus: "pm10"
        }
      }
    });
  });

  it("should return most polluted data of paris", async () => {
    const mockCreatedAtData = new Date("2023-02-15T00:00:00.000Z");
    (airQualityService.getMostPollutedTimeInParis as jest.Mock).mockResolvedValue(mockCreatedAtData);

    const res = await request(app).get("/api/paris/most-polluted");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("parisMostPollutedTime")
  });


});
