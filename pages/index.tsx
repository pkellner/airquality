import type { NextPage } from "next";
import App from "../src/components/App";
import { getCitiesData } from "./api/data/cities";
import { getCityTemperatureData } from "./api/data/temperatureCurrentCity";
import { unstable_serialize } from "swr";

// @ts-ignore
const Home: NextPage = ({ fallback }) => {
  return <App fallback={fallback} />;
};

export async function getServerSideProps(context: any) {
  const citiesData = await getCitiesData(3);
  const cityId = citiesData[0].id;
  const cityName = citiesData[0].city;
  const temperatureData = await getCityTemperatureData(cityName, cityId);
  const temperatureUrl = `/api/data/temperatureCurrentCity?cityId=${cityId}`;

  // console.log("pages/index.tsx: temperatureData", temperatureData);
  // console.log("pages/index.tsx: citiesData", citiesData);
  // temperature does not seem to be cached

  // for now, leave it without serverside so it loads fast.
  //  maybe would need cron job later to have it refresh every 10 minutes to keep data accurate, otherwise, first load would always be wrong

  return {
    props: {
      fallback: {
        ["/api/data/cities?count=50"]: citiesData,
        [unstable_serialize(temperatureUrl)]: temperatureData, // does not seem to work though ssr data on page looks right
      },
    },
  };
}

export default Home;


// api/data/temperatureCurrentCity?cityId=4
