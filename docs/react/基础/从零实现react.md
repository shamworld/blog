# 从零实现react

## 创建项目
```js
npx create-react-app react-demo
```

## 项目结构

将一些无用的文件和代码删掉后，目录变成这样

![](/react/write/1611815461372.jpg)

## 实现react

### render

我们在用react的时候需要使用到render方法

#### src/index.js
```js
import React from './react';

React.render('hello',document.getElementById('root'));

```

安装jquery
```js
npm install jquery
```

#### src/react/index.js
```js
import $ from 'jquery'
let React = {
    render
}
function render(element,container) {
    $(container).html(element);
}
export default React;
```

运行结果:

![](/react/write/1611816496969.jpg)

以上只是一个简易的实现方法，我们不可能把元素直接塞到root里面，因为我们可能会去给元素添加事件，或者先改元素等等，这是时候我们给每个元素添加一个属性，为了方便获取这个元素。

```js
function render(element,container) {
    let markUp = `<span>${element}</span>`
    $(container).html(element);
}
```

这时候我们不知道span是唯一的，那么就需要给每个元素添加标识,这样的话可以通过这个标识辨别出与其他元素的关系，直接通过这个标识找到该元素。

就像下面这张图一样，是不是就直接看出0.0和0.1的父节点就是0了呢？

![](/react/write/1611816901489.jpg)


src/react/index.js
```js
import $ from 'jquery'
let React = {
    render,
    nextRootIndex:0,
}
function render(element,container) {
    let markUp = `<span data-reactid="${React.nextRootIndex}">${element}</span>`
    $(container).html(markUp);
}
export default React;
```

如上代码所示，我们给每个元素添加了`date-reactid`标识符

运行，发现确实标记成功了:

![](/react/write/1611817225440.jpg)


目前我们实现的只是一个简单的字符串渲染，它可能jsx语法，虚拟dom，对象，类等等。这时候我们需要重新实现render函数，写一个工厂函数好，来创建对应的react元素。所以我们实现一个createUnit方法，将element传入，让它来判断element是什么类型的节点，然后在返回一个被判断为某种类型，并且添加了对应的方法和属性的对象。例如，我们的element是字符串类型，那么就返回字符串类型的对象，而这个对象自身有element属性和getMarkUp方法，这个getMarkUp方法，将element转化成真实的dom，**其实你也可以简单的认为createUnit方法就是为了element对象添加一个getMarkUp方法**

src/react/index.js
```js
import $ from 'jquery'
import createReactUnit from './unit';

let React = {
    render,
    nextRootIndex:0,
}

function render(element,container) {
    //写一个工厂函数来创建对应的react元素
    let createReactUnitInstance = createReactUnit(element);
    let markUp = createReactUnitInstance.getMarkUp(React.nextRootIndex);
    $(container).html(markUp);
}
export default React;
```

如上述代码，将element传入到createReactUnit，获取到返回的对象，再去通过createReactUnit的实例再去调用getMarkUp，传入标识符过去。获取真实的dom，然后挂载到container上去。

#### src/react/unit.js
```js
class Unit{
    //通过父类保存参数
    constructor(element){
        this.currentElement = element;
    }
}
 class ReactTextUnit extends Unit{
    getMarkUp(rootId){//保存当前元素id
        this._rootId = rootId;
        return `<span data-reactid="${rootId}">${this.currentElement}</span>`
    }
 }

 function createReactUnit(element){
     if(typeof element === 'string' || typeof element === 'number'){
         return new ReactTextUnit(element);
     }

 }
 export default createReactUnit;
```

当调用createReactUnit的时候会判断element的类型，如果是字符串，那么就创建一个ReactTextUnit对象，传入element，然后返回出去，这就是上面我们讲的createReactUnitInstance就是得到的这个返回对象。

那么为什么ReactTextUnit要继承Unit呢？

这是因为element除了字符串，也可能是原生的标签，列入div，span等，也有可能是我们自定义的组件，所以我们先写一个Unit类，通过父类保存参数。

