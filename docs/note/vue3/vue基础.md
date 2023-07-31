# Vue 基础

## v-show 和 v-if 的区别

- v-show 通过 CSS display 控制显示和隐藏
- v-if 组件真正的渲染和销毁，而不是显示和隐藏
- 频繁切换显示状态的时候用 v-show，否则用 v-if

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

- 如果避免出现这种情况，则在外层嵌套 template（页面渲染不生成 dom 节点），在这一层进行 v-if 判断，然后在内部进行 v-for 循环

- 如果条件出现在循环内部，可通过计算属性 computed 提前过滤掉那些不需要显示的项

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

slot 又名插槽，是 Vue 的内容分发机制，组件内部的模板引擎使用
slot 元素作为承载分发内容的出口。插槽 slot 是子组件的一个模板
标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决
定的。slot 又分三类，默认插槽，具名插槽和作用域插槽。

默认插槽：又名匿名插槽，当 slot 没有指定 name 属性值的时候一个
默认显示插槽，一个组件内只有有一个匿名插槽。

具名插槽：带有具体名字的插槽，也就是带有 name 属性的 slot，一
个组件可以出现多个具名插槽。

作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也
可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可
以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过
来的数据决定如何渲染该插槽。

实现原理：当子组件 vm 实例化时，获取到父组件传入的 slot 标签的
内容，存放在 vm.$slot 中，默认插槽为 vm.$slot.default，具名插
槽为 vm.$slot.xxx，xxx 为插槽名，当组件执行渲染函数时候，遇
到 slot 标签，使用$slot 中的内容进行替换，此时可以为插槽传递
数据，若存在数据，则可称该插槽为作用域插槽

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
      具名插槽
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
- ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

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

## Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

不会立即同步执行重新渲染。Vue 实现响应式并不是数据发生变化之
后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。Vue 在更新
DOM 时是异步执行的。只要侦听到数据变化， Vue 将开启一个队列，
并缓冲在同一事件循环中发生的所有数据变更。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在
缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要
的。然后，在下一个的事件循环 tick 中，Vue 刷新队列并执行实际
（已去重的）工作

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

vue 中 key 值的作用可以分为两种情况来考虑：

第一种情况是 v-if 中使用 key。由于 Vue 会尽可能高效地渲染元
素，通常会复用已有元素而不是从头开始渲染。因此当使用 v-if 来
实现元素切换的时候，如果切换前后含有相同类型的元素，那么这个
元素就会被复用。如果是相同的 input 元素，那么切换前后用户的
输入不会被清除掉，这样是不符合需求的。因此可以通过使用 key 来
唯一的标识一个元素，这个情况下，使用 key 的元素不会被复用。
这个时候 key 的作用是用来标识一个独立的元素。

第二种情况是 v-for 中使用 key。用 v-for 更新已渲染过的元素列
表时，它默认使用“就地复用”的策略。如果数据项的顺序发生了改
变，Vue 不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此
处的每个元素。因此通过为每个列表项提供一个 key 值，来以便 Vue
跟踪元素的身份，从而高效的实现复用。这个时候 key 的作用是为
了高效的更新渲染虚拟 DOM。

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，diff 操作可
以更准确、更快速

更准确：因为带 key 就不是就地复用了，在 sameNode 函数 a.key
=== b.key 对比中可以避免就地复用的情况。所以会更加准确。

更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历
方式更快

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

## Vue 模版编译原理

vue 中的模板 template 无法被浏览器解析并渲染，因为这不属于浏
览器的标准，不是正确的 HTML 语法，所有需要将 template 转化成一
个 JavaScript 函数，这样浏览器就可以执行这一个函数并渲染出对
应的 HTML 元素，就可以让视图跑起来了，这一个转化的过程，就成
为模板编译。模板编译又分三个阶段，解析 parse，优化 optimize，
生成 generate，最终生成可执行函数 render。

解析阶段：使用大量的正则表达式对 template 字符串进行解析，将
标签、指令、属性等转化为抽象语法树 AST。

优化阶段：遍历 AST，找到其中的一些静态节点并进行标记，方便在
页面重渲染的时候进行 diff 比较时，直接跳过这一些静态节点，优
化 runtime 的性能。

生成阶段：将最终的 AST 转化为 render 函数字符串。

## Vue 组件是如何渲染和更新的

### 初次渲染过程

- 解析模板为 render 函数
- 触发响应式，监听 data 属性 getter setter
- 执行 render 函数，生产 vnode，patch(elem,vnode)

### 更新过程

- 修改 data，触发 setter(此前在 getter 中已被监听)
- 重新执行 render 函数，生成 vnode
- patch(vnode,newVnode)

![](/vue3/a049d147.jpg)

模板编译完成生成 render 函数,生成一个 vnode，执行 vnode 的时候会触发 data 里面的 getter，生成依赖，在模板里面触发了哪个 getter 就会通过 Watcher 把他观察起来；修改 data 的 setter 的时候通知 Watcher，判断是否是之前被观察起来的，如果是之前被观察起来的就会重新触发 re-render 重新渲染，patch。

## 路由 hash 的特点

- hash 变化触发网页跳转，即浏览器的前进，后退
- hash 变化不会刷新页面，SPA 必须的特点
- hash 永远不会提交到 server 端(前端自生自灭)

## 路由 history 特点

- 用 url 规范的路由，但跳转时不刷新页面
- history.pushState
- window.onpopstate

## Vue 常见的性能优化

