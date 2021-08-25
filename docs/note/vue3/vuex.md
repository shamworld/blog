# Vuex

## 核心原理
1. Vuex本质就是一个对象
2. Vuex对象有两个属性，一个是install方法，一个是Store这个类
3. install方法的作用是将store这个实例挂载到所有的组件上，注意是同一个store实例
4. Store这个类拥有commit，dispatch这些方法，Store类里将用户传入的state包装成data，作为new Vue的参数，从而实现state值的响应式

## 基本准备工作

我们先用vue-cli创建一个项目
```js
vue create roy-vuex
```

![](/vue3/1612323056400.jpg)

初始化完毕，创建一个roy-vuex.js文件

![](/vue3/1612325332372.jpg)

我们修改下store/index.js的引入
```js
import Vue from 'vue'
import Vuex from '@/store/roy-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```


## 剖析Vuex本质
先抛出个问题，Vue项目中是怎么引入Vuex。

1. 安装Vuex，在通过`import Vuex from 'vuex'`引入
2. 先var store = new Vuex.Store({...})，再把store作为参数的一个属性值，new Vue({store})
3. 通过Vue.use(Vuex)使得每个组件都可以拥有store实例

从这个引入过程我们可以发现什么？

1. 我们是通过new Vuex.store({})获得一个store实例，也就是说，我们引入的Vuex中有Store这个类作为Vuex对象的一个属性。因为通过import引入的，实质上就是一个导出一个对象的引用。

2. 我们还是用了Vue.use()，而Vue.use的一个原则就是执行对象的install这个方法

我们可以初步假设
```js
class Store {
    constructor(){
    }
}
function install() {
}
export default {
    Store,
    install
}
```

## 完善install方法
通过Vue.use(Vuex)使得每个组件都可以拥有store实例。

这是什么意思呢？

我们来看下main.js
```js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
```

我们可以发现这里只是将store ，也就是store/index.js导出的store实例，作为Vue 参数的一部分。

但是这里就是有一个问题，这里是Vue的根组件。也就是说目前只有根组件有这个store值，而其他组件是还没有的，所以我们需要让其他组件也拥有这个store。

因此，install方法我们可以这样完善
```js
function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
            if(this.$options&&this.$options.store){//如果是根组件
                this.$store = this.$options.store
            }else{//如果是子组件
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}
```

解释下代码:
1. 参数Vue，Vue.use的时候，在执行install的时候，将Vue作为参数传进去。
2. mixin的作用是将mixin的内容混合到Vue的初始参数options中。
3. 为什么是beforeCreate而不是created呢?因为如果是在created操作的话，`$options`已经初始化好了
4. 如果判断当前组件是根组件的话，就将我们传入的store挂载到根组件实例上，属性名为`$store`
5. 如果判断当前组件是子组件的话，就将我们根组件的`$store`也复制给子组件。注意是 **引用复制**，因此每个组件都拥有了同一个`$store`挂载在它身上。

这里有个问题，为什么判断当前组件是子组件，就可以直接从父组件拿到`$store`呢？这个让我想到一个问题:父组件和子组件的执行顺序？
>父beforeCreate-> 父created -> 父beforeMounte -> 子beforeCreate ->子create ->子beforeMount ->子 mounted -> 父mounted

可以得到，在执行子组件的beforeCreate的时候，父组件已经执行完beforeCreate了，那理所当然父组件已经有`$store`了。


## 实现Vuex的state
```js
<p>Roy-Vuex的数据:{{$store.state.couter}}</p>
```

store/index.js
```js
import Vue from 'vue'
import Vuex from '@/store/roy-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    couter:0,
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
  }
})

```

也就是说，我们把这个对象，那么我们直接在`Class Store`里面获取这个对象，那么要怎么实现响应式呢？我们知道，我们`new Vue()`的时候，传入的data是响应式的，那么我们是不是可以new一个Vue，然后把state当做data传入了呢？确实事这样。我们也可以给Store类添加一个state属性。这个属性自动触发get接口。
```js
class Store{
    constructor(options){
        const {
            state,
            mutations,
            actions,
        } = options;
        this._vm = new Vue({
            data:{
                state:options.state
            }
        });
    }
    get state() {
        return this._vm.state;
    }
}
```

![](/vue3/1612342095205.jpg)

## 实现mutation和actions

```js
<p @click="$store.dispatch('add')">Roy-Vuex的数据:{{$store.state.couter}}</p>
```

store/index.js
```js
mutations: {
    add(state){
        state.couter+=1;
    }
},
actions: {
    add({commit}){
      setTimeout(()=>{
        commit("add");
      },500)
    }
},
```