然后通过测试发现得到的结果和想象的一样

![](/react/write/1611817225440.jpg)


### React.creacteElement

**React.creacteElement(key,props,...children)**
- 参数:标签名，属性对象，子节点 返回值:虚拟dom对象
- 标签: 1. 字符串 2. 组件(自定义组件:函数组件/class组件，react原生组件:React.Fragment等)

    一般组件首字母大写，如果babel转化时，发现当前标签的首字母为大写，则表示当前的标签是一个函数名称，否则当前标签为一个字符串
- 属性props对象:写在标签上的属性集合，一般为对象
- 子节点:表示子节点的集合，一般从React.createElement的第三个参数开始，如果对于当前标签的子节点为字符串则参数值直接为字符串，如果当前节点的子节点不是字符串，则会生成新的React.createElement

#### 实现

src/index.js
```js
import React from './react';
let element = React.createElement('div',{name:'xxx'},'hello',React.createElement('span',{},'123'));
console.log(element);
```

src/react/index.js
```js
import createElement from './element'
let React = {
    createElement
}
```

src/reac/element.js
```js
class Element{
    constructor(type,props){
        this.type = type;
        this.props = props;
    }
 }
function createElement(type, props,...children){
    props = props || {};
    props.children = children;
    return new Element(type,props);
}
//返回虚拟dom，用对象来描述元素
export default createElement;
```

我们打印结果如下

![](/react/write/1611820870948.jpg)


从上述代码，我们可以拿到返回的虚拟dom，然后我们把它传入到render函数里面

src/index.js
```js
import React from './react';
function say(){
    alert(11);
}
let element = React.createElement('div',{name:'xxx'},'hello',React.createElement('button',{onClick:say},'123'));
React.render(element,document.getElementById('root'));
```

src/react/unit.js
```js
import $ from 'jquery'
class Unit{
    //通过父类保存参数
    constructor(element){
        this.currentElement = element;
    }
}

 class ReactTextUnit extends Unit{
    getMarkUp(rootId){//保存当前元素id
        this._rootId = rootId;
        return `<span data-reactid="${rootId}">${this.currentElement}</span>`
    }
 }

 class ReactNativeUnit extends Unit{
    getMarkUp(rootId){//保存当前元素id
        this._rootId = rootId;
        //拼接需要渲染的内容
        let {type,props} = this.currentElement;//div name data-reactid
        let tagStart = `<${type} data-reactid="${rootId}"`;
        let tagEnd = `</${type}>`;
        let content;
        for(let propName in props){
            if (/on[A-Z]/.test(propName)) {// 添加绑定事件
                let eventType = propName.slice(2).toLowerCase();// 获取click
                $(document).on(eventType,`[data-reactid="${rootId}"]`,props[propName]);
            }else if(propName === 'style'){ // 如果是一个样式对象
               
            }else if(propName === 'className'){ // 如果是一个类名
                
            } else if(propName === 'children'){
                content = props[propName].map((child,index)=>{
                    //递归循环子节点
                    let childInstance =  createReactUnit(child);
                    //返回是多个元素的字符串的数组
                    return childInstance.getMarkUp(`${rootId}.${index}`);
                }).join('');
            }else{
                tagStart += (`${propName}=${props[propName]}`)
            }
        }
        //返回拼接后的字符串
        return tagStart + '>' + content  + tagEnd;
    }
 }

 function createReactUnit(element){
     if(typeof element === 'string' || typeof element === 'number'){
         return new ReactTextUnit(element);
     }
     if(typeof element === 'object' && typeof element.type === 'string'){
        return new ReactNativeUnit(element);
     }
 }

 export default createReactUnit;
```

