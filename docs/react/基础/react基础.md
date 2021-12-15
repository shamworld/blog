# react基础

## React17原理
React17中的JSX转换不会将JSX转换为React.createElement，而是自动从React的package中引入入口函数并调用。另外此次升级不会改变JSX不会改变JSX语法，旧的JSX转换也将继续工作。
## React中的事件处理为什么要bind this？
首先我们知道React是通过创建虚拟DOM，然后将虚拟DOM生成真实DOM最后插入到页面中，而React生命周期中render方法的作用就是将虚拟DOM渲染成真实DOM。在JSX语法中:`onClick={function}` onClick这个属性本身只是一个"中间变量"。将函数赋值给onClick这个中间变量，后面要进行JSX语法转化，将JSX组件转换成JavaScript对象，进而转换成真实DOM。把onClick作为中间变量，指向一个函数的时候，后面的一些列处理中，使用onClick这个中间变量所指向的函数，里面的this会自然丢失掉了，不是在指向React组件实例了。

## 为什么React没有自动的把bind集成到render方法中呢?
因为render函数会被多次调用，每次都要bind会影响性能，所以官方建议你自己在constructor中手动bind达到性能优化。


## react事件和dom事件的区别
```js
function App() {
  const onClickButton = (event) => {
    event.preventDefault() // 阻止默认行为
    event.stopPropagation() // 阻止冒泡
    console.log('target', event.target) // 指向当前元素，即当前元素触发
    console.log('current target', event.currentTarget) // 指向当前元素，假象！！！

    // 注意，event 其实是 React 封装的。可以看 __proto__.constructor 是 SyntheticEvent 组合事件
    console.log('event', event) // 不是原生的 Event ，原生的 MouseEvent
    console.log('event.__proto__.constructor', event.__proto__.constructor)

    // 原生 event 如下。其 __proto__.constructor 是 MouseEvent
    console.log('nativeEvent', event.nativeEvent)
    console.log('nativeEvent target', event.nativeEvent.target)  // 指向当前元素，即当前元素触发
    console.log('nativeEvent current target', event.nativeEvent.currentTarget) // 指向 document ！！！

  }
  return (
    <div className="App">
      <button onClick={onClickButton}>点我</button>
    </div>
  );
}

```
- event 是合成事件SyntheticEvent ，模拟出来 DOM 事件所有能力
- event.nativeEvent 是原生事件对象
- 所有的事件，在React16是挂载到 document 上，在React17上是挂载到root上
- 和 DOM 事件不一样，和 Vue 事件也不一样

## 为何要合成事件机制
- 更好的兼容性和跨平台
- 挂载document，减少内存消耗，避免频繁解绑
- 方便事件的统一管理(如事务机制)

## setState
1、 setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的

2、 setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前导致在合成事件和钩子函数中没法立马拿到更新后的值形成了所谓的“异步”，当然可以通过第二个参数setState(partialState, callback)中的callback拿到更新后的结果

3、 setState 的批量更新优化也是建立在“异步”合成事件、钩子函数之上的，在原生事件和setTimeout 中不会批量更新在“异步”中，如果对同一个值进行多次setState的批量更新，策略会对其进行覆盖取最后一次的执行，如果是同时setState多个不同的值在更新时会对其进行合并批量更新

