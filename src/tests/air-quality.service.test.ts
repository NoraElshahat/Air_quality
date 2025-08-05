import airQualityService from "../service/air-quality.service";
import axios from "axios";
import airQualityModel from "../models/air-quality.model";

jest.mock("axios");
jest.mock("../models/air-quality.model");
const mockedAirQualityModel = airQualityModel as any;

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AirQualityService", () => {
  describe("getAirQualityData", () => {
    it("should return pollution data when API call succeeds", async () => {
      const mockData = {
        data: {
          data: {
            current: {
              pollution: {
                aqius: 80,
                mainus: "pm2.5",
              },
            },
          },
        },
      };

      mockedAxios.get.mockResolvedValue(mockData as any);

      const result = await airQualityService.getAirQualityData("30", "31");
      expect(result.current.pollution.aqius).toBe(80);
      expect(result.current.pollution.mainus).toBe("pm2.5");
    });

    it("should throw an error when API call fails", async () => {
      mockedAxios.get.mockRejectedValue(new Error("API Failed"));

      await expect(
        airQualityService.getAirQualityData("30", "31")
      ).rejects.toThrow("Error in Fetching Air Quality");
    });
  });

  describe("getMostPollutedTimeInParis", () => {
    it("should return the most polluted time in Paris", async () => {
      const mockCreatedAtData = new Date("2025-08-05T13:01:28.292Z");

      mockedAirQualityModel.findOne.mockReturnValue({
        sort: () => ({
          select: () => ({
            lean: () => Promise.resolve({ createdAt: mockCreatedAtData }),
          }),
        }),
      });

      const result = await airQualityService.getMostPollutedTimeInParis();
      console.log(result)
      expect(result).toEqual(mockCreatedAtData);
    });
  });
});
