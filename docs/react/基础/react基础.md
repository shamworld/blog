# react 基础

## React17 原理

React17 中的 JSX 转换不会将 JSX 转换为 React.createElement，而是自动从 React 的 package 中引入入口函数并调用。另外此次升级不会改变 JSX 不会改变 JSX 语法，旧的 JSX 转换也将继续工作。

## React 中的事件处理为什么要 bind this？

首先我们知道 React 是通过创建虚拟 DOM，然后将虚拟 DOM 生成真实 DOM 最后插入到页面中，而 React 生命周期中 render 方法的作用就是将虚拟 DOM 渲染成真实 DOM。在 JSX 语法中:`onClick={function}` onClick 这个属性本身只是一个"中间变量"。将函数赋值给 onClick 这个中间变量，后面要进行 JSX 语法转化，将 JSX 组件转换成 JavaScript 对象，进而转换成真实 DOM。把 onClick 作为中间变量，指向一个函数的时候，后面的一些列处理中，使用 onClick 这个中间变量所指向的函数，里面的 this 会自然丢失掉了，不是在指向 React 组件实例了。

## 为什么 React 没有自动的把 bind 集成到 render 方法中呢?

因为 render 函数会被多次调用，每次都要 bind 会影响性能，所以官方建议你自己在 constructor 中手动 bind 达到性能优化。

## react 事件和 dom 事件的区别

```js
function App() {
  const onClickButton = (event) => {
    event.preventDefault(); // 阻止默认行为
    event.stopPropagation(); // 阻止冒泡
    console.log("target", event.target); // 指向当前元素，即当前元素触发
    console.log("current target", event.currentTarget); // 指向当前元素，假象！！！

    // 注意，event 其实是 React 封装的。可以看 __proto__.constructor 是 SyntheticEvent 组合事件
    console.log("event", event); // 不是原生的 Event ，原生的 MouseEvent
    console.log("event.__proto__.constructor", event.__proto__.constructor);

    // 原生 event 如下。其 __proto__.constructor 是 MouseEvent
    console.log("nativeEvent", event.nativeEvent);
    console.log("nativeEvent target", event.nativeEvent.target); // 指向当前元素，即当前元素触发
    console.log("nativeEvent current target", event.nativeEvent.currentTarget); // 指向 document ！！！
  };
  return (
    <div className="App">
      <button onClick={onClickButton}>点我</button>
    </div>
  );
}
```

- event 是合成事件 SyntheticEvent ，模拟出来 DOM 事件所有能力
- event.nativeEvent 是原生事件对象
- 所有的事件，在 React16 是挂载到 document 上，在 React17 上是挂载到 root 上
- 和 DOM 事件不一样，和 Vue 事件也不一样

合成事件优点：

- 更好的兼容性和跨平台
- 挂载 document，减少内存消耗，避免频繁解绑
- 方便事件的统一管理(如事务机制)

事件的执行顺序为原生事件先执行，合成事件后执行，合成事件会冒
泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如
果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到
document 上合成事件才会执行。

## React 组件中怎么做事件代理？它的原理是什么？

React 基于 Virtual DOM 实现了一个 SyntheticEvent 层（合成事件
层），定义的事件处理器会接收到一个合成事件对象的实例，它符合
W3C 标准，且与原生的浏览器事件拥有同样的接口，支持冒泡机制，
所有的事件都自动绑定在最外层上。

在 React 底层，主要对合成事件做了两件事：

- 事件委派：React 会把所有的事件绑定到结构的最外层，使用统一的事件监听器，
  这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数。
- 自动绑定：React 组件中，每个方法的上下文都会指向该组件的实例，即自动绑定 this 为当前组件。

## Component, Element, Instance 之间有什么区别和联系？

- 元素：一个元素 element 是一个普通对象(plain object)，描述了对
  于一个 DOM 节点或者其他组件 component，你想让它在屏幕上呈现成
  什么样子。元素 element 可以在它的属性 props 中包含其他元素(译
  注:用于形成元素树)。创建一个 React 元素 element 成本很低。元素
  element 创建之后是不可变的。
- 组件：一个组件 component 可以通过多种方式声明。可以是带有一个
  render()方法的类，简单点也可以定义为一个函数。这两种情况下，
  它都把属性 props 作为输入，把返回的一棵元素树作为输出。
- 实例：一个实例 instance 是你在所写的组件类 component class 中
  使用关键字 this 所指向的东西(译注:组件实例)。它用来存储本地状
  态和响应生命周期事件很有用。

函数式组件(Functional component)根本没有实例 instance。类组
件(Class component)有实例 instance，但是永远也不需要直接创建
一个组件的实例，因为 React 帮我们做了这些。