- 合理使用 v-if 和 v-show
- 合理使用 computed
- v-for 时加 key，以及避免和 v-if 同时使用
- 自定义事件，dom 事件及时销毁
- 合理使用异步组件
- 合理使用 keep-alive
- data 层级不要太深
- 使用 vue-loader 在开发环境做模板编译
- webpack 层面的优化
- 前端通用的性能优化，如图片懒加载
- 使用 SSR

## Vue 原理

### Vue 的初始化过程（new Vue(options)）都做了什么？

- 处理组件配置项
  - 初始化根组件时进行了选项合并操作，将全局配置合并到根组件的局部配置上
  - 初始化每个子组件时做了一些性能优化，将组件配置对象上的一些深层次属性放到 vm.\$options 选项中，以提高代码的执行效率
- 初始化组件实例的关系属性，比如$parent、$children、$root、$refs 等
- 处理自定义事件
- 调用 beforeCreate 钩子函数
- 初始化组件的 inject 配置项，得到`ret[key]=val`形式的配置对象，然后对该配置对象进行响应式处理，并代理每个 key 到 vm 实例上
- 数据响应式，处理 props、methods、data、computed、watch 等选项
- 解析组件配置项上的 provide 对象，将其挂载到 vm.\_provided 属性上
- 调用 create 钩子函数
- 如果发现配置选项上有 el 选项，则自动调用$mount方法，也就是说有了el选项，就不需要在手动调用$mount 方法，反之，没提供 el 选项则必须调用\$mount
- 接下来进入挂载阶段

## Vue2.x 双向数据绑定原理怎么实现的?

- 响应式的核心是通过 Object.defineProperty 拦截对数据的访问和设置
- 响应式的数据分为两类：
  - 对象，循环遍历对象的所有属性，为每个属性设置 getter、setter，以达到拦截访问和设置的目的，如果属性值依旧为对象，则递归为属性值上的每个 key 设置 getter、setter
    - 访问数据时（obj.key)进行依赖收集，在 dep 中存储相关的 watcher
    - 设置数据时由 dep 通知相关的 watcher 去更新
  - 数组，增强数组的那 7 个可以更改自身的原型方法，然后拦截对这些方法的操作
    - 添加新数据时进行响应式处理，然后由 dep 通知 watcher 去更新
    - 删除数据时，也要由 dep 通知 watcher 去更新

## methods、computed 和 watch 有什么区别

- 使用场景
  - methods 一般用于封装一些较为复杂的处理逻辑(同步，异步)
  - computed 一般用于封装一些简单的同步逻辑，将经过处理的数据返回，然后显示在模板中，以减轻模板的重量
  - watch 一般用于当需要在数据变化时执行异步或开销较大的操作
- 区别

  - methods 和 computed
    > 如果在一次渲染中，有多个地方使用了同一个 methods 或 computed 属性，methods 会被执行多次，而 computed 的回调函数则只会执行一次

  > 通过源码我们知道，在一次渲染中，多次访问 computedProperty，之后会在第一次执行 computed 属性的回调函数，后续的其他访问，则直接使用第一次执行结果(watcher.value)，而这一切的实现原理则是通过对 watcher.dirty 属性控制实现的。而 methods，每一次的访问则是简单的方法调用

  - computed 和 watch
    > 通过源码阅读我们知道，computed 和 watch 的本质是一样的，内部都是通过 Watcher 来实现的，其实没什么区别，非要说区别的话就两点:1.使用场景上的区别，2.computed 默认是懒执行的，切不可更改
  - methods 和 watch
    > methods 和 watch 之间其实没什么可比的，完全是两个东西，不过在使用上可以把 watch 中一些逻辑抽到 methods 中，提高代码的可读性。

## Vue 的异步更新机制是如何实现的？

Vue 的异步更新机制的核心是利用浏览器的异步任务队列来实现的，首先选取微任务队列，宏任务队列次之。

当响应式数据更新后，会调用 dep.notify()，通知 dep 中的收集 watcher 去执行 update 方法，watcher.update 将 watcher 自己放入一个 watcher 队列(全局的 queue 数组)。

然后通过 nextTick 方法将一个刷新 watcher 队列的方法(flushSchedulerQueue)放入一个全局的 callbacks 数组中。

如果此时浏览器的异步任务队列中没有一个叫 flushCallbacks 的函数，则执行 timerFunc 函数，将 flushCallbacks 函数放入异步队列。如果异步任务队列中已经存在 flushCallbacks 函数，等待其执行完成以后再次放入下一个 flushCallbacks 函数。

flushCallbacks 函数负责执行 callbacks 数组中的所有 flushSchedulerQueue 函数。

flushSchedulerQueue 函数负责刷新 watcher 队列，即执行 queue 数组中每个 watcher 的 run 方法，从而进入更新阶段，比如执行组件更新函数或者执行用户 watch 的回调函数。

<!--
## Vue 的 nextTick API 是如何实现的？

Vue.nextTick 或者 vm.\$nextTick 的原理其实很简单，就做了两件事：

- 将传递的回调函数用 try catch 包裹然后放入 callbacks 数组
- 执行 timerFunc 函数，在浏览器的异步任务队列放入一个刷新 callbacks 数组的函数 -->

<!-- ## Vue.use(plugin) 做了什么？
负责安装plugin插件，其实就是执行提供的install方法。
- 首先判断该插件是否已经安装过了
- 如果没有，则执行插件提供的install方法来安装插件，具体做什么由插件自己决定 -->

