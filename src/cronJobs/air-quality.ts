// src/cron/parisJob.ts
import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';
import ParisAirQualityModel from '../models/air-quality.model';

dotenv.config();

const API_KEY = process.env.API_KEY;
const lat = 48.856613;
const lon = 2.352222;

export const startGetParisAirQualityJob = () => {
  cron.schedule('* * * * *', async () => {
    console.log("Paris Air Quality job started");

    try {
      const response = await axios.get('https://api.airvisual.com/v2/nearest_city', {
        params: {
          lat,
          lon,
          key: API_KEY,
        },
      })as any;

      const pollution = response.data.data.current.pollution;

      const airQuality = new ParisAirQualityModel({
        aqiUS: pollution.aqius,
        mainUS: pollution.mainus,
        aqiCN: pollution.aqicn,
        mainCN: pollution.maincn,
      });

      await airQuality.save();
      console.log('Air quality for Paris saved to MONGODB');
    } catch (error:any) {
      console.error('Error in CRON job:', error.message);
    }
  });
};
