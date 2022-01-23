import { Tooltip } from "./Tooltip";
import airQualityAttributes from "../utils/airQualityAttributes";

export default function AirQualityCircle({ pm25 }) {
  const { circleStackClass, pointsIndicatorClass } = airQualityAttributes(pm25);

  return (
    <Tooltip text={airQualityAttributes(pm25).levelOfConcern}>
      <div className={`circle-stack ${circleStackClass}`}>
        <span className={pointsIndicatorClass}>
          {" "}
          <div>{isNaN(pm25) ? "" : pm25}</div>
        </span>
      </div>
    </Tooltip>
  );
}
