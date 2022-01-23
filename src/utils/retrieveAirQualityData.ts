import axios from "axios";
import citiesArray from "../../data/usCities.json";
import {EXCLUDESENSORIDS, PURPLEAIR_APIKEY} from "./constants";
import getBoundingBox from "./getBoundingBox";
import getDistanceFromLatLonInKm from "./getDistanceFromLatLonInKm";



export default async function retrieveAirQualityData(
  processHistory: any,
  singleCityToProcess: any,
  topCityCount: any,
  daysToGoBack: any
) {
  // This is a crazy big number because some cities to have any purple airs and this gets us some data.
  // Since we always use the sensor closes to the city center, it really has no effect on most cities
  const KMRADIUS = 150.0;

  // now many cities to return in the JSON per city
  // later, it might be nice to do something like average and drop high and low a lot more sensors,
  // but to keep this demo not crazy complicated, we are just using the closest sensor to city center.
  const SENSORSPERCITY = 1;

  // values used to throttle API calls for PurpleAir data
  const DELAYBETWEENRESTCALLS = 300; // ms
  const DELAYEVERY20 = 4000;

  const cities =
    singleCityToProcess === undefined || singleCityToProcess.length === 0
      ? citiesArray
          .sort(function (a: any, b: any) {
            let x = parseInt(a.population, 10);
            let y = parseInt(b.population, 10);
            if (x > y) {
              return -1;
            }
            if (x < y) {
              return 1;
            }
            return 0;
          })
          .slice(0, topCityCount)
      : [citiesArray.find((a: any) => a.city === singleCityToProcess)];

  let returnData: any;
  let sensorDataByCity: any = []; // this gets returned from call
  let channelData: any = [];

  function sensorTransform(channelDictElement: any) {
    if (channelDictElement && channelDictElement.feeds) {
      return channelDictElement.feeds.map(function (feed: any) {
        return {
          created: feed.created_at,
          pm2point5: parseInt(feed.field2, 10) * 3,
          pm10: parseInt(feed.field3, 10) * 3,
          temperature: feed.field6,
          humidity: feed.field7,
        };
      });
    } else {
      return {
        created: "",
        pm2point5: "",
        pm10: "",
        temperature: "",
        humidity: "",
      };
    }
  }

  // BEGINNING EXECUTION ... (FUNCTIONS ABOVE)

  try {
    const purpleAirApiKey: string = PURPLEAIR_APIKEY;
    if (!(purpleAirApiKey && purpleAirApiKey.length > 0)) {
      throw "PURPLEAIR_APIKEY must be specified to call Purple Air API";
    }

    // processHistory: any,
    //   singleCityToProcess: any,
    //   topCityCount: any,
    //   daysToGoBack: any,

    let allSensorsData: any = []; // this is what comes back from axios get call internally
    let allSensorsUrl = `https://api.purpleair.com/v1/sensors?fields=sensor_index,latitude,longitude,location_type,name,pm2.5_10minute,temperature,primary_id_a,primary_key_a,last_seen`;
    const res = await axios.get(allSensorsUrl, {
      headers: {
        "X-API-Key": PURPLEAIR_APIKEY, // read key
      },
    });

    // @ts-ignore
    allSensorsData = res.data.data.filter((rec) => {
      // each rec is an array where the first element in the array is the sensor id. not rec.sensorId like expected.
      const isBadSensor = EXCLUDESENSORIDS.includes(rec[0])
      return !isBadSensor;
    });

    cities.forEach(function (city: any) {
      const { lat_min, lat_max, lon_min, lon_max } = getBoundingBox(
        city?.latitude,
        city?.longitude,
        KMRADIUS
      );
      let sensorArray: any = [];
      allSensorsData.forEach(function (sensor: any) {
        const sensorId = sensor[0];
        const sensorLatitude = sensor[1];
        const sensorLongitude = sensor[2];
        const locationType = sensor[3] ?? 1; // 0 means outside, 1 means inside
        const sensorName = sensor[4] ?? "";
        if (
          !sensorName?.toLowerCase().includes("inside") &&
          locationType === 0 &&
          sensorLatitude >= lat_min &&
          sensorLatitude <= lat_max &&
          sensorLongitude >= lon_min &&
          sensorLongitude <= lon_max
        ) {
          const km = getDistanceFromLatLonInKm(
            sensorLatitude,
            sensorLongitude,
            city?.latitude,
            city?.longitude
          );

          if (sensor[6] && sensor[6] != 0.0 && sensor[5] && sensor[5] != 0.0) {
            sensorArray.push({
              sensorId: sensor[0],
              lattitude: sensorLatitude,
              longitude: sensorLongitude,
              name: sensor[4],
              pm25: parseInt(sensor[5], 10) * 3,
              temperature: sensor[6],
              thingSpeakChannel: sensor[7],
              thingSpeakAuth: sensor[8],
              kmFromCityCenter: km,
              created: new Date(sensor[9] * 1000),
            });
          }
        }
      });

      const cityObject = {
        id: city?.id,
        city: city?.city,
        state: city?.state,
        population: city?.population,
        // lat_min,
        // lat_max,
        // lon_min,
        // lon_max,
        sensors: sensorArray
          .sort(function (a: any, b: any) {
            let x = a.kmFromCityCenter;
            let y = b.kmFromCityCenter;
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          })
          .slice(0, SENSORSPERCITY),
      };
      sensorDataByCity.push(cityObject);
      //console.log(`city: ${city.city} number: ${sensorArray.length}`);
    });

    sensorDataByCity.forEach(function (cityRec: any) {
      cityRec.sensors.forEach(function (sensorRec: any) {
        channelData.push({
          sensorId: sensorRec.sensorId,
          created: sensorRec.created,
          thingSpeakChannel: sensorRec.thingSpeakChannel,
          thingSpeakAuth: sensorRec.thingSpeakAuth,
          city: cityRec.city,
          sensorName: sensorRec.name,
        });
      });
    });

    if (processHistory === true) {
      let cnt = 0;
      let channelDict: any = {};
      // doing in for loop since forEach causes nested function levels
      for (let i = 0; i < channelData.length; i++) {
        if (i % 20 === 0) {
          await new Promise((resolve) => setTimeout(resolve, DELAYEVERY20));
        }

        try {
          let url = `https://api.thingspeak.com/channels/${channelData[i].thingSpeakChannel}/feeds.json?api_key=${channelData[i].thingSpeakAuth}&average=60&round=2&days=${daysToGoBack}&results=8000`;
          //console.log("url:", url);
          const sensorThingSpeakResult: any = await axios.get(url);

          await new Promise((resolve) =>
            setTimeout(resolve, DELAYBETWEENRESTCALLS)
          );
          channelDict[channelData[i].sensorId] = sensorThingSpeakResult.data;
          cnt++;
          // console.log(
          //   `${cnt}  :  city: ${channelData[i].city} name: ${channelData[i].sensorName}   id:${channelData[i].sensorId}`
          // );
        } catch (e) {
          console.log("error in api.thingspeak:", e);
        }
      }

      for (let i = 0; i < sensorDataByCity.length; i++) {
        const cityRec = sensorDataByCity[i];
        for (let j = 0; j < cityRec.sensors.length; j++) {
          let sensorRec = cityRec.sensors[j];
          sensorRec.sensorHistory = sensorTransform(
            channelDict[sensorRec.sensorId]
          );
        }
      }
    }
    returnData = sensorDataByCity;
  } catch (e) {
    returnData = {
      error: {
        e,
      },
    };
    console.log(e);
  }
  return returnData;
}
