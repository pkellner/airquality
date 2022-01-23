import CityMaxCntDropDownList from "./CityMaxCntDropDownList";

export function TitleAndCityDropDown() {
  return (
    <div className="container-fluid">
      <div className="header-toolbar row">
        <div>
          <h3>Top United States cities air quality and temperature</h3>
        </div>
        <div className="selector">
          <CityMaxCntDropDownList />
        </div>
      </div>
    </div>
  );
}
