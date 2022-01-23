export function createCacheKey(
  processHistory,
  cityName,
  cityCount,
  daysToGoBack
) {
  const cacheKeyValue = `cache-${processHistory === true ? "true" : "false"}-${
    cityName ?? "nocity"
  }-${cityCount ?? "nocnt"}-${daysToGoBack ?? "nodaysback"}`;
  return cacheKeyValue;
}
