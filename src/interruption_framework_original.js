// Interruption Framework v2026-02-29-0001
// Copyright (c) 2025-2026 delfineonx
// SPDX-License-Identifier: Apache-2.0

{
  const _IF = {
    en: 0, // enable interrupt capture
    fn: null, // handler
    args: null, // can include "cache"
    rcnt: 0, // retry counter
    sid: 0, // state id

    noArgs: null,

    tick: null,
  };

  const _NO_OP = _IF.fn = Object.freeze(() => { });
  const _NO_ARGS = _IF.args = (_IF.noArgs = Object.freeze([]));
  const _NO_TASK = [null, _NO_ARGS, null, 0];

  const _errorStyledText = [{
    str: "",
    style: {
      color: "#FF775E",
      fontWeight: "500",
      fontSize: "0.95rem"
    }
  }];

  const _queue = [];
  let _task = _NO_TASK;
  let _external = 1;

  let _headIndex = 0;
  let _tailIndex = 0;
  let _queueSize = 0;
  
  const _logError = (message) => {
    _errorStyledText[0].str = message;
    api.broadcastMessage(_errorStyledText);
    _errorStyledText[0].str = "";
  };

  _IF.tick = () => {
    _IF.fn = _NO_OP;
    _IF.args = _NO_ARGS;
    if (!_queueSize) { return; }

    _external = 0;

    let _error = null;
    while (_queueSize) {
      _task = _queue[_headIndex];

      _IF.args = _task[1];
      _IF.rcnt = ++_task[2];
      _IF.sid = _task[3];
      try {
        _task[0](..._IF.args);
      } catch (error) {
        _error = error;
      }

      _queue[_headIndex] = undefined;
      _headIndex++;
      _queueSize--;

      if (_error) {
        _logError(
          "Interruption Framework [" + (_task[0]?.name || "<anonymous>") + "]: " +
          _error.name + ": " + _error.message
        );
        _error = null;
      }
    }
    _headIndex = 0;
    _tailIndex = 0;
    _queue.length = 0;
    
    _task = _NO_TASK;

    _IF.en = 0;
    _IF.fn = _NO_OP;
    _IF.args = _NO_ARGS;
    _IF.rcnt = 0;

    _external = 1;
  };
  
  Object.defineProperty(globalThis.InternalError.prototype, "name", {
    configurable: true,
    get: () => {
      if (_external) {
        if (_IF.en) {
          _IF.en = 0;
          _queue[_tailIndex] = [_IF.fn, _IF.args, 0, _IF.sid];
          _tailIndex++;
          _queueSize++;
        }
      } else {
        _IF.en = 0;
        _IF.rcnt = 0;
        _task[1] = _IF.args;
        _task[3] = _IF.sid;
        _task = _NO_TASK;
        _IF.args = _NO_ARGS;
        _external = 1;
      }
      return "InternalError";
    },
  });

  Object.seal(_IF);
  globalThis.IF = _IF;
  void 0;
}
