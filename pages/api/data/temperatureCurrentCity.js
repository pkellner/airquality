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
      //   setTimeout(resolve, 7000);
      // });

      const cityId = parseInt(req.query.cityId);
      const cityName = getCityNameFromId(cityId);

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

      const temperature = citiesArray[0]?.sensors[0]?.temperature;
      const created = citiesArray[0]?.sensors[0]?.created;
      //console.log(`pages/api/data/temperatureCurrentCity returning with data ${cityName}`);
      res
        .status(200)
        .json(
          JSON.stringify(
            { cityId, name: cityName, temperature, created },
            null,
            "\t"
          )
        );
    } else {
      res.status(400).end("city not found");
    }
  }
}
