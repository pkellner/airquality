export const ISDEBUGGING =
  process.env.NEXT_PUBLIC_ISDEBUGGING &&
  process.env.NEXT_PUBLIC_ISDEBUGGING == "true"
    ? true
    : false;

// known problem sensors
export const EXCLUDESENSORIDS = [126335];

// values for dropdown list
export const CITYCOUNTCHOICES = [3, 5, 10, 25, 50];
export const DEFAULTCITYCOUNT = 5;
export const HISTORYHOURSTOSHOW = 4;
export const SERVERRESTDELAYMINMS = process?.env?.SERVERRESTDELAYMINMS ?? 2000;
export const SERVERRESTDELAYMAXMS = process?.env?.SERVERRESTDELAYMAXMS ?? 7000;

// put key in .env.loal
export const PURPLEAIR_APIKEY =
  process.env.PURPLEAIR_APIKEY && process.env.PURPLEAIR_APIKEY.length > 10
    ? process.env.PURPLEAIR_APIKEY
    : "";

// used for caching REST calls from components. Must be greater then 1 ms for cache to not throw error
export const MEMORYCACHEDELAYMS = process.env.MEMORYCACHEDELAYMS
  ? process.env.MEMORYCACHEDELAYMS
  : 1;
