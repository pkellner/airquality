// throws away the top and bottom pm25 values and returns the indices of the sensors that are left
export default function getIndexesOfTopSensors(cityRec) {
  let resultList = [];
  const sensorList = cityRec?.sensors
    .map(function (sensor, index) {
      return {
        index,
        pm25: sensor.pm25,
      };
    })
    .sort((a, b) => {
      return a.pm25 - b.pm25; // ascending
    });
  console.log(sensorList);

  if (sensorList?.length <= 3) {
    resultList = sensorList.map((a) => a.index);
  }
  if (sensorList?.length === 4) {
    resultList = sensorList.map((a) => a.index).slice(1);
  }
  resultList = sensorList?.map((a) => a.index).slice(1, sensorList.length - 1);

  console.log(resultList);
  return resultList;
}