- 不可变值
```js
// 不可变值（函数式编程，纯函数） - 数组
const list5Copy = this.state.list5.slice()
list5Copy.splice(2, 0, 'a') // 中间插入/删除
this.setState({
    list1: this.state.list1.concat(100), // 追加
    list2: [...this.state.list2, 100], // 追加
    list3: this.state.list3.slice(0, 3), // 截取
    list4: this.state.list4.filter(item => item > 100), // 筛选
    list5: list5Copy // 其他操作
})
// 注意，不能直接对 this.state.list 进行 push pop splice 等，这样违反不可变值

// 不可变值 - 对象
this.setState({
    obj1: Object.assign({}, this.state.obj1, {a: 100}),
    obj2: {...this.state.obj2, a: 100}
})
// 注意，不能直接对 this.state.obj 进行属性设置，这样违反不可变值
```
- 可能是异步更新(也可能是同步)
```js
this.setState({
    count: this.state.count + 1
}, () => {
    // 联想 Vue $nextTick - DOM
    console.log('count by callback', this.state.count) // 回调函数中可以拿到最新的 state
})
console.log('count', this.state.count) // 异步的，拿不到最新值

// setTimeout 中 setState 是同步的
setTimeout(() => {
    this.setState({
        count: this.state.count + 1
    })
    console.log('count in setTimeout', this.state.count)
}, 0)

// 自己定义的 DOM 事件，setState 是同步的。再 componentDidMount 中
bodyClickHandler = () => {
    this.setState({
        count: this.state.count + 1
    })
    console.log('count in body event', this.state.count)
}
componentDidMount() {
    // 自己定义的 DOM 事件，setState 是同步的
    document.body.addEventListener('click', this.bodyClickHandler)
}
componentWillUnmount() {
    // 及时销毁自定义 DOM 事件
    document.body.removeEventListener('click', this.bodyClickHandler)
    // clearTimeout
}
```

- 有可能合并
```js
increase = () => {

// state 异步更新的话，更新前会被合并 ----------------------------

// 传入对象，会被合并（类似 Object.assign ）。执行结果只一次 +1
    this.setState({
        count: this.state.count + 1
    })
    this.setState({
        count: this.state.count + 1
    })
    this.setState({
        count: this.state.count + 1
    })

    // 传入函数，不会被合并。执行结果是 +3
    this.setState((prevState, props) => {
        return {
            count: prevState.count + 1
        }
    })
    this.setState((prevState, props) => {
        return {
            count: prevState.count + 1
        }
    })
    this.setState((prevState, props) => {
        return {
            count: prevState.count + 1
        }
    })
}
```

## React生命周期

[生命周期图](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![](/react/basis/e012d4a9407fb67.png)

![](/react/basis/745b7d25dc166a6.png)


## React函数组件和class组件
**相同之处**
- props不能改变
- 父组件props有变化时，子组件随之而改变

**区别**
| 区别 | 函数组件 | 类组件 |
| -- | -- | -- |
| 生命周期 | 无 | 有 |
| this | 无 | 有 |
| state | 无 | 有 |
| 改变state | React.Hooks:useState | this.setState() |
| 性能 | 高(不用实例化) | 低(需要实例化) |


## 受控组件和非受控组件

### 受控组件
在HTML中，标签`<input>`、`<textarea>`、`<select>`的值的改变通常是根据用户输入进行更新。在React中，可变状态通常保存在受控组件的状态属性中，并且只能使用`setState()`更新，而呈现表达的React组件也控制着在后续用户输入时该表达中发生的情况，以这种由React控制的输入表单元素而改变其值的方式。

```js
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
            </div>
        );
    }
}
```

![](/react/basis/1029246-20170424164113537-1517458643.png)

- name开始是空字符串''。
- 当输入a，并handleNameChange获取a和调用setState。然后，该输入被重新呈现为具有的值a。
- 当输入b，handleNameChange获取ab并设置该状态的值。现在再次重新渲染输入value="ab"。

这也意味着表单组件可以立即响应输入更改; 例如：
- 就地反馈，如验证
- 禁用按钮，除非所有字段都有有效的数据
- 执行特定的输入格式，如信用卡号码

受控组件执行情况
| 元素 | 属性 | 方法 | 方法回调中的新值 |
| -- | -- | -- | -- |
| `<input type="text"/>` | value="string" | onChange | event.target.value |
| `<input type="checked"/>` | checked={boolean} | onChange | event.target.checked |
| `<input type="radio"/>` | checked={boolean} | onChange | event.target.checked |
| `<textarea />` | value="string" | onChange | event.target.value |
| `<select/>` | value="option value" | onChange | event.target.value |

可见效果:

当注释this.setState({value: event.target.value}); 这行代码，文本框再次输入时，页面不会重新渲染，所产生效果即是文本框输入不了值，即文本框值的改变受到setState()方法的控制，在未执行时，不重新渲染组件

### 非受控组件
表单数据由DOM本身处理。即不受setState()的控制，与传统的HTML表单输入相似，input输入值即显示最新值(使用ref从DOM获取表单值)

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

使用场景:
- 必须手动操作DOM元素，setState实现不了
- 文件上传`<input type=file/>`
- 某些富文本编辑器，需要传入DOM元素

**结论**
- 优先使用受控组件，符合React设计原则
- 必须操作DOM时，再使用非受控组件


## Portals
- 组件默认会按照既定层次嵌套渲染
- 如何让组件渲染到父组件以外?

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        // // 正常渲染
        // return <div className="modal">
        //     {this.props.children} {/* vue slot */}
        // </div> 

        // 使用 Portals 渲染到 body 上。
        // fixed 元素要放在 body 上，有更好的浏览器兼容性。
        return ReactDOM.createPortal(
            <div className="modal">{this.props.children}</div>,
            document.body // DOM 节点
        )
    }
}

