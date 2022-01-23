import TemperatureDisplay, {
  TemperatureDisplayFallback,
} from "./TemperatureDisplay";
import DataStatsDisplay, { DataStatsDisplayFallback } from "./DataStatsDisplay";
import LastHoursDataDisplay, {
  LastHoursDataDisplayFallback,
} from "./LastHoursDataDisplay";
import { CityContext } from "../contexts/CityContext";
import { useContext, Suspense } from "react";

export const CityDetailFallback = () => {
  return (
    <div className="city-details">
      <h3> City → ...</h3>
      <ul>
        {/* <li></li> */}
        <li><TemperatureDisplayFallback /></li>
        <li><DataStatsDisplayFallback /></li>
        <li><LastHoursDataDisplayFallback /></li>
      </ul>
    </div>
  );
};

function ProcessDataAndRender() {
  const { selectedCityName, selectedCityId } = useContext(CityContext);

  // IF THE BELOW 3 LINES ARE COMMENTED OUT, THE DISPLAY SHOW MULTIPLE LastHoursDataDisplay components and not the proper fallback.
  if (!selectedCityId) {
    return <CityDetailFallback />;
  }

  return (
    <Suspense fallback={<CityDetailFallback />}>
      <div className="city-details">
        <h3> City → {selectedCityName}</h3>
        <ul>
          {/* <li></li> */}
          <li>
            {/*<Suspense fallback={<TemperatureDisplayFallback />}>*/}
            <TemperatureDisplay />
            {/*</Suspense>*/}
          </li>
          <li>
            {/*<Suspense fallback={<DataStatsDisplayFallback />}>*/}
            <DataStatsDisplay />
            {/*</Suspense>*/}
          </li>
          <li>
            <Suspense fallback={<LastHoursDataDisplayFallback />}>
              <LastHoursDataDisplay />
            </Suspense>
          </li>
        </ul>
      </div>
    </Suspense>
  );
}

export default function CityDetail() {
  return <ProcessDataAndRender />;
}
