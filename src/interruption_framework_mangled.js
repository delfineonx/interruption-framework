// Copyright (c) 2025 delfineonx
// This product includes "Interruption Framework" created by delfineonx.
// Licensed under the Apache License, Version 2.0.

{
  let F={
    state:0,
    handler:()=>{},
    args:[],
    delay:0,
    limit:2,
    tick:null
  },
  I={},
  D=0,
  E=1,
  N=0;
  Object.defineProperty(globalThis.InternalError.prototype,"name",{
    configurable:!0,
    get:()=>{
      if(F.state&E){
        I[++D]=[F.handler,F.args,F.delay+N-1,F.limit]
      }
      E=1;
      F.state=0;
      return"InternalError"
    }
  });
  F.tick=()=>{
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
    E=1;
    N++
  };
  Object.seal(F);
  globalThis.IF=F;
  void 0
}

