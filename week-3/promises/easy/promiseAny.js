// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises. 
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully. 
// If all the promises reject, the returned Promise should reject with an error.
function promiseAny(promises) {
    return new Promise((resolve, reject)=>{ 
        let completed = 0;

        if(promises.length == 0){
            reject(new Error(`Empty iterable`));

        }

        promises.forEach((p, index) => {
           Promise.resolve(p)
           .then((value) =>{
            resolve(value);
            
           })
           .catch((err)=>{
            completed++;
            if(completed == promises.length){
                reject(new Error("All promises were rejected"));
            }
           });
        });
    });
}

module.exports = promiseAny;
