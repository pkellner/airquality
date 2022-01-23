import {
  DEFAULTCITYCOUNT,
  MEMORYCACHEDELAYMS,
  PURPLEAIR_APIKEY,
  SERVERRESTDELAYMAXMS,
  SERVERRESTDELAYMINMS,
} from "../src/utils/constants";

function Page({
  SERVERRESTDELAYMAXMS,
  SERVERRESTDELAYMINMS,
  MEMORYCACHEDELAYMS,
  DEFAULTCITYCOUNT,
  PURPLEAIR_APIKEY,
  RELEASEDATE,
  RELEASEDATEISO,
  RELEASEVERSION,
}) {
  const isDebugging = process?.env?.NEXT_PUBLIC_ISDEBUGGING;

  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    console.log("calculated days", days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    console.log("calculated hours", hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    console.log("minutes", minutes);

    let difference = "";
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `;
    }

    difference +=
      hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

    difference +=
      minutes === 0 || hours === 1
        ? `${minutes} minutes`
        : `${minutes} minutes`;

    return difference;
  }

  let diffString = "not assigned";
  if (RELEASEDATEISO && RELEASEDATEISO.length > 0) {
    const releaseDate = new Date(RELEASEDATEISO);
    console.log(releaseDate);
    diffString = timeDiffCalc(releaseDate, new Date());
    console.log(diffString);
  }

  return (
    <div>
      <h2>Server Side</h2>
      process.env.SERVERRESTDELAYMAXMS : {SERVERRESTDELAYMAXMS}
      <br />
      process.env.SERVERRESTDELAYMINMS: {SERVERRESTDELAYMINMS}
      <br />
      process.env.MEMORYCACHEDELAYMS: {MEMORYCACHEDELAYMS}
      <br />
      process.env.DEFAULTCITYCOUNT: {DEFAULTCITYCOUNT}
      <br />
      process.env.PURPLEAIR_APIKEY: {PURPLEAIR_APIKEY}
      <br />
      Released: <b>{diffString}</b> ago.
      <br />
      process.env.RELEASEDATE: {RELEASEDATE ?? "DEV"}
      <br />
      process.env.RELEASEDATEISO: {RELEASEDATEISO ?? "DEV"}
      <br />
      process.env.RELEASEVERSION: {RELEASEVERSION ?? "DEV"}
      <br />
      <hr />
      <h2>Client Side</h2>
      process?.env?.NEXT_PUBLIC_ISDEBUGGING:{" "}
      {isDebugging == "true" ? "true" : "false"}
      <br />
    </div>
  );
}

export async function getServerSideProps(context) {
  // const memoryCachedDelayMs = process?.env?.MEMORYCACHEDELAYMS
  //   ? process.env.MEMORYCACHEDELAYMS.toString()
  //   : "not found";
  //
  // const defaultCityCount = process?.env?.DEFAULTCITYCOUNT
  //   ? process.env.DEFAULTCITYCOUNT.toString()
  //   : "not found";

  return {
    props: {
      SERVERRESTDELAYMAXMS: SERVERRESTDELAYMAXMS.toString(),
      SERVERRESTDELAYMINMS: SERVERRESTDELAYMINMS.toString(),
      MEMORYCACHEDELAYMS: MEMORYCACHEDELAYMS.toString(),
      DEFAULTCITYCOUNT: DEFAULTCITYCOUNT.toString(),
      PURPLEAIR_APIKEY: PURPLEAIR_APIKEY.slice(0, 10) + "...",
      RELEASEDATE: process?.env?.RELEASEDATE
        ? process.env.RELEASEDATE.toString()
        : "NONE",
      RELEASEDATEISO: process?.env?.RELEASEDATEISO
        ? process.env.RELEASEDATEISO.toString()
        : "NONE",
      RELEASEVERSION: process?.env?.RELEASEVERSION
        ? process.env.RELEASEVERSION.toString()
        : "NONE",
      //RELEASEVERSION: process.env.RELEASEVERSION.toString()
    }, // will be passed to the page component as props
  };
}

export default Page;
