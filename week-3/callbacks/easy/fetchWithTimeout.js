// Problem Description – fetchWithTimeout(url, ms)

// You are required to write a function named fetchWithTimeout that accepts a URL and a time limit in milliseconds.
// The function must return a Promise that attempts to fetch data from the given URL.
// If the request completes within the specified time, the Promise resolves with the fetched data.
// If the operation exceeds the time limit, the Promise rejects with the message "Request Timed Out".

function fetchWithTimeout(url, ms) {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      reject("Request Timed Out");
    }, ms);

    fetch(url)
      .then((data) => {
        resolve(data);
        clearTimeout(timer);
      })
      .catch((err) => {
        reject(err);
        clearTimeout(timer);
      });
  });
}

function fetchWithTimeoutClean(url, ms) {
  const controller = new AbortController();
  const signal = controller.signal;
  return new Promise((resolve, reject) => {
    let timer =setTimeout(() => {
        controller.abort();
        reject("Request Timed Out");  
      },ms);

    fetch(url, {signal})
      .then((data) => {
        resolve(data);
        clearTimeout(timer);
      })
      .catch((err) => {

        clearTimeout(timer);
        if(err.name == "AbortError"){
            reject("Request Timed Out");
        }else{
        reject(err);
        }
      });
  });
}

module.exports = { fetchWithTimeout, fetchWithTimeoutClean };
