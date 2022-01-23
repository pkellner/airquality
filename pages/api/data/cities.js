import allDataBase from "../../../data/historicalData.json";
import runDelayMiddleware from "../../../src/utils/runDelayMiddleware";
import {
  MEMORYCACHEDELAYMS,
  PURPLEAIR_APIKEY,
} from "../../../src/utils/constants";
import retrieveAirQualityData from "../../../src/utils/retrieveAirQualityData";
import cache from "memory-cache";

export default async function handler(req, res) {
  const DAYSTOGOBACK = 15;

  await runDelayMiddleware(req, res);
  {
    let count = 9999;
    if (req?.query?.count) {
      count = parseInt(req.query.count);
    }

    let allData;
    if (PURPLEAIR_APIKEY && PURPLEAIR_APIKEY.length > 0) {
      const cachedFetch = async (cacheKey) => {
        const cachedResponse = cache.get(cacheKey);
        if (cachedResponse) {
          return cachedResponse;
        } else {
          const data = await retrieveAirQualityData(
            false,
            undefined,
            count,
            DAYSTOGOBACK
          );
          cache.put(cacheKey, data, parseInt(MEMORYCACHEDELAYMS)); // ms
          return data;
        }
      };
      allData = await cachedFetch(`all-cities-${count}`);
      //console.log("/api/cities cache: ",allData);
    } else {
      allData = allDataBase;
    }
    const resultData = allData
      .map(({ id, city, population, sensors, state }) => {
        return {
          id,
          city,
          state,
          population,

          created:
            sensors && sensors?.length > 0 ? sensors[0]?.created : "no date",
          pm25: sensors && sensors?.length > 0 ? sensors[0]?.pm25 : 999,
          sensorId:
            sensors && sensors?.length > 0
              ? sensors[0]?.sensorId
              : "No SensorId",
        };
      })
      .slice(0, count)
      .sort((a, b) => {
        if (a.pm25 > b.pm25) return -1;
        if (a.pm25 < b.pm25) return 1;
        return 0;
      });

    res.status(200).json(JSON.stringify(resultData, null, "\t"));
  }
}
