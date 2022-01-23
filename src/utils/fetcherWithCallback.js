export async function fetcherWithCallback(url, completion) {
  const rsp = await fetch(url);
  if (rsp.ok) {
    const data = await rsp.json();
    if (completion) {
      completion(data);
    }
    return data;
  } else {
    const MyError = function (message, status) {
      this.message = `${message} from url ${url} status code:${status}`;
      this.status = status;
    };
    throw new MyError(rsp.statusText, rsp.status);
  }
}