## React 如何判断什么时候重新渲染组件

组件状态的改变可以因为 props 的改变，或者直接通过 setState 方
法改变。组件获得新的状态，然后 React 决定是否应该重新渲染组件。
只要组件的 state 发生变化，React 就会对组件进行重新渲染。这是
因为 React 中的 shouldComponentUpdate 方法默认返回 true，这就
是导致每次更新都重新渲染的原因。

当 React 将要渲染组件时会执行 shouldComponentUpdate 方法来看它
是否返回 true（组件应该更新，也就是重新渲染）。所以需要重写
shouldComponentUpdate 方法让它根据情况返回 true 或者 false 来
告诉 React 什么时候重新渲染什么时候跳过重新渲染。

## React 中可以在 render 访问 refs 吗？为什么？

不可以，render 阶段 DOM 还没有生成，无法获取 DOM。DOM 的获取
需要在 pre-commit 阶段和 commit 阶段：
![](/react/basis/745b7d25dc166a6.png)

## React 中 setState 后发生了什么

在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发调和过程(Reconciliation)。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。

在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

如果在短时间内频繁 setState。React 会将 state 的改变压入栈中，在合适的时机，批量更新 state 和视图，达到提高性能的效果。

## setState

1、 setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的

2、 setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前导致在合成事件和钩子函数中没法立马拿到更新后的值形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback)中的 callback 拿到更新后的结果

3、 setState 的批量更新优化也是建立在“异步”合成事件、钩子函数之上的，在原生事件和 setTimeout 中不会批量更新在“异步”中，如果对同一个值进行多次 setState 的批量更新，策略会对其进行覆盖取最后一次的执行，如果是同时 setState 多个不同的值在更新时会对其进行合并批量更新

- 不可变值

```js
// 不可变值（函数式编程，纯函数） - 数组
const list5Copy = this.state.list5.slice();
list5Copy.splice(2, 0, "a"); // 中间插入/删除
this.setState({
  list1: this.state.list1.concat(100), // 追加
  list2: [...this.state.list2, 100], // 追加
  list3: this.state.list3.slice(0, 3), // 截取
  list4: this.state.list4.filter((item) => item > 100), // 筛选
  list5: list5Copy, // 其他操作
});
// 注意，不能直接对 this.state.list 进行 push pop splice 等，这样违反不可变值

// 不可变值 - 对象
this.setState({
  obj1: Object.assign({}, this.state.obj1, { a: 100 }),
  obj2: { ...this.state.obj2, a: 100 },
});
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
    count: this.state.count + 1,
  });
  this.setState({
    count: this.state.count + 1,
  });
  this.setState({
    count: this.state.count + 1,
  });

  // 传入函数，不会被合并。执行结果是 +3
  this.setState((prevState, props) => {
    return {
      count: prevState.count + 1,
    };
  });
  this.setState((prevState, props) => {
    return {
      count: prevState.count + 1,
    };
  });
  this.setState((prevState, props) => {
    return {
      count: prevState.count + 1,
    };
  });
};
```

## React 生命周期

[生命周期图](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![](/react/basis/e012d4a9407fb67.png)

![](/react/basis/745b7d25dc166a6.png)

## React 函数组件和 class 组件

**相同之处**

- props 不能改变
- 父组件 props 有变化时，子组件随之而改变

**区别**
| 区别 | 函数组件 | 类组件 |
| -- | -- | -- |
| 生命周期 | 无 | 有 |
| this | 无 | 有 |
| state | 无 | 有 |
| 改变 state | React.Hooks:useState | this.setState() |
| 性能 | 高(不用实例化) | 低(需要实例化) |

## 受控组件和非受控组件

### 受控组件

在 HTML 中，标签`<input>`、`<textarea>`、`<select>`的值的改变通常是根据用户输入进行更新。在 React 中，可变状态通常保存在受控组件的状态属性中，并且只能使用`setState()`更新，而呈现表达的 React 组件也控制着在后续用户输入时该表达中发生的情况，以这种由 React 控制的输入表单元素而改变其值的方式。

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}
```

![](/react/basis/1029246-20170424164113537-1517458643.png)

- name 开始是空字符串''。
- 当输入 a，并 handleNameChange 获取 a 和调用 setState。然后，该输入被重新呈现为具有的值 a。
- 当输入 b，handleNameChange 获取 ab 并设置该状态的值。现在再次重新渲染输入 value="ab"。

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

当注释 this.setState({value: event.target.value}); 这行代码，文本框再次输入时，页面不会重新渲染，所产生效果即是文本框输入不了值，即文本框值的改变受到 setState()方法的控制，在未执行时，不重新渲染组件

### 非受控组件

表单数据由 DOM 本身处理。即不受 setState()的控制，与传统的 HTML 表单输入相似，input 输入值即显示最新值(使用 ref 从 DOM 获取表单值)

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => (this.input = input)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

使用场景:

- 必须手动操作 DOM 元素，setState 实现不了
- 文件上传`<input type=file/>`
- 某些富文本编辑器，需要传入 DOM 元素

**结论**

- 优先使用受控组件，符合 React 设计原则
- 必须操作 DOM 时，再使用非受控组件

## Portals

- 组件默认会按照既定层次嵌套渲染
- 如何让组件渲染到父组件以外?

```js
import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    );
  }
}

