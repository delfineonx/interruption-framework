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

    tick: null,
  };

  const _interrupted = {};
  let _queueId = 0;
  let _queueSize = 0;
  let _external = 1;
  let _tickNum = 0;

  Object.defineProperty(globalThis.InternalError.prototype, "name", {
    configurable: true,
    get: () => {
      if (_IF.state & _external) {
          _interrupted[++_queueId] = [_IF.handler, _IF.args, _IF.delay + _tickNum - 1, _IF.limit];
          _queueSize++;
      }
      _external = 1;
      _IF.state = 0;
      return "InternalError";
    },
  });

  _IF.tick = () => {
    if (!_queueSize) {
      _tickNum++;
      return;
    }

    for (const id in _interrupted) {
      const cache = _interrupted[id];
      if (cache[2] < _tickNum) {
        if (cache[3] > 0) {
          _external = 0;
          cache[3]--;
          cache[0](...cache[1]);
        }
        delete _interrupted[id];
        _queueSize--;
      }
    }
    _external = 1;
    _tickNum++;
  };

  Object.seal(_IF);
  globalThis.IF = _IF;

  void 0;
}