<!-- ## Vue.mixin(options) 做了什么？
负责在Vue的全局配置上合并options配置，然后在每个组件生成vnode时会将全局配置合并到组件自身的配置上来。
- 标准化options对象上的props、inject、directive选项的格式
- 处理options上的extends和mixins，分别将他们合并到全局配置上
- 然后将options配置和全局配置进行合并，选项冲突时options配置会覆盖全局配置 -->

## Vue.component(compName, Comp) 做了什么？

负责注册全局组件。其实就是将组件配置注册到全局配置的 components 选项上(options.components)，然后各个子组件在生成 vnode 时会将全局的 components 选项合并到局部的 components 配置项上。

- 如果第二个参数为空，则表示获取 compName 的组件构造函数
- 如果 Comp 是组件配置对象，则使用 Vue.extend 方法得到组件构造函数，否则直接进行下一步
- 在全局配置上设置组件信息,`this.options.components.compName=CompConstructor`

<!-- ## Vue.directive('my-directive', {xx}) 做了什么？
在全局注册 my-directive 指令，然后每个子组件在生成 vnode 时会将全局的 directives 选项合并到局部的 directives 选项中。原理同 Vue.component 方法：
- 如果第二个参数为空，则获取指定指令的配置对象
- 如果不为空，如果第二个参数是一个函数的话，则生成配置对象 { bind: 第二个参数, update: 第二个参数 }
- 然后将指令配置对象设置到全局配置上，this.options.directives`['my-directive'] = {xx}` -->
<!--
## Vue.filter('my-filter', function(val) {xx}) 做了什么？
负责在全局注册过滤器 my-filter，然后每个子组件在生成 vnode 时会将全局的 filters 选项合并到局部的 filters 选项中。原理是：
- 如果没有提供第二个参数，则获取 my-filter 过滤器的回调函数
- 如果提供了第二个参数，则是设置 `this.options.filters['my-filter'] = function(val) {xx}`。

## Vue.extend(options) 做了什么？
Vue.extend 基于 Vue 创建一个子类，参数 options 会作为该子类的默认全局配置，就像 Vue 的默认全局配置一样。所以通过 Vue.extend 扩展一个子类，一大用处就是内置一些公共配置，供子类的子类使用。
- 定义子类构造函数，这里和 Vue 一样，也是调用 _init(options)
- 合并 Vue 的配置和 options，如果选项冲突，则 options 的选项会覆盖 Vue 的配置项
- 给子类定义全局 API，值为 Vue 的全局 API，比如 Sub.extend = Super.extend，这样子类同样可以扩展出其它子类 -->

- 返回子类 Sub

## Vue.set(target, key, val) 做了什么

由于 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')，所以通过 Vue.set 为向响应式对象中添加一个 property，可以确保这个新 property 同样是响应式的，且触发视图更新。

- 更新数组指定下标的元素：`Vue.set(array, idx, val)`，内部通过 splice 方法实现响应式更新
- 更新对象已有属性：`Vue.set(obj, key ,val)`，直接更新即可 => `obj[key] = val`
- 不能向 Vue 实例或者 \$data 动态添加根级别的响应式数据
- `Vue.set(obj, key, val)`，如果 obj 不是响应式对象，会执行 `obj[key] = val`，但是不会做响应式处理
- `Vue.set(obj, key, val)`，为响应式对象 obj 增加一个新的 key，则通过 defineReactive 方法设置响应式，并触发依赖更新

## Vue.delete(target, key) 做了什么？

删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。当然同样不能删除根级别的响应式属性。

- `Vue.delete(array, idx)`，删除指定下标的元素，内部是通过 splice 方法实现的
- 删除响应式对象上的某个属性：`Vue.delete(obj, key)`，内部是执行 delete obj.key，然后执行依赖更新即可

## Vue.nextTick(cb) 做了什么？

Vue.nextTick(cb) 方法的作用是延迟回调函数 cb 的执行，一般用于 this.key = newVal 更改数据后，想立即获取更改过后的 DOM 数据：

```js
this.key = "new val";

Vue.nextTick(function() {
  // DOM 更新了
});
```

其内部的执行过程是：

- `this.key = 'new val'`，触发依赖通知更新，将负责更新的 watcher 放入 watcher 队列
- 将刷新 watcher 队列的函数放到 callbacks 数组中
- 在浏览器的异步任务队列中放入一个刷新 callbacks 数组的函数
- `Vue.nextTick(cb)` 来插队，将 cb 函数放入 callbacks 数组
- 待将来的某个时刻执行刷新 callbacks 数组的函数
- 然后执行 callbacks 数组中的众多函数，触发 watcher.run 的执行，更新 DOM
- 由于 cb 函数是在后面放到 callbacks 数组，所以这就保证了先完成的 DOM 更新，再执行 cb 函数

## vm.\$watch(expOrFn, callback, [options]) 做了什么？

vm.\$watch 负责观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。当其发生变化时，回调函数就会被执行，并为回调函数传递两个参数，第一个为更新后的新值，第二个为老值。

这里需要 注意 一点的是：如果观察的是一个对象，比如：数组，当你用数组方法，比如 push 为数组新增一个元素时，回调函数被触发时传递的新值和老值相同，因为它们指向同一个引用，所以在观察一个对象并且在回调函数中有新老值是否相等的判断时需要注意。
vm.\$watch 的第一个参数只接收简单的响应式数据的键路径，对于更复杂的表达式建议使用函数作为第一个参数。

至于 vm.\$watch 的内部原理是：

- 设置 options.user = true，标志是一个用户 watcher
- 实例化一个 Watcher 实例，当检测到数据更新时，通过 watcher 去触发回调函数的执行，并传递新老值作为回调函数的参数
- 返回一个 unwatch 函数，用于取消观察

