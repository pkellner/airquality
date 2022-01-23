import runDelayMiddleware from "../../../src/utils/runDelayMiddleware";
import citiesArrayWithSensorsJson from "../../../data/historicalData.json";
import {
  MEMORYCACHEDELAYMS,
  PURPLEAIR_APIKEY,
} from "../../../src/utils/constants";
import retrieveAirQualityData from "../../../src/utils/retrieveAirQualityData";
import getCityNameFromId from "../../../src/utils/getCityNameFromId";
import cache from "memory-cache";
import { createCacheKey } from "../../../src/utils/createCacheKey";

export default async function handler(req, res) {
  await runDelayMiddleware(req, res);

  {

    // THROW IN EXTRA DELAY
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 5000);
    // });

    if (req?.query?.cityId) {
      const cityId = parseInt(req.query.cityId);
      const cityName = getCityNameFromId(cityId);
      let created = "";

      let citiesArray;
      if (PURPLEAIR_APIKEY && PURPLEAIR_APIKEY.length > 0) {
        const daysToGoBack = 15;
        const processHistory = true;
        const cityCount = 1;
        const cachedFetch = async (cacheKey) => {
          const cachedResponse = cache.get(cacheKey);
          if (cachedResponse) {
            return cachedResponse;
          } else {
            const data = await retrieveAirQualityData(
              processHistory,
              cityName,
              cityCount,
              daysToGoBack
            );
            cache.put(cacheKey, data, parseInt(MEMORYCACHEDELAYMS)); // ms
            return data;
          }
        };
        const cacheKeyValue = createCacheKey(
          processHistory,
          cityName,
          cityCount,
          daysToGoBack
        );
        citiesArray = await cachedFetch(cacheKeyValue);
      } else {
        citiesArray = [citiesArrayWithSensorsJson.find((a) => a.id === cityId)];
      }
      const cityRec = citiesArray[0];

      created = cityRec?.sensors[0]?.created;
      const sensorHistoryArray = cityRec?.sensors[0]?.sensorHistory
        .map((rec) => {
          return {
            pm25: rec.pm2point5,
            created: rec.created,
            temperature: rec.temperature,
          };
        })
        .slice(0, 24 * 10);

      let totalPm25 = 0;
      let totalPm25Count = 0;
      let pm25Min = 999;
      let pm25Max = 0;

      let totalTemperature = 0.0;
      let totalTemperatureCount = 0;
      let temperatureMin = 212.0;
      let temperatureMax = -100.0;

      for (let i = 0; i < sensorHistoryArray?.length; i++) {
        if (
          sensorHistoryArray[i] &&
          sensorHistoryArray[i].pm25 != undefined &&
          sensorHistoryArray[i].pm25 < 999 &&
          sensorHistoryArray[i].pm25 >= 0
        ) {
          totalPm25 += sensorHistoryArray[i].pm25;
          totalPm25Count++;
          if (sensorHistoryArray[i].pm25 <= pm25Min) {
            pm25Min = sensorHistoryArray[i].pm25;
          }
          if (sensorHistoryArray[i].pm25 >= pm25Max) {
            pm25Max = sensorHistoryArray[i].pm25;
          }
        }
        if (
          sensorHistoryArray[i] &&
          sensorHistoryArray[i].temperature != undefined &&
          sensorHistoryArray[i].temperature < 212 &&
          sensorHistoryArray[i].temperature > -100
        ) {
          totalTemperature += parseFloat(sensorHistoryArray[i].temperature);
          totalTemperatureCount++;
          if (sensorHistoryArray[i].temperature < temperatureMin) {
            temperatureMin = sensorHistoryArray[i].temperature;
          }
          if (sensorHistoryArray[i].temperature > temperatureMax) {
            temperatureMax = sensorHistoryArray[i].temperature;
          }
        }
      }

      const pm25Average = (totalPm25 / totalPm25Count).toFixed(0);
      const temperatureAverage = totalTemperature / totalTemperatureCount;

      res.status(200).json(
        JSON.stringify(
          {
            temperatureMin,
            temperatureMax,
            temperatureAverage,
            pm25Min,
            pm25Max,
            pm25Average,
            created,
          },
          null,
          "\t"
        )
      );
    } else {
      res.status(400).end("city not found");
    }
  }
}
