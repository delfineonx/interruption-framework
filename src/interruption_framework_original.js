// Copyright (c) 2025 delfineonx
// This product includes "Interruption Framework" created by delfineonx.
// Licensed under the Apache License, Version 2.0.

{
  const _interrupted = {};
  let _queueId = 0;
  let _tickNum = 0;
  let _external = 1;
  
  const _IF = {
    state: 1,
    handler: () => {},
    args: [],
    delay: 0,
    limit: 2,
  };

  Object.defineProperty(globalThis.InternalError.prototype, "name", {
    configurable: true,
    get: () => {
      if (_IF.state & _external) {
          _interrupted[++_queueId] = [_IF.handler, _IF.args, _IF.delay + _tickNum - 1, _IF.limit];
      }
      _external = 1;
      return "InternalError";
    },
  });

  const tick = () => {
    for (const id in _interrupted) {
      const cache = _interrupted[id];
      if (cache[2] < _tickNum) {
        if (cache[3] > 0) {
          _external = 0;
          cache[3]--;
          cache[0](...cache[1]);
        }
        delete _interrupted[id];
      }
    }
    _tickNum++;
  };

  _IF.tick = tick;
  globalThis.IF = Object.seal(_IF);

  void 0;
}

// ---------- EXAMPLE ----------
{
  tick = () => {
    IF.tick();
  };

  test = function handler() {
    const _IF = globalThis.IF;
    _IF.state = 1;
    _IF.handler = handler;
    _IF.args = [];
    _IF.delay = 0;
    _IF.limit = 2;

    // function body

    _IF.state = 0;
  };
}