<!--
## vm.$on(event, callback) 做了什么？
监听当前实例上的自定义事件，事件可由 vm.$emit 触发，回调函数会接收所有传入事件触发函数（vm.$emit）的额外参数。

vm.$on 的原理很简单，就是处理传递的 event 和 callback 两个参数，将注册的事件和回调函数以键值对的形式存储到 vm._event 对象中，vm._events = { eventName: [cb1, cb2, ...], ... }。 -->

<!-- ## vm.$emit(eventName, [...args]) 做了什么？

触发当前实例上的指定事件，附加参数都会传递给事件的回调函数。

其内部原理就是执行 vm._events[eventName] 中所有的回调函数 -->

<!-- ## vm.$off([event, callback]) 做了什么？
移除自定义事件监听器，即移除 vm._events 对象上相关数据。
- 如果没有提供参数，则移除实例的所有事件监听
- 如果只提供了 event 参数，则移除实例上该事件的所有监听器
- 如果两个参数都提供了，则移除实例上该事件对应的监听器 -->

<!-- ## vm.$once(event, callback) 做了什么？
监听一个自定义事件，但是该事件只会被触发一次。一旦触发以后监听器就会被移除。
其内部的实现原理是：
- 包装用户传递的回调函数，当包装函数执行的时候，除了会执行用户回调函数之外还会执行 vm.$off(event, 包装函数) 移除该事件
- 用 vm.$on(event, 包装函数) 注册事件

## vm._update(vnode, hydrating) 做了什么？
官方文档没有说明该 API，这是一个用于源码内部的实例方法，负责更新页面，是页面渲染的入口，其内部根据是否存在 prevVnode 来决定是首次渲染，还是页面更新，从而在调用 __patch__ 函数时传递不同的参数。该方法在业务开发中不会用到。

## vm.$forceUpdate() 做了什么？
迫使 Vue 实例重新渲染，它仅仅影响组件实例本身和插入插槽内容的子组件，而不是所有子组件。其内部原理到也简单，就是直接调用 vm._watcher.update()，它就是 watcher.update() 方法，执行该方法触发组件更新。 -->

## vm.\$destroy() 做了什么？

负责完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令和事件监听器。在执行过程中会调用 beforeDestroy 和 destroy 两个钩子函数。在大多数业务开发场景下用不到该方法，一般都通过 v-if 指令来操作。其内部原理是：

- 调用 beforeDestroy 钩子函数
- 将自己从父组件（\$parent）移除，从而销毁和父组件的关系
- 通过 watcher.teardown() 来移除依赖监听
- 通过 vm.**patch**(vnode, null) 方法来销毁节点
- 调用 destroyed 钩子函数
- 通过 vm.\$off 方法移除所有的事件监听

<!-- ## vm.\_render 做了什么？

官方文档没有提供该方法，它是一个用于源码内部的实例方法，负责生成 vnode。其关键代码就一行，执行 render 函数生成 vnode。不过其中加了大量的异常处理代码。

## 什么是 Hook Event？

Hook Event 是 Vue 的自定义事件结合生命周期钩子实现的一种从组件外部为组件注册额外生命周期的功能 -->

## Hook Event 是如果实现的？

```html
<comp @hook:lifecycleMethod="method" />
```

- 处理组件自定义事件的时候(vm.\$on)如果发现组件有`hook:xx`格式的事件(xx 为 Vue 的生命周期)，则将`vm._hasHookEvent`置为`true`，表示该组件有 Hook Event
- 在组件生命周期方法被触发的时候，内部会通过`callHook`方法来执行这些生命周期函数，在生命周期函数执行之后，如果发现`vm._hasHookEvent`为 true，则表示当前组件有 Hook Event，通过`vm.#emit('hook:xx')`触发 Hook Event 的执行

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

- 组件实例初始化，最后执行 \$mount 进入挂载阶段
- 如果是只包含运行时的 vue.js，只直接进入挂载阶段，因为这时候的组件已经变成了渲染函数，编译过程通过模块打包器 + vue-loader + vue-template-compiler 完成的
- 如果没有使用预编译，则必须使用全量的 vue.js
- 挂载时如果发现组件配置项上没有 render 选项，则进入编译阶段
- 将模版字符串编译成 AST 语法树，其实就是一个普通的 JS 对象
- 然后优化 AST，遍历 AST 对象，标记每一个节点是否为静态静态；然后再进一步标记出静态根节点，在组件后续更新时会跳过这些静态节点的更新，以提高性能
- 接下来从 AST 生成渲染函数，生成的渲染函数有两部分组成：
  - 负责生成动态节点 VNode 的 render 函数
  - 还有一个 staticRenderFns 数组，里面每一个元素都是一个生成静态节点 VNode 的函数，这些函数会作为 render 函数的组成部分，负责生成静态节点的 VNode
- 接下来将渲染函数放到组件的配置对象上，进入挂载阶段，即执行 mountComponent 方法
- 最终负责渲染组件和更新组件的是一个叫 updateComponent 方法，该方法每次执行前首先需要执行 vm.\_render 函数，该函数负责执行编译器生成的 render，得到组件的 VNode
- 将一个组件生成 VNode 的具体工作是由 render 函数中的 \_c、\_o、\_l、\_m 等方法完成的，这些方法都被挂载到 Vue 实例上面，负责在运行时生成组件 VNode

> 提示：到这里首先要明白什么是 VNode，一句话描述就是 —— 组件模版的 JS 对象表现形式，它就是一个普通的 JS 对象，详细描述了组件中各节点的信息

