import type { NextPage } from "next";
import App from "../src/components/App";
import { getCitiesData } from "./api/data/cities";
import { getCityTemperatureData } from "./api/data/temperatureCurrentCity";
import { unstable_serialize } from "swr";
import {DEFAULTCITYCOUNT} from "../src/utils/constants";

// @ts-ignore
const Home: NextPage = ({ fallback }) => {
  return <App fallback={fallback} />;
};

export async function getServerSideProps(context: any) {

  // for now, don't cache anything
  return {
    props: {
      fallback: {}
    }
  }

  const cityMax = DEFAULTCITYCOUNT;

  const citiesData = await getCitiesData(3);
  const cityId = citiesData[0].id;
  const cityName = citiesData[0].city;
  const temperatureData = await getCityTemperatureData(cityName, cityId);
  const temperatureUrl = `/api/data/temperatureCurrentCity?cityId=${cityId}`;

  const cityUrl = `/api/data/cities?count=${cityMax}`;

  return {
    props: {
      fallback: {
        [unstable_serialize(cityUrl)]: citiesData,
        [unstable_serialize(temperatureUrl)]: temperatureData, // does not seem to work though ssr data on page looks right
      },
    },
  };
}

// export async function getServerSideProps(context: any) {
//   const citiesData = await getCitiesData(3);
//   const cityId = citiesData[0].id;
//   const cityName = citiesData[0].city;
//   const temperatureData = await getCityTemperatureData(cityName, cityId);
//   const temperatureUrl = `/api/data/temperatureCurrentCity?cityId=${cityId}`;
//
//
//   const cityMax = DEFAULTCITYCOUNT;
//   const cityUrl = `/api/data/cities?count=${cityMax}`;
//
//   // return {
//   //   props: {
//   //     fallback: {}
//   //   }
//   // }
//
//   return {
//     props: {
//       fallback: {
//         [unstable_serialize(cityUrl)]: citiesData,
//         [unstable_serialize(temperatureUrl)]: temperatureData, // does not seem to work though ssr data on page looks right
//       },
//     },
//   };
// }

export default Home;


// api/data/temperatureCurrentCity?cityId=4


// console.log("pages/index.tsx: temperatureData", temperatureData);
// console.log("pages/index.tsx: citiesData", citiesData);
// temperature does not seem to be cached

// for now, leave it without serverside so it loads fast.
//  maybe would need cron job later to have it refresh every 10 minutes to keep data accurate, otherwise, first load would always be wrong

