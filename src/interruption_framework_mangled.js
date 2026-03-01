// Interruption Framework v2026-03-01-0001
// Copyright (c) 2025-2026 delfineonx
// SPDX-License-Identifier: Apache-2.0

{
  const A={
    en:0,
    rcnt:0,
    sid:0
  },
  B=A.fn=Object.freeze(()=>{}),
  C=A.args=A.noArgs=Object.freeze([]),
  D=[null,C,null,0],
  E=[{
    str:"",
    style:{
      color:"#FF775E",
      fontWeight:"500",
      fontSize:"0.95rem"
    }
  }],
  G=[];
  let F=D,
  H=1,
  I=0,
  J=0,
  K=0;
  const $=A=>{
    E[0].str=A;
    api.broadcastMessage(E);
    E[0].str=""
  };
  A.tick=()=>{
    A.fn=B;
    A.args=C;
    if(!K){return}
    H=0;
    let E=null;
    while(K){
      F=G[I];
      A.args=F[1];
      A.rcnt=++F[2];
      A.sid=F[3];
      try{
        F[0](...A.args)
      }catch(L){
        E=L
      }
      G[I]=void 0;
      I++;
      K--;
      if(E){
        $("Interruption Framework ["+(F[0]?.name||"<anonymous>")+"]: "+E.name+": "+E.message);
        E=null
      }
    }
    I=0;
    J=0;
    G.length=0;
    F=D;
    A.en=0;
    A.fn=B;
    A.args=C;
    A.rcnt=0;
    H=1
  };
  Object.defineProperty(globalThis.InternalError.prototype,"name",{
    configurable:!0,
    get:()=>{
      if(H){
        if(A.en){
          A.en=0;
          G[J]=[A.fn,A.args,0,A.sid];
          J++;
          K++
        }
      }else{
        A.en=0;
        A.rcnt=0;
        F[1]=A.args;
        F[3]=A.sid;
        F=D;
        A.args=C;
        H=1
      }
      return"InternalError"
    }
  });
  Object.seal(A);
  globalThis.IF=A;
  void 0
}
