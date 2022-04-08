


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

export default async function cityDataHandler(req, res) {
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
    let filtered = {};
    await new Promise((r) => setTimeout(r, 2000));
    filtered = cityData.filter((city) => city.id == req.query.id);
    if (filtered.length > 0) {
      res.status(200).json(filtered[0]);
    } else {
      res.status(404).json({message: `city with id: ${(req.query.id)} not found.`});
    }
  }
}