export default App

```

使用场景:
- overflow: hidden
- 父组件z-index值太小
- fixed需要放在body第一层级

## context
```js
import React from 'react'

// 创建 Context 填入默认值（任何一个 js 变量）
const ThemeContext = React.createContext('light')

// 底层组件 - 函数是组件
function ThemeLink (props) {
    // const theme = this.context // 会报错。函数式组件没有实例，即没有 this

    // 函数式组件可以使用 Consumer
    return <ThemeContext.Consumer>
        { value => <p>link's theme is {value}</p> }
    </ThemeContext.Consumer>
}

// 底层组件 - class 组件
class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // static contextType = ThemeContext // 也可以用 ThemedButton.contextType = ThemeContext
    render() {
        const theme = this.context // React 会往上找到最近的 theme Provider，然后使用它的值。
        return <div>
            <p>button's theme is {theme}</p>
        </div>
    }
}
ThemedButton.contextType = ThemeContext // 指定 contextType 读取当前的 theme context。

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
            <ThemeLink />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'light'
        }
    }
    render() {
        return <ThemeContext.Provider value={this.state.theme}>
            <Toolbar />
            <hr/>
            <button onClick={this.changeTheme}>change theme</button>
        </ThemeContext.Provider>
    }
    changeTheme = () => {
        this.setState({
            theme: this.state.theme === 'light' ? 'dark' : 'light'
        })
    }
}

export default App
```

## React如何异步加载组件
因为项目中存在一些不必要的状态重复计算和UI重复渲染，为了做出优化，所有就有了异步加载组件

- import()
- React.lazy 
- React.Suspense

```js
import React from 'react'
const ContextDemo = React.lazy(() => import('./ContextDemo'))
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <p>引入一个动态组件</p>
            <hr />
            <React.Suspense fallback={<div>Loading...</div>}>
                <ContextDemo/>
            </React.Suspense>
        </div>
        // 1. 强制刷新，可看到 loading （看不到就限制一下 chrome 网速）
        // 2. 看 network 的 js 加载
    }
}

export default App

```

## shouldComponentUpdate
React 默认：父组件有更新，子组件则无条件也更新！！！

性能优化对于 React 更加重要！

SCU 一定要每次都用吗？—— 需要的时候才优化

不许配合"不可变值"一起使用

```js
import React from 'react'
import PropTypes from 'prop-types'

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }
    render() {
        return <div>
            <input value={this.state.title} onChange={this.onTitleChange}/>
            <button onClick={this.onSubmit}>提交</button>
        </div>
    }
    onTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    onSubmit = () => {
        const { submitTitle } = this.props
        submitTitle(this.state.title) // 'abc'

        this.setState({
            title: ''
        })
    }
}
// props 类型检查
Input.propTypes = {
    submitTitle: PropTypes.func.isRequired
}