export default App;
```

使用场景:

- overflow: hidden
- 父组件 z-index 值太小
- fixed 需要放在 body 第一层级

## context

```js
import React from "react";

// 创建 Context 填入默认值（任何一个 js 变量）
const ThemeContext = React.createContext("light");

// 底层组件 - 函数是组件
function ThemeLink(props) {
  // const theme = this.context // 会报错。函数式组件没有实例，即没有 this

  // 函数式组件可以使用 Consumer
  return (
    <ThemeContext.Consumer>
      {(value) => <p>link's theme is {value}</p>}
    </ThemeContext.Consumer>
  );
}

// 底层组件 - class 组件
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // static contextType = ThemeContext // 也可以用 ThemedButton.contextType = ThemeContext
  render() {
    const theme = this.context; // React 会往上找到最近的 theme Provider，然后使用它的值。
    return (
      <div>
        <p>button's theme is {theme}</p>
      </div>
    );
  }
}
ThemedButton.contextType = ThemeContext; // 指定 contextType 读取当前的 theme context。

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
      <ThemeLink />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
    };
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Toolbar />
        <hr />
        <button onClick={this.changeTheme}>change theme</button>
      </ThemeContext.Provider>
    );
  }
  changeTheme = () => {
    this.setState({
      theme: this.state.theme === "light" ? "dark" : "light",
    });
  };
}

export default App;
```

## React 如何异步加载组件

因为项目中存在一些不必要的状态重复计算和 UI 重复渲染，为了做出优化，所有就有了异步加载组件

- import()
- React.lazy
- React.Suspense

```js
import React from "react";
const ContextDemo = React.lazy(() => import("./ContextDemo"));
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>引入一个动态组件</p>
        <hr />
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContextDemo />
        </React.Suspense>
      </div>
    );
    // 1. 强制刷新，可看到 loading （看不到就限制一下 chrome 网速）
    // 2. 看 network 的 js 加载
  }
}

export default App;
```

## shouldComponentUpdate

React 默认：父组件有更新，子组件则无条件也更新！！！

性能优化对于 React 更加重要！

SCU 一定要每次都用吗？—— 需要的时候才优化

不许配合"不可变值"一起使用

```js
import React from "react";
import PropTypes from "prop-types";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }
  render() {
    return (
      <div>
        <input value={this.state.title} onChange={this.onTitleChange} />
        <button onClick={this.onSubmit}>提交</button>
      </div>
    );
  }
  onTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  onSubmit = () => {
    const { submitTitle } = this.props;
    submitTitle(this.state.title); // 'abc'

    this.setState({
      title: "",
    });
  };
}
// props 类型检查
Input.propTypes = {
  submitTitle: PropTypes.func.isRequired,
};

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  // 增加 shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState) {
    // _.isEqual 做对象或者数组的深度比较（一次性递归到底）
    if (_.isEqual(nextProps.list, this.props.list)) {
      // 相等，则不重复渲染
      return false;
    }
    return true; // 不相等，则渲染
  }
  render() {
    const { list } = this.props;

    return (
      <ul>
        {list.map((item, index) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}
// props 类型检查
List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>
        {this.props.text}
        {this.props.length}
      </p>
    );
  }
  componentDidUpdate() {
    console.log("footer did update");
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.text !== this.props.text ||
      nextProps.length !== this.props.length
    ) {
      return true; // 可以渲染
    }
    return false; // 不重复渲染
  }
}

class TodoListDemo extends React.Component {
  constructor(props) {
    super(props);
    // 状态（数据）提升
    this.state = {
      list: [
        {
          id: "id-1",
          title: "标题1",
        },
        {
          id: "id-2",
          title: "标题2",
        },
        {
          id: "id-3",
          title: "标题3",
        },
      ],
      footerInfo: "底部文字",
    };
  }
  render() {
    return (
      <div>
        <Input submitTitle={this.onSubmitTitle} />
        <List list={this.state.list} />
        <Footer text={this.state.footerInfo} length={this.state.list.length} />
      </div>
    );
  }
  onSubmitTitle = (title) => {
    this.setState({
      list: this.state.list.concat({
        id: `id-${Date.now()}`,
        title,
      }),
    });
  };
}

