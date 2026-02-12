// Problem Description – batchAll(tasks, batchSize)

// You are required to implement a function named batchAll that processes an array of asynchronous tasks in fixed-size batches. 
// Each batch should execute its tasks concurrently, but the next batch must not start until all tasks in the current batch have completed.
async function batchAll(tasks, batchSize) {
    let ans = [];
    if(tasks.length === 0){
        return[];
    }
    for(let i=0;i<tasks.length;i+=batchSize){
        let chunk = tasks.slice(i, i+batchSize);

            try{
                const val = await Promise.all(chunk.map((task) => task()));
                ans.push(...val);
            }catch (error) {
                throw error;
                
            }

    }
    return ans;
}

module.exports = batchAll;
