# watch原理
watch是Vue中的一个监听数据变化的一个方法，我们先看看watch的用法。

## watch基本用法
### 监听基本数据类型
```
<div>
  {{ name }}
  <button @click="changeName">改变name</button>
</div>
export default {
  data() {
    return {
      name: 'tanchidemao',
    }
  },
  watch: {
    name(val, oldval) {
      console.log(val, oldval)
    }
  },
  methods: {
    changeName() {
      this.name = this.name === 'tanchidemao' ? 'cat' : 'tanchidemao'
    }
  }
}

```
watch可以接收两个参数，一个是变化之后的数据，一个是变化之前的数据，你可以基于这两个值处理一些逻辑。

### 监听对象
```
<div>
  {{ obj.name }}
  <button @click="changeName">改变name</button>
</div>
export default {
  data() {
    return {
      obj: {
        name: 'tanchidemao',
      }
    }
  },
  watch: {
    obj: {
      handler(val, oldval) {
        console.log(val, oldval)
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    changeName() {
      this.obj.name = this.obj.name === 'tanchidemao' ? 'cat' : 'tanchidemao'
    }
  },
  created() {
    console.log('created')
  }
}
```
在监听对象变化的时候，加上deep这个属性即可深度监听对象数据；如果你想在页面进行时就执行watch方法，加上immediate即可。值得注意的是，设置了immediate属性的watch的执行顺序是在created生命周期之前的。

### watch接收参数为数组
我在看Vue源码的时候，发现了一个比较有意思的地方，如果说watch监听的属性不去设置一个方法而是接收一个数组的话，可以向当前监听的属性传递多个方法
```js
export default {
  data() {
    return {
      name: 'jack',
    }
  },
  watch: {
    name: [
      { handler: function() {console.log(1)}, immediate: true },
      function(val) {console.log(val, 2)}
    ]
  },
  methods: {
    changeName() {
      this.name = this.name === 'tanchidemao' ? 'cat' : 'tanchidemao'
    }
  }
}
```

数组中可以接收不同形式的参数，可以是方法，也可以是一个对象，具体的书写方式和普通的watch没什么不同。

## 初始化watch
### initState  
```js
// src/core/instance/state.js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props) // 如果有 props ，初始化 props
  if (opts.methods) initMethods(vm, opts.methods) // 如果有 methods ，初始化 methods 里面的方法
  if (opts.data) { // 如果有 data 的话，初始化，data；否则响应一个空对象
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed) // 如果有 computed ，初始化 computed
  if (opts.watch && opts.watch !== nativeWatch) { // 如果有 watch ，初始化 watch
    initWatch(vm, opts.watch)
  }
}
```

首先在initState初始化watch，如果有watch这个属性的话，就将watch传入initWatch方法中处理

### initWatch
```js
// src/core/instance/state.js
function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
```
这个函数主要就是初始化watch，我们可以看到initWatch会遍历watch，然后判断每一个值是否是数组，如果是数组的就遍历这个数组，创建多个回调函数，这块也就解释了上边watch监听的数据可以接收参数为参数原因；如果不是数组的话，就直接创建回调函数。

### createWatcher
```js
function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
```
createWatcher中会判断handler是否是对象，如果是对象将handler挂在到options这个属性，在将对象的handler属性提取出来；如果handler是一个字符串的话，会从Vue实例找到这个方法赋值给handler。从这里我们也能看出来，watch还可以支持字符串的写法。执行Vue实例上的$watch方法。

### $watch
```js
Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: Object
): Function {
  // 获取 Vue 实例 this
  const vm: Component = this
  if (isPlainObject(cb)) {
    // 判断如果 cb 是对象执行 createWatcher
    return createWatcher(vm, expOrFn, cb, options)
  }
  options = options || {}
  // 标记为用户 watcher
  options.user = true
  // 创建用户 watcher 对象
  const watcher = new Watcher(vm, expOrFn, cb, options)
  // 判断 immediate 如果为 true
  if (options.immediate) {
    // 立即执行一次 cb 回调，并且把当前值传入
    try {
      cb.call(vm, watcher.value)
    } catch (error) {
      handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
    }
  }
  // 返回取消监听的方法
  return function unwatchFn () {
    watcher.teardown()
  }
}
```
$watch函数是Vue的一个实例方法，也就是我们可以使用Vue.$watch去调用。$watch会创建一个Watcher对象，这块也是涉及响应式原理，在watch中改变的数据可以进行数据的响应式变化。同时也会判断是否有immediate这个属性，如果有的话，就直接调用回调。

### Watcher
```js
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      // expOrFn 是字符串的时候，例如 watch: { 'person.name': function... }
      // parsePath('person.name') 返回一个函数获取 person.name 的值
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  /*获得getter的值并且重新进行依赖收集*/
  get () {
     /*将自身watcher观察者实例设置给Dep.target，用以依赖收集。*/
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      /*
      执行了getter操作，看似执行了渲染操作，其实是执行了依赖收集。
      在将Dep.target设置为自身观察者实例以后，执行getter操作。
      譬如说现在的的data中可能有a、b、c三个数据，getter渲染需要依赖a跟c，
      那么在执行getter的时候就会触发a跟c两个数据的getter函数，
      在getter函数中即可判断Dep.target是否存在然后完成依赖收集，
      将该观察者对象放入闭包中的Dep的subs中去。
    */
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      /*如果存在deep，则触发每个深层对象的依赖，追踪其变化*/
      if (this.deep) {
        /*递归每一个对象或者数组，触发它们的getter，使得对象或数组的每一个成员都被依赖收集，形成一个“深（deep）”依赖关系*/
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  ... 其他方法
}

```
上面的Watcher我省略了一些其他方法，只保留了get函数，我们能在get函数中看到如果有deep属性的话，就会递归处理对象中的每一个属性，以达到深度监听的效果。