export default TodoListDemo;
```

## PureComponent 和 memo

- PureComponent，SCU 中实现了浅比较

```js
class Input extends React.Component {}
class List extends React.PureComponent {
  shouldComponentUpdate() {} //浅比较
}
```

- memo，函数组件中的 PureComponent

```js
function MyComponent(props) {
  /* 使用props渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
        如果把nextProps传入render方法的返回结果与将
        prevProps传入render方法的返回结果一致则返回true，
        否则返回false
    */
}
export default React.memo(MyComponent, areEqual);
```

- 浅比较已使用大部分情况(尽量不要做深比较)

## React 组件通信如何实现?

React 组件间通信⽅式:

- ⽗组件向⼦组件通讯: ⽗组件可以向⼦组件通过传 props 的⽅式，向⼦组件进⾏通讯
- ⼦组件向⽗组件通讯: props+回调的⽅式,⽗组件向⼦组件传递 props 进⾏通讯，此 props 为作⽤域为⽗组件⾃身的函数，⼦组件调⽤该函数，将⼦组件想要传递的信息，作为参数，传递到⽗组件的作⽤域中
- 兄弟组件通信: 找到这两个兄弟节点共同的⽗节点,结合上⾯两种⽅式由⽗节点转发信息进⾏信
- 跨层级通信: Context 设计⽬的是为了共享那些对于⼀个组件树⽽⾔是“全局”的数据，例如当前认证的⽤户、主题或⾸选语⾔,对于跨越多层的全局数据通过 Context 通信再适合不过
- 发布订阅模式: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引⼊ event 模块进⾏通信
- 全局状态管理⼯具: 借助 Redux 或者 Mobx 等全局状态管理⼯具进⾏通信,这种⼯具会维护⼀个全局状态中⼼ Store,并根据不同的事件产⽣新的状态

## 关于组件公共逻辑的抽离

- mixin，已被 React 弃用
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
import React from "react";

// 高阶组件
const withMouse = (Component) => {
  class withMouseComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
    }

    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY,
      });
    };

    render() {
      return (
        <div style={{ height: "500px" }} onMouseMove={this.handleMouseMove}>
          {/* 1. 透传所有 props 2. 增加 mouse 属性 */}
          <Component {...this.props} mouse={this.state} />
        </div>
      );
    }
  }
  return withMouseComponent;
};

const App = (props) => {
  const a = props.a;
  const { x, y } = props.mouse; // 接收 mouse 属性
  return (
    <div style={{ height: "500px" }}>
      <h1>
        The mouse position is ({x}, {y})
      </h1>
      <p>{a}</p>
    </div>
  );
};

export default withMouse(App); // 返回高阶函数
```

```js
//Render Props的核心思想
//通过一个函数将class组件的state作为props传递给纯函数组件
class Factory extends React.Component {
  constructor() {
    this.state = {
      /* state即多个组件的公共逻辑的数据 */
    };
  }
  /* 修改state */
  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}

const App = () => {
  <Factory
    render={
      /* render是一个函数组件 */
      (props) => (
        <p>
          {props.a}
          {props.b}...
        </p>
      )
    }
  />;
};
```

## mixin、hoc、render props、react-hooks 的优劣如何？

### Mixin 的缺陷：

- 组件与 Mixin 之间存在隐式依赖（Mixin 经常依赖组件的特定⽅法，但在定义组件时并不知道这种依赖关系）
- 多个 Mixin 之间可能产⽣冲突（⽐如定义了相同的 state 字段）
- Mixin 倾向于增加更多状态，这降低了应⽤的可预测性，导致复杂度剧增
- 隐式依赖导致依赖关系不透明，维护成本和理解成本迅速攀升：
  - 难以快速理解组件⾏为，需要全盘了解所有依赖 Mixin 的扩展⾏为，及其之间的相互影响
  - 组价⾃身的⽅法和 state 字段不敢轻易删改，因为难以确定有没有 Mixin 依赖它
  - Mixin 也难以维护，因为 Mixin 逻辑最后会被打平合并到⼀起，很难搞清楚⼀个 Mixin 的输⼊输出

### HOC 相⽐ Mixin 的优势:

