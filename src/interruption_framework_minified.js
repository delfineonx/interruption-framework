// Copyright (c) 2025-2026 delfineonx
// This product includes "Interruption Framework" created by delfineonx.
// Licensed under the Apache License, Version 2.0.

const InterruptionFramework={state:0,fn:()=>{},args:[],limit:2,phase:1048576,cache:null,default:1048576,wasInterrupted:!1,tick:null};
{
let A=InterruptionFramework,B={},C=[],D=1,E=[],F=1,G=1,H=0;
Object.defineProperty(globalThis.InternalError.prototype,"name",{configurable:!0,get:()=>{if(D){if(A.state){B[F++]=[A.fn,A.args,A.limit,A.phase,A.cache];H++}}else{E[3]=A.phase;A.wasInterrupted=!1;D=1}A.state=0;return"InternalError"}});
A.tick=()=>{A.state=0;if(!H){A.args=C;A.cache=null;return}D=0;A.wasInterrupted=!0;while(G<F){E=B[G];if(E[2]>0){E[2]--;A.phase=E[3];A.cache=E[4];E[0](...E[1])}delete B[G++];H--}A.state=0;A.args=C;A.cache=null;A.wasInterrupted=!1;D=1};
Object.seal(A);
globalThis.IF=A;
void 0
}

