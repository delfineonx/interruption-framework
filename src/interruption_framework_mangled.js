// Interruption Framework v2026-04-22-0001
// Copyright (c) 2025-2026 delfineonx
// SPDX-License-Identifier: Apache-2.0

{
  const A=Object.freeze(function(){}),
  B=Object.freeze([]),
  C=[A,B,0,0],
  D=[];
  let E=C,
  F=!0,
  G=0,
  H=0,
  I=0;
  const J={
    en:0,
    fn:A,
    args:B,
    rcnt:0,
    sid:0,
    noArgs:B,
    inspect:()=>{
      return[D,I,G,H,F]
    },
    reset:()=>{
      I=0;
      G=0;
      H=0;
      D.length=0;
      E=C;
      J.en=0;
      J.fn=A;
      J.args=B;
      J.rcnt=0;
      J.sid=0;
      F=!0
    },
    tick:()=>{
      J.fn=A;
      J.args=B;
      J.sid=0;
      if(!I){return}
      F=!1;
      let K=null;
      while(I){
        E=D[G];
        J.args=E[1];
        J.rcnt=++E[2];
        J.sid=E[3];
        try{
          E[0](...J.args)
        }catch(_){
          K=_
        }
        D[G]=undefined;
        G++;
        I--;
        if(K){
          L("IF ["+(E[0]?.name||"<anonymous>")+"]: "+K.name+": "+K.message);
          K=null
        }
      }
      G=0;
      H=0;
      D.length=0;
      E=C;
      J.en=0;
      J.rcnt=0;
      F=!0
    }
  };
  const L=M=>{
    let N=L.payload,
    O=M.length;
    if(O<=950){
      N[0].str=M;
      api.broadcastMessage(N)
    }else{
      let P=0,Q,R;
      while(P<O){
        Q=P+950;
        if(Q>=O){
          R=O
        }else{
          R=M.lastIndexOf("\n",Q-1);
          if(R<=P){
            R=Q
          }
        }
        N[0].str=M.slice(P,R);
        api.broadcastMessage(N);
        P=R<Q?R+1:R
      }
    }
    N[0].str=""
  };
  L.payload=[{
    str:"",
    style:{
      color:"#FF775E",
      fontWeight:"500",
      fontSize:"0.95rem"
    }
  }];
  Object.defineProperty(globalThis.InternalError.prototype,"name",{
    configurable:!0,
    get:()=>{
      if(F){
        if(J.en){
          J.en=0;
          D[H]=[J.fn,J.args,0,J.sid];
          H++;
          I++;
          J.fn=A;
          J.args=B
        }
      }else{
        J.en=0;
        E[1]=J.args;
        E[3]=J.sid;
        E=C;
        J.rcnt=0;
        F=!0
      }
      return"InternalError"
    }
  });
  Object.seal(J);
  globalThis.IF=J;
  void 0
}

