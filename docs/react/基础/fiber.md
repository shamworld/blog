# fiber

## 什么是fiber
JavaScript是单线程的，着意味着我们只有一个线程可以执行所有的UI更新，处理用户操作和网络调用等。

在Fiber之前React有两棵树，一颗是当前树，另一颗是带有所有更新的更新树。协调器将在一次通过中同步找到两个树之间的差异，这个过程不能被打断，得全部执行完一把更新，节点过多导致卡顿，这将阻止主线程执行其他重要任务，例如某些用户操作 

因此，Facebook团队在React 16更新中引入了Fiber作为其核心架构。

fiber:就是一个数据结构，它有很多属性

虚拟dom是对真实dom得一种简化，一些真实dom都做不到得事情，那虚拟dom更做不到

就有了fiber，有很多得属性，希望借由fiber上得这堆属性，来做到一些比较厉害得事情。

## fiber架构

为了弥补一些不足，就设计了一些新的算法，而为了能让这些算法跑起来，所以出现了fiber这种数据结构，fiber这种数据结构+新的算法 = fiber架构

## react应用管理
react应用从始至终管理着最基本得三样东西:
- Root(整个应用得根，一个对象，不是fiber，有个属性指向current树，同样也有个属性指向workInProgress树)
- current(树上的每一个节点都是一个fiber，保存着上一次得状态，并且每个fiber都对应着一个jsx节点)
- workInProgress(树上的每一个节点都是一个fiber，保存着本次新的状态，并且每个fiber节点都对应一个jsx节点)

## 初次渲染的时候，没有current树问题
react在一开始创建Root的时候就会同时创建一个uninitialFiber的东西(未初始化的fiber)

让react的curren指向了uninitialFiber，之后再去创建一个本次要用到的workInProgress 

- ReactDOM.render()和setState的时候开始创建更新。
- 将创建的更新加入任务队列，等待调度。
- 在requestldleCallback空闲时执行任务。
- 从根节点开始遍历Fiber Node，并且构建workInProgress Tree。
- 生成effectList。
- 根据EffectList更新DOM。

workInProgress Tree 构建完毕，得到的就是新的Fiber Tree，然后喜新厌旧(把current指针指向workInProgress Tree,丢掉旧的Fiber Tree)就好了。

这样做的好处:
- 能够复用内部对象(fiber)
- 节省内存分配，GC的时间开销

就算运行中有错误，也不会影响View上的数据

每个fiber上都有一个 **alternate** 属性，也指向一个fiber，创建workInProgress节点时优先取 **alternate** ,没有的话就创建一个。

创建workInProgress Tree的过程也是一个Diff的过程，Diff完成之后会生成一个EffectList，这个EffectList就是最终Commit阶段用来处理副作用的阶段


## react中主要分两个阶段

![](/react/write/lifecycle.png)

- render阶段(指的是创建fiber的过程)
    - 为每个节点创建新的fiber(workInProgress)(可能是复用)生成一个有新状态的workInProgress树
    - 初次渲染的时候(或新创建了某个节点的时候)会将这个fiber创建真实的dom实例，并且对应当前节点的子节点进行插入
    - 如果不是初次渲染的话，就对比新旧fiber状态，将产生了更新的fiber节点，最终通过链表的形式挂载到RootFiber上
- commit阶段(真正渲染阶段)
    - 执行snapshot生命周期
    - 会从RootFiber上获取到那条链表，根据链表上的标识来操作页面
    - 执行剩余的生命周期

在渲染阶段调用的生命周期方法：

- getDerivedStateFromProps
- shouldComponentUpdate
- render

不管是初次渲染还是更新 都是从根往下遍历的

在提交阶段调用的生命周期方法：

- getSnapshotBeforeUpdate
- componentDidMount
- componentDidUpdate
- componentWillUnmount

由于这些方法在提交阶段被调用，因此它们可能包含任何副作用和DOM操作操作

>这里要特别注意的是，阶段1（渲染）可以暂停和恢复，即，它是异步的，而阶段2必须在一个流程中完成（同步）。


## Prioritization

React系统如何确定要暂停/恢复哪个进程？

**优先级** 是React Fiber最重要的功能之一。Fiber Reconciler为任务分配优先级，并根据优先级将更新这些更改。

根据任务，React分配以下优先级:
- 同步
- 高优先级
- 低优先级
- 场外工作(优先)等

例如，在所有组件的优先级中，将textInput类型事件指定为高优先级

按照优先级执行，如果插入了新的任务，那么也按照优先级重新排序，分别是 **window.requestAnimationFrame** 和 **window.requestIdleCallback**

## setState更新是同步还是异步？
如果是正常情况下，也就是没有使用Concurrent组件的情况下，是同步更新的，但是，不会立即获取到最新的state的值，因为调用setState只是单纯的将你传进来的新的state放入updateQueue这条链上，等这个点击事件结束之后会触发内部的一个回调函数，在这个回调函数中，才会真正的去更新state已经重新渲染；当使用了Concurrent组件的时候，这种情况下才是真正的异步更新模式，同样的没法立即获取最新状态，并且在执行react的更新和渲染过程中使用了真正的异步方式(postMessage)这个才是真正的异步。当使用了flushSync这个API的时候，react的更新渲染完全是同步的，会立即发出更新state以及渲染的过程，这种情况可以获取到最新的状态

## setState后如何马上拿到更新的值？

### flushSync
```js
flushSync(()=>{
    this.setState({
        a=2
    })
    console.log(this.state.a);
})
```

### setTimeout
```js
setTimeout(()=>{
    this.setState({
        a=2
    })
    console.log(this.state.a);
})
```

### addEventListener
```js
div.addEventListener('click',()=>{
    this.setState({
        a=2
    })
    console.log(this.state.a);
})
```
