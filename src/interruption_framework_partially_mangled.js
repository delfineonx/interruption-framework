// Interruption Framework v2026-04-22-0001
// Copyright (c) 2025-2026 delfineonx
// SPDX-License-Identifier: Apache-2.0

{
  const _EMPTY_HANDLER=Object.freeze(function(){}),
  _EMPTY_ARGS=Object.freeze([]),
  _EMPTY_TASK=[_EMPTY_HANDLER,_EMPTY_ARGS,0,0],
  _taskQueue=[];
  let _activeTask=_EMPTY_TASK,
  _isExternalInterrupt=!0,
  _readIndex=0,
  _writeIndex=0,
  _queueSize=0;
  const _IF={
    en:0,
    fn:_EMPTY_HANDLER,
    args:_EMPTY_ARGS,
    rcnt:0,
    sid:0,
    noArgs:_EMPTY_ARGS,
    inspect:()=>{
      return[_taskQueue,_queueSize,_readIndex,_writeIndex,_isExternalInterrupt]
    },
    reset:()=>{
      _queueSize=0;
      _readIndex=0;
      _writeIndex=0;
      _taskQueue.length=0;
      _activeTask=_EMPTY_TASK;
      _IF.en=0;
      _IF.fn=_EMPTY_HANDLER;
      _IF.args=_EMPTY_ARGS;
      _IF.rcnt=0;
      _IF.sid=0;
      _isExternalInterrupt=!0
    },
    tick:()=>{
      _IF.fn=_EMPTY_HANDLER;
      _IF.args=_EMPTY_ARGS;
      _IF.sid=0;
      if(!_queueSize){return}
      _isExternalInterrupt=!1;
      let taskError=null;
      while(_queueSize){
        _activeTask=_taskQueue[_readIndex];
        _IF.args=_activeTask[1];
        _IF.rcnt=++_activeTask[2];
        _IF.sid=_activeTask[3];
        try{
          _activeTask[0](..._IF.args)
        }catch(error){
          taskError=error
        }
        _taskQueue[_readIndex]=undefined;
        _readIndex++;
        _queueSize--;
        if(taskError){
          _logError("IF ["+(_activeTask[0]?.name||"<anonymous>")+"]: "+taskError.name+": "+taskError.message);
          taskError=null
        }
      }
      _readIndex=0;
      _writeIndex=0;
      _taskQueue.length=0;
      _activeTask=_EMPTY_TASK;
      _IF.en=0;
      _IF.rcnt=0;
      _isExternalInterrupt=!0
    }
  };
  const _logError=message=>{
    let messagePayload=_logError.payload,
    messageLength=message.length;
    if(messageLength<=950){
      messagePayload[0].str=message;
      api.broadcastMessage(messagePayload)
    }else{
      let segmentStart=0,segmentEnd,splitIndex;
      while(segmentStart<messageLength){
        segmentEnd=segmentStart+950;
        if(segmentEnd>=messageLength){
          splitIndex=messageLength
        }else{
          splitIndex=message.lastIndexOf("\n",segmentEnd-1);
          if(splitIndex<=segmentStart){
            splitIndex=segmentEnd
          }
        }
        messagePayload[0].str=message.slice(segmentStart,splitIndex);
        api.broadcastMessage(messagePayload);
        segmentStart=splitIndex<segmentEnd?splitIndex+1:splitIndex
      }
    }
    messagePayload[0].str=""
  };
  _logError.payload=[{
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
      if(_isExternalInterrupt){
        if(_IF.en){
          _IF.en=0;
          _taskQueue[_writeIndex]=[_IF.fn,_IF.args,0,_IF.sid];
          _writeIndex++;
          _queueSize++;
          _IF.fn=_EMPTY_HANDLER;
          _IF.args=_EMPTY_ARGS
        }
      }else{
        _IF.en=0;
        _activeTask[1]=_IF.args;
        _activeTask[3]=_IF.sid;
        _activeTask=_EMPTY_TASK;
        _IF.rcnt=0;
        _isExternalInterrupt=!0
      }
      return"InternalError"
    }
  });
  Object.seal(_IF);
  globalThis.IF=_IF;
  void 0
}

