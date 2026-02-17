// Problem Description – Task Execution with Dependencies
//
// You are given a set of asynchronous tasks where some tasks depend
// on the completion of others.
// Your goal is to execute each task only after all of its dependencies
// have been successfully completed.
// The solution should ensure correct execution order and handle
// dependency relationships properly.
//
// Each task is asynchronous and must invoke a callback when finished.
// Invoke finalCallback after all tasks have completed, or with an error
// if any task fails.

function runDependentTasks(tasks, dependencies, finalCallback) {
  const graph = {};
  const inDegree = {};
  const results = {};
  const taskNames = Object.keys(tasks);

  // init
  for (const name of taskNames) {
    graph[name] = [];
    inDegree[name] = 0;
  }

  // build graph
  for (const [child, parent] of dependencies) {
    graph[parent].push(child);
    inDegree[child]++;
  }

  let completed = 0;
  let finished = false;

  function runReady(queue) {
    if (queue.length === 0) {
      if (completed !== taskNames.length && !finished) {
        finished = true;
        return finalCallback(new Error("Cycle detected in dependencies"));
      }
      return;
    }

    let pending = queue.length;

    queue.forEach((name) => {
      tasks[name]((err, data) => {
        if (finished) return;

        if (err) {
          finished = true;
          return finalCallback(err);
        }

        results[name] = data;
        completed++;

        // unlock dependents
        for (const next of graph[name]) {
          inDegree[next]--;
        }

        pending--;

        if (pending === 0) {
          const nextQueue = taskNames.filter(
            (t) => inDegree[t] === 0 && !(t in results),
          );
          if (completed === taskNames.length) {
            finished = true;
            return finalCallback(null, results);
          }
          runReady(nextQueue);
        }
      });
    });
  }

  const initialQueue = taskNames.filter((name) => inDegree[name] === 0);
  runReady(initialQueue);
}

module.exports = runWithDependencies;