> 设置组件配置信息，然后通过 new VNode(组件信息) 生成组件的 VNode

- \_c，负责生成组件或 HTML 元素的 VNode，\_c 是所有 render helper 方法中最复杂，也是最核心的一个方法，其它的 \_xx 都是它的组成部分

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

- \_l，运行时渲染 v-for 列表的帮助函数，循环遍历 val 值，依次为每一项执行 render 方法生成 VNode，最终返回一个 VNode 数组
- \_m，负责生成静态节点的 VNode，即执行 staticRenderFns 数组中指定下标的函数

简单总结 render helper 的作用就是：在 Vue 实例上挂载一些运行时的工具方法，这些方法用在编译器生成的渲染函数中，用于生成组件的 VNode

## 你能说一说 Vue 的 patch 算法吗？

Vue 的 patch 算法有三个作用：负责首次渲染和后续更新或者销毁组件

- 如果老的 VNode 是真实元素，则表示首次渲染，创建整棵 DOM 树，并插入 body，然后移除老的模版节点
- 如果老的 VNode 不是真实元素，并且新的 VNode 也存在，则表示更新阶段，执行 patchVnode

  - 首先是全量更新所有的属性
  - 如果新老 VNode 都有孩子，则递归执行 updateChildren，进行 diff 过程

    > 针对前端操作 DOM 节点的特点进行如下优化：

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

渲染函数生成的过程，其实就是在遍历 AST 节点，通过递归的方式，处理每个节点，最后生成形如：\_c(tag, attr, children, normalizationType) 的结果。tag 是标签名，attr 是属性对象，children 是子节点组成的数组，其中每个元素的格式都是 \_c(tag, attr, children, normalizationTYpe) 的形式，normalization 表示节点的规范化类型，是一个数字 0、1、2，不重要。
在处理 AST 节点过程中需要大家重点关注也是面试中常见的问题有：

- 静态节点是怎么处理的
  静态节点的处理分为两步：

  - 将生成静态节点 vnode 函数放到 staticRenderFns 数组中
  - 返回一个 \_m(idx) 的可执行函数，意思是执行 staticRenderFns 数组中下标为 idx 的函数，生成静态节点的 vnode

- v-once、v-if、v-for、组件 等都是怎么处理的
  - 单纯的 v-once 节点处理方式和静态节点一致
  - v-if 节点的处理结果是一个三元表达式
  - v-for 节点的处理结果是可执行的 \_l 函数，该函数负责生成 v-for 节点的 vnode
  - 组件的处理结果和普通元素一样，得到的是形如 \_c(compName) 的可执行代码，生成组件的 vnode

## history 和 hash 模式的区别是什么?

- 格式不同
- 部署方式不同，history 需要服务端增加 fallback 到 index.html 的配置
- history 对 SEO 更加友好

## Vue dev 模式下为什么不需要配置 history fallback?

webpack-dev-server 中配置了 historyApiFallback，通过 rewrites 属性设定了 fallback 到 index.html 的逻辑

## 我们并没有定义 router-link 和 router-view，为什么代码里能直接使用?

app.use(router)时调用 vue-router 插件，其中主要做了三件事:

- 定义 router-view 和 router-link 组件
- 在 vue 实例上挂载了$router和$route 属性
- 通过 provide 特性向组件透传了 currentRoute 等属性

## 浏览器中如何实现 URL 变化但页面不刷新?

push 底层过程中调用了 window.history.pushState 和 window.history.replaceState，确保了 URL 变化但页面不会刷新

## vue-router 如何实现路由匹配?

- createRouter 时通过 createRouterMather 生成 Matcher 对象，确定了每个路由对应的正在表达式
- 路由跳转时会调用 push 方法，该方法中会调用 resolve 方法，该方法中会将当前页面路由和正则表达式进行匹配，并获得匹配到的路由 Matcher 对象

## router-view 如何实现组件动态渲染?

- 通过 inject 获取 currentRoute
- 通过 currentRoute 中的 Matcher 获取需要渲染的组件
- 通过 vue3 的 h 函数动态渲染组件

## Vue3 比 Vue2 有什么优势

- 性能更好
- 体积更小
- 更好的 ts 支持
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能

## Composition API 带了什么

- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导

## ref 为何需要.value

- ref 是一个响应式对象(不丢失响应式)，value 存储值
- 通过.value 属性的 get 和 set 实现响应式
- 用于模板，reactive 时，不需要.value，其他情况都需要

## 为何需要 toRef 和 toRefs

- 初衷:不丢失响应式的情况下，把对象数据 分解/扩散
- 前提:针对的是响应式(reactive 封装的)非普通对象
- 注意:不创造响应式，而是延续响应式

## ref、toRef、toRefs

- ref 本质是拷贝，修改响应式数据不会影响原数据；toRef 的本质是引用关系，修改响应式数据会影响原始数据
- ref 数据发生改变，界面会自动更新；toRef 当数据发生改变时，界面不会自动更新
- toRef 传参与 ref 不同；toRef 接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性
- toRefs 接收一个对象作为参数，它会遍历对象身上的所有属性，然后挨个调用 toRef 执行

## Vue3 升级了哪些重要功能

- createApp
- emits 属性
- 生命周期
- 多事件
- Fragment
- 移除.sync
- 异步组件的写法
- 移除 filter
- Teleport
- Suspense
- Composition Api

## Vue3.0 有什么更新

- （1）监测机制的改变
  3.0 将带来基于代理 Proxy 的 observer 实现，提供全语言覆盖的
  反应性跟踪。

