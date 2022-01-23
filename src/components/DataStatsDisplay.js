import AirQualityCircle from "./AirQualityCircle";
import { ISDEBUGGING } from "../utils/constants";
import useSwr from "swr";
import { useContext } from "react";
import { CityContext } from "../contexts/CityContext";
import { LastHoursDataDisplayFallback } from "./LastHoursDataDisplay";

export const DataStatsDisplayFallback = () => {
  return (
    <div className="fallback-background-color">
      <h5>PM 2.5 10 Day History Stats</h5>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Min</th>
              <th scope="col">Max</th>
              <th scope="col">Avg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <AirQualityCircle />
              </td>
              <td>
                <AirQualityCircle />
              </td>
              <td>
                <AirQualityCircle />
              </td>
            </tr>
            <tr>
              <td>
                <b>--- F</b>
              </td>
              <td>
                <b>--- F</b>
              </td>
              <td>
                <b>--- F</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function DataStatsDisplay() {
  function ProcessDataAndRender() {
    const { selectedCityId } = useContext(CityContext);
    const { data, error } = useSwr(
      `/api/data/pm25CurrentCity10DayStats?cityId=${selectedCityId}`
    );

    // if (error) return <div>{error.message}</div>;
    //
    // if (!data) return <div>Loading...</div>;

    return (
      <div>
        <h5>PM 2.5 10 Day History Stats</h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Min</th>
                <th scope="col">Max</th>
                <th scope="col">Avg</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <AirQualityCircle pm25={data.pm25Min} />
                </td>
                <td>
                  <AirQualityCircle pm25={data.pm25Max} />
                </td>
                <td>
                  <AirQualityCircle pm25={data.pm25Average} />
                </td>
              </tr>
              <tr>
                <td>
                  <b>{parseInt(data.temperatureMin).toFixed(1)} F</b>
                </td>
                <td>
                  <b>{parseInt(data.temperatureMax).toFixed(1)} F</b>
                </td>
                <td>
                  <b>{parseInt(data.temperatureAverage).toFixed(1)} F</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {ISDEBUGGING === true ? (
          <div>{JSON.stringify(data, 4, `\t`)}</div>
        ) : (
          <></>
        )}
      </div>
    );
  }

  const { selectedCityId } = useContext(CityContext);

  if (!selectedCityId) {
    return <LastHoursDataDisplayFallback />;
  }

  return (
    // <Suspense fallback={<DataStatsDisplayFallback />}>
    <ProcessDataAndRender />
    // </Suspense>
  );
}
