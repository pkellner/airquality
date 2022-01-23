export async function fetcher(url) {
  const rsp = await fetch(url);
  if (rsp.ok) {
    return await rsp.json();
  } else {
    const MyError = function (message, status) {
      this.message = `${message} from url ${url} status code:${status}`;
      this.status = status;
    };
    throw new MyError(rsp.statusText, rsp.status);
    // throw
    //   message: `${message} from url ${url} status code:${status}`,
    //   status,
    // };
  }
}
