// ---------- EXAMPLE ----------

// inside world code
{
  tick = () => {
    IF.tick();
  };

  innerTest = function handler(arg1, arg2) {
    const _IF = globalThis.IF;
    _IF.state = 1;
    _IF.handler = handler;
    _IF.args = [arg1, arg2];
    _IF.delay = 0;
    _IF.limit = 10;

    const wasInterrupted = _IF.wasInterrupted;
    _IF.phase = _IF.phase * wasInterrupted + _IF.defaultPhase * !wasInterrupted; // uninterruptible

    let cache = _IF.cache;
    if (_IF.phase === _IF.defaultPhase) {
      _IF.cache = cache = {};
      api.log(api.now());

      _IF.phase = 1;
      while (true) { } // simulate interruption
    }

    if (_IF.phase === 1) {
      cache.value = 6;
      console.log(_IF.phase, cache.value);
      api.log(api.now());

      _IF.phase = 2;
      while (true) { } // simulate interruption
    }

    if (_IF.phase === 2) {
      cache.value *= 10;
      console.log(_IF.phase, cache.value);
      api.log(api.now());

      _IF.phase = 3;
      while (true) { } // simulate interruption
    }

    if (_IF.phase === 3) {
      cache.value += 7;
      console.log(arg1, arg2, _IF.phase, cache.value);
      api.log(api.now());

      _IF.phase = 4;
      while (true) { } // simulate interruption
    }

    api.log(api.now());

    if (!_IF.wasInterrupted) {
      console.log("Finished without interruption!");
    }

    _IF.state = 0;
    return;
  };

  outerTest = (arg3, arg4) => {
    const _IF = globalThis.IF;

    let cache = _IF.cache;

    if (_IF.phase === _IF.defaultPhase) {
      cache.value = 7;
      console.log(_IF.phase, cache.value);
      api.log(api.now());

      _IF.phase = 1;
      while (true) { } // simulate interruption
    }

    if (_IF.phase === 1) {
      cache.value *= 10;
      console.log(_IF.phase, cache.value);
      api.log(api.now());

      _IF.phase = 2;
      while (true) { } // simulate interruption
    }

    if (_IF.phase === 2) {
      cache.value += 6;
      console.log(arg3, arg4, _IF.phase, cache.value);
      api.log(api.now());

      _IF.phase = 3;
      while (true) { } // simulate interruption
    }

    api.log(api.now());

    if (!_IF.wasInterrupted) {
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

  const _IF = globalThis.IF;
  _IF.state = 1;
  _IF.handler = outerTest;
  _IF.args = [var3, var4];
  _IF.delay = 0;
  _IF.limit = 10;
  _IF.phase = _IF.defaultPhase;
  _IF.cache = {};
  api.log(api.now());
  while (true) { } // simulate interruption
  outerTest(var3, var4);
  _IF.state = 0;
}

