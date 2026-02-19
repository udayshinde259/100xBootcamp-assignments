// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises. 
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully. 
// If all the promises reject, the returned Promise should reject with an error.
function promiseAny(promises) {
    return new Promise((resolve, reject) => {
    if (promises.length == 0) {
      reject(new Error("Empty iterable"));
    }

    let err = [];
    let completed = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          completed++;
          if (completed == promises.length) {
           reject(new Error("All promises were rejected"));
          }
        });
    });
  });
}

module.exports = promiseAny;
