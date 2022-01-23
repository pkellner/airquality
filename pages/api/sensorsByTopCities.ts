import type { NextApiRequest, NextApiResponse } from "next";
import retrieveAirQualityData from "../../src/utils/retrieveAirQualityData";

type Data = {
  name: string;
};

const PROCESSHISTORY = true;
const TOPCITYCOUNT = 10;
const DAYSTOGOBACK = 15;
const SINGLECITYTOPROCESS = ""; // JUST FOR DEBUGGING  "New York"; or "Jacksonville" or "" "Oklahoma City" "Virginia Beach"

// http://localhost:3000/api/sensorsByTopCities?singleCityToProcess=Phoenix&processHistory=false
// http://localhost:3000/api/sensorsByTopCities?processHistory=false&cityCount=50

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const topCityCount: any = req?.query?.cityCount ?? TOPCITYCOUNT;
  const daysToGoBack: any = req?.query?.daysToGoBack ?? DAYSTOGOBACK;
  const processHistory: any = req?.query?.processHistory
    ? req.query.processHistory === "true"
      ? true
      : false
    : PROCESSHISTORY;

  const singleCityToProcess: any = req?.query?.singleCityToProcess
    ? req.query.singleCityToProcess
    : SINGLECITYTOPROCESS;

  const returnData = await retrieveAirQualityData(
    processHistory,
    singleCityToProcess,
    topCityCount,
    daysToGoBack
  );
  // @ts-ignore
  res.status(200).json(JSON.stringify(returnData,4,`\t`));
}