class List extends React.Component {
    constructor(props) {
        super(props)
    }
    // 增加 shouldComponentUpdate
    shouldComponentUpdate(nextProps, nextState) {
        // _.isEqual 做对象或者数组的深度比较（一次性递归到底）
        if (_.isEqual(nextProps.list, this.props.list)) {
            // 相等，则不重复渲染
            return false
        }
        return true // 不相等，则渲染
    }
    render() {
        const { list } = this.props

        return <ul>{list.map((item, index) => {
            return <li key={item.id}>
                <span>{item.title}</span>
            </li>
        })}</ul>
    }
}
// props 类型检查
List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <p>
            {this.props.text}
            {this.props.length}
        </p>
    }
    componentDidUpdate() {
        console.log('footer did update')
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.text !== this.props.text
            || nextProps.length !== this.props.length) {
            return true // 可以渲染
        }
        return false // 不重复渲染
    }


}

class TodoListDemo extends React.Component {
    constructor(props) {
        super(props)
        // 状态（数据）提升
        this.state = {
            list: [
                {
                    id: 'id-1',
                    title: '标题1'
                },
                {
                    id: 'id-2',
                    title: '标题2'
                },
                {
                    id: 'id-3',
                    title: '标题3'
                }
            ],
            footerInfo: '底部文字'
        }
    }
    render() {
        return <div>
            <Input submitTitle={this.onSubmitTitle}/>
            <List list={this.state.list}/>
            <Footer text={this.state.footerInfo} length={this.state.list.length}/>
        </div>
    }
    onSubmitTitle = (title) => {
        this.setState({
            list: this.state.list.concat({
                id: `id-${Date.now()}`,
                title
            })
        })
    }
}

export default TodoListDemo

```

## PureComponent和memo
- PureComponent，SCU中实现了浅比较
```js
class Input extends React.Component {}
class List extends React.PureComponent{
    shouldComponentUpdate(){}//浅比较
}
```
- memo，函数组件中的PureComponent
```js
function MyComponent(props){
    /* 使用props渲染 */
}
function areEqual(prevProps,nextProps){
    /*
        如果把nextProps传入render方法的返回结果与将
        prevProps传入render方法的返回结果一致则返回true，
        否则返回false
    */
}
export default React.memo(MyComponent,areEqual);
```

- 浅比较已使用大部分情况(尽量不要做深比较)

## 关于组件公共逻辑的抽离
- mixin，已被React弃用
- 高阶组件
- Render Props 

```js
//高阶组件不是一种功能，而是一种模式
const HOCFactory = (Component) => {
    class HOC extends React.Component {
        //在此定义多个组件的公共逻辑
        render(){
            return <Component {...this.props}>
        }
    }
    return HOC;
}
const EnhancedComponent1 = HOCFactory(WrappedComponent1);
const EnhancedComponent2 = HOCFactory(WrappedComponent2);
```

```js
import React from 'react'

// 高阶组件
const withMouse = (Component) => {
    class withMouseComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = { x: 0, y: 0 }
        }
  
        handleMouseMove = (event) => {
            this.setState({
                x: event.clientX,
                y: event.clientY
            })
        }
  
        render() {
            return (
                <div style={{ height: '500px' }} onMouseMove={this.handleMouseMove}>
                    {/* 1. 透传所有 props 2. 增加 mouse 属性 */}
                    <Component {...this.props} mouse={this.state}/>
                </div>
            )
        }
    }
    return withMouseComponent
}

const App = (props) => {
    const a = props.a
    const { x, y } = props.mouse // 接收 mouse 属性
    return (
        <div style={{ height: '500px' }}>
            <h1>The mouse position is ({x}, {y})</h1>
            <p>{a}</p>
        </div>
    )
}