createReactUnit里面我们通过传过来的element是一个对象并且它的type是一个字符串，我们去调用createReactUnit函数，它也继承Unit父类，实现getMarkUp方法。这里我们可以拿到当前element里面的type和props，然后进行字符串拼接渲染内容，我们需要循环props，然后判断它是否绑定事件、className、style、是否有子节点等等。如果绑定有事件，因为不能直接给字符串添加事件，因此我们需要通过委托来给字符串添加事件;如果没有子节点，那么就把属性拼接进去，如果有子节点，我们需要递归循环子节点，通过`props[propName].map`我们去遍历。然后调用`createReactUnit`方法传入子节点，得到实例对象，去掉用getMarkUp方法，这返回的是多个原生的字符串的数组，所以在遍历后我们需要把它拼接成字符串，最后返回拼接后的字符串。

结果如下:

![](/react/write/1611823170838.jpg)


### 自定义组件

src/index.js
```js
import React from './react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {number:1};
    }

    render() {
        return this.state.number;
    }
}
React.render(React.createElement(Counter,{name:'Roy'}),document.getElementById('root'));
```

我们发现自定义组件好像需要继承React.Component。这是为什么呢？

我之前一直误认为所有的生命周期都是从Component继承过来的，也许有很多小伙伴都和我一样有这样的误解，直到我看了Component源码才恍然大悟，原来我们用的setState和forceUpdate方法是来源于这里

知道这个原因后，我们就可以先简单地实现React.Component了

src/react/component.js
```js
class Component {
    constructor(props) {
        this.props = props;
    }
    setState() {
        console.log('更新状态');
    }
}

export default Component;
```

然后在react中引入即可

src/react/index.js
```js
import Component from './component';
let React = {
    Component
}
export default React;
```

然后在在unit.js里面新增判断
```js
import $ from 'jquery'
class Unit{
    //通过父类保存参数
    constructor(element){
        this.currentElement = element;
    }
}

 class ReactTextUnit extends Unit{
    getMarkUp(rootId){//保存当前元素id
        this._rootId = rootId;
        ...
    }
 }

 class ReactNativeUnit extends Unit{
    getMarkUp(rootId){//保存当前元素id
        this._rootId = rootId;
        ...
    }
 }

 class ReactCompositUnit extends Unit{
     getMarkUp(rootId){//保存当前元素id
        this._rootId = rootId;
        let {type:Component, props} = this.currentElement;
        let componentInstance = new Component(props);
        //调用render后返回的结果
        let reactCompositRender = componentInstance.render();
        //递归渲染 组件render后的返回结果
        let reactCompositUnitInstance =  createReactUnit(reactCompositRender);
        let markUp = reactCompositUnitInstance.getMarkUp(rootId);
        return markUp;//实现把render方法返回的结果，作为字符串返回回去
    }
 }

 function createReactUnit(element){
     if(typeof element === 'string' || typeof element === 'number'){
         return new ReactTextUnit(element);
     }
     if(typeof element === 'object' && typeof element.type === 'string'){
        return new ReactNativeUnit(element);
     }
     if(typeof element === 'object' && typeof element.type === 'function'){
        return new ReactCompositUnit(element);
     }
 }

 export default createReactUnit;
```

从上述代码可知，通过new Counter就获得了Counter的实例

也就是componentInstance，而每一个Counter的实例都会有render方法，所以执行`componentInstance.render()`就获得一个 **给定类型的ReactElement元素**

然后就把这个ReactElement元素对象传给createUnit，获得一个具有getMarkUp的renderUnit对象，然后就可以执行`reactCompositUnitInstance.getMarkUp(rootId)`获得真实dom，就可以返回了。


运行结果:

![](/react/write/1611829457436.jpg)


### 生命周期

我们在之前的例子上添加componentWillMount和componentDidMount生命周期函数

src/index.js
```js
import React from './react';

class SubCount {
    componentWillMount(){
        console.log("子类componentWillMount");
    }
    componentDidMount() {
        console.log("子类componentDidMount");
    }
    render() {
        return 'dasd2'
    }
}


class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {number:1};
    }
    componentWillMount(){
        console.log("父类componentWillMount");
    }
    componentDidMount() {
        console.log("父类componentDidMount");
    }
    render() {
        return <SubCount/>;
    }
}
React.render(React.createElement(Counter,{name:'Roy'}),document.getElementById('root'));
```

