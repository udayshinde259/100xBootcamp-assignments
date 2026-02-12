// Problem Description – everyAsync(array, predicate)

// You are required to implement a function named everyAsync that accepts an array and an asynchronous predicate function. 
// The function should evaluate the predicate for each element and resolve to true only if all predicates return true. 
// The evaluation should stop immediately and resolve to false as soon as any predicate fails.

async function everyAsync(array, predicate) {
    if(array.length == 0){
        return true;
    }
    for(let ele of array){
        let ans = await predicate(ele);
        if(!ans){
            return false;
        }
    }
    return true;
}

module.exports = everyAsync;