export default withMouse(App) // 返回高阶函数

```

```js
//Render Props的核心思想
//通过一个函数将class组件的state作为props传递给纯函数组件
class Factory extends React.Component {
    constructor(){
        this.state = {
            /* state即多个组件的公共逻辑的数据 */
        }
    }
    /* 修改state */
    render(){
        return <div>{this.props.render(this.state)}</div>
    }
}

const App = () => {
    <Factory render={
        /* render是一个函数组件 */
        (props) => <p>{props.a}{props.b}...</p>
    }/>
}
```
## ReactDOM.render(element,contrainer,callback)
在内部返回legacyRenderSubtreeIntoContainer()的调用，判断root是否存在，当不存在时表明首次调用，然后执行updateContainer()函数进行非批量更新，*可以保证更新效率与用户体验*，容器节点里面的所有dom元素都会被替换；后续调用则会调用updateContainer()函数进行算法diff高效的更新。

如果提供了可选的回调函数，该回调函数将在组件被渲染活更新之后被执行。

## diff算法
### 策略:

- 同级比较，Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。
- 拥有不同类型的两个组件将会生成不同的树形结构。例如:div->p,CompA->CompB。
- 开发者可以通过`key ` prop来暗示哪些子元素在不同的渲染下能保持稳定。



### 过程

对比两个虚拟dom时会有三种操作:删除，替换和更新

vnode是现在的虚拟dom，newVnode是新虚拟dom。
- 删除:newVnode不存在时
- 替换:vnode和newVnode类型不同或key不同时
- 更新:有相同类型和key但vnode和newVnode不同时


## JSX本质
JSX 的本质就是一个 React.createElement 函数，它接收多个参数来返回 Vnode
- 第一个参数是标签名
    - 可能是原生的 HTML 标签名，是一个小写字母开头的字符串；
    - 可能是一个自定义的组件，React 规定自定义组件以大写字母开头；
- 第二个参数是属性信息，如果没有属性则为 null；
- 第三个参数是子元素；
    - 如果拥有多个子元素，可以依次放在第三个、第四个...
    - 也可以用在数组中存放多个子元素


## batchUpdates - setState 批量更新
setState的执行原理：

![](/react/basis/20210213210927272.png)

- setState接收一个新的状态
- 该接收到的新状态不会被立即执行么，而是存入到pendingStates（等待队列）中
- 判断isBatchingUpdates（是否是批量更新模式）
    - isBatchingUpdates: true 将接收到的新状态保存到dirtyComponents(脏组件)中
    - isBatchingUpdates: false 遍历所有的dirtyComponents， 并且调用其 updateComponent方法更新pendingStates中的state 或者props。执行完之后，回将isBatchingUpdates: true

```js
handleClick = () => {
    // 事件处理函数自带batchedUpdates
    this.countNumber()

    // setTimeout中没有batchedUpdates
    // setTimeout(() => {
    //   this.countNumber()
    // }, 0)

    // 主动batchedUpdates
    // setTimeout(() => {
    //   batchedUpdates(() => this.countNumber())
    // }, 0)
  }
