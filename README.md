
---

<div align="center">
  <h1>Interruption Framework</h1>
  <p>
    documentation is incomplete yet
  </p>
  <p>
    <a href="#installation"><kbd>Installation</kbd></a> &nbsp;•&nbsp;
    <a href="#api-methods"><kbd>API Methods</kbd></a> &nbsp;•&nbsp;
    <a href="#license"><kbd>License</kbd></a>
  </p>
</div>

---

<a id="installation"></a>
<details open>
  <summary>
    <div align="center">
      <h2>❮ <code><b>📥 Installation 📥</b></code> ❯</h2>
    </div>
  </summary>

  <ol>
    <li>
      Copy the framework source code to your <code>World Code</code>:
      <h3>
        <a href="./src/interruption_framework_minified.js"><code><b>minified</b></code></a>  OR  <a href="./src/interruption_framework_original.js"><code><b>original</b></code></a>
      </h3>
      <blockquote>
        <p>
          If you use <a href="https://github.com/delfineonx/code-loader"><code>Code Loader</code></a>,
          you must skip this part (it is already included in the build), but you still need to call the runner.
        </p>
      </blockquote>
    </li>
    <li>
      Put the framework runner at the start of your <code>tick</code> callback:
    </li>
  </ol>

```js
tick = () => {
  IF.tick();
  // ...your other logic
};
```

</details>

---

<a id="api-methods"></a>
<details open>
  <summary>
    <div align="center">
      <h2>❮ <code><b>📚 API Methods 📚</b></code> ❯</h2>
    </div>
  </summary>

  <p><code>globalThis.IF</code> / <code>IF</code> exposes:</p>

```js
// ... in progress
```

</details>

---

<a id="license"></a>
<details open>
  <summary>
    <div align="center">
      <h2>❮ <code><b>👥 License 👥</b></code> ❯</h2>
    </div>
  </summary>

```js
// Interruption Framework v2026-04-22-0001
// Copyright (c) 2025-2026 delfineonx
// SPDX-License-Identifier: Apache-2.0
```

</details>

---
