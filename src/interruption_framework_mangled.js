// Copyright (c) 2025 delfineonx
// This product includes "Interruption Framework" created by delfineonx.
// Licensed under the Apache License, Version 2.0.

{
  let I={},
  D=0,
  N=0,
  E=1,
  F={
    state:1,
    handler:()=>{},
    args:[],
    delay:0,
    limit:2
  };
  Object.defineProperty(globalThis.InternalError.prototype,"name",{
    configurable:!0,
    get:()=>{
      if(F.state&E){
        I[++D]=[F.handler,F.args,F.delay+N-1,F.limit]
      }
      E=1;
      return"Interruption Framework"
    }
  });
  let tick=()=>{
    for(let d in I){
      let c=I[d];
      if(c[2]<N){
        if(c[3]>0){
          E=0;
          c[3]--;
          c[0](...c[1])
        }
        delete I[d]
      }
    }
    N++
  };
  F.tick=tick;
  globalThis.IF=Object.seal(F);
  void 0
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
