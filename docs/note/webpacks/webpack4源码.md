# webpack4源码

## 安装
创建文件夹wepack4,cd到webpack4文件夹里面执行:
```js
npm init -y
yarn add webpack webpack-cli
```

新建src/index.js data.js，写点代码:
```js
//data.js
const data = "hello"

export default data

// index.js
import data from './data'

console.log(data);
```

我们执行开发环境打包
```js
"dev": "webpack --mode development",
```

执行yarn dev我们分别来看webpack4和webpack5的区别,在dist目录下会生成一个 **main.js** 里面有一堆代码，我们把注释和 **evel** 去掉，有用得代码差不多就是下面这些了:

## webpack4
```js

(function (modules) { // webpackBootstrap
  // module缓存的对象
  var installedModules = {};
  function __webpack_require__(moduleId) {
      console.log(moduleId);
    // 检查module在不在缓存里面
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 创建一个module
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    // 执行module里面得方法
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // 设置加载状态
    module.l = true;
    // 返回module
    return module.exports;
  }
  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;
  // __webpack_public_path__
  __webpack_require__.p = "";
  // 入口文件
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({
    "./src/data.js": (function (module, __webpack_exports__, __webpack_require__) {
      const data = "hello";
      __webpack_exports__["default"] = (data);
    }),
    "./src/index.js": (function (module, __webpack_exports__, __webpack_require__) {
      var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/data.js");
      console.log(_data__WEBPACK_IMPORTED_MODULE_0__["default"]);
    })

  });
```

看到这些是不是有点头大，这还是删除了很多东西后剩下的，下面我们来分析一下这些代码:
1. 首先这是一个立即执行函数，我们传入了一个对象:分别有两个key为 **./src/data.js**、**./src/index.js**，每个对应一个函数。
2. 来到函数里面，首先定一个 installedModules 的全局对象，它就是记录传入得key是否可以复用
3. 重点来了 **__webpack_require__**, 首先判断传入的 **moduleId** (也就是 **./src/data.js**、**./src/index.js**) 是否在 **installedModules** 里面,如果有直接返回对应缓存里面的 **exports**,如果没有的就创建一个 **module** 对象,并执行 **call**,最后返回 **module.exports**
4. 函数最后返回 **__webpack_require__("./src/index.js")** 的结果

###  __webpack_require__
我们首先打印下 **modules** 对象,发现他是如下这样的
```json
{
"./src/data.js": ƒ (module, __webpack_exports__, __webpack_require__)
"./src/index.js": ƒ (module, __webpack_exports__, __webpack_require__)
}
```

那么我们现在执行 **__webpack_require__**函数传入入口文件 **./src/index.js** ,第一次肯定不在缓存里面,因此会走创建的过程并执行 **modules[moduleId].call**,看到这里就清晰了. 哦, **modules[moduleId]** 就是 我们入口 **./src/data.js** 对应的函数,现在 **call**了一下 执行

我们现在来看看 **./src/index.js** 对应的函数

```js
"./src/index.js": (function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */
        var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");
        console.log(_data__WEBPACK_IMPORTED_MODULE_0__["default"]);
    })
```

在这个函数 它又去 调用了 **__webpack_require__**,并且传入了 **moduleId** 为 **./src/data.js**. 哦,看到这个就豁然开朗了, 我 index.js 需要用到 data.js 里面的数据,那么好 我就在 index.js 去 **__webpack_require__** 对应的模块,然后 又会走到 data.js 自己的 **call**,那我们现在来看看 data.js 对应的函数执行

```js
    "./src/data.js": (function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        const data = "hello";
        /* harmony default export */
        __webpack_exports__["default"] = (data);
    }),
```

1. 定义一个 const data 的变量
2. 把 data 变量挂载在  __webpack_exports__["default"] 属性上, __webpack_exports__ 就是执行 call 的时候 传入的 **module.exports** 对象
3. 在 **./src/index.js** 看到 _data__WEBPACK_IMPORTED_MODULE_0__ 就等于 __webpack_require__(./src/data.js) 的返回结果, __webpack_require__ 函数返回什么呢,我们在上面看到了 它返回 **module.exports**
4. module.exports 上面挂载了 一个 **default** 属性 也就是 data,我们输入它

我们把上面的 代码 粘贴到浏览器发现 正常输出了 打印

## webpack5

