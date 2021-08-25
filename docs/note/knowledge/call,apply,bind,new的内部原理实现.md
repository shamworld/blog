# call,apply,bind,new的内部原理实现

## Function.prototype.call()
`call()`方法调用一个函数，其具有一个指定的this值和分别提供的参数

该方法和`apply()`类似，区别在于，`call()`可以接受若干参数，而`apply()`接收的是一个包含多个参数的数组。

语法:`fun.call(thisArg, arg1, arg2, ...)`

### call可以继承

通过父类的构造函数call方法实现继承
```js
function Product(name, price) {
    this.name = name;
    this.price = price;
}
function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
}
var cheese = new Food('feta', 5);
console.log(cheese)
// Food { name: 'feta', price: 5, category: 'food' }

```
实例都会拥有在Product构造函数中添加的name属性和price属性，但category属性是在各自的构造函数中定义的。

### call方法调用匿名函数
```js
var animals = [
    { species: 'Lion', name: 'King' },
    { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
    (function(i) {
        console.log('#' + i + ' ' + this.species + ': ' + this.name) }
    ).call(animals[i], i);
}
```
for循环体内，我们创建了一个匿名函数，然后通过调用该函数的call方法，将每个数组元素作为指定的this值执行了那个匿名函数。

### call方法指定上下文的this
```js
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}
var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};
greet.call(obj);
// cats typically sleep between 12 and 16 hours

```

### call原理
```js
Function.prototype.myCall = function(context) {
    // 第一个参数为 this 指向值，如无则指向 window
    context = context?Object(context):window
    // 将本身的函数保存下来，在后面需要执行，这一步 this 的指向已经指向了 context 
    context.fn = this;
    // 将后面传入的参数转为数组，取除第一个 this 指向剩下的所有参数
    let args = [...arguments].slice(1)
    // 执行函数本身，并将参数传入
    let r = context.fn(args);
    // 销毁函数，避免作用域污染
    delete context.fn;

    return r;
}
```

## Function.prototype.apply()
`apply()`调用一个指定`this`值的函数，接收作为一个数组或者类数组对象提供的参数

语法:`func.apply(thisArg, [argsArray])`

### apply 将数组添加到另一个数组
```js
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.log(array); // ["a", "b", 0, 1, 2]

```

### apply 找出最大值和最小值
```js
var numbers = [5, 6, 2, 3, 7];
var max = Math.max.apply(null, numbers)
var min = Math.min.apply(null, numbers);

```

如果参数组非常大，将参数数组切块后，循环传入目标方法：
```js
function minOfArray(arr) {
    var min = Infinity;
    var QUANTUM = 32768;

    for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
        var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
        min = Math.min(submin, min);
    }

    return min;
}

var min = minOfArray([5, 6, 2, 3, 7]);
console.log(min) // 2

```

### apply原理
```js
Function.prototype.myApply = function(context) {
    // 第一个参数为 this 指向值，如无则指向 window
  context = context ? Object(context) : window
  // 将本身的函数保存下来，在后面需要执行，这一步 this 的指向已经指向了 context 
    context.fn = this
    // 将后面传入的参数转为数组，取出第二个参数
    let args = [...arguments][1]
    // 如果第二个参数不是对象则报错
    if (!args) {
        return context.fn()
    }
    // 执行函数本身，并将参数传入
    let r = context.fn(args)
    // 销毁函数，避免作用域污染
    delete context.fn;
    return r
}

```

## Function.prototype.bind()
`bind()`方法创建一个新函数，在调用时设置this关键字为提供的值。

并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。

语法:`function.bind(thisArg, [arg1[, arg2[, ...]]])`

### 创建绑定函数
```js
this.x = 9;    // 在浏览器中，this指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};
module.getX(); // 81
var retrieveX = module.getX;
retrieveX(); // 返回9 - 因为函数是在全局作用域中调用的

var boundGetX = retrieveX.bind(module);  // 创建一个新函数，把 'this' 绑定到 module 对象
boundGetX(); // 81

```

### 偏函数
```js
function list() {
  return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
    return arg1 + arg2
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var result1 = addArguments(1, 2); // 3

// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37);

// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37); 

var list2 = leadingThirtysevenList(); 
// [37]

var list3 = leadingThirtysevenList(1, 2, 3); 
// [37, 1, 2, 3]

var result2 = addThirtySeven(5); 
// 37 + 5 = 42 

var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42 ，第二个参数被忽略

```
当`fn1.myCall(fn2)`时，绑定当前`this`需要`context.fn=this`等价于`context.fn=fn1`等价于`fn2.fn()`此时`fn2`并执行`fn1`。

当`fn1.myCall.myCall(fn2)`是此时都是执行`myCall`函数，`this`为`window`，并执行`fn2`函数。

## bind原理
```js
Function.prototype.bind = function(context) {
    let _this = this
    let bindArgs = [].slice.call(arguments, 1) // 获取bind方法传入的参数
    return function() {
        let fnArgs = [].slice.call(arguments) // 获取函数执行传入的参数
        return _this.apply(context, bindArgs.concat(fnArgs))
    }
}

```

## new的原理
想了解new的原理先要了解js的原型机制,先来看张图。

![](/knowledge/1605082229225.jpg)

```js
function Animal(type) {
    this.type = type;
}
Animal.prototype.say = function() {
    console.log('say')
}

function mockNew() {
    let Constructor = [].shift.call(arguments); // 取出构造函数
    
    let obj = {}   // new 执行会创建一个新对象
    
    obj.__proto__ = Constructor.prototype 
    
    Constructor.apply(obj, arguments)
    return obj
}
let animal = mockNew(Animal, 'dog')
    
console.log(animal.type) // dog
animal.say() // say

```








