import useSwr from "swr";
import { ISDEBUGGING } from "../utils/constants";
import { useContext } from "react";
import { CityContext } from "../contexts/CityContext";
import { LastHoursDataDisplayFallback } from "./LastHoursDataDisplay";

export const TemperatureDisplayFallback = () => {
  return (
    <div className="fallback-background-color">
      <i>Temperature:</i>&nbsp;&nbsp;
      <i>---&nbsp;F</i>
    </div>
  );
};

export default function TemperatureDisplay() {
  function ProcessDataAndRender() {
    const { selectedCityId } = useContext(CityContext);
    const { data, error } = useSwr(
      `/api/data/temperatureCurrentCity?cityId=${selectedCityId}`
    );
    return (
      <div>
        Temperature:&nbsp;&nbsp;
        <b>{data?.temperature?.toFixed(1)}&nbsp;F</b>
        {ISDEBUGGING === true ? <div>{data?.created}</div> : <></>}
      </div>
    );
  }

  const { selectedCityId } = useContext(CityContext);

  if (!selectedCityId) {
    return <LastHoursDataDisplayFallback />;
  }

  return <ProcessDataAndRender />;
}
