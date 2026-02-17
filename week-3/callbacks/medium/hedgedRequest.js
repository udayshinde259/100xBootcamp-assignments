// Problem Description – Hedged Request
//
// You have a Primary async source and a Secondary backup.
// Start the Primary immediately. If it is slow, start the Secondary.
//
// Return the first successful result and ignore the rest.
// Only fail if both fail, and ensure the callback runs once.
//
// Requirements:
// - Start Primary immediately.
// - Start Secondary after timeoutMs if needed.
// - First success wins.
// - Callback must be called exactly once.
function hedgedRequest(primary, secondary, timeoutMs, onComplete) {
  let finished = false;
  let primaryFinished = false;
  let secondaryStarted = false;

  primary((err, data) => {
    if (finished) return;

    if (!err) {
      finished = true;
      return onComplete(null, data);
    }

    primaryFinished = true;

    if (secondaryStarted) {
      finished = true;
      return onComplete(err);
    }
  });

  setTimeout(() => {
    secondary((err, data) => {
      if (finished) return;

      if (!err) {
        finished = true;
        return onComplete(null, data);
      }

      if (primaryFinished) {
        finished = true;
        return onComplete(err);
      }
    });
  }, timeoutMs);
}

module.exports = hedgedRequest;
