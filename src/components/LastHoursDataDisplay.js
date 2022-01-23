import AirQualityCircle from "./AirQualityCircle";
import useSwr from "swr";
import { HISTORYHOURSTOSHOW, ISDEBUGGING } from "../utils/constants";
import { Suspense, useContext, useEffect, useState } from "react";
import { CityContext } from "../contexts/CityContext";
import PagingOffsetLimitControl from "./PagingOffsetLimitControl";

export const LastHoursDataDisplayFallback = () => (
  <div className="fallback-background-color">
    <table className="table">
      <thead>
        <tr>
          <th>Time</th>
          <th>PM 2.5</th>
          <th>Temperature (F)</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4].map(function (rec, index) {
          return (
            <tr key={index}>
              <td>.. hours previous</td>
              <td>
                <AirQualityCircle></AirQualityCircle>
              </td>
              <td>
                {!rec.temperature || isNaN(rec.temperature)
                  ? "---"
                  : parseInt(rec.temperature).toFixed(1)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

function LastHoursList({ currentPage }) {
  const { selectedCityId } = useContext(CityContext);

  const recordsToSkip = (currentPage - 1) * HISTORYHOURSTOSHOW;
  const incrementHours = 1;
  const recordsToReturn = HISTORYHOURSTOSHOW;

  let url = `/api/data/pm25CurrentCityLastHours`;
  url += `?cityId=${selectedCityId}&recordsToSkip=${recordsToSkip}&recordsToReturn=${recordsToReturn}&incrementHours=${incrementHours}`;
  const { data, error } = useSwr(url);

  const sensorHistoryArray = data?.map((rec) => {
    return {
      pm25: rec.pm25,
      created: rec.created,
      temperature: rec.temperature,
      createdDateTime: rec.createdDateTime,
    };
  });

  const sensorHistoryTimeDescending = sensorHistoryArray?.sort((a, b) => {
    if (a.createdDateTime > b.createdDateTime) return -1;
    if (a.createdDateTime < b.createdDateTime) return 1;
    return 0;
  });

  let timeListLocal = [];
  for (let i = 0; i < recordsToReturn; i += 1) {
    timeListLocal.push({
      created: `${i + recordsToSkip + 1} ${
        i === 0 ? "hour" : "hours"
      } previous`,
      createdDateTime: sensorHistoryTimeDescending[i]?.createdDateTime,
      pm25:
        sensorHistoryTimeDescending && sensorHistoryTimeDescending[i]
          ? sensorHistoryTimeDescending[i]?.pm25
          : 999,
      temperature:
        sensorHistoryTimeDescending && sensorHistoryTimeDescending[i]
          ? sensorHistoryTimeDescending[i]?.temperature
          : 0,
    });
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>PM 2.5</th>
            <th>Temperature (F)</th>
          </tr>
        </thead>
        <tbody>
          {timeListLocal.map(function (rec) {
            return (
              <tr key={rec.created}>
                <td>{rec.created}</td>
                <td>
                  <AirQualityCircle
                    pm25={rec.pm25?.toFixed(0)}
                  ></AirQualityCircle>
                  {ISDEBUGGING === true ? (
                    <span>{rec.createdDateTime}</span>
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  {!rec.temperature || isNaN(rec.temperature)
                    ? "------"
                    : parseInt(rec.temperature).toFixed(1)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function LastHoursDataDisplay() {
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedCityId } = useContext(CityContext);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCityId]);

  if (!selectedCityId) {
    return <LastHoursDataDisplayFallback />;
  }

  return (
    <div>
      {/*<Suspense fallback={<LastHoursDataDisplayFallback />}>*/}
        <LastHoursList currentPage={currentPage} />
      {/*</Suspense>*/}
      <div className="container-fluid">
        <PagingOffsetLimitControl
          lastPage={7 * 3}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
