

async function fetcher(url) {
  const rsp = await fetch(url);
  if (rsp.ok) {
    return await rsp.json();
  } else {
    const MyError = function(message, status) {
      this.message = `${message} from url: ${url} status: ${status}`;
      this.status = status;
    };
    throw new MyError(rsp.statusText, rsp.status);
  }
}

























async function fetcher(url) {
  const rsp = await fetch(url);
  if (rsp.ok) {
    return await rsp.json();
  } else {
    const MyError = function(message, status) {
      this.message = `${message} from url: ${url} status: ${status}`;
      this.status = status;
    };
    throw new MyError(rsp.statusText, rsp.status);
  }
}





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
  }
}


  export async function fetcher(url) {
  const rsp = await fetch(url);
  if (rsp.ok) {
    return await rsp.json();
  } else {
    const MyError = function (message, status) {
      this.message = `${message} from url ${url} status code:${status}`;
      this.status = status;
    };
  }
}


function fetcher(url) {
  const rsp = await fetch(url);
  return await rsp.json();
}

const fetcher = (url) => fetch(url).then((res) => res.json());

const async fetcher = (url) => {
    const rsp = fetch(url).then((res) => res.json());
  };





export async function fetcher(url) {
  const rsp = await fetch(url);
  if (rsp.ok) {
    return await rsp.json();
  } else {
    const MyError = function (message, status) {
      this.message = `${message} from url ${url} status code:${status}`;
      this.status = status;
    };
  }
}