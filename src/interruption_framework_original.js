// Copyright (c) 2025-2026 delfineonx
// This product includes "Interruption Framework" created by delfineonx.
// Licensed under the Apache License, Version 2.0.

const InterruptionFramework = {
  state: 0,
  fn: () => { },
  args: [],
  limit: 2,
  phase: 1048576,
  cache: null,

  default: 1048576,
  wasInterrupted: false,

  tick: null,
};

{
  const _IF = InterruptionFramework;

  const _interrupted = {};
  const _emptyArgs = [];

  let _external = 1;
  let _element = [];
  let _enqueueId = 1;
  let _dequeueId = 1;
  let _queueSize = 0;

  Object.defineProperty(globalThis.InternalError.prototype, "name", {
    configurable: true,
    get: () => {
      if (_external) {
        if (_IF.state) {
          _interrupted[_enqueueId++] = [_IF.fn, _IF.args, _IF.limit, _IF.phase, _IF.cache];
          _queueSize++;
        }
      } else {
        _element[3] = _IF.phase;
        _IF.wasInterrupted = false;
        _external = 1;
      }
      _IF.state = 0;
      return "InternalError";
    },
  });

  _IF.tick = () => {
    _IF.state = 0;
    if (!_queueSize) {
      _IF.args = _emptyArgs;
      _IF.cache = null;
      return;
    }

    _external = 0;
    _IF.wasInterrupted = true;

    while (_dequeueId < _enqueueId) {
      _element = _interrupted[_dequeueId];
      if (_element[2] > 0) {
        _element[2]--;
        _IF.phase = _element[3];
        _IF.cache = _element[4];
        _element[0](..._element[1]);
      }
      delete _interrupted[_dequeueId++];
      _queueSize--;
    }

    _IF.state = 0;
    _IF.args = _emptyArgs;
    _IF.cache = null;
    _IF.wasInterrupted = false;
    _external = 1;
  };

  Object.seal(_IF);
  globalThis.IF = _IF;
  void 0;
}

