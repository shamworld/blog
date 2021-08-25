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

## vue 组件跟新之后如何获取最新的 dom

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

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里，尽行 tab 切换，这个时候`component`组件就很有用了。

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



