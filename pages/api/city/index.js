import Cors from "cors";
import initMiddleware from "../../../src/utils/initMiddleware";
import runDelayMiddleware from "../../../src/utils/runDelayMiddleware";



// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET"],
  })
);

export default async function handler(req, res) {
  await runDelayMiddleware(req, res,2000,2000);
  {
    const cityData = [
      {
        id: 6,
        city: "Chicago",
        state: "Illinois",
      },
      {
        id: 5,
        city: "Los Angeles",
        state: "California",
      },
      {
        id: 4,
        city: "New York",
        state: "New York",
      },
    ];
    await cors(req, res)
    await new Promise((r) => setTimeout(r, 2000));
    res.status(200).json(cityData);
  }
  
 
}


/*
await runDelayMiddleware(req, res);
  {
    let count = 9999;
    if (req?.query?.count) {
      count = parseInt(req.query.count);
    }

    const resultData = await getCitiesData(count);

    res.status(200).json(JSON.stringify(resultData, null, "\t"));
  }
 */