消除了 Vue 2 当中基于 Object.defineProperty 的实现所存在的很多限制：

- （2）只能监测属性，不能监测对象
  > - 检测属性的添加和删除；
  > - 检测数组索引和长度的变更；
  > - 支持 Map、Set、WeakMap 和 WeakSet。
- （3）模板
  作用域插槽，2.x 的机制导致作用域插槽变了，父组件会重新渲染，
  而 3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重
  新渲染，提升了渲染的性能。

同时，对于 render 函数的方面，vue3.0 也会进行一系列更改来方
便习惯直接使用 api 来生成 vdom 。

- （4）对象式的组件声明方式
  vue2.x 中 的 组 件 是 通 过 声 明 的 方 式 传 入 一 系 列 option， 和
  TypeScript 的结合需要通过一些装饰器的方式来做，虽然能实现功
  能，但是比较麻烦。

  3.0 修改了组件的声明方式，改成了类式的写法，这样使得和
  TypeScript 的结合变得很容易
  （5）其它方面的更改
  支持自定义渲染器，从而使得 weex 可以通过自定义渲染器的方式来
  扩展，而不是直接 fork 源码来改的方式。

支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组
建内容）组件，针对一些特殊的场景做了处理。

基于 tree shaking 优化，提供了更多的内置功能。

## defineProperty 和 proxy 的区别

Vue 在 实 例 初 始 化 时 遍 历 data 中 的 所 有 属 性 ， 并 使 用
Object.defineProperty 把这些属性全部转为 getter/setter。这样
当追踪数据发生变化时，setter 会被自动调用。

Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就
是 Vue 不支持 IE8 以及更低版本浏览器的原因。

但是这样做有以下问题：

- 添加或删除对象的属性时，Vue 检测不到。因为添加或删除的对象
  没 有 在 初 始 化 进 行 响 应 式 处 理 ， 只 能 通 过 \$set 来 调 用
  Object.defineProperty()处理。
- 无法监控到数组下标和长度的变化。
  Vue3 使用 Proxy 来监控数据的变化。Proxy 是 ES6 中提供的功能，
  其作用为：用于定义基本操作的自定义行为（如属性查找，赋值，枚
  举，函数调用等）。相对于 Object.defineProperty()，其有以下特
  点：
  > - Proxy 直接代理整个对象而非对象属性，这样只需做一层代理就可
  >   以监听同级结构下的所有属性变化，包括新增属性和删除属性。
  > - Proxy 可以监听数组的变化。

## Vue3.0 为什么要用 proxy？

在 Vue2 中， 0bject.defineProperty 会改变原始数据，而 Proxy
是创建对象的虚拟表示，并提供 set 、get 和 deleteProperty 等
处理器，这些处理器可在访问或修改原始对象上的属性时进行拦截，
有以下特点 ∶

- 不需用使用 Vue.$set 或 Vue.$delete 触发响应式。
- 全方位的数组变化检测，消除了 Vue2 无效的边界情况。
- 支持 Map，Set，WeakMap 和 WeakSet。

Proxy 实现的响应式原理与 Vue2 的实现原理相同，实现方式大同小异 ∶

- get 收集依赖
- Set、delete 等触发依赖

对于集合类型，就是对集合对象的方法做一层包装：原方法执行后执
行依赖相关的收集或触发逻辑。

## watch 和 watchEffect 的区别

- 两者都可以监听 data 属性变化
- watch 需要明确监听哪个属性
- watchEffect 会根据其中的属性，自动监听其变化

## Vue3 为何比 Vue2 快

- Proxy 响应式
- PatchFlag(静态标记)
- hoistStatic(静态提升)
- cacheHandle(缓存事件)
- SSR 优化
- tree-shaking

## PatchFlag

- 编译模板时，动态节点做标记
- 标记，分为不同的类型，如 TEXT PROPS
- diff 算法时，可以区分静态节点，以及不同类型的动态节点

## hoistStatic

- 将静态节点的定义，提升到父作用域，缓存起来
- 多个相邻的静态节点，会被合并起来
- 典型的拿空间换时间的优化策略

## Vue 单页应用与多页应用的区别

概念：

SPA 单页面应用（SinglePage Web Application），指只有一个主页
面的应用，一开始只需要加载一次 js、css 等相关资源。所有内容都
包含在主页面，对每一个功能模块组件化。单页应用跳转，就是切换
相关组件，仅仅刷新局部资源。

MPA 多页面应用 （MultiPage Application），指有多个独立页面的
应用，每个页面必须重复加载 js、css 等相关资源。多页应用跳转，
需要整页资源刷新。

区别：
![](/vue3/20200725093042256.jpg)

## 对 React 和 Vue 的理解，它们的异同

相似之处：

都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库；

都有自己的构建工具，能让你得到一个根据最佳实践设置的项目模板；
都使用了 Virtual DOM（虚拟 DOM）提高重绘性能；

都有 props 的概念，允许组件间的数据传递；

都鼓励组件化应用，将应用分拆成一个个功能明确的模块，提高复用性。

不同之处 ：

1）数据流

Vue 默认支持数据双向绑定，而 React 一直提倡单向数据流

2）虚拟 DOM

Vue2.x 开始引入"Virtual DOM"，消除了和 React 在这方面的差异，
但是在具体的细节还是有各自的特点。

Vue 宣称可以更快地计算出 Virtual DOM 的差异，这是由于它在渲染
过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。
对于 React 而言，每当应用的状态被改变时，全部子组件都会重新渲
染。当然，这可以通过 PureComponent/shouldComponentUpdate 这
个生命周期方法来进行控制，但 Vue 将此视为默认的优化。

