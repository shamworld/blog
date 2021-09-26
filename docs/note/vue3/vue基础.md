# Vue基础

## v-show和v-if的区别
- v-show通过CSS display控制显示和隐藏
- v-if组件真正的渲染和销毁，而不是显示和隐藏
- 频繁切换显示状态的时候用v-show，否则用v-if

## v-if 和 v-for 为什么不能一起使用

关于这个问题我们可以先看看模版编译后的 render 函数

```js
const compiler = require("vue-template-compiler");
// v-if
const v_if = `<p v-if="show">{{ item }}</p>`;
const str1 = compiler.compile(v_if);
console.log(str1)
// with(this){return (show)?_c('p',[_v(_s(item))]):_e()}

// v-for
const v_for = `
    <ul>
        <li v-for="item in list">{{ item.value }}</li>
    </ul>
`;
const str2 = compiler.compile(v_for);
console.log(str2);
// with(this){return _c('ul',_l((list),function(item){return _c('li',[_v(_s(item.value))])}),0)}

// v-for + v-if

const v_for_if = `
    <ul>
        <li v-for="item in list" v-if="item.show">{{ item.value }}</li>
    </ul>
`;
const str3 = compiler.compile(v_for_if);
console.log(str3);

// 正确的写法1
const template= `
    <ul>
        <li v-for="item in list" >
            <div v-if="item.show">{ item.value }}</div> {
        </li>
    </ul>
`;
// 正确写法二使用computed
export default {
    computed() {
        showList() {
            return list.map(item=>item.show)
        }
    }
}
// with(this){return _c('ul',_l((list),function(item){return (item.show)?_c('li',[_v(_s(item.value))]):_e()}),0)}
```

过程分析：我们可以发现<font color=red>v-for</font>其实就是执行了`_l((list),function(item){return (item.show)?_c('li',[_v(_s(item.value))]):_e()}),0)`，而<font color=red>v-if</font>其实在`_l`函数内部又执行了一次 if 判断，这样就好造成性能的损耗，所以一般不建议这样写。

结论：**v-for 的优先级高于 v-if**

- 永远不要把 v-if 和 v-for 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）

- 如果避免出现这种情况，则在外层嵌套template（页面渲染不生成dom节点），在这一层进行v-if判断，然后在内部进行v-for循环

- 如果条件出现在循环内部，可通过计算属性computed提前过滤掉那些不需要显示的项

## vue 父子组件如何通讯

1. 使用`props`进行数据的传递，使用`$emit`对事件进行发布订阅

Parent 组件

```vue
<template>
  <div>
    <p>我是父组件</p>
    <Child @child-click="childClick" :mssage="msg"></Child>
  </div>
</template>
<script>
export default {
  name: "Parent",
  data() {
    return {
      msg: "父组件传递",
    };
  },
  methods: {
    childClick(value) {
      console.log(value);
    },
  },
};
</script>
```

child 组件

```vue
<template>
  <div class="child-component" @click="childClick">
    子组件 <br />
    父组件传递的参数：{{ message }}
  </div>
</template>
<script>
export default {
  name: "Child",
  props: ["message"],
  data() {
    return {};
  },
  methods: {
    childClick() {
      this.$emit("child-click", { a: 1 });
    },
  },
};
</script>
```

2. 使用 ref 调用组件方法
   当然还有其他的方式这里不一一列举了，这里主要是项目中常用的

## 如何自定义事件进行 vue 组件通讯

**使用`events`**

1.  创建`events.js`

```js
import Vue from "vue";
const Events = new Vue();
export default Events;
```

2.  在`main.js`进行引入并使用 use 方法载入 Vue 实例中

```js
import Vue from "vue";
import Events from "./events";
Vue.use(Events);
// 为了方便使用直接挂载在Vue的实例上
Vue.prototype.$events = Events;
```

3. 使用上述 demo 进行测试
   Parent 组件

```vue
<template>
  <div>
    <p @click="testBus">我是父组件</p>
    <Child :mssage="msg"></Child>
  </div>
</template>
<script>
export default {
  name: "Parent",
  data() {
    return {
      msg: "父组件传递",
    };
  },
  methods: {
    testBus() {
      this.$events.$emit("test", { b: 2 });
    },
  },
  beforeDestroy() {
    // 解除订阅事件
    this.$events.off("test");
  },
};
</script>
```

child 组件

```vue
<template>
  <div class="child-component">
    子组件 <br />
    父组件传递的参数：{{ message }}
  </div>
</template>
<script>
export default {
  name: "Child",
  props: ["message"],
  data() {
    return {};
  },
  created() {
    this.$events.$on("test", (value) => {
      console.log(value); // {a: 1}
    });
  },
};
</script>
```


## vue 如何实现 v-model

```vue
<template>
  <div>
    <input type="text" :value="text" @input="$emit('change', $event.target.value)"></input>
  </div>
</template>
<script>
  export default {
    model: {
      prop: 'text', // 与下边的props保持一致
      event: 'change'
    },
    props: {
      text: String
    }
  }
</script>
```

[参考 vue 官方文档链接](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

## vue 组件更新之后如何获取最新的 dom

可以使用 this.\$nextTick，官方文档是这么说的：**将回调延迟到下次 DOM 更新循环之后执行。**，通俗的说也就是 dom 更新完成之后执行，
可以理解成 vue 在进行页面渲染的时候其实是进行了一个批处理的，因为 data 会有多次更新，当数据更新完成（相当于是批处理了），我们再去渲染页面，这样可以节省浏览器渲染 dom 的开销，从而提升性能。

```vue
...
<script>
export default {
  methods: {
    example() {
      this.$nextTick(() => {
        // DOM现在更新了
      });
    },
  },
};
</script>
```

## slot

[官方文档地址](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)

### 一般插槽

Child 组件

```vue
<template>
  <div>
    <slot>
      默认插槽
    </slot>
  </div>
</template>
```

Parent 组件

```vue
<template>
  <div>
    <child>
      <p>填充内容</p>
    </child>
  </div>
</template>
```

### 具名插槽

Child 组件

```vue
<template>
  <div>
    <slot name="header">
      默认插槽
    </slot>
  </div>
</template>
```

Parent 组件

```vue
<template>
  <div>
    <child>
      <!-- 使用方式一 -->
      <template #header>
        <p>填充内容</p>
      </template>
      <!-- 使用方式二 -->
      <div slot="header">填充内容</div>
    </child>
  </div>
</template>
```

### 作用域插槽

Child 组件

```vue
<template>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</template>
<script>
export default {
  data() {
    return {
      user: {
        lastName: "sss",
        firstName: "xxx",
      },
    };
  },
};
</script>
```

Parent 组件

```vue
<template>
  <div>
    <Child>
      <template v-slot:default="slotProps">
        {{ slotProps.user.firstName }}
      </template>
    </Child>
  </div>
</template>
```

`v-slot:default="slotProps"`需要注意以下点：

- 如果`<slot v-bind:user="user">`没有`name`直接使用`v-slot:default`，否则使用 v-slot:[name]，即`<slot name="content" v-bind:user="user">`，`<template v-slot:content="slotProps">`
- slotProps 可任意定义

### 解构插槽

Parent 组件

```vue
<template>
  <Child>
    <template v-slot:default="{ user }">
      {{ user.firstName }}
    </template>
  </Child>
</template>
```

## vue 动态组件

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里，进行 tab 切换，这个时候`component`组件就很有用了。

```vue
<template>
  <div>
    <component :is="'HelloWorld'" v-bind="{ message: 'ssss' }"></component>
  </div>
</template>
```

知识点：

1. 使用`is`进行组件的绑定，is 后面可以是**已注册组件的名字**，或者**一个组件的选项对象**
2. 使用`v-bind`传递 props

## vue 异步加载组件

```js
export default {
  components: {
    HelloWorld: () => import("../components/HelloWorld.vue"),
  },
};
```

使用`import()`方式进行异步加载组件，与路由懒加载一致

## vue 缓存

使用`keep-alive`

```vue
<template>
  <div>
    <keep-alive>
      <Component1 v-if="p === 1"></Component1>
      <Component2 v-else-if="p === 2"></Component2>
      <Component3 v-else></Component3>
    </keep-alive>
  </div>
</template>
```

## vue 组件抽离公共逻辑

使用 mixins

优点：
- 抽离公共方法，避免重复业务逻辑

缺点：
- 随着 `mixins` 的增加，会给阅读代码增加一些困难，会造成命名污染


## Vue 注册全局方法

1. 挂载在 Vue.prototype 上面

```js
Vue.prototype.globalXX = "xxx";
```

2. 使用 `mixins` 采用全局混入的方式

- 创建一个 `mixins` 文件

```js
const globalMixins = {
  methods: {
    getData() {
      console.log("getData");
    },
  },
};
export default globalMixins;
```

- 在 main.js 中进行全局注册

```js
import Vue from "vue";
import globalMixins from "./mixins/globalMixins";
Vue.mixins(globalMixins);
```

3. 使用 Plugin 方式

```js
const getData = () => {
  console.log("getData");
};
const plugin = {
  install(Vue) {
    Vue.prototype.$getData = getData;
  },
};
export default plugin;
```

- 在 main.js 中进行全局注册

```js
import Vue from "vue";
import plugin from "./plugin/plugin";
Vue.use(plugin);
```

## Vue 双向绑定原理

1. 原理

   View 的变化能实时让 Model 发生变化，而 Model 的变化也能更新到 View。如下图：
![vue双向绑定原理](/vue3/viewmodel.jpg)

Vue 采用**数据劫持&发布定于模式的方式**，通过**Object.defineProperty()**，方法来劫持（监控）各属性的 getter，setter，并在数据发生变化时通知订阅者，触发相应的监听回调。

缺点：想要重新定义属性的 getter/setter 就必须先知道有哪些属性，所以新加属性就没法响应了。为了解决这个问题 vue 不得已引入了 Vue.set 

要实现 Vue 的双向绑定大致可以划分是三个模块，如图：
![vue双向绑定原理](/vue3/a049d147.jpg)

- Observer

  **数据监听器**，负责对数据对象的所有数据进行监听（数据劫持），监听到数据变化通知订阅者。

- Complier

  **指令解析器**，扫描模版，并对指令进行解析，然后绑定指定事件。

- Watcher

  **Watcher 订阅者**，关联**Observer**，和**Complier**，能够订阅并收到属性变动的通知，执行指令绑定的相应操作，更新视图。Update()是他自身的一个方法，用于执行 Compiler 中绑定的回调，更新视图。

模版渲染解析时 Watcher 会对应绑定指令（一对一）。
此时会通过调用订阅者 watcher 初始化（watcher 中的 get 方法），去触发对应属性在发布者 observer 里（Object.defineProperty()）的 getter，Observer 会判断是不是通过 watcher 初始化调用（Dep.target 实例化之后会被清空），只有是才会通过 dep 类依赖收集。

observer 通过 depend 通知 Dep 类收集（addDep 方法，在 watcher 类中，会传入当前 Dep 实例调用本身）当前该订阅者（watcher）中的触发更新的方法，同时第一次初始化 watcher.update()初始化视图。此后每次的数据更新都会通过 `observer` 中的 setter 去触发 dep 类中的回调 update 执行收集依赖的所有方法更新订阅者中的状态同时更新视图。

observer 在处理对象和数组的时候，如果是数组，并且调用的方法会改变数组长度，则会重新增加索引之后更新数组，进行重新监听。如果是对象则通过对象的 getter 获取值 setter 更新值。

## 什么是 MVVM

- MVVM 是 Model-View-ViewModel 的缩写。MVVM 是一种设计思想。Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。
- 在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。
- ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。



## computed 和 watch 的区别

**computed**

computed 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值

**watch**

更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作

运用场景：

- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算
- 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的



## Vue data 为什么必须是函数

因为组件是用来复用的，且 JS 的对象都是引用类型，如果组件中的 data 是一个对象，那么这样作用域没有隔离，子组件中的属性会相互影响，如果组件中的 data 返回的是一个函数那么每个实例，可以维护一份被返回对象的拷贝属性，组件实例之间的 data 属性不会相互影响，而`new Vue`的实例不会被复用，因此不存在引用对象的问题。

## 子组件可以直接改变父组件的数据吗？为什么

不可以，由于 vue 的单向数据流，当子组件改变父组件数据时，Vue 会在浏览器的控制台中发出警告，如果需要修改可以使用`$emit`发射事件，或者使用`.sync`修饰符。

## Vue 的父组件和子组件生命周期钩子函数执行顺序？

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

- 加载渲染过程
  父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程
  父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程
  父 beforeUpdate -> 父 updated

* 销毁过程
  父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

## vue 中 key 的作用？为什么不能使用索引作为 key

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。

- 更准确：因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。

- 更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快，源码如下：

```js
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
```

如果使用了数组的索引，当数组的长度变化时，其索引也会跟着变化，导致标记的 key 会移动位置，此时再通过 sameNode 找到的组件就会出现偏差。



## 模版编译
- 模板不是HTML，有指令、插值、JS表达式，能实现判断，循环
- HTML是标签语言，只有JS才能实现判断、循环
- 因此，模板一定是转换为某种JS代码，即编译模板
- 模板编译为render函数，执行render函数返回vnode
- 基于vnode再执行path和diff
- 使用webpack vue-loader,会在开发环境下编译模板


## Vue组件是如何渲染和更新的

### 初次渲染过程
- 解析模板为render函数
- 触发响应式，监听data属性getter setter
- 执行render函数，生产vnode，patch(elem,vnode)

### 更新过程
- 修改data，触发setter(此前在getter中已被监听)
- 重新执行render函数，生成vnode
- patch(vnode,newVnode)


![](/vue3/a049d147.jpg)

模板编译完成生成render函数,生成一个vnode，执行vnode的时候会触发data里面的getter，生成依赖，在模板里面触发了哪个getter就会通过Watcher把他观察起来；修改data的setter的时候通知Watcher，判断是否是之前被观察起来的，如果是之前被观察起来的就会重新触发re-render重新渲染，patch。


## 路由hash的特点
- hash变化触发网页跳转，即浏览器的前进，后退
- hash变化不会刷新页面，SPA必须的特点
- hash永远不会提交到server端(前端自生自灭)


## 路由history特点
- 用url规范的路由，但跳转时不刷新页面
- history.pushState
- window.onpopstate


## Vue常见的性能优化
- 合理使用v-if和v-show
- 合理使用computed
- v-for时加key，以及避免和v-if同时使用
- 自定义事件，dom事件及时销毁
- 合理使用异步组件
- 合理使用keep-alive
- data层级不要太深
- 使用vue-loader在开发环境做模板编译
- webpack层面的优化
- 前端通用的性能优化，如图片懒加载
- 使用SSR

## Vue原理
### Vue 的初始化过程（new Vue(options)）都做了什么？
- 处理组件配置项
  - 初始化根组件时进行了选项合并操作，将全局配置合并到根组件的局部配置上
  - 初始化每个子组件时做了一些性能优化，将组件配置对象上的一些深层次属性放到vm.$options选项中，以提高代码的执行效率
- 初始化组件实例的关系属性，比如$parent、$children、$root、$refs等
- 处理自定义事件
- 调用beforeCreate钩子函数
- 初始化组件的inject配置项，得到`ret[key]=val`形式的配置对象，然后对该配置对象进行响应式处理，并代理每个key到vm实例上
- 数据响应式，处理props、methods、data、computed、watch等选项
- 解析组件配置项上的provide对象，将其挂载到vm._provided属性上
- 调用create钩子函数
- 如果发现配置选项上有el选项，则自动调用$mount方法，也就是说有了el选项，就不需要在手动调用$mount方法，反之，没提供el选项则必须调用$mount 
- 接下来进入挂载阶段

## Vue2.x双向数据绑定原理怎么实现的?
- 响应式的核心是通过 Object.defineProperty 拦截对数据的访问和设置
- 响应式的数据分为两类：
  - 对象，循环遍历对象的所有属性，为每个属性设置 getter、setter，以达到拦截访问和设置的目的，如果属性值依旧为对象，则递归为属性值上的每个 key 设置 getter、setter
    - 访问数据时（obj.key)进行依赖收集，在 dep 中存储相关的 watcher
    - 设置数据时由 dep 通知相关的 watcher 去更新
  - 数组，增强数组的那 7 个可以更改自身的原型方法，然后拦截对这些方法的操作
    - 添加新数据时进行响应式处理，然后由 dep 通知 watcher 去更新
    - 删除数据时，也要由 dep 通知 watcher 去更新

## methods、computed和watch有什么区别
- 使用场景
  - methods一般用于封装一些较为复杂的处理逻辑(同步，异步)
  - computed一般用于封装一些简单的同步逻辑，将经过处理的数据返回，然后显示在模板中，以减轻模板的重量
  - watch一般用于当需要在数据变化时执行异步或开销较大的操作
- 区别
  - methods和computed
  > 如果在一次渲染中，有多个地方使用了同一个methods或computed属性，methods会被执行多次，而computed的回调函数则只会执行一次

  > 通过源码我们知道，在一次渲染中，多次访问computedProperty，之后会在第一次执行computed属性的回调函数，后续的其他访问，则直接使用第一次执行结果(watcher.value)，而这一切的实现原理则是通过对watcher.dirty属性控制实现的。而methods，每一次的访问则是简单的方法调用
  - computed和watch
  > 通过源码阅读我们知道，computed和watch的本质是一样的，内部都是通过Watcher来实现的，其实没什么区别，非要说区别的话就两点:1.使用场景上的区别，2.computed默认是懒执行的，切不可更改
  - methods和watch
  > methods和watch之间其实没什么可比的，完全是两个东西，不过在使用上可以把watch中一些逻辑抽到methods中，提高代码的可读性。


## Vue 的异步更新机制是如何实现的？

Vue的异步更新机制的核心是利用浏览器的异步任务队列来实现的，首先选取微任务队列，宏任务队列次之。

当响应式数据更新后，会调用dep.notify()，通知dep中的收集watcher去执行update方法，watcher.update将watcher自己放入一个watcher队列(全局的queue数组)。

然后通过nextTick方法将一个刷新watcher队列的方法(flushSchedulerQueue)放入一个全局的callbacks数组中。

如果此时浏览器的异步任务队列中没有一个叫flushCallbacks的函数，则执行timerFunc函数，将flushCallbacks函数放入异步队列。如果异步任务队列中已经存在flushCallbacks函数，等待其执行完成以后再次放入下一个flushCallbacks函数。

flushCallbacks函数负责执行callbacks数组中的所有flushSchedulerQueue函数。

flushSchedulerQueue函数负责刷新watcher队列，即执行queue数组中每个watcher的run方法，从而进入更新阶段，比如执行组件更新函数或者执行用户watch的回调函数。

## Vue 的 nextTick API 是如何实现的？
Vue.nextTick 或者 vm.$nextTick 的原理其实很简单，就做了两件事：
 - 将传递的回调函数用 try catch 包裹然后放入 callbacks 数组
 - 执行 timerFunc 函数，在浏览器的异步任务队列放入一个刷新 callbacks 数组的函数

## Vue.use(plugin) 做了什么？
负责安装plugin插件，其实就是执行提供的install方法。
- 首先判断该插件是否已经安装过了
- 如果没有，则执行插件提供的install方法来安装插件，具体做什么由插件自己决定

## Vue.mixin(options) 做了什么？
负责在Vue的全局配置上合并options配置，然后在每个组件生成vnode时会将全局配置合并到组件自身的配置上来。
- 标准化options对象上的props、inject、directive选项的格式
- 处理options上的extends和mixins，分别将他们合并到全局配置上
- 然后将options配置和全局配置进行合并，选项冲突时options配置会覆盖全局配置

## Vue.component(compName, Comp) 做了什么？
负责注册全局组件。其实就是将组件配置注册到全局配置的components选项上(options.components)，然后各个子组件在生成vnode时会将全局的components选项合并到局部的components配置项上。
- 如果第二个参数为空，则表示获取compName的组件构造函数
- 如果Comp是组件配置对象，则使用Vue.extend方法得到组件构造函数，否则直接进行下一步
- 在全局配置上设置组件信息,`this.options.components.compName=CompConstructor`

## Vue.directive('my-directive', {xx}) 做了什么？
在全局注册 my-directive 指令，然后每个子组件在生成 vnode 时会将全局的 directives 选项合并到局部的 directives 选项中。原理同 Vue.component 方法：
- 如果第二个参数为空，则获取指定指令的配置对象
- 如果不为空，如果第二个参数是一个函数的话，则生成配置对象 { bind: 第二个参数, update: 第二个参数 }
- 然后将指令配置对象设置到全局配置上，this.options.directives`['my-directive'] = {xx}`

## Vue.filter('my-filter', function(val) {xx}) 做了什么？
负责在全局注册过滤器 my-filter，然后每个子组件在生成 vnode 时会将全局的 filters 选项合并到局部的 filters 选项中。原理是：
- 如果没有提供第二个参数，则获取 my-filter 过滤器的回调函数
- 如果提供了第二个参数，则是设置 `this.options.filters['my-filter'] = function(val) {xx}`。

## Vue.extend(options) 做了什么？
Vue.extend 基于 Vue 创建一个子类，参数 options 会作为该子类的默认全局配置，就像 Vue 的默认全局配置一样。所以通过 Vue.extend 扩展一个子类，一大用处就是内置一些公共配置，供子类的子类使用。
- 定义子类构造函数，这里和 Vue 一样，也是调用 _init(options)
- 合并 Vue 的配置和 options，如果选项冲突，则 options 的选项会覆盖 Vue 的配置项
- 给子类定义全局 API，值为 Vue 的全局 API，比如 Sub.extend = Super.extend，这样子类同样可以扩展出其它子类
- 返回子类 Sub

## Vue.set(target, key, val) 做了什么
由于 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')，所以通过 Vue.set 为向响应式对象中添加一个 property，可以确保这个新 property 同样是响应式的，且触发视图更新。
- 更新数组指定下标的元素：`Vue.set(array, idx, val)`，内部通过 splice 方法实现响应式更新
- 更新对象已有属性：`Vue.set(obj, key ,val)`，直接更新即可 => `obj[key] = val`
- 不能向 Vue 实例或者 $data 动态添加根级别的响应式数据
- `Vue.set(obj, key, val)`，如果 obj 不是响应式对象，会执行 `obj[key] = val`，但是不会做响应式处理
- `Vue.set(obj, key, val)`，为响应式对象 obj 增加一个新的 key，则通过 defineReactive 方法设置响应式，并触发依赖更新


## Vue.delete(target, key) 做了什么？
删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。当然同样不能删除根级别的响应式属性。
- `Vue.delete(array, idx)`，删除指定下标的元素，内部是通过 splice 方法实现的
- 删除响应式对象上的某个属性：`Vue.delete(obj, key)`，内部是执行 delete obj.key，然后执行依赖更新即可

## Vue.nextTick(cb) 做了什么？
Vue.nextTick(cb) 方法的作用是延迟回调函数 cb 的执行，一般用于 this.key = newVal 更改数据后，想立即获取更改过后的 DOM 数据：
```js
this.key = 'new val'

Vue.nextTick(function() {
  // DOM 更新了
})

```
其内部的执行过程是：
- `this.key = 'new val'`，触发依赖通知更新，将负责更新的 watcher 放入 watcher 队列
- 将刷新 watcher 队列的函数放到 callbacks 数组中
- 在浏览器的异步任务队列中放入一个刷新 callbacks 数组的函数
- `Vue.nextTick(cb)` 来插队，将 cb 函数放入 callbacks 数组
- 待将来的某个时刻执行刷新 callbacks 数组的函数
- 然后执行 callbacks 数组中的众多函数，触发 watcher.run 的执行，更新 DOM
- 由于 cb 函数是在后面放到 callbacks 数组，所以这就保证了先完成的 DOM 更新，再执行 cb 函数

## vm.$watch(expOrFn, callback, [options]) 做了什么？
vm.$watch 负责观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。当其发生变化时，回调函数就会被执行，并为回调函数传递两个参数，第一个为更新后的新值，第二个为老值。

这里需要 注意 一点的是：如果观察的是一个对象，比如：数组，当你用数组方法，比如 push 为数组新增一个元素时，回调函数被触发时传递的新值和老值相同，因为它们指向同一个引用，所以在观察一个对象并且在回调函数中有新老值是否相等的判断时需要注意。
vm.$watch 的第一个参数只接收简单的响应式数据的键路径，对于更复杂的表达式建议使用函数作为第一个参数。

至于 vm.$watch 的内部原理是：
- 设置 options.user = true，标志是一个用户 watcher
- 实例化一个 Watcher 实例，当检测到数据更新时，通过 watcher 去触发回调函数的执行，并传递新老值作为回调函数的参数
- 返回一个 unwatch 函数，用于取消观察


## vm.$on(event, callback) 做了什么？
监听当前实例上的自定义事件，事件可由 vm.$emit 触发，回调函数会接收所有传入事件触发函数（vm.$emit）的额外参数。

vm.$on 的原理很简单，就是处理传递的 event 和 callback 两个参数，将注册的事件和回调函数以键值对的形式存储到 vm._event 对象中，vm._events = { eventName: [cb1, cb2, ...], ... }。

## vm.$emit(eventName, [...args]) 做了什么？

触发当前实例上的指定事件，附加参数都会传递给事件的回调函数。

其内部原理就是执行 vm._events[eventName] 中所有的回调函数


## vm.$off([event, callback]) 做了什么？
移除自定义事件监听器，即移除 vm._events 对象上相关数据。
- 如果没有提供参数，则移除实例的所有事件监听
- 如果只提供了 event 参数，则移除实例上该事件的所有监听器
- 如果两个参数都提供了，则移除实例上该事件对应的监听器

## vm.$once(event, callback) 做了什么？
监听一个自定义事件，但是该事件只会被触发一次。一旦触发以后监听器就会被移除。
其内部的实现原理是：
- 包装用户传递的回调函数，当包装函数执行的时候，除了会执行用户回调函数之外还会执行 vm.$off(event, 包装函数) 移除该事件
- 用 vm.$on(event, 包装函数) 注册事件

## vm._update(vnode, hydrating) 做了什么？
官方文档没有说明该 API，这是一个用于源码内部的实例方法，负责更新页面，是页面渲染的入口，其内部根据是否存在 prevVnode 来决定是首次渲染，还是页面更新，从而在调用 __patch__ 函数时传递不同的参数。该方法在业务开发中不会用到。

## vm.$forceUpdate() 做了什么？
迫使 Vue 实例重新渲染，它仅仅影响组件实例本身和插入插槽内容的子组件，而不是所有子组件。其内部原理到也简单，就是直接调用 vm._watcher.update()，它就是 watcher.update() 方法，执行该方法触发组件更新。

## vm.$destroy() 做了什么？
负责完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令和事件监听器。在执行过程中会调用 beforeDestroy 和 destroy 两个钩子函数。在大多数业务开发场景下用不到该方法，一般都通过 v-if 指令来操作。其内部原理是：
- 调用 beforeDestroy 钩子函数
- 将自己从老爹肚子里（$parent）移除，从而销毁和老爹的关系
- 通过 watcher.teardown() 来移除依赖监听
- 通过 vm.__patch__(vnode, null) 方法来销毁节点
- 调用 destroyed 钩子函数
- 通过 vm.$off 方法移除所有的事件监听


## vm._render 做了什么？
官方文档没有提供该方法，它是一个用于源码内部的实例方法，负责生成 vnode。其关键代码就一行，执行 render 函数生成 vnode。不过其中加了大量的异常处理代码。

## 什么是Hook Event？
Hook Event是Vue的自定义事件结合生命周期钩子实现的一种从组件外部为组件注册额外生命周期的功能

## Hook Event 是如果实现的？
```html
<comp @hook:lifecycleMethod="method" />
```
- 处理组件自定义事件的时候(vm.$on)如果发现组件有`hook:xx`格式的事件(xx为Vue的生命周期)，则将`vm._hasHookEvent`置为`true`，表示该组件有Hook Event
- 在组件生命周期方法被触发的时候，内部会通过`callHook`方法来执行这些生命周期函数，在生命周期函数执行之后，如果发现`vm._hasHookEvent`为true，则表示当前组件有Hook Event，通过`vm.#emit('hook:xx')`触发Hook Event的执行

## 简单说一下 Vue 的编译器都做了什么？
Vue 的编译器做了三件事情：
- 将组件的 html 模版解析成 AST 对象
- 优化，遍历 AST，为每个节点做静态标记，标记其是否为静态节点，然后进一步标记出静态根节点，这样在后续更新的过程中就可以跳过这些静态节点了；标记静态根用于生成渲染函数阶段，生成静态根节点的渲染函数
- 从 AST 生成运行时的渲染函数，即大家说的 render，其实还有一个，就是 staticRenderFns 数组，里面存放了所有的静态节点的渲染函数

## 详细说一说编译器的解析过程，它是怎么将 html 字符串模版变成 AST 对象的？
- 遍历 HTML 模版字符串，通过正则表达式匹配 "<"
- 跳过某些不需要处理的标签，比如：注释标签、条件注释标签、Doctype。
  > 备注：整个解析过程的核心是处理开始标签和结束标签
- 解析开始标签
  - 得到一个对象，包括 标签名（tagName）、所有的属性（attrs）、标签在 html 模版字符串中的索引位置
  - 进一步处理上一步得到的 attrs 属性，将其变成 [{ name: attrName, value: attrVal, start: xx, end: xx }, ...] 的形式
  - 通过标签名、属性对象和当前元素的父元素生成 AST 对象，其实就是一个 普通的 JS 对象，通过 key、value 的形式记录了该元素的一些信息
  - 接下来进一步处理开始标签上的一些指令，比如 v-pre、v-for、v-if、v-once，并将处理结果放到 AST 对象上
  - 处理结束将 ast 对象存放到 stack 数组
  - 处理完成后会截断 html 字符串，将已经处理掉的字符串截掉
- 解析闭合标签
  - 如果匹配到结束标签，就从 stack 数组中拿出最后一个元素，它和当前匹配到的结束标签是一对。
  - 再次处理开始标签上的属性，这些属性和前面处理的不一样，比如：key、ref、scopedSlot、样式等，并将处理结果放到元素的 AST 对象上
  - 然后将当前元素和父元素产生联系，给当前元素的 ast 对象设置 parent 属性，然后将自己放到父元素的 ast 对象的 children 数组中
- 最后遍历完整个 html 模版字符串以后，返回 ast 对象

## 详细说一下静态标记的过程
- 标记静态节点
    - 通过递归的方式标记所有的元素节点
    - 如果节点本身是静态节点，但是存在非静态的子节点，则将节点修改为非静态节点
- 标记静态根节点，基于静态节点，进一步标记静态根节点
    - 如果节点本身是静态节点 && 而且有子节点 && 子节点不全是文本节点，则标记为静态根节点
    - 如果节点本身不是静态根节点，则递归的遍历所有子节点，在子节点中标记静态根

## 什么样的节点才可以被标记为静态节点？
- 文本节点
- 节点上没有 v-bind、v-for、v-if 等指令
- 非组件

## 一个组件是如何变成 VNode？
- 组件实例初始化，最后执行 $mount 进入挂载阶段
- 如果是只包含运行时的 vue.js，只直接进入挂载阶段，因为这时候的组件已经变成了渲染函数，编译过程通过模块打包器 + vue-loader + vue-template-compiler 完成的
- 如果没有使用预编译，则必须使用全量的 vue.js
- 挂载时如果发现组件配置项上没有 render 选项，则进入编译阶段
- 将模版字符串编译成 AST 语法树，其实就是一个普通的 JS 对象
- 然后优化 AST，遍历 AST 对象，标记每一个节点是否为静态静态；然后再进一步标记出静态根节点，在组件后续更新时会跳过这些静态节点的更新，以提高性能
- 接下来从 AST 生成渲染函数，生成的渲染函数有两部分组成：
  - 负责生成动态节点 VNode 的 render 函数
  - 还有一个 staticRenderFns 数组，里面每一个元素都是一个生成静态节点 VNode 的函数，这些函数会作为 render 函数的组成部分，负责生成静态节点的 VNode
- 接下来将渲染函数放到组件的配置对象上，进入挂载阶段，即执行 mountComponent 方法
- 最终负责渲染组件和更新组件的是一个叫 updateComponent 方法，该方法每次执行前首先需要执行 vm._render 函数，该函数负责执行编译器生成的 render，得到组件的 VNode
- 将一个组件生成 VNode 的具体工作是由 render 函数中的 _c、_o、_l、_m 等方法完成的，这些方法都被挂载到 Vue 实例上面，负责在运行时生成组件 VNode

>提示：到这里首先要明白什么是 VNode，一句话描述就是 —— 组件模版的 JS 对象表现形式，它就是一个普通的 JS 对象，详细描述了组件中各节点的信息


>下面说的有点多，其实记住一句就可以了，设置组件配置信息，然后通过 new VNode(组件信息) 生成组件的 VNode

- _c，负责生成组件或 HTML 元素的 VNode，_c 是所有 render helper 方法中最复杂，也是最核心的一个方法，其它的 _xx 都是它的组成部分
  - 接收标签、属性 JSON 字符串、子节点数组、节点规范化类型作为参数
  - 如果标签是平台保留标签或者一个未知的元素，则直接 new VNode(标签信息) 得到 VNode
  - 如果标签是一个组件，则执行 createComponent 方法生成 VNode
  - 函数式组件执行自己的 render 函数生成 VNode
  - 普通组件则实例化一个 VNode，并且在在 data.hook 对象上设置 4 个方法，在组件的 patch 阶段会被调用，从而进入子组件的实例化、挂载阶段，然后进行编译生成渲染函数，直至完成渲染
  - 当然生成 VNode 之前会进行一些配置处理比如：
    - 子组件选项合并，合并全局配置项到组件配置项上
    - 处理自定义组件的 v-model
    - 处理组件的 props，提取组件的 props 数据，以组件的 props 配置中的属性为 key，父组件中对应的数据为 value 生成一个 propsData 对象；当组件更新时生成新的 VNode，又会进行这一步，这就是 props 响应式的原理
    - 处理其它数据，比如监听器
    - 安装内置的 init、prepatch、insert、destroy 钩子到 data.hooks 对象上，组件 patch 阶段会用到这些钩子方法

- _l，运行时渲染 v-for 列表的帮助函数，循环遍历 val 值，依次为每一项执行 render 方法生成 VNode，最终返回一个 VNode 数组
- _m，负责生成静态节点的 VNode，即执行 staticRenderFns 数组中指定下标的函数

简单总结 render helper 的作用就是：在 Vue 实例上挂载一些运行时的工具方法，这些方法用在编译器生成的渲染函数中，用于生成组件的 VNode

## 你能说一说 Vue 的 patch 算法吗？
Vue 的 patch 算法有三个作用：负责首次渲染和后续更新或者销毁组件
  - 如果老的 VNode 是真实元素，则表示首次渲染，创建整棵 DOM 树，并插入 body，然后移除老的模版节点
  - 如果老的 VNode 不是真实元素，并且新的 VNode 也存在，则表示更新阶段，执行 patchVnode
    - 首先是全量更新所有的属性
    - 如果新老 VNode 都有孩子，则递归执行 updateChildren，进行 diff 过程
      >针对前端操作 DOM 节点的特点进行如下优化：

      - 同层比较（降低时间复杂度）深度优先（递归）
      - 而且前端很少有完全打乱节点顺序的情况，所以做了四种假设，假设新老 VNode 的开头结尾存在相同节点，一旦命中假设，就避免了一次循环，降低了 diff 的时间复杂度，提高执行效率。如果不幸没有命中假设，则执行遍历，从老的 VNode 中找到新的 VNode 的开始节点
      - 找到相同节点，则执行 patchVnode，然后将老节点移动到正确的位置
    - 如果老的 VNode 先于新的 VNode 遍历结束，则剩余的新的 VNode 执行新增节点操作
    - 如果新的 VNode 先于老的 VNode 遍历结束，则剩余的老的 VNode 执行删除操纵，移除这些老节点
    - 如果新的 VNode 有孩子，老的 VNode 没孩子，则新增这些新孩子节点
    - 如果老的 VNode 有孩子，新的 VNode 没孩子，则删除这些老孩子节点
    - 剩下一种就是更新文本节点
  - 如果新的 VNode 不存在，老的 VNode 存在，则调用 destroy，销毁老节点




## 详细说一下渲染函数的生成过程
其实编译器生成的渲染有两类：
- 第一类就是一个 render 函数，负责生成动态节点的 vnode
- 第二类是放在一个叫 staticRenderFns 数组中的静态渲染函数，这些函数负责生成静态节点的 vnode

渲染函数生成的过程，其实就是在遍历 AST 节点，通过递归的方式，处理每个节点，最后生成形如：_c(tag, attr, children, normalizationType) 的结果。tag 是标签名，attr 是属性对象，children 是子节点组成的数组，其中每个元素的格式都是 _c(tag, attr, children, normalizationTYpe) 的形式，normalization 表示节点的规范化类型，是一个数字 0、1、2，不重要。
在处理 AST 节点过程中需要大家重点关注也是面试中常见的问题有：
- 静态节点是怎么处理的
  静态节点的处理分为两步：
    - 将生成静态节点 vnode 函数放到 staticRenderFns 数组中
    - 返回一个 _m(idx) 的可执行函数，意思是执行 staticRenderFns 数组中下标为 idx 的函数，生成静态节点的 vnode

- v-once、v-if、v-for、组件 等都是怎么处理的
  - 单纯的 v-once 节点处理方式和静态节点一致
  - v-if 节点的处理结果是一个三元表达式
  - v-for 节点的处理结果是可执行的 _l 函数，该函数负责生成 v-for 节点的 vnode
  - 组件的处理结果和普通元素一样，得到的是形如 _c(compName) 的可执行代码，生成组件的 vnode



## Vue3比Vue2有什么优势
- 性能更好
- 体积更小
- 更好的ts支持
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能

## Composition API带了什么
- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导

## ref为何需要.value
- ref是一个响应式对象(不丢失响应式)，value存储值
- 通过.value属性的get和set实现响应式
- 用于模板，reactive时，不需要.value，其他情况都需要


## 为何需要toRef和toRefs
- 初衷:不丢失响应式的情况下，把对象数据 分解/扩散
- 前提:针对的是响应式(reactive封装的)非普通对象
- 注意:不创造响应式，而是延续响应式

## ref、toRef、toRefs
- ref本质是拷贝，修改响应式数据不会影响原数据；toRef的本质是引用关系，修改响应式数据会影响原始数据
- ref数据发生改变，界面会自动更新；toRef当数据发生改变时，界面不会自动更新
- toRef传参与ref不同；toRef接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性
- toRefs接收一个对象作为参数，它会遍历对象身上的所有属性，然后挨个调用toRef执行

## Vue3升级了哪些重要功能
- createApp
- emits属性
- 生命周期
- 多事件
- Fragment
- 移除.sync
- 异步组件的写法
- 移除filter
- Teleport
- Suspense
- Composition Api

## watch和watchEffect的区别
- 两者都可以监听data属性变化
- watch需要明确监听哪个属性
- watchEffect会根据其中的属性，自动监听其变化

## Vue3为何比Vue2快
- Proxy响应式
- PatchFlag(静态标记)
- hoistStatic(静态提升) 
- cacheHandle(缓存事件)
- SSR优化
- tree-shaking

### PatchFlag
- 编译模板时，动态节点做标记
- 标记，分为不同的类型，如TEXT PROPS
- diff算法时，可以区分静态节点，以及不同类型的动态节点

### hoistStatic
- 将静态节点的定义，提升到父作用域，缓存起来
- 多个相邻的静态节点，会被合并起来
- 典型的拿空间换时间的优化策略



