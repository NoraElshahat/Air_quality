# 🌍 Air Quality API

This is a RESTful API built with **Node.js**, **Express**, and **TypeScript** that fetches **air quality data** for the nearest city to given GPS coordinates using the [IQAir API](https://www.iqair.com/world-air-quality-api).

It also includes a **CRON job** that periodically saves Paris air quality data to a MongoDB database.


## Features

-  Fetch real-time air quality by GPS coordinates
-  Auto-save Paris air quality every 1 minute (CRON)
-  Store air data in MongoDB
-  Get the most polluted time in Paris
-  Fully documented routes in this file

---

## Technologies Used

- Node.js + Express
- TypeScript
- Axios
- Mongoose (MongoDB)
- node-cron
- dotenv
- IQAir AirVisual API

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NoraElshahat/Air_quality.git
cd Air_quality
npm install
```

### 2. Configure Environment Variables
PORT="YOUR PORT"
API_KEY= "YOUR IQAIR API KEY"
MONGO_URI="YOUR MONGO URI"

### 3. Run the Application  
npm run dev


## API Routes Documentation

### 1. Get Air Quality by GPS Coordinates
**GET** /api/air-quality/:lat/:lon
- **Parameters:**
  - `lat` (required): Latitude of the GPS coordinate (e.g., 48.856614).
  - `lon` (required): Longitude of the GPS coordinate (e.g., 2.352222).
- **example** : /api/air-quality/48.856614/2.352222
- **Response** : 
{
  "Result": {
    "Pollution": {
      "ts": "2025-08-05T13:00:00.000Z",
      "aqius": 74,
      "mainus": "pm2.5",
      "aqicn": 70,
      "maincn": "pm10"
    }
  }
}


### 2. Get Air Quality Of Paris
**GET** /api/paris/most-polluted
**Example** : /api/paris/most-polluted
**Response** : 
{
    "parisMostPollutedTime": "2025-08-05T11:26:01.760Z"
}


CRON JOB : 
A scheduled task is implemented using node-cron:

- Fetches Paris air quality data
- Saves it to MongoDB
- Coordinates of Paris:
    Latitude: 48.856613
    Longitude: 2.352222
the cron job logic is in src/cronjobs/air-quality.ts




Project Structure:
 ```

├── src
│   ├── controller
│   ├── router
│   ├── service
│   ├── models
│   ├── cronJobs
│   └── middlewares
│   ├── utils
├── .env.example
├── README.md
└── tsconfig.json

 ```