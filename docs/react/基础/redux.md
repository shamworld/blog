# redux

## 什么是redux？
Redux是JavaScript状态容器，提供可预测化的状态管理。Redux除了和React一起用外，还支持其他界面库。Redux体小精悍。这里我们需要明确一点:Redux和React之间，没有强绑定的关系。

## 基本概念

### Store 
人如其名，Store就是一个容器(container)，它存储了所有的状态(State)，还提供了一些操作它的API，我们后续的操作其实都是在操作这个容器。假如我们的容器是用来放牛奶的，初始情况下，我们的容器里面一箱牛奶都没有，那Store的状态(State)就是:
```js
{
    milk:0
}
```

### Actions 
一个Action就是一个动作，这个动作的目的是更改Store中的某个状态，Store还是上面的那个容器，现在我想往容器放一箱牛奶，那"我想往容器放一箱牛奶"就死一个Action，代码就是这样:
```js
{
  type: "PUT_MILK",
  count: 1
}
```

### Reducers
前面"我想往容器放一箱牛奶"只是想了，还没操作，具体操作要考Reducer，Reducer就是根据接收的Action来改变Store中的状态，比如我接收了一个`PUT_MILK`,同时数量`count`是1，那放进去的结果就是`milk`增加了1，从0变成了1，代码就是这样:
```js
const initState = {
  milk: 0
}

function reducer(state = initState, action) {
  switch (action.type) {
    case 'PUT_MILK':
      return {...state, milk: state.milk + action.count}
    default:
      return state
  }
}
```

可以看到Redux本身就是一个单纯的状态机，Store存放了所有的状态，Action是一个改变状态的通知，Reducer接收到通知就更改Store中对应的状态


redux是函数变成的一个经典例子，在函数变成里面没有`if else`也没有函子，在我们真正去写redux的时候，第一个首先函数变成它有一个container容器,什么样的容器才能变成函子呢，能够有一个map(reducer)接收变形关系(action)，然后作用于每个view，然后这个东西因为有很多函子，那么函数编程讲究纯，然后把所有的进行包裹，包裹以后进行异步操作，让IO函子进行包裹，那么redux刚好用的就是这种机制。

## 自己实现

redux/index.js
```js
import createStore from './createStore.js';
export {
    createStore
}
```

redux/createStore.js
```js
export default function createStore(initState){
    let state = initState;//记录所有的状态
    let listeners = [];//保存所有注册的回调
    function subscribe(listener){
        listeners.push(listener);//subscribe就是将订阅器保存下来
    }
    // dispatch就是将所有的回调拿出来依次执行就行
    function dispatch(newState) {
        state = newState;
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }
    //getState直接返回state
    function getState(){
        return state
    }
    return {
        subscribe,
        getState,
        dispatch
    }
}
```

index.html
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redux</title>
</head>
<body>
    <script type="module">
        import {createStore} from './redux/index.js'
        let initState = {
            counter:{
                count:0,
            },
            info:{
                name:'',
                description:'',
            }
        };
        let store = createStore(initState);
        store.subscribe(()=>{
            const state = store.getState();
            console.log(`${state.info.name}----${state.info.description}`);
        });

        store.subscribe(()=>{
            const state = store.getState();
            console.log(`${state.counter.count}`);
        });

        store.dispatch({...store.getState(),
            info:{
                name:'Roy',
                description:'贪吃的猫',
            }
        });

    </script>
</body>
</html>
```

上述代码是不是很简单，Redux核心也是一个发布订阅模式，就是这么简单。
- store.subscribe:订阅`state`的变化，当`state`变化的时候执行回调，可以有多个`subscribe`，里面的回调会依次执行
- store.dispatch:发出`action`的方法，每次`dispatch`,`action`都会执行`reducer`生成新的`state`，然后执行`subscribe`
- store.getState:一个简单的方法，返回当前的`state`

![](/react/write/1612183660229.jpg)


### combineReducers
`combineReducers`也是使用非常广泛的API，当我们应用越来越复杂，如果将所有逻辑都写在一个`reducer`里面，最终这个文件可能会有成千上万行，所以Redux提供了`combineReducers`，可以让我们为不同的模块写自己的`reducer`,最终将他们组合起来。

redux/index.js
```js
import createStore from './createStore.js';
import combineReducers from './combineReducers.js';

export {
    createStore,
    combineReducers
}
```

reducers/counter.js
```js
let initState = {
    count:10
}

