// Copyright (c) 2025 delfineonx
// This product includes "Interruption Framework" created by delfineonx.
// Licensed under the Apache License, Version 2.0.

{
let _IF={state:0,handler:()=>{},args:[],delay:0,limit:2,tick:null},I={},D=0,S=0,E=1,N=0;
Object.defineProperty(globalThis.InternalError.prototype,"name",{configurable:!0,get:()=>{if(_IF.state&E){I[++D]=[_IF.handler,_IF.args,_IF.delay+N-1,_IF.limit];S++}E=1;_IF.state=0;return"InternalError"}});
_IF.tick=()=>{if(!S){N++;return}for(let d in I){let c=I[d];if(c[2]<N){if(c[3]>0){E=0;c[3]--;c[0](...c[1])}delete I[d];S--}}E=1;N++};
Object.seal(_IF);
globalThis.IF=_IF;
void 0
}

