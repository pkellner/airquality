// https://stackoverflow.com/questions/238260/how-to-calculate-the-bounding-box-for-a-given-lat-lng-location

export default function getBoundingBox(
  fsLatitude,
  fsLongitude,
  fiDistanceInKM
) {
  const degreeToRadius = function (val) {
    return val * (Math.PI / 180);
  };

  const radiusToDegree = function (val) {
    return (180 * val) / Math.PI;
  };

  if (
    fiDistanceInKM == null ||
    fiDistanceInKM == undefined ||
    fiDistanceInKM == 0
  )
    fiDistanceInKM = 1;

  var MIN_LAT,
    MAX_LAT,
    MIN_LON,
    MAX_LON,
    ldEarthRadius,
    ldDistanceInRadius,
    lsLatitudeInDegree,
    lsLongitudeInDegree,
    lsLatitudeInRadius,
    lsLongitudeInRadius,
    lsMinLatitude,
    lsMaxLatitude,
    lsMinLongitude,
    lsMaxLongitude,
    deltaLon;

  // coordinate limits
  MIN_LAT = degreeToRadius(-90);
  MAX_LAT = degreeToRadius(90);
  MIN_LON = degreeToRadius(-180);
  MAX_LON = degreeToRadius(180);

  // Earth's radius (km)
  ldEarthRadius = 6378.1;

  // angular distance in radians on a great circle
  ldDistanceInRadius = fiDistanceInKM / ldEarthRadius;

  // center point coordinates (deg)
  lsLatitudeInDegree = fsLatitude;
  lsLongitudeInDegree = fsLongitude;

  // center point coordinates (rad)
  lsLatitudeInRadius = degreeToRadius(lsLatitudeInDegree);
  lsLongitudeInRadius = degreeToRadius(lsLongitudeInDegree);

  // minimum and maximum latitudes for given distance
  lsMinLatitude = lsLatitudeInRadius - ldDistanceInRadius;
  lsMaxLatitude = lsLatitudeInRadius + ldDistanceInRadius;

  // minimum and maximum longitudes for given distance
  lsMinLongitude = void 0;
  lsMaxLongitude = void 0;

  // define deltaLon to help determine min and max longitudes
  deltaLon = Math.asin(
    Math.sin(ldDistanceInRadius) / Math.cos(lsLatitudeInRadius)
  );

  if (lsMinLatitude > MIN_LAT && lsMaxLatitude < MAX_LAT) {
    lsMinLongitude = lsLongitudeInRadius - deltaLon;
    lsMaxLongitude = lsLongitudeInRadius + deltaLon;
    if (lsMinLongitude < MIN_LON) {
      lsMinLongitude = lsMinLongitude + 2 * Math.PI;
    }
    if (lsMaxLongitude > MAX_LON) {
      lsMaxLongitude = lsMaxLongitude - 2 * Math.PI;
    }
  }

  // a pole is within the given distance
  else {
    lsMinLatitude = Math.max(lsMinLatitude, MIN_LAT);
    lsMaxLatitude = Math.min(lsMaxLatitude, MAX_LAT);
    lsMinLongitude = MIN_LON;
    lsMaxLongitude = MAX_LON;
  }

  var bounds = {
    lat_min: radiusToDegree(lsMinLatitude),
    lon_min: radiusToDegree(lsMinLongitude),
    lat_max: radiusToDegree(lsMaxLatitude),
    lon_max: radiusToDegree(lsMaxLongitude),
  };
  return bounds;

  // return [
  //     lsMinLatitude.radiusToDegree(),
  //     lsMinLongitude.radiusToDegree(),
  //     lsMaxLatitude.radiusToDegree(),
  //     lsMaxLongitude.radiusToDegree()
  // ];
}
