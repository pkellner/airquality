import React, { createContext, useState } from "react";
import { DEFAULTCITYCOUNT } from "../utils/constants";

export const CityContext = createContext();

function CityProvider({ children }) {
  const [selectedCityId, setSelectedCityId] = useState();
  const [selectedCityName, setSelectedCityName] = useState();
  const [cityMax, setCityMax] = useState(DEFAULTCITYCOUNT);
  const [selectedStateName, setSelectedStateName] = useState();
  const [hoursAgo, setHoursAgo] = useState(0);

  const contextValue = {
    selectedCityId,
    setSelectedCityId,
    selectedCityName,
    setSelectedCityName,
    cityMax,
    setCityMax,
    selectedStateName,
    setSelectedStateName,
    hoursAgo,
    setHoursAgo,
  };

  return (
    <CityContext.Provider value={contextValue}>{children}</CityContext.Provider>
  );
}

export { CityProvider };
