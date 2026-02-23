// Problem Description – once(fn)
//
// You are required to implement a wrapper function named once that accepts a
// callback-based asynchronous function `fn`.
// The wrapper should ensure that `fn` is executed only on the first call.
// Any subsequent calls should not re-execute `fn` and should instead invoke
// the callback with the same result (or error) from the first invocation.

function once(fn) {
  let started = false;
  let finished = false;
  let returedErr = null;
  let returedData = null;
  let waitingCallback = [];

  return function(...args){
    const callback = args.pop();

    if(finished){
      callback(returedErr, returedData);
    }

    if(started){
      waitingCallback.push(callback);
      return;
    }

    started = true;
    waitingCallback.push(callback);

    fn(...args, (err, data)=>{
      if(err){
        returedErr = err;
      }else{
        returedData = data;
      }
      
      for(let cb of waitingCallback){
        cb(returedErr, returedData);
      }

      waitingCallback = [];
    })
  }

}

module.exports = once;
