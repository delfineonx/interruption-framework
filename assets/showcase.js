// ---------- EXAMPLE ----------

// inside world code
{
  tick = () => {
    IF.tick();
  };

  interrupt = (condition) => {
    if (condition) {
      while (true) {}
    }
  };

  inner_test = function handler(arg1, arg2, cache) {
    IF.en = 1;
    IF.fn = handler;
    IF.args = [arg1, arg2, cache];

    const wasInterrupted = !!IF.rcnt;
    IF.sid *= +wasInterrupted; // uninterruptible

    if (IF.sid === 0) {
      if (cache == null) {
        IF.args[2] = cache = {};
      }
      // ... other logic

      api.broadcastMessage("retry " + IF.rcnt + " at " + Date.now() + " with cache value: " + cache.value);

      IF.sid = 1;
      interrupt(true); // simulate
    }

    if (IF.sid === 1) {
      cache.value = arg1;
      // ... other logic

      api.broadcastMessage("retry " + IF.rcnt + " at " + Date.now() + " with cache value: " + cache.value);

      IF.sid = 2;
      interrupt(true); // simulate
    }

    if (IF.sid === 2) {
      cache.value *= 10;
      // ... other logic

      api.broadcastMessage("retry " + IF.rcnt + " at " + Date.now() + " with cache value: " + cache.value);

      IF.sid = 3;
      interrupt(true); // simulate
    }

    if (IF.sid === 3) {
      cache.value += arg2;
      // ... other logic
      
      api.broadcastMessage("retry " + IF.rcnt + " at " + Date.now() + " with cache value: " + cache.value);

      IF.sid = 4;
      interrupt(true); // simulate
    }

    api.broadcastMessage(
      "| rcnt: " + IF.rcnt + " | calc: (" + arg1 + " * 10 + " + arg2 + ")" +
      "\n" +
      "| cache: " + cache.value + " | time: " + Date.now() +
      "\n" +
      "| interrupted: " + wasInterrupted
    );

    IF.en = 0;
    return;
  };

  outer_test = (arg1, arg2, cache) => {
    if (IF.sid === 0) {
      if (cache == null) {
        IF.args[2] = cache = {};
      }
      // ... other logic

      api.broadcastMessage("retry " + IF.rcnt + " at " + Date.now() + " with cache value: " + cache.value);

      IF.sid = 1;
      interrupt(true); // simulate
    }

    if (IF.sid === 1) {
      cache.value = arg1;
      // ... other logic

      api.broadcastMessage("retry " + IF.rcnt + " at " + Date.now() + " with cache value: " + cache.value);

      IF.sid = 2;
      interrupt(true); // simulate
    }

    if (IF.sid === 2) {
      cache.value *= 10;
      // ... other logic

      api.broadcastMessage("retry " + IF.rcnt + " at " + Date.now() + " with cache value: " + cache.value);

      IF.sid = 3;
      interrupt(true); // simulate
    }

    if (IF.sid === 3) {
      cache.value += arg2;
      // ... other logic
      
      api.broadcastMessage("retry " + IF.rcnt + " at " + Date.now() + " with cache value: " + cache.value);

      IF.sid = 4;
      interrupt(true); // simulate
    }

    api.broadcastMessage(
      "| rcnt: " + IF.rcnt + " | calc: (" + arg1 + " * 10 + " + arg2 + ")" +
      "\n" +
      "| cache: " + cache.value + " | time: " + Date.now() +
      "\n" +
      "| interrupted: " + !!IF.rcnt
    );

    return;
  };
}

// inside code block
if (myId !== null) {
  const v1 = 6;
  const v2 = 7;

  inner_test(v1, v2);
  // inner_test(v1, v2, {});
}

// inside code block
if (myId !== null) {
  const v1 = 6;
  const v2 = 7;

  IF.en = 1;
  IF.fn = outer_test;
  IF.args = [v1, v2];
  // IF.args = [v1, v2, {}];
  IF.sid = 0;

  api.broadcastMessage("retry " + IF.rcnt + " at " + Date.now() + " before function call");

  interrupt(true); // simulate
  outer_test(v1, v2);
  // outer_test(v1, v2, {});

  IF.en = 0;
}

