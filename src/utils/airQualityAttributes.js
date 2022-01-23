export default function airQualityAttributes(pm25) {
  const aqiValues = [
    {
      circleStackClass: "circle-stack-default",
      pointsIndicatorClass: "points-indicator-gray",
      color: "Gray",
      levelOfConcern: "",
      minValue: -1,
      maxValue: -1,
      description: "",
    },
    {
      circleStackClass: "circle-stack-good",
      pointsIndicatorClass: "points-indicator-gray",
      color: "Green",
      levelOfConcern: "Good",
      minValue: 0,
      maxValue: 50,
      description:
        "Air quality is satisfactory, and air pollution poses little or no risk",
    },
    {
      circleStackClass: "circle-stack-moderate",
      pointsIndicatorClass: "points-indicator-gray",
      color: "Yellow",
      levelOfConcern: "Moderate",
      minValue: 51,
      maxValue: 100,
      description:
        "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution",
    },
    {
      circleStackClass: "circle-stack-sensitive",
      pointsIndicatorClass: "points-indicator-gray",
      color: "Orange",
      levelOfConcern: "Unhealthy for Sensitive Groups",
      minValue: 101,
      maxValue: 150,
      description:
        "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution",
    },
    {
      circleStackClass: "circle-stack-unhealthy",
      pointsIndicatorClass: "points-indicator-gray",
      color: "Red",
      levelOfConcern: "Unhealthy",
      minValue: 151,
      maxValue: 200,
      description:
        "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects",
    },
    {
      circleStackClass: "circle-stack-very-unhealthy",
      pointsIndicatorClass: "points-indicator-gray",
      color: "Purple",
      levelOfConcern: "Very Unhealthy",
      minValue: 201,
      maxValue: 300,
      description:
        "Health alert: The risk of health effects is increased for everyone",
    },
    {
      circleStackClass: "circle-stack-hazardous",
      pointsIndicatorClass: "points-indicator-gray",
      color: "Maroon",
      levelOfConcern: "Hazardous",
      minValue: 301,
      maxValue: 99999,
      description:
        "Health warning of emergency conditions: everyone is more likely to be affected",
    },
  ];

  let aqiRet = aqiValues[0]; // default
  for (let i = 0; i < aqiValues.length; i++) {
    if (pm25 >= aqiValues[i].minValue && pm25 <= aqiValues[i].maxValue) {
      aqiRet = aqiValues[i];
      break;
    }
  }
  return aqiRet;
}
