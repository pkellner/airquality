import data from "../../data/usCities.json";

export default async function handler(req, res) {
  const citiesArray = data?.map(function (rec, index) {
    return { ...rec, id: index + 1 };
  });

  res.status(200).json(JSON.stringify(citiesArray, null, "\t"));
}
