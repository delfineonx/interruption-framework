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
    cache: null,

    defaultPhase: 400000,
    wasInterrupted: false,

    tick: null,
  };

  const _interrupted = {};
  let _enqueueId = 0;
  let _dequeueId = 1;
  let _queueSize = 0;
  let _element = [400000];
  let _external = 1;
  let _tickNum = 0;

  Object.defineProperty(globalThis.InternalError.prototype, "name", {
    configurable: true,
    get: () => {
      if (_external) {
        if (_IF.state) {
          _interrupted[++_enqueueId] = [_IF.phase, _IF.cache, _IF.handler, _IF.args, _IF.delay + _tickNum, _IF.limit];
          _queueSize++;
          _IF.phase = 400000;
          _IF.cache = null;
        }
      } else {
        _element[0] = _IF.phase;
        _IF.phase = 400000;
        _IF.cache = null;
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

    let element;
    const maxDequeueId = _enqueueId;
    while (_dequeueId <= maxDequeueId) {
      element = _element = _interrupted[_dequeueId];
      if (element[4] <= _tickNum) {
        if (element[5] > 0) {
          _external = 0;
          element[5]--;
          _IF.phase = element[0];
          _IF.cache = element[1];
          _IF.wasInterrupted = true;
          element[2](...element[3]);
        }
        delete _interrupted[_dequeueId++];
        _queueSize--;
      } else {
        delete _interrupted[_dequeueId++];
        _interrupted[++_enqueueId] = element;
      }
    }
    _IF.state = 0;
    _IF.phase = 400000;
    _IF.cache = null;
    _IF.wasInterrupted = false;
    _external = 1;
    _tickNum++;
  };

  Object.seal(_IF);
  globalThis.IF = _IF;

  void 0;
}

