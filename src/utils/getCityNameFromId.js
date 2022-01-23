import citiesArrayOnlyJson from "../../data/usCities.json";

export default function getCityNameFromId(cityId) {
  const cityRec = citiesArrayOnlyJson.find((rec) => {
    return rec.id === cityId;
  });
  return cityRec?.city;
}
