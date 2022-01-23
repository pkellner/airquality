export default function Legend() {
  // used https://magic.reactjs.net/htmltojsx.htm to
  // copy this:  https://www.airnow.gov/aqi/aqi-basics/
  return (
    <table className="table table-sm legend-table">
      <caption className="text-center">
        <strong>AQI Basics for Ozone and Particle Pollution</strong>
      </caption>
      <thead className="table-light">
        <tr>
          <th scope="col">Daily AQI Color</th>
          <th scope="col">Levels of Concern</th>
          <th scope="col">Values of Index</th>
          <th scope="col">Description of Air Quality</th>
        </tr>
      </thead>
      <tbody>
        <tr className="circle-stack-good">
          <td >Green</td>
          <td id="good" >
            <strong>Good</strong>
          </td>
          <td >
            <strong>0 to 50</strong>
          </td>
          <td>
              Air quality is satisfactory, and air pollution poses little or no
              risk.
          </td>
        </tr>

        <tr className="circle-stack-moderate">
          <td>Yellow</td>
          <td id="mod" >
            <strong>Moderate</strong>
          </td>
          <td >
            <strong>51 to 100</strong>
          </td>
          <td>
            Air quality is acceptable. However, there may be a risk for some
            people, particularly those who are unusually sensitive to air
            pollution.
          </td>
        </tr>
        <tr className="circle-stack-sensitive">
          <td >Orange</td>
          <td id="sens" >
            <strong>Unhealthy for Sensitive Groups</strong>
          </td>
          <td >
            <strong>101 to 150</strong>
          </td>
          <td>
              Members of sensitive groups may experience health effects. The
              general public is less likely to be affected.
          </td>
        </tr>
        <tr className="circle-stack-unhealthy">
          <td >Red</td>
          <td id="unh" >
            <strong>Unhealthy</strong>
          </td>
          <td >
            <strong>151 to 200</strong>
          </td>
          <td>
            Some members of the general public may experience health effects;
            members of sensitive groups may experience more serious health
            effects.
          </td>
        </tr>
        <tr className="circle-stack-very-unhealthy">
          <td >Purple</td>
          <td id="vunh" >
            <strong>Very Unhealthy</strong>
          </td>
          <td >
            <strong>201 to 300</strong>
          </td>
          <td>
              Health alert: The risk of health effects is increased for
              everyone.
          </td>
        </tr>
        <tr className="circle-stack-hazardous">
          <td>Maroon</td>
          <td id="haz" >
            <strong>Hazardous</strong>
          </td>
          <td >
            <strong>301 and higher</strong>
          </td>
          <td>
              Health warning of emergency conditions: everyone is more likely to
              be affected.
          </td>
        </tr>
      </tbody>
    </table>
  );
}
