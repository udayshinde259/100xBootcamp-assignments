// Problem Description – Asynchronous Map with Concurrency Limit

// You are required to implement an asynchronous version of Array.map that processes items using an async callback function. 
// Unlike the standard map, this version should only process a limited number of items concurrently. 
// As soon as one operation finishes, the next should begin.
// The final result must preserve the original order of the input array.
async function mapAsyncLimit(array, limit, asyncFn) {
    let result = [];
    for(let i=0;i<array.length;i+=limit){
        let chunk = array.slice(i,i+limit);

        for(let ele of chunk){
            let ans = await asyncFn(ele);
            result.push(ans);
        }
    }
    return result;
}

module.exports = mapAsyncLimit;
