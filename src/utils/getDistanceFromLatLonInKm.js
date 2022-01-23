//https://www.tutorialsplane.com/javascript-calculate-distance-between-latitude-longitude-points/
export default function getDistanceFromLatLonInKm(
  latitude1,
  longitude1,
  latitude2,
  longitude2
) {
  var p = 0.017453292519943295; //This is  Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((latitude2 - latitude1) * p) / 2 +
    (c(latitude1 * p) *
      c(latitude2 * p) *
      (1 - c((longitude2 - longitude1) * p))) /
      2;
  var R = 6371; //  Earth distance in km so it will return the distance in km
  var dist = 2 * R * Math.asin(Math.sqrt(a));
  return dist;
}
