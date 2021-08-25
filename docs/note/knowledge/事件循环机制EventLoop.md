# 事件循环机制EventLoop

在说EventLoop之前我们先看一道题
```js
setTimeout(() => {
    console.log(111);
}, 1000);

while (true) {
    console.log(22);
}
```
**console.log(111);** 永远都不会输出，因为**javaScript** 是单线程

## 线程与进程

### 概念

我们经常说JS是单线程执行的，指的是一个进程里只有一个主线程，那到底什么是线程？什么是进程？

官方的说法是: **进程是CPU资源分配的最小单位；线程是CPU调度的最小单位。** 这两句话并不好理解，我们先来看张图:

![](/knowledge/231232001.png)

- 进程好比图中的工厂，有单独的专属自己的工厂资源
- 线程好比图中的工人，多个工人在一个工厂中协作工作，工厂与工厂时1:n的关系。也就是说 **一个进程由一个或者多个线程组成，线程是一个进程中代码的不同执行路线**
- 工厂的空间是工人们共享的，这象征 **一个进程的内存空间是共享的，每个线程都可用这些共享内存**
- 多个工厂之间独立存在

### 多进程与多线程
- 多进程:在同一个时间里，同一个计算机系统中如果允许两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如你可以听歌的同时，打开编辑器敲代码，编辑器和听歌软件的进程之间丝毫不后悔相互干扰
- 多线程:程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并发执行的线程来完成各自的任务。

以 Chrome 浏览器中为例，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程（下文会详细介绍），比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁

### 什么是单线程?

主程序只有一个线程，即同一时间片段内其只能执行单个任务。

### JS为什么选择单线程?

JavaScript的主要用途是与用户交互，以及操作DOM，如果一个线程是执行删除操作，一个是修改操作，那么就会出现问题。因此决定了它只能是单线程，否则会带来很多复杂的同步问题。

### 单线程意味着什么?

单线程就意味着，同一时间只能执行一个任务，所有任务都需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就需要一直等着。这就会导致IO操作(耗时但CPU闲置)时造成性能浪费的问题。

### 如何解决单线程带来的性能问题

答案是**异步** ，主线程完全可以不管IO操作，暂时挂起处于等待中的任务，先运行排在后面的任务。等到IO操作返回了结果，在回过头，把挂起的任务继续执行下去。于是，所以任务可以分成两种，一种是同步任务(synchronous)，另一种是异步任务(asynchronous)。

## 浏览器内核
简单来说浏览器内核是通过取得页面内容，整理信息(应用CSS)，计算和组合最终输出可视化的图像结果，通常也被成为渲染引擎。

浏览器内核是多线程，在内核控制下各线程相互配合以保持同步，一个浏览器通常由一下常驻线程组成:

- GUI 渲染线程
- JavaScript 引擎线程
- 定时触发器线程
- 事件触发线程
- 异步 http 请求线程

### GUI渲染线程
- 主要负责页面的渲染，解析 HTML、CSS，构建 DOM 树，布局和绘制等。
- 当界面需要重绘或者由于某种操作引发回流时，将执行该线程。
- 该线程与 JS 引擎线程互斥，当执行 JS 引擎线程时，GUI 渲染会被挂起，当任务队列空闲时，JS 引擎才会去执行 GUI 渲染。

### JS 引擎线程
- 该线程当然是主要负责处理 JavaScript 脚本，执行代码。
- JS引擎一直等待着任务队列中任务得到来，然后加以处理，一个Tab页中无论什么时候都要有一个JS线程在运行js程序。
- 当然，该线程与 GUI 渲染线程互斥，当 JS 引擎线程执行 JavaScript 脚本时间过长，将导致页面渲染的阻塞。

### 定时器触发线程
- 负责执行异步定时器一类的函数的线程，如： setTimeout，setInterval。
- 主线程依次执行代码时，遇到定时器，会将定时器交给该线程处理，当计数完毕后，事件触发线程会将计数完毕后的事件加入到任务队列的尾部，等待 JS 引擎线程执行。
- 浏览器定时计数器并不是由JavaScript引擎计数得(因为JavaScript引擎是单线程得,如果处于阻塞线程状态就会影响计时得准确)
- 因此通过单线程来计数并触发定时