- HOC 通过外层组件通过 Props 影响内层组件的状态，⽽不是直接改变其 State 不存在冲突和互相⼲扰,这就降低了耦合度
- 不同于 Mixin 的打平+合并，HOC 具有天然的层级结构（组件树结构），这⼜降低了复杂度

### HOC 的缺陷:

- 扩展性限制: HOC ⽆法从外部访问⼦组件的 State 因此⽆法通过 shouldComponentUpdate 滤掉不必要的更新,React 在⽀持 ES6 Class 之后提供了 React.PureComponent 来解决这个问题
- Ref 传递问题: Ref 被隔断,后来的 React.forwardRef 来解决这个问题
- Wrapper Hell: HOC 可能出现多层包裹组件的情况,多层抽象同样增加了复杂度和理解成本
- 命名冲突: 如果⾼阶组件多次嵌套,没有使⽤命名空间的话会产⽣冲突,然后覆盖⽼属性
- 不可⻅性: HOC 相当于在原有组件外层再包装⼀个组件,你压根不知道外层的包装是啥,对于你是⿊盒

### Render Props 优点:

上述 HOC 的缺点 Render Props 都可以解决

### Render Props 缺陷:

- 使⽤繁琐: HOC 使⽤只需要借助装饰器语法通常⼀⾏代码就可以进⾏复⽤,Render Props ⽆法做到如此简单
- 嵌套过深: Render Props 虽然摆脱了组件多层嵌套的问题,但是转化为了函数回调的嵌套
  React Hooks 优点:
- 简洁: React Hooks 解决了 HOC 和 Render Props 的嵌套问题,更加简洁
- 解耦: React Hooks 可以更⽅便地把 UI 和状态分离,做到更彻底的解耦
- 组合: Hooks 中可以引⽤另外的 Hooks 形成新的 Hooks,组合变化万千
- 函数友好: React Hooks 为函数组件⽽⽣,从⽽解决了类组件的⼏⼤问题:
  - this 指向容易错误
  - 分割在不同声明周期中的逻辑使得代码难以理解和维护
  - 代码复⽤成本⾼（⾼阶组件容易使代码量剧增）

### React Hooks 缺陷:

- 额外的学习成本（Functional Component 与 Class Component 之间的困惑）
- 写法上有限制（不能出现在条件、循环中），并且写法限制增加了重构成本
- 破坏了 PureComponent、React.memo 浅⽐较的性能优化效果（为了取最新的 props 和 state，每次 render()都要重新创建事件处函数）
- 在闭包场景可能会引⽤到旧的 state、props 值
- 内部实现上不直观（依赖⼀份可变的全局状态，不再那么“纯”）
- React.memo 并不能完全替代 shouldComponentUpdate（因为拿不到 state change，只针对 props change）

## ReactDOM.render(element,contrainer,callback)

在内部返回 legacyRenderSubtreeIntoContainer()的调用，判断 root 是否存在，当不存在时表明首次调用，然后执行 updateContainer()函数进行非批量更新，_可以保证更新效率与用户体验_，容器节点里面的所有 dom 元素都会被替换；后续调用则会调用 updateContainer()函数进行算法 diff 高效的更新。

如果提供了可选的回调函数，该回调函数将在组件被渲染活更新之后被执行。

## diff 算法

### 策略:

- 同级比较，Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
- 拥有不同类型的两个组件将会生成不同的树形结构。例如:div->p,CompA->CompB。
- 开发者可以通过`key` prop 来暗示哪些子元素在不同的渲染下能保持稳定。

### 过程

对比两个虚拟 dom 时会有三种操作:删除，替换和更新

vnode 是现在的虚拟 dom，newVnode 是新虚拟 dom。

- 删除:newVnode 不存在时
- 替换:vnode 和 newVnode 类型不同或 key 不同时
- 更新:有相同类型和 key 但 vnode 和 newVnode 不同时

## JSX 本质

JSX 的本质就是一个 React.createElement 函数，它接收多个参数来返回 Vnode

- 第一个参数是标签名
  - 可能是原生的 HTML 标签名，是一个小写字母开头的字符串；
  - 可能是一个自定义的组件，React 规定自定义组件以大写字母开头；
- 第二个参数是属性信息，如果没有属性则为 null；
- 第三个参数是子元素；
  - 如果拥有多个子元素，可以依次放在第三个、第四个...
  - 也可以用在数组中存放多个子元素

## batchUpdates - setState 批量更新

setState 的执行原理：

![](/react/basis/20210213210927272.png)