```js

(() => { // webpackBootstrap
  "use strict";
  var __webpack_modules__ = ({
    "./src/data.js": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, { "default": () => __WEBPACK_DEFAULT_EXPORT__ });
      const data = "hello";
      const __WEBPACK_DEFAULT_EXPORT__ = (data);
    }),
    "./src/index.js": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__);
      var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/data.js");
      console.log(_data__WEBPACK_IMPORTED_MODULE_0__.default);
    })

  });
  // The module cache
  var __webpack_module_cache__ = {};
  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = __webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {}
    };
    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    // Return the exports of the module
    return module.exports;
  }
  /* webpack/runtime/define property getters */
  (() => {
    // define getter functions for harmony exports
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();
  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
  })();
  /* webpack/runtime/make namespace object */
  (() => {
    // define __esModule on exports
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();
  // startup
  // Load entry module
  __webpack_require__("./src/index.js");
  // This entry module used 'exports' so it can't be inlined
})();
```
1. 相较于 webpack4，webpack5 在单文件打包方面更加的简介，抛弃了单文件不需要的 module.exports 部分，保留了最原始的部分
2. 将原本的 function 改成了 箭头函数，这样this的指向更加清晰，祛除了原本使用call的调用方式。
3. 将原本使用参数传入的文件名和对应内容的 key value 的object，直接写到了函数中。


## wepback4继续

我们在 data.js 里面再引入 output.js

```js
const output = "我是 output"

export default output
```

我们执行打包,看下入口的传入
```js
{

    "./src/data.js":
      (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */
        var _output__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/output.js");
        const data = "hello";
        console.log(_output__WEBPACK_IMPORTED_MODULE_0__["default"]);
        __webpack_exports__["default"] = (data);
      }),

    "./src/index.js":
      (function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/data.js");
        console.log(_data__WEBPACK_IMPORTED_MODULE_0__["default"]);
      }),

    "./src/output.js":
      (function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        const output = "我是 output"
        __webpack_exports__["default"] = (output);
      })
  }
```

看到了吗？ 我们 index.js 引入了 data.js 模块里面的变量, data.js 又引入了 output.js 里面的变量,他们加载顺序会如下

1. 执行方法 __webpack_require__("./src/index.js");
2. 在对应的 **"./src/index.js"**  里面又会执行 __webpack_require__("./src/data.js")
3. 同样在 __webpack_require__("./src/output.js") 里面 又会执行 __webpack_require__("./src/output.js"), 返回 __webpack_exports__["default"] 并执行打印输出, 再把自身 的 data 变量 挂载到自己 module  的 __webpack_exports__["default"] 上
4. ./src/index.js 接受 __webpack_require__ 的返回在 default 属性上取到 data 并打印输出

因此是先打印 **"我是 output"** 再是 **hello**, 在浏览器执行发现和我们推理的打印顺序一样。

## 异步加载文件

对于一些异步文件加载我们可以这样引用
```js
const data = "hello"

import('./output').then(_ => {
    console.log(_.default);
})
export default data
```

我们现在再来看看打包后的文件,现在有了一个 main.js 和一个 0.js,先看看 0.js
```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0], {
  "./src/output.js": (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    const output = "我是 output"
    __webpack_exports__["default"] = (output);
  })
}]);
```
main.js 整理后 主要的 js 如下:
```js
(function (modules) { 
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];
    var moreModules = data[1];

    var moduleId, chunkId, i = 0, resolves = [];
    // 收集模块 将所有 chunkIds 标记为已加载 chunkId=0
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        // installedChunks[chunkId] = [resolve, reject]
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if (parentJsonpFunction) parentJsonpFunction(data);
    // 执行每个 resolve
    while (resolves.length) {
      resolves.shift()();
    }
  };
  // The module cache
  var installedModules = {};

  var installedChunks = {
    "main": 0
  };

  // script path function
  function jsonpScriptSrc(chunkId) {
    return __webpack_require__.p + "" + ({}[chunkId] || chunkId) + ".js"
  }
  function __webpack_require__(moduleId) {
      ...
  }

  // 根据  chunkId 加载
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];
    var installedChunkData = installedChunks[chunkId];
    // // 0 标志已缓存.
    if (installedChunkData !== 0) {

      //  Promise 当前正在加载
      if (installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        // 设置缓存
        var promise = new Promise(function (resolve, reject) {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push(installedChunkData[2] = promise);
        // start chunk loading
        var script = document.createElement('script');
        var onScriptComplete;

        script.charset = 'utf-8';
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        script.src = jsonpScriptSrc(chunkId);

        // create error before stack unwound to get useful stacktrace later
        var error = new Error();
        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var chunk = installedChunks[chunkId];
          console.log(chunk);
          if (chunk !== 0) {
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;
              chunk[1](error);
            }
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function () {
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        document.head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };
  //对jsonpArray获取window['webpackJsonp']
  //以为异步得包需要调用window['webpackJsonp']进行push
  //一个是占位 一个跟原来一样得模块信息
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  //jsonpArray = [] 对push进行劫持  保存一份老的push
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  //对push进行重写
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;
  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({
    "./src/data.js": (function (module, __webpack_exports__, __webpack_require__) {
      const data = "hello"
      __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./output */ "./src/output.js")).then(_ => { console.log(_.default); })
      __webpack_exports__["default"] = (data);
    }),

    "./src/index.js": (function (module, __webpack_exports__, __webpack_require__) {
     ...
    })
  });
```

