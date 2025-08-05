import axios from "axios";
import airQualityModel from "../models/air-quality.model";

class AirQualityService {
  async getAirQualityData(lat: string, lon: string) {
    console.log("Air Quality Data...");
    try {
      const result = await axios.get(
        `http://api.airvisual.com/v2/nearest_city??lat=${lat}&lon=${lon}&key=${process.env.API_KEY}`
      );

      return (result.data as any).data;
    } catch (error: any) {
      throw new Error(`Error in Fetching Air Quality + ${error.message}`);
    }
  }

  async getMostPollutedTimeInParis() {
    try {
      const result = await airQualityModel
        .findOne({})
        .sort({ aqiUS: -1 })
        .select("createdAt -_id")
        .lean();

      return (result as any).createdAt;
    } catch (error: any) {
      throw new Error(
        `Error in Fetching Most Polluted Time in Paris + ${error.message}`
      );
    }
  }
}

export default new AirQualityService();