### 事件触发线程
- 归属于浏览器而不是JS引擎，用来控制事件循环
- 当JS引擎执行代码块，会将对应任务添加到事件线程中
- 对应得事件符合触发条件被触发时，该线程会把事件添加到待处理队列得队尾，等待JS引擎得处理
- 注意:由于JS得单线程关系，所以这些待处理队列中得事件都得排队等待JS引擎处理

### 异步 http 请求线程
- 负责执行异步请求一类的函数的线程，如： Promise，axios，ajax 等。
- 主线程依次执行代码时，遇到异步请求，会将函数交给该线程处理，当监听到状态码变更，如果有回调函数，事件触发线程会将回调函数加入到任务队列的尾部，等待 JS 引擎线程执行。

## 浏览器中的Event Loop

### Micro-Task与Macro-Task

事件循环中的异步队列有两种:macro(宏任务)队列和micro(微任务)队列。**宏任务队列可以有多个，微任务队列只有一个**

- 常见的macro-task 比如:setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作、UI 渲染等。
- 常见的micro-task 比如: process.nextTick、new Promise().then(回调)、MutationObserver(html5 新特性) 等

### Event Loop过程解析

一个完整的Event Loop过程，可以概括为以下阶段:

![](/knowledge/2019-01-14-002.png)

- 一开始执行栈空，我们可以把 **执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则**。micro队列空，macro队列里有且只有script脚本(整体代码)。

- 全局上下文(script标签)被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的macro-task与micro-task，它们会分别被推入各自的任务队列里。同步代码执行完了，script脚本会被移出macro队列，这个过程本质上是队列的macro-task的执行和出队的过程。

- 上一步我们出队的是一个macro-task，这一步我们处理的是micro-task。但需要注意的是:当macro-task出队时，任务是一个一个执行的；而micro-task出队时，任务时一队一队执行的。因此，我们处理micro队列这一步，会逐个执行队列中的任务并把它出队，知道队列被清空。

- 执行渲染操作，更新界面

- 检查是否存在Web worker任务，如果有，则对其进行处理

- 上述过程循环往复，知道两个队列都清空

我们总结一下，每次循环都是一个这样的过程:

![](/knowledge/2019-01-14-003.png)

当某个宏任务执行完后,会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，会读取宏任务队列中排在最前的任务，执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列里的任务，依次类推。

接下来我们看道例子来介绍上面流程：
```js
Promise.resolve().then(()=>{
  console.log('Promise1')
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
})
setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')
  })
},0)
```

最后输出结果是 Promise1，setTimeout1，Promise2，setTimeout2

- 一开始执行栈的同步任务（这属于宏任务）执行完毕，会去查看是否有微任务队列，上题中存在(有且只有一个)，然后执行微任务队列中的所有任务输出 Promise1，同时会生成一个宏任务 setTimeout2

- 然后去查看宏任务队列，宏任务 setTimeout1 在 setTimeout2 之前，先执行宏任务 setTimeout1，输出 setTimeout1

- 在执行宏任务 setTimeout1 时会生成微任务 Promise2 ，放入微任务队列中，接着先去清空微任务队列中的所有任务，输出 Promise2

- 清空完微任务队列中的所有任务后，就又会去宏任务队列取一个，这回执行的是 setTimeout2


## Node中的Event Loop

### Node简介

Node中的Event Loop和浏览器中的是完全不相同的东西。Node.js采用V8作为js的解析引擎，而I/O处理方面使用了自己设计的libuv,libuv是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的API，事件循环机制也是它里面的实现:

![](/knowledge/2019-01-14-004.png)

Node.js的运行机制如下:
- V8引擎解析JavaScript脚本。
- 解析后的代码，调用Node API。
- libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop(事件循环),以异步的方式将任务的执行结果返回给V8引擎。
- V8引擎在将结果返回给用户。

### 六个阶段
其中 libuv 引擎中的事件循环分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

![](/knowledge/2019-01-14-005.png)

从上图中，大致看出 node 中的事件循环的顺序：

