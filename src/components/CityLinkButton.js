import { ISDEBUGGING } from "../utils/constants";
import AirQualityCircle from "./AirQualityCircle";

export const CityLinkButtonFallback = () => {
  return (
    <div className="row align-items-center">
      <div className="col-7 ">
        name - state
        <br />
        <i className="font-size-smaller">Population: ---</i>
      </div>

      <div className="col-2"></div>

      <div className="col-3 align-item-right">
        <AirQualityCircle />
      </div>
    </div>
  );
};

export function CityLinkButton({ cityRec, isPending = false }) {
  // console.log(
  //   `CityLinkButton: isPending:${isPending === true ? "true" : "false"}`
  // );
  return (
    <div className="row align-items-center">
      <div className="col-7 ">
        <h4>{cityRec.city} - {cityRec.state}</h4>
        <i className="font-size-smaller">
          Population:
          {cityRec.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </i>
        {ISDEBUGGING === true ? (
          <div>{JSON.stringify(cityRec, 4, `\t`)}</div>
        ) : (
          <></>
        )}
      </div>

      <div className="col-2 ">
        {isPending ? (
          <div className="spinner-border font-size-smaller" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
      </div>

      <div className="col-3 align-item-right">
        <AirQualityCircle pm25={cityRec.pm25} />
      </div>
    </div>
  );
}
