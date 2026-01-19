// ---------- EXAMPLE ----------

// inside world code
{
  tick = () => {
    IF.tick();
  };

  innerTest = function handler(arg1, arg2) {
    IF.state = 1;
    IF.fn = handler;
    IF.args = [arg1, arg2];
    IF.limit = 5;

    const wasInterrupted = IF.wasInterrupted;
    IF.phase = IF.phase * wasInterrupted + IF.default * !wasInterrupted; // uninterruptible

    let cache = IF.cache;
    if (IF.phase === IF.default) {
      IF.cache = cache = {};
      api.log(api.now());

      IF.phase = 1;
      while (true) { } // simulate interruption
    }

    if (IF.phase === 1) {
      cache.value = 6;
      console.log(IF.phase, cache.value);
      api.log(api.now());

      IF.phase = 2;
      while (true) { } // simulate interruption
    }

    if (IF.phase === 2) {
      cache.value *= 10;
      console.log(IF.phase, cache.value);
      api.log(api.now());

      IF.phase = 3;
      while (true) { } // simulate interruption
    }

    if (IF.phase === 3) {
      cache.value += 7;
      console.log(arg1, arg2, IF.phase, cache.value);
      api.log(api.now());

      IF.phase = 4;
      while (true) { } // simulate interruption
    }

    api.log(api.now());

    if (!IF.wasInterrupted) {
      console.log("Finished without interruption!");
    }

    IF.state = 0;
    return;
  };

  outerTest = (arg3, arg4) => {
    let cache = IF.cache;

    if (IF.phase === IF.default) {
      cache.value = 7;
      console.log(IF.phase, cache.value);
      api.log(api.now());

      IF.phase = 1;
      while (true) { } // simulate interruption
    }

    if (IF.phase === 1) {
      cache.value *= 10;
      console.log(IF.phase, cache.value);
      api.log(api.now());

      IF.phase = 2;
      while (true) { } // simulate interruption
    }

    if (IF.phase === 2) {
      cache.value += 6;
      console.log(arg3, arg4, IF.phase, cache.value);
      api.log(api.now());

      IF.phase = 3;
      while (true) { } // simulate interruption
    }

    api.log(api.now());
    if (!IF.wasInterrupted) {
      console.log("Finished without interruption!");
    }

    return;
  };
}

// inside code block
{
  const var1 = "value1";
  const var2 = "value2";
  innerTest(var1, var2);
}

// inside code block
{
  const var3 = "value3";
  const var4 = "value4";

  IF.state = 1;
  IF.fn = outerTest;
  IF.args = [var3, var4];
  IF.limit = 5;
  IF.phase = IF.default;
  IF.cache = {};

  api.log(api.now());
  while (true) { } // simulate interruption
  outerTest(var3, var4);
  _IF.state = 0;
}

