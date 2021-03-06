/* eslint-disable compat/compat */
(function(env) {
  env.hasFunctioningSets = function() {
    if (typeof Set === 'undefined') {
      return false;
    }

    try {
      var s = new Set();
      s.add(1);
      s.add(2);

      if (s.size !== 2) {
        return false;
      }
      if (s.has(1) !== true) {
        return false;
      }

      var iterations = 0;
      var isForEachWorking = true;
      s.forEach(function(value, key, set) {
        isForEachWorking = isForEachWorking && set === s;

        if (iterations === 0) {
          isForEachWorking = isForEachWorking && key === value && value === 1;
        } else if (iterations === 1) {
          isForEachWorking = isForEachWorking && key === value && value === 2;
        }

        iterations++;
      });
      if (iterations !== 2) {
        return false;
      }
      if (isForEachWorking !== true) {
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  };

  env.requireFunctioningSets = function() {
    if (!env.hasFunctioningSets()) {
      env.pending('Browser has incomplete or missing support for Sets');
    }
  };

  env.requireWeakSets = function() {
    if (typeof WeakSet === 'undefined') {
      env.pending('Browser does not have support for WeakSet');
    }
  };
})(jasmine.getEnv());