我们知道componentWillMount 实在组件渲染前执行的，所以我们可以在render之前执行这个生命周期函数

为什么要放到这个地方?

这是因为在父组件中会先执行 父组件的componentWillMount ，然后执行componentInstance.render();的时候，会解析子组件，然后又进入子组件的getMarkUp。又执行子组件的componentWillMount 。

而componentDidMount是在组件渲染，也就是挂载到页面后才执行的。

所以，我们可以在返回组件的真实dom之前 就监听 一个mounted事件，这个事件执行componentDidMount方法。

src/react/unit.js
```js
class ReactCompositUnit extends Unit{
     getMarkUp(rootId){//保存当前元素id
        this._rootId = rootId;
        let {type:Component, props} = this.currentElement;
        let componentInstance = new Component(props);
        //如果有组件将要渲染的函数的话让它执行
        componentInstance.componentWillMount&&componentInstance.componentWillMount();
        //调用render后返回的结果
        let reactCompositRender = componentInstance.render();
        //递归渲染 组件render后的返回结果
        let reactCompositUnitInstance =  createReactUnit(reactCompositRender);
        let markUp = reactCompositUnitInstance.getMarkUp(rootId);

        $(document).on('mounted',()=>{
            componentInstance.componentDidMount&&componentInstance.componentDidMount();
        })

        return markUp;//实现把render方法返回的结果，作为字符串返回回去
    }
 }
```

然后 再在 把组件的dom挂载到 页面上后再触发这个 mounted事件

src/react/index.js
```js
function render(element,container) {
    //写一个工厂函数来创建对应的react元素
    let createReactUnitInstance = createReactUnit(element);
    let markUp = createReactUnitInstance.getMarkUp(React.nextRootIndex);
    
    $(container).html(markUp);

    $(document).trigger('mounted');//所以组件都ok了
}
```

运行结果:

![](/react/write/1611830764752.jpg)


### 实现setState

我们看下面的例子，每隔一秒就number+1

src/index.js
```js
import React from './react';
class Counter extends React.Component {
    constructor(props){
        super(props)
        this.state = {number:0};
    }

    componentWillMount(){
        console.log('Counter componentWillMount');
    }
    componentShouldUpdate(nexrProps,nextState){
        return true;
    }
    componentDidUpdate(){
        console.log('Counter componentDidUpdate');
    }
    componentDidMount(){
        setInterval(()=>{
            this.setState({number:this.state.number+1});
        },1000);
    }
    render(){
        return this.state.number;
    }
}

let element = React.createElement(Counter,{name:"计时器"})
React.render(element,document.getElementById('root'))
```

setState方法是从Component组件继承过来的，所以我们给Component组件添加setState方法
```js
class Component {
    constructor(props) {
        this.props = props;
    }
    setState(partialState) {
        //第一个参数是新的元素 第二个参数是新的状态
        this._currentUnit.update(null,partialState);
    }
}

export default Component;
```

我们发现原来的是在setState方法里调用了当前实例的对应unit的update方法，它传进去了部分state的值

看到这里我们就知道了，我们需要回到ReactCompositUnit类添加一个update方法。
```js
class ReactCompositUnit extends Unit{

    update(nextElement,partialState){
        //获取到新的元素
        this.currentElement = nextElement||this.currentElement;
        //获取新的状态,不管要不要更新组件，组件的装潢台一定要修改
        let nextState = this._reactCompositUnitInstance.state = Object.assign(this._componentInstance.state,partialState);
        //新的属性对象
        let nexrProps = this.currentElement.props;
    }

     getMarkUp(rootId){//保存当前元素id
        ...
    }
 }
```

我们首先更换了currentElement的值，这里为什么会有 有或者没有nextElement的情况呢？

