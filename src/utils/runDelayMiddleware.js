// adds a random delay to all nextJS API calls that use this
// export default async function handler(req, res) {
//   await runDelayMiddleware(req, res );
//   {
//     let maxCnt = 9999;

import {
  PURPLEAIR_APIKEY,
  SERVERRESTDELAYMAXMS,
  SERVERRESTDELAYMINMS,
} from "./constants";

export default function runDelayMiddleware(
  req,
  res,
  minDelayMs = parseInt(SERVERRESTDELAYMINMS),
  maxDelayMs = parseInt(SERVERRESTDELAYMAXMS)
) {
  let delayMs = Math.floor(
    // math.random() is 0.0 to 1.0
    Math.random() * (maxDelayMs - minDelayMs + 1) + minDelayMs
  );

  if (PURPLEAIR_APIKEY && PURPLEAIR_APIKEY.length > 0) {
    //just slow it down a little
    if (delayMs > 1000) {
      delayMs -= 1000;
    }
  }

  return new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}
