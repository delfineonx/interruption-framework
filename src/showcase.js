// ---------- EXAMPLE ----------

// inside world code
{
  tick = () => {
    IF.tick();
  };

  innerTest = function handler(arg1, arg2) {
    const _IF = globalThis.IF;
    _IF.state = 1;
    _IF.handler = handler;
    _IF.args = [arg1, arg2];
    _IF.delay = 0;
    _IF.limit = 2;

    // function body

    // console.log(arg1, arg2);
    // while (true) { }

    _IF.state = 0;
  };

  outerTest = (arg3, arg4) => {
    // function body

    // console.log(arg3, arg4);
    // while (true) { }
  }
}

// inside code block
{
  const var1 = "value1";
  const var2 = "value2";
  innerTest(var1, var2);
}

// inside code block
{
  const var3 = "value3";
  const var4 = "value4";

  const _IF = globalThis.IF;
  _IF.state = 1;
  _IF.handler = outerTest;
  _IF.args = [var3, var4];
  _IF.delay = 0;
  _IF.limit = 2;
  outerTest(var3, var4);
  _IF.state = 0;
}