主要就是因为currentElement是字符串或者数字的话，那么它就需要传nextElement来替换掉旧的currentElement。而如果不是字符串或者数字的话，是不需要传的。而ReactCompositUnit必定是组件的，所以不用传nextElement。

接着我们通过下面的代码获取最新的state，并且更新了组件的state
```js
let nextState = this._reactCompositUnitInstance.state = Object.assign(this._componentInstance.state,partialState);
```

获取最新的props跟获取state的方式不一样，props是跟currentElement绑定在一起的，所以获取最新的props是通过
```js
let nexrProps = this.currentElement.props;
```

接下来，我们要先获取新旧的渲染元素，然后拿来比较，怎么获取呢？
```js
class ReactCompositUnit extends Unit{

    update(nextElement,partialState){
        //获取到新的元素
        this.currentElement = nextElement||this.currentElement;
        //获取新的状态,不管要不要更新组件，组件的装潢台一定要修改
        let nextState = this._reactCompositUnitInstance.state = Object.assign(this._componentInstance.state,partialState);
        //新的属性对象
        let nexrProps = this.currentElement.props;
        //下面要对比更新 先得到上次渲染的单元
        let preReactCompositUnitInstance = this._reactCompositUnitInstance;
        //得到上次渲染的元素
        let preRenderElement = preReactCompositUnitInstance.currentElement;
        let nextRenderElement = this._componentInstance.render();
    }

     getMarkUp(rootId){//保存当前元素id
        ...
    }
 }
```

我们先得到上次渲染的unit，在通过上次渲染的unit得到上次渲染的元素preRenderElement,在通过`this._componentInstance.render()`得到下次渲染的元素nextRenderElement.

接下来就可以进行比较这两个元素了，我们首先会判断要不要进行深度比较。如果不是进行深度比较就非常简单了

正好获取新的渲染unit，然后通过getMarkUp获得要渲染的dom，接着就把当前的组件里的dom元素替换掉
```js
class ReactCompositUnit extends Unit{

    update(nextElement,partialState){
        //获取到新的元素
        this.currentElement = nextElement||this.currentElement;
        //获取新的状态,不管要不要更新组件，组件的装潢台一定要修改
        let nextState = this._reactCompositUnitInstance.state = Object.assign(this._componentInstance.state,partialState);
        //新的属性对象
        let nexrProps = this.currentElement.props;
        //下面要对比更新 先得到上次渲染的单元
        let preReactCompositUnitInstance = this._reactCompositUnitInstance;
        //得到上次渲染的元素
        let preRenderElement = preReactCompositUnitInstance.currentElement;
        let nextRenderElement = this._componentInstance.render();
        //如果新旧两个元素类型一样，则可以深度比较，如果不一样，直接干掉老的元素，新建新的
        if(shouldDeepCompare(preRenderElement,nextRenderElement)){
            
        }else{
            this._reactCompositUnitInstance = createReactUnit(nextRenderElement);
            let nextMarkUp = this._reactCompositUnitInstance.getMarkUp(this._rootId);
            $(`[data-reactid="${this._rootId}"]`).replaceWith(nextMarkUp);
        }
    }

     getMarkUp(rootId){//保存当前元素id
        ...
    }
 }
```


![](/react/write/1611911745207.jpg)

发现确实成功了

如果可以进行深度比较呢？