3）组件化
React 与 Vue 最大的不同是模板的编写。

Vue 鼓励写近似常规 HTML 的模板。写起来很接近标准 HTML 元素，只
是多了一些属性。

React 推荐你所有的模板通用 JavaScript 的语法扩展——JSX 书写。
具体来讲：React 中 render 函数是支持闭包特性的，所以 import 的
组件在 render 中可以直接调用。但是在 Vue 中，由于模板中使用的
数据都必须挂在 this 上进行一次中转，所以 import 一个组件完了
之后，还需要在 components 中再声明下。

4）监听数据变化的实现原理不同

Vue 通过 getter/setter 以及一些函数的劫持，能精确知道数据变
化，不需要特别的优化就能达到很好的性能

React 默 认 是 通 过 比 较 引 用 的 方 式 进 行 的 ， 如 果 不 优 化
（PureComponent/shouldComponentUpdate）可能导致大量不必要的
vDOM 的重新渲染。这是因为 Vue 使用的是可变数据，而 React 更强
调数据的不可变。

5）高阶组件

react 可以通过高阶组件（HOC）来扩展，而 Vue 需要通过 mixins 来扩展。

高阶组件就是高阶函数，而 React 的组件本身就是纯粹的函数，所以
高阶函数对 React 来说易如反掌。相反 Vue.js 使用 HTML 模板创建视
图组件，这时模板无法有效的编译，因此 Vue 不能采用 HOC 来实现。

6）构建工具

两者都有自己的构建工具：

React ==> Create React APP、Vue ==> vue-cli

7）跨平台

React ==> React Native、Vue ==> Weex

## Vue 的优点

- 轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十 kb；
- 简单易学：国人开发，中文文档，不存在语言障碍 ，易于理解和学习；
- 双向数据绑定：保留了 angular 的特点，在数据操作方面更为简单；
- 组件化：保留了 react 的优点，实现了 html 的封装和重用，在构建单页面应用方面有着独特的优势；
- 视图，数据，结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作；
- 虚拟 DOM：dom 操作是非常耗费性能的，不再使用原生的 dom 操作
  节点，极大解放 dom 操作，但具体操作的还是 dom 不过是换了另一
  种方式；
- 运行速度更快：相比较于 react 而言，同样是操作虚拟 dom，就性
  能而言， vue 存在很大的优势。

## assets 和 static 的区别

相同点： assets 和 static 两个都是存放静态资源文件。项目中所
需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件
下，这是相同点

不相同点：assets 中存放的静态资源文件在项目打包时，也就是运
行 npm run build 时会将 assets 中放置的静态资源文件进行打包
上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后
的静态资源文件最终也都会放置在 static 文件中跟着 index.html
一同上传至服务器。static 中放置的静态资源文件就不会要走打包
压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。
因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是
static 中的资源文件由于没有进行压缩等操作，所以文件的体积也
就相对于 assets 中打包后的文件提交较大点。在服务器中就会占据
更大的空间。

建议： 将项目中 template 需要的样式文件 js 文件等都可以放置在
assets 中，走打包这一流程。减少体积。而项目中引入的第三方的
资源文件如 iconfoont.css 等文件可以放置在 static 中，因为这
些引入的第三方文件已经经过处理，不再需要处理，直接上传。

## vue 初始化页面闪动问题

使用 vue 开发时，在 vue 初始化之前，由于 div 是不归 vue 管的，所
以我们写的代码在还没有解析的情况下会容易出现花屏现象，看到类
似于{{message}}的字样，虽然一般情况下这个时间很短暂，但是还
是有必要让解决这个问题的。
首先：在 css 里加上以下代码：

```css
[v-cloak] {
  display: none;
}
```

如 果 没 有 彻 底 解 决 问 题 ， 则 在 根 元 素 加 上 style="display:
none;" :style="{display: 'block'}"

## 对 Vue 组件化的理解

1.组件是独立和可复用的代码组织单元。组件系统是 Vue 核心特性之
一，它使开发者使用小型、独立和通常可复用的组件构建大型应用；

2.组件化开发能大幅提高应用开发效率、测试性、复用性等；

3.组件使用按分类有：页面组件、业务组件、通用组件；

4.vue 的组件是基于配置的，我们通常编写的组件是组件配置而非组
件，框架后续会生成其构造函数，它们基于 VueComponent，扩展于
Vue；

5.vue 中常见组件化技术有：属性 prop，自定义事件，插槽等，它们
主要用于组件通信、扩展等；

6.合理的划分组件，有助于提升应用性能；

7.组件应该是高内聚、低耦合的；

8.遵循单向数据流的原则。

## 对 vue 设计原则的理解

1.渐进式 JavaScript 框架：与其它大型框架不同的是，Vue 被设计
为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上
手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工
具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应
用提供驱动。

2.易用性：vue 提供数据响应式、声明式模板语法和基于配置的组件
系统等核心特性。这些使我们只需要关注应用的核心业务即可，只要
会写 js、html 和 css 就能轻松编写 vue 应用。

3.灵活性：渐进式框架的最大优点就是灵活性，如果应用足够小，我
们可能仅需要 vue 核心特性即可完成功能；随着应用规模不断扩大，
我们才可能逐渐引入路由、状态管理、vue-cli 等库和工具，不管是
应用体积还是学习难度都是一个逐渐增加的平和曲线。