- setState 接收一个新的状态
- 该接收到的新状态不会被立即执行么，而是存入到 pendingStates（等待队列）中
- 判断 isBatchingUpdates（是否是批量更新模式）
  - isBatchingUpdates: true 将接收到的新状态保存到 dirtyComponents(脏组件)中
  - isBatchingUpdates: false 遍历所有的 dirtyComponents， 并且调用其 updateComponent 方法更新 pendingStates 中的 state 或者 props。执行完之后，回将 isBatchingUpdates: true

```js
handleClick = () => {
  // 事件处理函数自带batchedUpdates
  this.countNumber();

  // setTimeout中没有batchedUpdates
  // setTimeout(() => {
  //   this.countNumber()
  // }, 0)

  // 主动batchedUpdates
  // setTimeout(() => {
  //   batchedUpdates(() => this.countNumber())
  // }, 0)
};
```

## 说一下 React 组件渲染和更新的过程

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
- 如 arr1 = arr.slice()

## React 性能优化

- 渲染列表时加 key
- 自定义事件、DOM 事件及时销毁
- 合理使用异步组件
- 减少函数 bind this 的次数
- 合理使用 shouldComponentUpdate、PureComponent 和 memo
- 合理使用 Immutable.js
- webpack 层面优化
- 前端通用的性能优化，如图片懒加载
- SSR

## React 和 Vue 的区别以及优缺点

相同点:

- 支持组件化
- 数据驱动视图
- 使用 vdom 操作 DOM

区别:

- React 使用 JSX 拥抱 JS，Vue 使用模板拥抱 html
- React 函数式编程，Vue 声明式编程
- React 更多需要自力更生，Vue 把想要的都给你

## 函数组件特点

- 没有组件实例
- 没有生命周期
- 没有 state 和 setState，只能接收 props

## class 组件的问题

- 大型组件很难拆分和重构。很难测试(即 class 不易拆分)
- 相同业务逻辑，分散到各个方法中，逻辑混乱
- 复用逻辑变的复杂，如 mixins、HOC、Render Prop

## useState

- useState(0)传入初始值，返回数组[state,setState]
- 通过 state 获取值
- 通过 setState(1)修改值

## 让函数组件模拟生命周期

- 默认函数组件是没有生命周期
- 函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期
- 使用 Effect Hook 把生命周期'钩'到纯函数中

## useEffect

- 模拟 componentDidMount-useEffect 依赖[]
- 模拟 componentDidUpdate-useEffect 无依赖，或依赖[a,b]
- 模拟 componentWillUnMount-useEffect 中返回一个函数

## useEffect 中返回的函数 fn

- useEffect 依赖[]，组件销毁是执行 fn，等于 WillUnMount
- useEffect 无依赖或依赖[a,b]，组件更新时执行 fn
- 即，下一次执行 useEffect 之前，就会执行 fn，无论更新或卸载

## useReducer 和 redux 区别

- useReducer 是 useState 的代替方案，用于 state 复杂变化
- useReducer 是单个组件状态管理，组件通讯还需要 props
- redux 是全局的状态管理，多组件共享数据

## 自定义 Hook

- 封装通用的功能
- 开发和使用第三方 Hooks
- 自定义 Hook 带来了无限扩展性，解耦代码

## Hooks 使用规范

- 只能用于 React 函数组件和自定义 Hook 中，其他地方不可以
- 只能用于顶层代码，不能在循环、判断中使用 Hooks

## React Hooks 注意事项

- useState 初始化值，只有第一次有效
- useEffect 内部不能修改 state
- useEffect 可能出现死循环

## 如何在 Redux 中定义 Action

