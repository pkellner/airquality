import Legend from "./Legend";
import { TitleAndCityDropDown } from "./TitleAndCityDropDown";
import CityListItems, { CityListItemsFallback } from "./CityListItems";
import CityDetail, { CityDetailFallback } from "./CityDetail";
import { Suspense } from "react";

function TopUsCities() {
  function TopUsCitiesFallback() {
    return (
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-sm-12 col-lg-3 col-md-6">
            <CityListItemsFallback />
          </div>
          <div className="col-sm-12 col-lg-4 col-md-6">
            <CityDetailFallback />
          </div>
          <div className="col-sm-12 col-lg-5 col-md-6">
            <Legend />
          </div>
        </div>
      </div>
    );
  }

  function ProcessDataAndRender() {
    return (
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-sm-12 col-lg-3 col-md-6">
            <CityListItems />
          </div>
          <div className="col-sm-12 col-lg-4 col-md-6">
            <CityDetail />
          </div>
          <div className="col-sm-12 col-lg-5 col-md-6">
            <Legend />
          </div>
        </div>
        <hr />
        <p className="text-center">
          * Data provided using the (c) PurpleAir API. Though multiple sensors
          are available for each city, this data is simply taking the closes
          sensor to city center and using that. A better statistical approach
          could be taken and may be in the future as there are often many
          sensors in cities.
        </p>
        <p className="text-center">
          ** For further information contact{" "}
          <a href="https://peterkellner.net/">
            https://peterkellner.net/contact
          </a>
        </p>
        .
      </div>
    );
  }

  return (
    <>
      <TitleAndCityDropDown />
      <ProcessDataAndRender />
    </>
  );
}

export default TopUsCities;
