// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

function batchProcess(items, limit, worker, onComplete) {
 if(items.length == 0){
    return onComplete(null, []);
 }

 let result = new Array(items.length);
 let index = 0;
 let completed = 0;
 let inFlight = 0;
 let stopped = false;

 function run(){

    if(stopped) return;

    if(completed === items.length){
        return onComplete(null, result);
    }

    while(index < items.length && inFlight<limit){
        let currentIdx = index;
        let item = items[currentIdx];
        index++;
        inFlight++

        worker(item, (err,data)=>{
            inFlight--;
            
            if(stopped) return;

            if(err){
                stopped = true;
                return onComplete(err);
            }
            

            result[currentIdx] = data;
            completed++;
            

            run();
        })
       
    }
 }
 run();
}



module.exports = batchProcess;