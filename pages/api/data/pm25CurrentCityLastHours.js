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
    if (req?.query?.cityId) {

      // THROW IN EXTRA DELAY
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 5000);
      // });

      const cityId = parseInt(req.query.cityId);
      const cityName = getCityNameFromId(cityId);

      let recordsToReturn = 12;
      if (req?.query?.recordsToReturn) {
        recordsToReturn = parseInt(req.query.recordsToReturn);
      }

      let recordsToSkip = 0;
      if (req?.query?.recordsToSkip) {
        recordsToSkip = parseInt(req.query.recordsToSkip);
      }

      let incrementHours = 1;
      if (req?.query?.incrementHours) {
        incrementHours = parseInt(req.query.incrementHours);
      }

      // let citiesArray;
      // if (PURPLEAIR_APIKEY && PURPLEAIR_APIKEY.length > 0) {
      //   citiesArray = await retrieveAirQualityData(true, cityName, 1, 15);
      // } else {
      //   citiesArray = [citiesArrayWithSensorsJson.find(a=>a.id === cityId)];
      // }

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
      const sensorHistoryArray = cityRec?.sensors[0]?.sensorHistory.map(
        (rec) => {
          return {
            pm25: rec.pm2point5,
            created: rec.created,
            temperature: rec.temperature,
          };
        }
      );

      const sensorHistoryTimeDescending = sensorHistoryArray?.sort((a, b) => {
        if (a.created > b.created) return -1;
        if (a.created < b.created) return 1;
        return 0;
      });

      const safetyCntMax = 9999;
      let safetyCnt = 0;
      let timeList = [];

      for (
        let i = recordsToSkip;
        i < recordsToSkip + recordsToReturn;
        i += incrementHours
      ) {
        safetyCnt++;
        if (safetyCnt > safetyCntMax) break;
        timeList.push({
          createdDateTime:
            sensorHistoryTimeDescending &&
            sensorHistoryTimeDescending.length > 0
              ? sensorHistoryTimeDescending[i]?.created
              : "",
          created: `${i + 1} ${i === 0 ? "hour" : "hours"} ago`,
          pm25:
            sensorHistoryTimeDescending && sensorHistoryTimeDescending[i]
              ? sensorHistoryTimeDescending[i]?.pm25
              : 9999,
          temperature:
            sensorHistoryTimeDescending && sensorHistoryTimeDescending[i]
              ? sensorHistoryTimeDescending[i]?.temperature
              : 0,
        });
      }
      res.status(200).json(JSON.stringify(timeList, null, "\t"));
    } else {
      res.status(400).end("city not found");
    }
  }
}
