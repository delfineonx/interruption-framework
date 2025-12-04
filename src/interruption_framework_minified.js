// Copyright (c) 2025 delfineonx
// This product includes "Interruption Framework" created by delfineonx.
// Licensed under the Apache License, Version 2.0.

{
let _IF={state:0,handler:()=>{},args:[],delay:0,limit:1,phase:400000,cache:null,defaultPhase:400000,wasInterrupted:!1,tick:null},I={},E=0,D=1,S=0,L=[],X=1,N=0;
Object.defineProperty(globalThis.InternalError.prototype,"name",{configurable:!0,get:()=>{if(X){if(_IF.state){I[++E]=[_IF.phase,_IF.cache,_IF.handler,_IF.args,_IF.delay+N,_IF.limit];S++}}else{L[0]=_IF.phase;_IF.wasInterrupted=!1;X=1}_IF.cache=null;_IF.state=0;return"InternalError"}});
_IF.tick=()=>{_IF.state=0;if(!S){_IF.cache=null;N++;return}X=0;_IF.wasInterrupted=!0;let l,m=E;while(D<=m){l=L=I[D];if(l[4]<=N){if(l[5]>0){l[5]--;_IF.phase=l[0];_IF.cache=l[1];l[2](...l[3])}delete I[D++];S--}else{delete I[D++];I[++E]=l}}_IF.state=0;_IF.cache=null;_IF.wasInterrupted=!1;X=1;N++};
Object.seal(_IF);
globalThis.IF=_IF;
void 0
}