外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O 事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段（按照该顺序反复运行）...

- timers 阶段：这个阶段执行 timer（setTimeout、setInterval）的回调
- I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
- idle, prepare 阶段：仅 node 内部使用
- poll 阶段：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
- check 阶段：执行 setImmediate() 的回调
- close callbacks 阶段：执行 socket 的 close 事件回调

**注意：上面六个阶段都不包括 process.nextTick()(下文会介绍)**

接下去我们详细介绍timers、poll、check这 3 个阶段，因为日常开发中的绝大部分异步任务都是在这 3 个阶段处理的。

#### timer

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。

同样，**在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行**。

#### poll

poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情
- 回到timer执行阶段回调
- 执行I/O回调

并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
- 如果 poll 队列为空时，会有两件事发生
    - 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
    - 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。

#### check 阶段

setImmediate()的回调会被加入 check 队列中，从 event loop 的阶段图可以知道，check 阶段的执行顺序在 poll 阶段之后。

我们先来看个例子:
```js
console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')
//start=>end=>promise3=>timer1=>timer2=>promise1=>promise2
```

- 一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出 start end，并将 2 个 timer 依次放入 timer 队列）,会先去执行微任务（这点跟浏览器端的一样），所以打印出 promise3

- 然后进入 timers 阶段，执行 timer1 的回调函数，打印 timer1，并将 promise.then 回调放入 microtask 队列，同样的步骤执行 timer2，打印 timer2；这点跟浏览器端相差比较大，timers 阶段有几个 setTimeout/setInterval 都会依次执行，并不像浏览器端，每执行一个宏任务后就去执行一个微任务（关于 Node 与浏览器的 Event Loop 差异，下文还会详细介绍）。

### 注意点
 
#### setTimeout 和 setImmediate

二者非常相似，区别主要在于调用时机不同。
- setImmediate 设计在 poll 阶段完成时执行，即 check 阶段；
- setTimeout 设计在 poll 阶段为空闲时，且设定时间到达后执行，但它在 timer 阶段执行

```js
setTimeout(function timeout () {
  console.log('timeout');
},0);
setImmediate(function immediate () {
  console.log('immediate');
});
```

- 对于以上代码来说，setTimeout 可能执行在前，也可能执行在后。
- 首先 setTimeout(fn, 0) === setTimeout(fn, 1)，这是由源码决定的

    进入事件循环也是需要成本的，如果在准备时候花费了大于 1ms 的时间，那么在 timer 阶段就会直接执行 setTimeout 回调
    
- 如果准备时间花费小于 1ms，那么就是 setImmediate 回调先执行了

但当二者在异步 i/o callback 内部调用时，总是先执行 setImmediate，再执行 setTimeout

```js
const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
// immediate
// timeout
```

在上述代码中，setImmediate 永远先执行。因为两个代码写在 IO 回调中，IO 回调是在 poll 阶段执行，当回调执行完毕后队列为空，发现存在 setImmediate 回调，所以就直接跳转到 check 阶段去执行回调了。


#### process.nextTick
这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。

```js
setTimeout(() => {
 console.log('timer1')
 Promise.resolve().then(function() {
   console.log('promise1')
 })
}, 0)
process.nextTick(() => {
 console.log('nextTick')
 process.nextTick(() => {
   console.log('nextTick')
   process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
     })
   })
 })
})
// nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1
```

## Node 与浏览器的 Event Loop 差异

**浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。**

![](/knowledge/2019-01-14-006.png)

接下我们通过一个例子来说明两者区别：
```js
setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)
```

浏览器端运行结果：timer1=>promise1=>timer2=>promise2

浏览器端的处理过程如下：

![](/knowledge/2019-01-14-007.gif)

Node 端运行结果：timer1=>timer2=>promise1=>promise2

- 全局脚本（main()）执行，将 2 个 timer 依次放入 timer 队列，main()执行完毕，调用栈空闲，任务队列开始执行；

- 首先进入 timers 阶段，执行 timer1 的回调函数，打印 timer1，并将 promise1.then 回调放入 microtask 队列，同样的步骤执行 timer2，打印 timer2；