export default function counterReducer(state,action){
    if(!state){
        state = initState;
    }
    switch(action.type){
        case 'INCREMENT':
            return {
                ...state,
                count:state.count+1,
            };
        case 'DECREMENT':
            return {
                ...state,
                count:state.count-1,
            }; 
        default:
            return state; 
    }
}
```

reducers/info.js
```js
let initState = {
    name:'Roy',
    description:'贪吃的猫',
};
export default function infoReducer(state,action){
    if(!state){
        state = initState;
    }
    switch(action.type){
        case 'SET_NAME':
            return {
                ...state,
                name:action.name
            };
        case 'SET_DESCRIPTOIN':
            return {
                ...state,
                description:action.description
            }
        default:
            return state;
    }
}
```

redux/createStore.js
```js
export default function createStore(reducer,initState){
    let state = initState;//记录所有的状态
    let listeners = [];//保存所有注册的回调
    
    function subscribe(listener){
        listeners.push(listener);//subscribe就是将订阅器保存下来
    }

    // dispatch就是将所有的回调拿出来依次执行就行
    function dispatch(action) {
        //reducer负责更新数据
        state = reducer(state,action);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }

    //getState直接返回state
    function getState(){
        return state
    }

    return {
        subscribe,
        getState,
        dispatch
    }
    
}
```

redux/combineReducers.js 
```js
export default function combineReducers(reducers){
    const reducersKeys = Object.keys(reducers);//先把参数里面所有的键值拿出来
    //返回一个普通结构的reducer函数
    return function combinaction(state={},action){
        const nextState = {};
        for(let i=0;i<reducersKeys.length;i++){
            // reducers里面每个键的值都是一个reducer，我们把它拿出来运行下就可以得到对应键新的state值
            // 然后将所有reducer返回的state按照参数里面的key组装好
            // 最后再返回组装好的newState就行
            const key = reducersKeys[i];
            const reducer = reducers[key];
            //现有的状态
            const prevStateForKey = state[key];
            const nextStateForKey = reducer(prevStateForKey,action);
            nextState[key] = nextStateForKey;

        }
        return nextState;
    }
}
```

index.html
```js
<script type="module">
    import {createStore,combineReducers} from './redux/index.js'
    import counterReducer from './reducers/counter.js'
    import infoReducer from './reducers/info.js'

    const reducer = combineReducers({
        counter:counterReducer,
        info:infoReducer
    });
    
    let initState = {
        counter:{
            count:0,
        },
        info:{
            name:'',
            description:'',
        }
    };
    let store = createStore(reducer,initState);


    store.subscribe(()=>{
        const state = store.getState();
        console.log(state);
        console.log(state.counter.count);
        console.log(state.info.name);
    });

    store.dispatch({
        type: 'INCREMENT',
    });
    store.dispatch({
        type: 'SET_NAME',
        name:'贪吃的猫cx'
    });

</script>
```

![](/react/write/1612188708839.jpg)

上述代码，我们把大的`state`分成两个小的`info`和`counter`，合并到`combineReducers`，在`combineReducers`里面它的返回值就是一个`reducer`，这个`reducer`同样会作为`createStore`的参数传进去，说明这个返回值是跟我们之前普通的`reducer`结构一样的函数。这个函数同样接收`state`和`action`然后返回新的`state`，只是这个新的`state`要符合`combineReducers`参数的数据结构。

### applyMiddleware

`middleware`是Redux里面很重要的一个概念，Redux的生态主要靠这个API接入，例如我们下面接入日志：

middlewares/exceptionMiddleware.js
```js
const exceptionMiddleware = (store)=>(next)=>(action)=>{
    try {
        next(action);
    } catch (error) {
        console.error('错误报告',error);
    }
}

export default exceptionMiddleware;
```

middlewares/loggerMiddleware.js
```js
const loggerMiddleware = (store)=>(next)=>(action)=>{
    console.log("this state",store.getState());
    console.log("action",action);
    next(action);
    console.log("next state",store.getState());
}

export default loggerMiddleware;
```

middlewares/timeMiddleware.js
```js
const timeMiddleware = (store)=>(next)=>(action)=>{
    console.log("时间:",new Date().getTime());
    next(action);
}