store/roy-vuex.js
```js
commit(type,payload){
    const entry = this._mutations[type];
    if (entry) {
        entry(this.state,payload);
    }
}
dispatch(type,payload) {
    const entry = this._actions[type];
    if (entry) {
        entry(this,payload);
    }
}
```

store对象有commit这个方法。而commit方法触发了mutations对象中的某个对应的方法，因此我们可以给Store类添加commit方法

当我们点击p标签后，调用dispatch，会调用actions里面的方法去commit调用对应的mutations方法

运行后:

![](/vue3/1612344798302.jpg)

这是什么原因了？因为this的原因，commit和dispatch里面的this都是为undefined。

我们来分析一下`$store.dispatch('add')`，执行commit的时候，this是谁调用就指向谁，所以this执行`$store`。

会执行这段代码:
```js
add({commit}){
    setTimeout(()=>{
        commit("add");
    },500)
}
```

发现问题了吧？？ 谁调用commit？？是$store吗？并不是。所以要解决这个问题，我们要通过bind来绑定this
```js
let Vue;
class Store {
    constructor(options){
        const {
            state,
            mutations,
            actions,
        } = options;
        this._mutations = mutations;
        this._actions = actions;
        this._vm = new Vue({
            data:{
                state
            }
        });
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }
    get state() {
        return this._vm.state;
    }
    commit(type,payload){
        const entry = this._mutations[type];
        if (entry) {
            entry(this.state,payload);
        }
    }
    dispatch(type,payload) {
        const entry = this._actions[type];
        if (entry) {
            entry(this,payload);
        }
    }
}

function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
            if(this.$options&&this.$options.store){//如果是根组件
                this.$store = this.$options.store
            }else{//如果是子组件
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

export default {
    Store,
    install
}

```

运行结果:

![](/vue3/1612345255103.jpg)


## 实现getters

```js
<p @click="$store.dispatch('add')">Roy-Vuex的数据:{{$store.state.couter}}</p>
<p>Roy-Vuex通过getter获取的数据:{{$store.getters.doubleCounter}}</p>
```

store/index.js
```js
getters:{
    doubleCounter(state){
      return state.couter *2;
    }
},
```

store/roy-vuex.js
```js
class Store {
    constructor(options){
        const {
            state,
            mutations,
            actions,
            getters
        } = options;
        this._mutations = mutations;
        this._actions = actions;
        this._vm = new Vue({
            data:{
                state
            }
        });
        if (getters) {
            this.handleGetters(getters);
        }
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }
    get state() {
        return this._vm.state;
    }
    commit(type,payload){
        const entry = this._mutations[type];
        if (entry) {
            entry(this.state,payload);
        }
    }
    dispatch(type,payload) {
        const entry = this._actions[type];
        if (entry) {
            entry(this,payload);
        }
    }
    handleGetters(getters){
        this.getters = {};
        Object.keys(getters).forEach((key)=>{
            Object.defineProperty(this.getters,key,{
                get:()=>getters[key](this.state)
            });
        });
    }
}
```

为什么用`getters`的时候不用写括号?

就跟平时我们写个变量，为什么不用括号一样。
```js
(如{{num}},而不是{{num()}})
```
原来就是利用了`Object.defineProperty`的`get`接口

我们运行结果:

![](/vue3/1612346036802.jpg)


完整代码如下:

store/index.js
```js
import Vue from 'vue'
import Vuex from '@/store/roy-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    couter:0,
  },
  mutations: {
    add(state){
      state.couter+=1;
    }
  },
  actions: {
    add({commit}){
      setTimeout(()=>{
        commit("add");
      },500)
    }
  },
  getters:{
    doubleCounter(state){
      return state.couter *2;
    }
  },
  modules: {
  }
})

```

store/roy-vuex.js
```js
let Vue;
class Store {
    constructor(options){
        const {
            state,
            mutations,
            actions,
            getters
        } = options;
        this._mutations = mutations;
        this._actions = actions;
        this._vm = new Vue({
            data:{
                state
            }
        });
        if (getters) {
            this.handleGetters(getters);
        }
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }
    get state() {
        return this._vm.state;
    }
    commit(type,payload){
        const entry = this._mutations[type];
        if (entry) {
            entry(this.state,payload);
        }
    }
    dispatch(type,payload) {
        const entry = this._actions[type];
        if (entry) {
            entry(this,payload);
        }
    }
    handleGetters(getters){
        this.getters = {};
        Object.keys(getters).forEach((key)=>{
            Object.defineProperty(this.getters,key,{
                get:()=>getters[key](this.state)
            });
        });
    }
}

function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
            if(this.$options&&this.$options.store){//如果是根组件
                this.$store = this.$options.store
            }else{//如果是子组件
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

export default {
    Store,
    install
}
```