首先入口文件 还是 **./src/index.js**,它会再去加载 **./src/data.js** 这和我们上面的同步 步骤完全一致. 但是在 data.js 中使用了异步加载的方法,对应的打包文件中、可以看到使用了 **__webpack_require__.e** 这样的一个方法,我们来仔细分析下这个方法

## __webpack_require__.e

__webpack_require__.e 方法会接受一个 **chunkId**,也就是我们打包的 "0.js"的 **0**,然后依次做了以下操作
 1. 申明一个总 **promises**,判断 chunkId 是否已经被缓存过, 0 标志着缓存
 2. 设置一个 promise,并设置 installedChunks[chunkId] 分别添加 **resolve**,**reject** 以及 **promise** 本身,并把 promise 添加到总的 **promises** 
 3. 创建一个 **script** 标签,并设置超时时间为 120
 4. 处理 **script** 加载异常的情况
 5. 执行 **document.head.appendChild(script)** 把script 追加到页面上;
 6. 然后  return Promise.all(promises);

我们有多少个异步就创建了多少个 promise 并维护在了 **installedChunks** 对象里面, 我们在 **./src/data.js** 加载异步的时候 执行了
```js
__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./output */ "./src/output.js")).then(_ => { console.log(_.default); })
```

__webpack_require__.e 返回了 **Promise.all(promises)**,只有 **promises** 里面的每一个**promise** 执行 **resolve** 外面大的才能 **resolve**,关键这里的代码 我们并没有看到 每个小的 **promise** 执行 **resolve**啊？？？

## webpackJsonpCallback

我们顺着主代码往下看, 有这么一段 代码
```js
 var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
// 劫持push
var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
// 对push 进行重写
jsonpArray.push = webpackJsonpCallback;
// copy 了一份jsonpArray
jsonpArray = jsonpArray.slice();
for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
var parentJsonpFunction = oldJsonpFunction;
```
啥意思呢这段代码, **window["webpackJsonp"]** 我们看着很熟悉, 它和 **0.js** 好像是一样的东西

 window[“webpackJsonp”].push 指向 webpackJsonpCallback 函数。我们在 执行上面操作的时候会去创建一个标签,里面的内容就是 **window["webpackJsonp"] || []).push**,异步文件通过这个指针，把内容传进 webpackJsonpCallback 函数内。

 **webpackJsonpCallback** 做了那些事情呢
1. 收集模块 将所有 chunkIds 标记为已加载 chunkId=0
2. 创建一个 **resolves** 数组并添加 对应 **chunkId** 的 第 **0** 项,也就是我们上面的 installedChunks[chunkId] 添加的第一项 **resolve**
3. 把异步组件的入口挂载到 **modules** 对象上
4. **while** 把 每个 promise 执行 resolve()

于是乎 也跟 下面这段代码对应上了
```js
__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./output */ "./src/output.js")).then(_ => { console.log(_.default); })
```

## 总结
webpack 打包文件加载流程如下:
1. 执行入口文件 __webpack_require__("./src/index.js"),执行 **modules[moduleId].call**
2. 如果文件里面有依赖别人 则继续调用 __webpack_require__ 并传入对应的入口,把返回结果挂载到 **default**
3. 如果是异步加载 则 先执行 __webpack_require__.e 创建 script 标签,设置超时时间为120,通过劫持数组方法 webpackJsonpCallback 把 moreModules 塞到 我们 主 chunk后面 ,并返回Promise.all()
4. 通过 webpackJsonpCallback 函数 去依次执行 promise 的 resolve,然后就可以执行 then 方法了,然后里面再传入一个 __webpack_require__.bind() 的函数 再次 then 后 就可以拿到 对应模块的变量