```js
class ReactCompositUnit extends Unit{

    update(nextElement,partialState){
        //获取到新的元素
        this.currentElement = nextElement||this.currentElement;
        //获取新的状态,不管要不要更新组件，组件的装潢台一定要修改
        let nextState = this._reactCompositUnitInstance.state = Object.assign(this._componentInstance.state,partialState);
        //新的属性对象
        let nexrProps = this.currentElement.props;
        if(this._reactCompositUnitInstance.componentShouldUpdate&&!this._reactCompositUnitInstance.componentShouldUpdate(nexrProps,nextState)){
            return;
        }
        //下面要对比更新 先得到上次渲染的单元
        let preReactCompositUnitInstance = this._reactCompositUnitInstance;
        //得到上次渲染的元素
        let preRenderElement = preReactCompositUnitInstance.currentElement;
        let nextRenderElement = this._componentInstance.render();
        //如果新旧两个元素类型一样，则可以深度比较，如果不一样，直接干掉老的元素，新建新的
        if(shouldDeepCompare(preRenderElement,nextRenderElement)){
            //如果可以进行深比较，则把更新的工作交给上次渲染出来的那个element元素对应的unit元素
            preReactCompositUnitInstance.update(nextRenderElement);
            this._reactCompositUnitInstance.componentDidUpdate&&this._reactCompositUnitInstance.componentDidUpdate();
        }else{
            this._reactCompositUnitInstance = createReactUnit(nextRenderElement);
            let nextMarkUp = this._reactCompositUnitInstance.getMarkUp(this._rootId);
            $(`[data-reactid="${this._rootId}"]`).replaceWith(nextMarkUp);
        }

    }

     getMarkUp(rootId){//保存当前元素id
        ...
    }
 }
```

如果可以深度，就执行
```js
preReactCompositUnitInstance.update(nextRenderElement);
```

这是什么意思？

我们当前在执行渲染Counter的话，那么preReactCompositUnitInstance是什么呢？

没错!它是Counter组件执行render方法，在执行createReactUnit获得的

![](/react/write/1611912303666.jpg)

这个字符串的unit

然后调用了这个unit的state方法

注意，这里unit是字符串的unit，也就是说ReactTextUnit

所以我们需要实现ReactTextUnit的update方法

```js

 class ReactTextUnit extends Unit{
    getMarkUp(rootId){//保存当前元素id
        this._rootId = rootId;
        return `<span data-reactid="${rootId}">${this.currentElement}</span>`
    }
    update(nextElement){
        if(this.currentElement !== nextElement){
            this.currentElement = nextElement;
            $(`[data-reactid="${this._rootId}"]`).html(this.currentElement);
        }
    }
 }
```

ReactTextUnit的update方法非常简单，先判断渲染内容有没有变化，有的话就替换点字符串的内容

并把当前unit的currentElement替换成最新的nextElement

我们看下shouldDeepCompare实现:
```js
// 判断两个元素的类型一样不一样
 function shouldDeepCompare(oldElement,newElement) {
    if(oldElement != null && newElement != null){
        let oldType = typeof oldElement;
        let newType = typeof newElement;
        if((oldType === 'string'||oldType === 'number') && (newType === 'string' || newType === 'number')){
            return true;
        }
        if(oldElement instanceof Element && newElement instanceof Element){
            return oldElement.type === newElement.type;
        }
    }
    return false;
 }
```

然后运行结果

![](/react/write/1611912584134.jpg)


## diff

- Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计
- 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
- 对于同一层级的一组子节点，它们可以通过唯一key进行区分。

### tree diff
- React对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较

![](/react/write/1611913235373.jpg)

- 当出现节点夸层级移动时，并不会出现想象中的移动操作，而是以A为根节点的树被整个重新创建

![](/react/write/1611913335157.jpg)

### component diff
- 如果是同一类型的组件，按照原策略继续比较`virtual DOM tree`
- 如果不是，则将该组件判断为`dirty component`，从而替换整个组件下的所有子节点

![](/react/write/1611913528507.jpg)


### element diff
- 当节点处于同一层级时，React diff提供了三种节点操作，分别为:INSERT(插入)、MOVE(移动)和REMOVE(删除)
- INSERT新的component类型不在老集合里，即是全新的节点，需要对新节点执行插入操作
- MOVE在老集合有新component类型，就需要做移出操作，可以复用以前的DOM节点

### key 
![](/react/write/1611914134532.jpg)

![](/react/write/1611914225136.jpg)

![](/react/write/1611914262519.jpg)