4.高效性：超快的虚拟 DOM 和 diff 算法使我们的应用拥有最佳的性能
表现。追求高效的过程还在继续，vue3 中引入 Proxy 对数据响应式
改进以及编译器中对于静态内容编译的改进都会让 vue 更加高效。

## Vuex 的原理

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个
Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个
容器，它包含着你的应用中大部分的状态 ( state )。

Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的
时候，若 store 中的状态发生变化，那么相应的组件也会相应地得
到高效更新。

改变 store 中 的 状 态 的 唯 一 途 径 就 是 显 式 地 提 交 (commit)
mutation。这样可以方便地跟踪每一个状态的变化。

![](/vue3/1690794201494.jpg)

Vuex 为 Vue Components 建立起了一个完整的生态圈，包括开发中的 API 调用一环。

### 核心流程中的主要功能：

Vue Components 是 vue 组件，组件会触发（dispatch）一些事件或
动作，也就是图中的 Actions;

在组件中发出的动作，肯定是想获取或者改变数据的，但是在 vuex
中，数据是集中管理的，不能直接去更改数据，所以会把这个动作提
交（Commit）到 Mutations 中;

然后 Mutations 就去改变（Mutate）State 中的数据;
当 State 中的数据被改变之后，就会重新渲染（Render）到 Vue
Components 中去，组件展示更新后的数据，完成一个流程。

### 各模块在核心流程中的主要功能：

Vue Components∶ Vue 组件。HTML 页面上，负责接收用户操作等交
互行为，执行 dispatch 方法触发对应 action 进行回应。

dispatch∶ 操作行为触发方法，是唯一能执行 action 的方法。

actions∶ 操作行为处理模块。负责处理 Vue Components 接收到的
所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册
的顺序依次触发。向后台 API 请求的操作就在这个模块中进行，包括
触发其他 action 以及提交 mutation 的操作。该模块提供了 Promise
的封装，以支持 action 的链式触发。

commit∶ 状态改变提交操作方法。对 mutation 进行提交，是唯一能
执行 mutation 的方法。

mutations∶ 状态改变操作方法。是 Vuex 修改 state 的唯一推荐方法，
其他修改方式在严格模式下将会报错。该方法只能进行同步操作，且
方法名只能全局唯一。操作之中会有一些 hook 暴露出来，以进行 state 的监控等。

state∶ 页面状态管理容器对象。集中存储 Vuecomponents 中 data
对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需
的数据从该对象中进行读取，利用 Vue 的细粒度数据响应机制来进行
高效的状态更新。

getters∶ state 对象读取方法。图中没有单独列出该模块，应该被
包含在了 render 中，Vue Components 通过该方法读取全局 state 对象。

总结：

Vuex 实现了一个单向数据流，在全局拥有一个 State 存放数据，当
组件要更改 State 中的数据时，必须通过 Mutation 提交修改信息，
Mutation 同时提供了订阅者模式供外部插件调用获取 State 数据
的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)
或批量的同步操作需要走 Action ，但 Action 也是无法直接修改
State 的，还是需要通过 Mutation 来修改 State 的数据。最后，根
据 State 的变化，渲染到视图上。

## Redux 和 Vuex 有什么区别，它们的共同思想

（1）Redux 和 Vuex 区别

Vuex 改进了 Redux 中的 Action 和 Reducer 函数，以 mutations 变化
函数取代 Reducer，无需 switch，只需在对应的 mutation 函数里改
变 state 值即可

Vuex 由于 Vue 自动重新渲染的特性，无需订阅重新渲染函数，只要
生成新的 State 即可

Vuex 数据流的顺序是 ∶View 调用 store.commit 提交对应的请求到
Store 中对应的 mutation 函数->store 改变（vue 检测到数据变化自动渲染）

通俗点理解就是，vuex 弱化 dispatch，通过 commit 进行 store 状
态的一次更变;取消了 action 概念，不必传入特定的 action 形式进
行指定变更;弱化 reducer，基于 commit 参数直接对数据进行转变，
使得框架更加简易;

（2）共同思想

- 单—的数据源
- 变化可以预测
- 本质上：redux 与 vuex 都是对 mvvm 思想的服务，将数据从视图中抽离的一种方案;
- 形式上：vuex 借鉴了 redux，将 store 作为全局的数据中心，进行 mode 管理;

## 为什么要用 Vuex 或者 Redux

由于传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组
件间的状态传递无能为力。我们经常会采用父子组件直接引用或者通
过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通
常会导致代码无法维护。

所以需要把组件的共享状态抽取出来，以一个全局单例模式管理。在
这种模式下，组件树构成了一个巨大的"视图"，不管在树的哪个位置，
任何组件都能获取状态或者触发行为。

另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，
代码将会变得更结构化且易维护。

## Vuex 和单纯的全局对象有什么区别？

Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的
时候，若 store 中的状态发生变化，那么相应的组件也会相应地得
到高效更新。

不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就
是显式地提交 (commit) mutation。这样可以方便地跟踪每一个状态
的变化，从而能够实现一些工具帮助更好地了解我们的应用。

## 为什么 Vuex 的 mutation 中不能做异步操作？

Vuex 中所有的状态更新的唯一途径都是 mutation，异步操作通过
Action 来提交 mutation 实现，这样可以方便地跟踪每一个状态的
变化，从而能够实现一些工具帮助更好地了解我们的应用。

每个 mutation 执行完成后都会对应到一个新的状态变更，这样
devtools 就可以打个快照存下来，然后就可以实现 time-travel 了。

如果 mutation 支持异步操作，就没有办法知道状态是何时更新的，
无法很好的进行状态的追踪，给调试带来困难。
