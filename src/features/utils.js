export const log_json = (from, json) => {
  let cache = [];
  const result = JSON.stringify(json, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  }, 4);
  cache = null; // Enable garbage collection
  // Logger.log(result);
  console.log(from);
  console.log(result);
};