React 中的 Action 必须具有 type 属性，该属性指示正在执行 Action 的类型。必须将它们定义为字符串常量，并且还可以向其添加更多的属性。在 Redux 中，action 被名为 Action Creators 的函数所创建。

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}
```

## 对 React 的 refs 了解

Refs 是 React 中引用的简写。它是一个有助于存储对特定的 React 元素或组件的引用的属性，它将由组件渲染配置函数返回。用于对 render() 返回的特定元素或组件的引用。当需要进行 DOM 测量或向组件添加方法时，它们会派上用场。

```js
class ReferenceDemo extends React.Component {
  display() {
    const name = this.inputDemo.value;
    document.getElementById("disp").innerHTML = name;
  }
  render() {
    return (
      <div>
        Name: <input type="text" ref={(input) => (this.inputDemo = input)} />
        <button name="Click" onClick={this.display}>
          Click
        </button>
        <h2>
          Hello <span id="disp"></span> !!!
        </h2>
      </div>
    );
  }
}
```

## react 有什么坑点

1. JSX 做表达式判断时候需要强转为 boolean 类型

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

3.给组件添加 ref 时候尽量不要使用匿名函数，因为当组件更新的时候匿名函数会被当做新的 prop 处理，让 ref 属性接受到新函数的时候，react 内部会先清空 ref，也就是会以 null 为回调参数先执行一次 ref，这个 props 然后在以该组件的实例执行一次 ref，所以用匿名函数做 ref 的时候，有的时候去 ref 赋值后的属性会取到 null

4.遍历子节点的时候不要用 index 作为组件的 key 进行传入

## React 中的状态是什么？它是如何使用的？

状态是 React 组件的核心，是数据的来源，必须尽可能简单。基本上状态是确定组件呈现和行为的对象。与 props 不同，它们是可变的，并创建动态和交互式组件。可以通过 this.state() 访问它们。

## redux 的工作流程

首先，我们看下几个核心概念：

1、 Store：保存数据的地方，你可以把它看成一个容器，整个应用只能有一个 Store。

2、 State：Store 对象包含所有数据，如果想得到某个时点的数据，就要对 Store 生成快照，这种时点的数据集合，就叫做 State。

3、 Action：State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

4、 Action Creator：View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦，所以我们定义一个函数来生成 Action，这个函数就叫 Action Creator。

5、 Reducer：Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

6、 dispatch：是 View 发出 Action 的唯一方法。

然后我们过下整个工作流程：

1、 首先，用户（通过 View）发出 Action，发出方式就用到了 dispatch 方法。

2、 然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action，Reducer 会返回新的 State

3、 State 一旦有变化，Store 就会调用监听函数，来更新 View。

到这儿为止，一次用户交互流程结束。可以看到，在整个流程中数据都是单向流动的，这种方式保证了流程的清晰。

![](/react/basis/97_11.png)

## 如何理解 fiber 的

React Fiber 是一种基于浏览器的单线程调度算法.

React 16 之前 ，reconcilation 算法实际上是递归，想要中断递归是很困难的，React 16 开始使用了循环来代替之前的递归.

Fiber：一种将 recocilation （递归 diff），拆分成无数个小任务的算法；它随时能够停止，恢复。停止恢复的时机取决于当前的一帧（16ms）内，还有没有足够的时间允许计算。

## Redux 遵循的三个原则是什么

1、 单一事实来源：整个应用的状态存储在单个 store 中的对象/状态树里。单一状态树可以更容易地跟踪随时间的变化，并调试或检查应用程序。

2、 状态是只读的：改变状态的唯一方法是去触发一个动作。动作是描述变化的普通 JS 对象。就像 state 是数据的最小表示一样，该操作是对数据更改的最小表示。

3、 使用纯函数进行更改：为了指定状态树如何通过操作进行转换，你需要纯函数。纯函数是那些返回值仅取决于其参数值的函数。

## react-redux 是如何⼯作的?

- Provider: Provider 的作⽤是从最外部封装了整个应⽤，并向 connect 模块传递 store
- connect: 负责连接 React 和 Redux
  - 获取 state: connect 通过 context 获取 Provider 中的 store，通过 store.getState()获取整个 store tree 上所有 state
  - 包装原组件: 将 state 和 action 通过 props 的⽅式传⼊到原组件内部 wrapWithConnect 返回⼀个 ReactComponent 对象 Connect，Connect 重新 render 外部传⼊的原组件 WrappedComponent，并把 connect 中传⼊的 mapStateToProps, mapDispatchToProps 与组件上原有的 props 合并后，通过属性的⽅式传给
    WrappedComponent
  - 监听 store tree 变化: connect 缓存了 store tree 中 state 的状态,通过当前 state 状态和变更前 state 状态进⾏⽐较,从⽽确定是否调⽤ this.setState() ⽅法触发 Connect 及其⼦组件的重新渲染

![](/react/basis/1695131806452.jpg)

## redux 与 mobx 的区别?

两者对⽐:

- redux 将数据保存在单⼀的 store 中，mobx 将数据保存在分散的多个 store 中
- redux 使⽤ plain object 保存数据，需要⼿动处理变化后的操作；mobx 适⽤ observable 保存数据，数据变化后⾃动处理响应的操作
- redux 使⽤不可变状态，这意味着状态是只读的，不能直接去修改它，⽽是应该返回⼀个新的状态，同时使⽤纯函
  数；mobx 中的状态是可变的，可以直接对其进⾏修改
- mobx 相对来说⽐较简单，在其中有很多的抽象，mobx 更多的使⽤⾯向对象的编程思维；redux 会⽐较复杂，因为
  其中的函数式编程思想掌握起来不是那么容易，同时需要借助⼀系列的中间件来处理异步和副作⽤
- mobx 中有更多的抽象和封装，调试会⽐较困难，同时结果也难以预测；⽽ redux 提供能够进⾏时间回溯的开发⼯
  具，同时其纯函数以及更少的抽象，让调试变得更加的容易

场景辨析:

基于以上区别,我们可以简单得分析⼀下两者的不同使⽤场景.

mobx 更适合数据不复杂的应⽤: mobx 难以调试,很多状态⽆法回溯,⾯对复杂度⾼的应⽤时,往往⼒不从⼼.

redux 适合有回溯需求的应⽤: ⽐如⼀个画板应⽤、⼀个表格应⽤，很多时候需要撤销、重做等操作，由于 redux 不可变的特性，天然⽀持这些操作.

mobx 适合短平快的项⽬: mobx 上⼿简单,样板代码少,可以很⼤程度上提⾼开发效率.

当然 mobx 和 redux 也并不⼀定是⾮此即彼的关系,你也可以在项⽬中⽤ redux 作为全局状态管理,⽤ mobx 作为组件局部状态管理器来⽤.

## redux 异步中间件之间的优劣?

### redux-thunk 优点:

- 体积⼩: redux-thunk 的实现⽅式很简单,只有不到 20 ⾏代码
- 使⽤简单: redux-thunk 没有引⼊像 redux-saga 或者 redux-observable 额外的范式,上⼿简单

### redux-thunk 缺陷:

- 样板代码过多: 与 redux 本身⼀样,通常⼀个请求需要⼤量的代码,⽽且很多都是重复性质的
- 耦合严重: 异步操作与 redux 的 action 偶合在⼀起,不⽅便管理
- 功能孱弱: 有⼀些实际开发中常⽤的功能需要⾃⼰进⾏封装

### redux-saga 优点:

- 异步解耦: 异步操作被被转移到单独 saga.js 中，不再是掺杂在 action.js 或 component.js 中
- action 摆脱 thunk function: dispatch 的参数依然是⼀个纯粹的 action (FSA)，⽽不是充满 “⿊魔法” thunk function
- 异常处理: 受益于 generator function 的 saga 实现，代码异常/请求失败 都可以直接通过 try/catch 语法直接捕获处理
- 功能强⼤: redux-saga 提供了⼤量的 Saga 辅助函数和 Effect 创建器供开发者使⽤,开发者⽆须封装或者简单封装即可使⽤
- 灵活: redux-saga 可以将多个 Saga 可以串⾏/并⾏组合起来,形成⼀个⾮常实⽤的异步 flow
- 易测试，提供了各种 case 的测试⽅案，包括 mock task，分⽀覆盖等等

### redux-saga 缺陷:

- 额外的学习成本: redux-saga 不仅在使⽤难以理解的 generator function,⽽且有数⼗个 API,学习成本远超 redux-thunk,最重要的是你的额外学习成本是只服务于这个库的,与 redux-observable 不同,redux-observable 虽然也有额外学习成本但是背后是 rxjs 和⼀整套思想
- 体积庞⼤: 体积略⼤,代码近 2000 ⾏，min 版 25KB 左右
- 功能过剩: 实际上并发控制等功能很难⽤到,但是我们依然需要引⼊这些代码
- ts ⽀持不友好: yield ⽆法返回 TS 类型

### redux-observable 优点:

- 功能最强: 由于背靠 rxjs 这个强⼤的响应式编程的库,借助 rxjs 的操作符,你可以⼏乎做任何你能想到的异步处理
- 背靠 rxjs: 由于有 rxjs 的加持,如果你已经学习了 rxjs,redux-observable 的学习成本并不⾼,⽽且随着 rxjs 的升级 redux-observable 也会变得更强⼤

### redux-observable 缺陷:

- 学习成本奇⾼: 如果你不会 rxjs,则需要额外学习两个复杂的库
- 社区⼀般: redux-observable 的下载量只有 redux-saga 的 1/5,社区也不够活跃,在复杂异步流中间件这个层⾯ redux-saga 仍处于领导地位

## react 的渲染过程中兄弟节点之间是怎么处理的也就是 key 值不一样的时候

通常我们输出节点的时候都是 map，一个数组然后返回一个 ReactNode，为了方便 react 内部进行优化，我们必须给每一个 reactNode 添加 key，这个 key prop 在设计值处不是给开发者用的，而是给 react 用的，大概的作用就是给每一个 reactNode 添加一个身份标识，方便 react 进行识别，在重渲染过程中，如果 key 一样，若组件属性有所变化则 react 只更新组件，对应的属性没有变化则不更新，如果 key 不一样，则 react 先销毁该组件，然后重新创建该组件