- 至此，timer 阶段执行结束，event loop 进入下一个阶段之前，执行 microtask 队列的所有任务，依次打印 promise1、promise2

Node 端的处理过程如下：

![](/knowledge/2019-01-14-008.gif)

## 六、总结
浏览器和 Node 环境下，microtask 任务队列的执行时机不同
- Node 端，microtask 在事件循环的各个阶段之间执行
- 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行


## 练习
```js
setTimeout(()=>{
   console.log(1) 
},0)
let a=new Promise((resolve)=>{
    console.log(2)
    resolve()
}).then(()=>{
   console.log(3) 
}).then(()=>{
   console.log(4) 
})
console.log(5) 
```
以此输出 2,5,3,4,1

```js
new Promise((resolve,reject)=>{
    console.log("promise1")
    resolve()
}).then(()=>{
    console.log("then11")
    new Promise((resolve,reject)=>{
        console.log("promise2")
        resolve()
    }).then(()=>{
        console.log("then21")
    }).then(()=>{
        console.log("then23")
    })
}).then(()=>{
    console.log("then12")
})
```
promise1,then11,promise2,then21,then12,then23

```js
new Promise((resolve,reject)=>{
    console.log("promise1")
    resolve()
}).then(()=>{
    console.log("then11")
    return new Promise((resolve,reject)=>{
        console.log("promise2")
        resolve()
    }).then(()=>{
        console.log("then21")
    }).then(()=>{
        console.log("then23")
    })
}).then(()=>{
    console.log("then12")
})
```
>Promise的第二个then相当于是挂在新Promise的最后一个then的返回值上。

promise1,then11,promise2,then21,then23,then12

```js
new Promise((resolve,reject)=>{
    console.log("promise1")
    resolve()
}).then(()=>{
    console.log("then11")
    new Promise((resolve,reject)=>{
        console.log("promise2")
        resolve()
    }).then(()=>{
        console.log("then21")
    }).then(()=>{
        console.log("then23")
    })
}).then(()=>{
    console.log("then12")
})
new Promise((resolve,reject)=>{
    console.log("promise3")
    resolve()
}).then(()=>{
    console.log("then31")
})
```
promise1,promise3,then11,promise2,then31,then21,then12,then23

```js
async function async1() {
    console.log("async1 start");
    await  async2();
    console.log("async1 end");
}

async function async2() {
    console.log( 'async2');
}

console.log("script start");

setTimeout(function () {
    console.log("settimeout");
},0);

async1();

new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});
console.log('script end'); 
```
script start,async1 start,async2,promise1,script end,async1 end,promise2,settimeout

>async1 可以看成如下

```js
funcation async1(){
    console.log("async1 start");
    new Promise((resolve)=>{
     console.log( 'async2');
    }).then(()=>{
        console.log("async1 end");
    })
}
```


```js
async function async1() {
    console.log(1)
    await async2()
    console.log(2)
    return await 3
}
async function async2() {
    console.log(4)
}

setTimeout(function() {
    console.log(5)
}, 0)

async1().then(v => console.log(v))
new Promise(function(resolve) {
    console.log(6)
    resolve();
    console.log(7)
}).then(function() {
    console.log(8)
})
console.log(9)
```
1,4,6,7,9,2,8,3,5

## 疑惑
我们知道Promise本身是一个异步方法，必须得在执行栈执行完了再去取它的值，因此，所有的返回值都得包一层异步setTimeout。那么问题来了，为什么Promise的resolve被setTimeout包裹后就成了微任务，要知道setTimeout可是宏任务。

### 解析

在现代浏览器里面，产生微任务有两种方式。

- 第一种是使用MutationObserver监控某个DOM节点，然后在通过JavaScript来修改这个节点，或者为这个节点添加，删除部分子节点，当DOM节点发生变化时，就会产生DOM变化记录的微任务。

- 第二种方式是使用Promise，当调用Promise.resolve()或者Promise.reject()的时候，也会产生微任务。

ECMAScript规范明确指出Promise必须以Promise Job形式加入job queues(也就是microtask)。Job Queue是ES6中新剔除的概念，建立在事件循环队列之上。