```

## 说一下React组件渲染和更新的过程
渲染
- 有 props 和 state
- render 生成 vnode
- patch(lem, vnode)

更新
- setState(newState) -> dirtyComponents（可能有子组件）
- render 生成 newVnode
- patch(vnode, newVnode)

patch 分为两个阶段
- reconciliation 阶段 - 执行 diff 算法，纯 js 计算
- commit 阶段 - 将 diff 结果渲染 dom

可能有性能问题:由于 js 是单线程的，并且和 dom 共用一个线程，组件更新时的渲染和计算的压力大，这是要是再有 dom 操作（如动画、拖拽）将卡顿。

解决方案：fiber

将 reconciliation 阶段进行拆分（commit 阶段无法拆分，所以不拆）,dom 需要渲染时（通过 window.requestIdleCallback），则暂停更新，空闲时恢复更新


## 什么是纯函数
- 返回一个新值，没有副作用(不会'偷偷'修改其他值)
- 重点:不可变值
- 如arr1 = arr.slice()

## React性能优化
- 渲染列表时加key
- 自定义事件、DOM事件及时销毁
- 合理使用异步组件
- 减少函数bind this的次数
- 合理使用shouldComponentUpdate、PureComponent和memo
- 合理使用Immutable.js
- webpack层面优化
- 前端通用的性能优化，如图片懒加载
- SSR

## React和Vue的区别以及优缺点
相同点:
- 支持组件化
- 数据驱动视图
- 使用vdom操作DOM

区别:
- React使用JSX拥抱JS，Vue使用模板拥抱html
- React函数式编程，Vue声明式编程
- React更多需要自力更生，Vue把想要的都给你

## 函数组件特点
- 没有组件实例
- 没有生命周期
- 没有state和setState，只能接收props

## class组件的问题
- 大型组件很难拆分和重构。很难测试(即class不易拆分)
- 相同业务逻辑，分散到各个方法中，逻辑混乱
- 复用逻辑变的复杂，如mixins、HOC、Render Prop

## useState
- useState(0)传入初始值，返回数组[state,setState]
- 通过state获取值
- 通过setState(1)修改值

## 让函数组件模拟生命周期
- 默认函数组件是没有生命周期
- 函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期
- 使用Effect Hook把生命周期'钩'到纯函数中

## useEffect
- 模拟componentDidMount-useEffect依赖[]
- 模拟componentDidUpdate-useEffect无依赖，或依赖[a,b]
- 模拟componentWillUnMount-useEffect中返回一个函数

## useEffect中返回的函数fn
- useEffect依赖[]，组件销毁是执行fn，等于WillUnMount
- useEffect无依赖或依赖[a,b]，组件更新时执行fn
- 即，下一次执行useEffect之前，就会执行fn，无论更新或卸载

## useReducer和redux区别
- useReducer是useState的代替方案，用于state复杂变化
- useReducer是单个组件状态管理，组件通讯还需要props
- redux是全局的状态管理，多组件共享数据

## 自定义Hook
- 封装通用的功能
- 开发和使用第三方Hooks
- 自定义Hook带来了无限扩展性，解耦代码

## Hooks使用规范
- 只能用于React函数组件和自定义Hook中，其他地方不可以
- 只能用于顶层代码，不能在循环、判断中使用Hooks

## React Hooks注意事项
- useState初始化值，只有第一次有效
- useEffect内部不能修改state
- useEffect可能出现死循环

## 如何在 Redux 中定义 Action
React中的Action必须具有type属性，该属性指示正在执行Action的类型。必须将它们定义为字符串常量，并且还可以向其添加更多的属性。在Redux中，action被名为Action Creators的函数所创建。
```js
function addTodo(text) {
       return {
                type: ADD_TODO,
                 text
    }
}
```

## 对 React 的 refs 了解
Refs 是 React 中引用的简写。它是一个有助于存储对特定的 React 元素或组件的引用的属性，它将由组件渲染配置函数返回。用于对 render() 返回的特定元素或组件的引用。当需要进行 DOM 测量或向组件添加方法时，它们会派上用场。
```js
class ReferenceDemo extends React.Component{
     display() {
         const name = this.inputDemo.value;
         document.getElementById('disp').innerHTML = name;
     }
render() {
    return(
          <div>
            Name: <input type="text" ref={input => this.inputDemo = input} />
            <button name="Click" onClick={this.display}>Click</button>
            <h2>Hello <span id="disp"></span> !!!</h2>
          </div>
    );
   }
 }
