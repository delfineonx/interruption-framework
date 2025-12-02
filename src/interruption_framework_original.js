// Copyright (c) 2025 delfineonx
// This product includes "Interruption Framework" created by delfineonx.
// Licensed under the Apache License, Version 2.0.

{
  const _IF = {
    state: 0,
    handler: () => {},
    args: [],
    delay: 0,
    limit: 2,

    phase: 1,
    defaultPhase: ((1 << 31) - 1) | 0, // 2147483647
    wasInterrupted: false,

    tick: null,
  };

  const _interrupted = {};
  let _enqueueId = 0;
  let _dequeueId = 1;
  let _queueSize = 0;
  let _cache = [1];
  let _external = 1;
  let _tickNum = 0;

  Object.defineProperty(globalThis.InternalError.prototype, "name", {
    configurable: true,
    get: () => {
      if (_external) {
        if (_IF.state) {
          _interrupted[++_enqueueId] = [_IF.phase, _IF.handler, _IF.args, _IF.delay + _tickNum, _IF.limit];
          _queueSize++;
          _IF.phase = 1;
        }
      } else {
        _cache[0] = _IF.phase;
        _IF.phase = 1;
        _IF.wasInterrupted = false;
        _external = 1;
      }
      _IF.state = 0;
      return "InternalError";
    },
  });

  _IF.tick = () => {
    if (!_queueSize) {
      _tickNum++;
      return;
    }

    let cache;
    const maxDequeueId = _enqueueId;
    while (_dequeueId <= maxDequeueId) {
      cache = _cache = _interrupted[_dequeueId];
      if (cache[3] <= _tickNum) {
        if (cache[4] > 0) {
          _external = 0;
          cache[4]--;
          _IF.phase = cache[0];
          _IF.wasInterrupted = true;
          cache[1](...cache[2]);
        }
        delete _interrupted[_dequeueId++];
        _queueSize--;
      } else {
        delete _interrupted[_dequeueId++];
        _interrupted[++_enqueueId] = cache;
      }
    }
    _IF.state = 0;
    _IF.phase = 1;
    _IF.wasInterrupted = false;
    _external = 1;
    _tickNum++;
  };

  Object.seal(_IF);
  globalThis.IF = _IF;

  void 0;
}