export default timeMiddleware;
```

index.html
```js
<script type="module">
    import {createStore,combineReducers} from './redux/index.js'
    import counterReducer from './reducers/counter.js'
    import infoReducer from './reducers/info.js'
    import exceptionMiddleware from './middlewares/exceptionMiddleware.js'
    import loggerMiddleware from './middlewares/loggerMiddleware.js'
    import timeMiddleware from './middlewares/timeMiddleware.js'

    const reducer = combineReducers({
        counter:counterReducer,
        info:infoReducer
    });
    
    let initState = {
        counter:{
            count:0,
        },
        info:{
            name:'',
            description:'',
        }
    };
    let store = createStore(reducer,initState);
    //初始化中间件
    const next = store.dispatch;
    const logger = loggerMiddleware(store);
    const exception = exceptionMiddleware(store);
    const time = timeMiddleware(store);
    //函数柯里化
    store.dispatch = exception(time(logger(next)));

    store.subscribe(()=>{
        const state = store.getState();
        console.log(state);
        console.log(state.counter.count);
        console.log(state.info.name);
    });

    store.dispatch({
        type: 'INCREMENT',
    });
    store.dispatch({
        type: 'SET_NAME',
        name:'贪吃的猫cx'
    });

</script>
```
执行效果如下打印信息:

![](/react/write/1612198761855.jpg)

可以看到我们next(action);这行执行之后state改变了，前面我们说了要改变state只能dispatch(action)，所以这里的next(action)就是dispatch(action)，只是换了一个名字而已。而且注意最后一层返回值return function(action)的结构，他的参数是action，是不是很像dispatch(action)，其实他就是一个新的dispatch(action)，这个新的dispatch(action)会调用原始的dispatch，并且在调用的前后加上自己的逻辑。所以到这里一个中间件的结构也清楚了：
1. 一个中间件接收store作为参数，会返回一个函数
2. 返回的这个函数接收老的dispatch函数作为参数，会返回一个新的函数
3. 返回的新函数就是新的dispatch函数，这个函数里面可以拿到外面两层传进来的store和老dispatch函数

所以说白了，中间件就是加强dispatch的功能，用新的dispatch替换老的dispatch，这不就是个装饰者模式吗？


### 函数组合compose

redux/compose.js
```js
export default function compose(...funcs){
    if(funcs.length==0){
        return (arg)=>arg;
    }
    if(funcs.length==1){
        return funcs[0];
    }
    return funcs.reduce((a,b)=>(...args)=>a(b(...args)));
}
```

这个compose可能比较让人困惑，我这里还是讲解下，比如我们有三个函数，这三个函数都是我们前面接收dispatch返回新dispatch的方法：
```js
const fun1 = dispatch => newDispatch1;
const fun2 = dispatch => newDispatch2;
const fun3 = dispatch => newDispatch3;
```

当我们使用了`compose(fun1, fun2, fun3)`后执行顺序是什么样的呢？

```js
// 第一次其实执行的是
(func1, func2) => (...args) => func1(fun2(...args))
// 这次执行完的返回值是下面这个，用个变量存起来吧
const temp = (...args) => func1(fun2(...args))

// 我们下次再循环的时候其实执行的是
(temp, func3) => (...args) => temp(func3(...args));
// 这个返回值是下面这个，也就是最终的返回值，其实就是从func3开始从右往左执行完了所有函数
// 前面的返回值会作为后面参数
(...args) => temp(func3(...args));

// 再看看上面这个方法，如果把dispatch作为参数传进去会是什么效果
(dispatch) => temp(func3(dispatch));

// 然后func3(dispatch)返回的是newDispatch3，这个又传给了temp(newDispatch3)，也就是下面这个会执行
(newDispatch3) => func1(fun2(newDispatch3))