```

## react有什么坑点
1. JSX做表达式判断时候需要强转为boolean类型

如果不使用 !!b 进行强转数据类型会在页面里面输出 0。
```js
render() {
  const b = 0;
  return <div>
    {
      !!b && <div>这是一段文本</div>
    }
  </div>
}
```
2.尽量不要在 componentWillReviceProps 里使用 setState，如果一定要使用那么需要判断结束条件不然会出现无限重渲染导致页面崩溃

3.给组件添加ref时候尽量不要使用匿名函数，因为当组件更新的时候匿名函数会被当做新的prop处理，让ref属性接受到新函数的时候，react内部会先清空ref，也就是会以null为回调参数先执行一次ref，这个props然后在以该组件的实例执行一次ref，所以用匿名函数做ref的时候，有的时候去ref赋值后的属性会取到null

4.遍历子节点的时候不要用 index 作为组件的 key 进行传入

## React中的状态是什么？它是如何使用的？
状态是 React 组件的核心，是数据的来源，必须尽可能简单。基本上状态是确定组件呈现和行为的对象。与props 不同，它们是可变的，并创建动态和交互式组件。可以通过 this.state() 访问它们。

## redux的工作流程
首先，我们看下几个核心概念：

1、 Store：保存数据的地方，你可以把它看成一个容器，整个应用只能有一个Store。

2、 State：Store对象包含所有数据，如果想得到某个时点的数据，就要对Store生成快照，这种时点的数据集合，就叫做State。

3、 Action：State的变化，会导致View的变化。但是，用户接触不到State，只能接触到View。所以，State的变化必须是View导致的。Action就是View发出的通知，表示State应该要发生变化了。

4、 Action Creator：View要发送多少种消息，就会有多少种Action。如果都手写，会很麻烦，所以我们定义一个函数来生成Action，这个函数就叫Action Creator。

5、 Reducer：Store收到Action以后，必须给出一个新的State，这样View才会发生变化。这种State的计算过程就叫做Reducer。Reducer是一个函数，它接受Action和当前State作为参数，返回一个新的State。

6、 dispatch：是View发出Action的唯一方法。

然后我们过下整个工作流程：

1、 首先，用户（通过View）发出Action，发出方式就用到了dispatch方法。

2、 然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State

3、 State一旦有变化，Store就会调用监听函数，来更新View。

到这儿为止，一次用户交互流程结束。可以看到，在整个流程中数据都是单向流动的，这种方式保证了流程的清晰。

![](/react/basis/97_11.png)

## 如何理解fiber的
React Fiber 是一种基于浏览器的单线程调度算法.

React 16之前 ，reconcilation 算法实际上是递归，想要中断递归是很困难的，React 16 开始使用了循环来代替之前的递归.

Fiber：一种将 recocilation （递归 diff），拆分成无数个小任务的算法；它随时能够停止，恢复。停止恢复的时机取决于当前的一帧（16ms）内，还有没有足够的时间允许计算。


## Redux遵循的三个原则是什么
1、  单一事实来源：整个应用的状态存储在单个 store 中的对象/状态树里。单一状态树可以更容易地跟踪随时间的变化，并调试或检查应用程序。

2、  状态是只读的：改变状态的唯一方法是去触发一个动作。动作是描述变化的普通 JS 对象。就像 state 是数据的最小表示一样，该操作是对数据更改的最小表示。

3、  使用纯函数进行更改：为了指定状态树如何通过操作进行转换，你需要纯函数。纯函数是那些返回值仅取决于其参数值的函数。


## react 的渲染过程中兄弟节点之间是怎么处理的也就是key值不一样的时候
通常我们输出节点的时候都是map，一个数组然后返回一个ReactNode，为了方便react内部进行优化，我们必须给每一个reactNode添加key，这个key prop在设计值处不是给开发者用的，而是给react用的，大概的作用就是给每一个reactNode添加一个身份标识，方便react进行识别，在重渲染过程中，如果key一样，若组件属性有所变化则react只更新组件，对应的属性没有变化则不更新，如果key不一样，则react先销毁该组件，然后重新创建该组件








