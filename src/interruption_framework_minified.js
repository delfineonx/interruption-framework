// Copyright (c) 2025 delfineonx
// This product includes "Interruption Framework" created by delfineonx.
// Licensed under the Apache License, Version 2.0.

{
let _IF={state:0,handler:()=>{},args:[],delay:0,limit:2,phase:1,resetPhase:1,tick:null},I={},E=0,D=1,S=0,C=[1],X=1,N=0;
Object.defineProperty(globalThis.InternalError.prototype,"name",{configurable:!0,get:()=>{if(X){if(_IF.state){I[++E]=[_IF.phase,_IF.handler,_IF.args,_IF.delay+N,_IF.limit];S++;_IF.phase=1}}else{C[0]=_IF.phase;_IF.phase=1;X=1}_IF.state=0;return"InternalError"}});
_IF.tick=()=>{if(!S){N++;return}let c;const m=E;while(D<=m){c=C=I[D];if(c[3]<=N){if(c[4]>0){X=0;c[4]--;_IF.phase=c[0];c[1](...c[2])}delete I[D++];S--}else{delete I[D++];I[++E]=c}}_IF.state=0;_IF.phase=1;X=1;N++};
Object.seal(_IF);
globalThis.IF=_IF;
void 0
}