// 上面这个里面用newDispatch3执行fun2(newDispatch3)会得到newDispatch2
// 然后func1(newDispatch2)会得到newDispatch1
// 注意这时候的newDispatch1其实已经包含了newDispatch3和newDispatch2的逻辑了，将它拿出来执行这三个方法就都执行了
```

所以我们支持多个middleware的代码就是这样:
```js
import compose from './compose.js';
const applyMiddleware = function(...middlewares) {
    return function (oldCreateStore){
        return function (reducer,initState){
            const store = oldCreateStore(reducer,initState);
            const simpleStore = {
                getState:store.getState
            }
            // 多个middleware，先解构出dispatch => newDispatch的结构
            const chain = middlewares.map((middleware)=>middleware(simpleStore));
            // 用compose得到一个组合了所有dispatch的函数
            const dispatch = compose(...chain)(store.dispatch);

            return{
                ...store,
                dispatch
            }
        }
    }
};
export default applyMiddleware;
```

```js
<script type="module">
    import {createStore,combineReducers,applyMiddleware} from './redux/index.js'
    import counterReducer from './reducers/counter.js'
    import infoReducer from './reducers/info.js'
    import exceptionMiddleware from './middlewares/exceptionMiddleware.js'
    import loggerMiddleware from './middlewares/loggerMiddleware.js'
    import timeMiddleware from './middlewares/timeMiddleware.js'

    const reducer = combineReducers({
        counter:counterReducer,
        info:infoReducer
    });
    
    let initState = {
        counter:{
            count:0,
        },
        info:{
            name:'',
            description:'',
        }
    };
    //初始化中间件
    const rewriteCreateStroeFunc = applyMiddleware(
        exceptionMiddleware,
        loggerMiddleware,
        timeMiddleware
    )
    let store = createStore(reducer,{},rewriteCreateStroeFunc);
    

    store.subscribe(()=>{
        const state = store.getState();
        console.log(state);
        console.log(state.counter.count);
        console.log(state.info.name);
    });

    store.dispatch({
        type: 'INCREMENT',
    });
    store.dispatch({
        type: 'SET_NAME',
        name:'贪吃的猫cx'
    });

</script>
```

结果如下:

![](/react/write/1612201728004.jpg)


现在我们可以知道他的中间件为什么要包裹几层函数了:
- 第一层：目的是传入store参数
- 第二层：第二层的结构是dispatch => newDispatch，多个中间件的这层函数可以compose起来，形成一个大的dispatch => newDispatch
- 第三层：这层就是最终的返回值了，其实就是newDispatch，是增强过的dispatch，是中间件的真正逻辑所在


### bindActionCreators
redux 还为我们提供了 bindActionCreators 工具函数，这个工具函数代码很简单，我们很少直接在代码中使用它

redux/bindActionCreators.js
```js
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}
export default function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {}
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
```

actions/couter.js
```js
function increment(){
    return {
        type:'INCREMENT'
    }
}

export {increment};
```

actions/info.js
```js
function setName(){
    return {
        type: 'SET_NAME',
        name:'贪吃的猫12'
    }
}
export {setName};
```

index.html
```js
<script type="module">
    import {createStore,combineReducers,applyMiddleware,bindActionCreators} from './redux/index.js'
    import counterReducer from './reducers/counter.js'
    import infoReducer from './reducers/info.js'
    import {increment} from './actions/counter.js'
    import {setName} from './actions/info.js'
    import exceptionMiddleware from './middlewares/exceptionMiddleware.js'
    import loggerMiddleware from './middlewares/loggerMiddleware.js'
    import timeMiddleware from './middlewares/timeMiddleware.js'

    const reducer = combineReducers({
        counter:counterReducer,
        info:infoReducer
    });
    
    let initState = {
        counter:{
            count:0,
        },
        info:{
            name:'',
            description:'',
        }
    };
    //初始化中间件
    const rewriteCreateStroeFunc = applyMiddleware(
        exceptionMiddleware,
        loggerMiddleware,
        timeMiddleware
    )
    let store = createStore(reducer,{},rewriteCreateStroeFunc);
    

    store.subscribe(()=>{
        const state = store.getState();
        console.log(state);
        console.log(state.counter.count);
        console.log(state.info.name);
    });

    const actions = bindActionCreators({increment,setName},store.dispatch);
    actions.increment();
    actions.setName();
</script>
```

## 总结
- 单纯的Redux只是一个状态机，store里面存了所有的状态state，要改变里面的状态state，只能dispatch action。
- 对于发出来的action需要用reducer来处理，reducer会计算新的state来替代老的state。
- subscribe方法可以注册回调方法，当dispatch action的时候会执行里面的回调。
- Redux其实就是一个发布订阅模式！
- Redux还支持enhancer，enhancer其实就是一个装饰者模式，传入当前的createStore，返回一个增强的createStore。
- Redux使用applyMiddleware支持中间件，applyMiddleware的返回值其实就是一个enhancer。
- Redux的中间件也是一个装饰者模式，传入当前的dispatch，返回一个增强了的dispatch。
- 单纯的Redux是没有View层的，所以他可以跟各种UI库结合使用，比如react-redux，计划下一篇文章就是手写react-redux

