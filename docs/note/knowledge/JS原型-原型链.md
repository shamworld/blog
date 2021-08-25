# JS原型-原型链

## 什么是原型
在JavaScript中，函数可以有属性。每个函数都有一个特殊的属性叫原型prototype

每个对象拥有一个原型对象，对象以其原型为模板，从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层，以次类推。这种关系常被成为原型链(prototype chain)

```js
function doSomething(){}
doSomething.prototype.foo = "bar";
console.log( doSomething.prototype );
```
输出结果:
```js
{
    foo: "bar",
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}
```

当函数经过new调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个__proto__属性，执行构造函数的原型对象。

**实例的__proto__属性等于其构造函数的prototype属性**
```js
function doSomething(){}
doSomething.prototype.foo = "bar"; 
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value"; 
console.log( doSomeInstancing );
```

doSomeInstancing 的 **__proto__** 属性就是doSomething.prototype. 但是这又有什么用呢?

当你访问doSomeInstancing的一个属性，浏览器首先查找doSomeInstancing是否有这个属性，如果doSomeInstancing没有这个属性，然后浏览器会在doSomeInstancing.__proto__(也就是 doSomething.prototype)。如果doSomeInstancing的__proto__有这个属性，那么doSomeInstancing的__proto__上的这个属性就会被使用，否则，如果doSomeInstancing的__proto__没有这个属性，浏览器就会去查找doSomeInstancing的__proto__的__proto__，看它是否有这个属性。

默认情况下所有函数的原型属性的 __proto__ 就是 Object.prototype,如果在这个上面也没有找到这个属性,然后就得出结论,这个属性是 undefined

## constructor属性

每个实例对象都从原型中继承了一个constructor属性，该属性指向了用于构造此实例对象的构造函数。

这个怎么理解呢
```js
function A() {

}
var a = new A()
a.constructor===A //true
```
**注意** 函数的**prototype** 的**constructor** 指向函数本身

```js
A.protopype.constructor===A
```

图解

![](/knowledge/1603962654637.jpg)

![](/knowledge/1603962767464.jpg)

## 题目

- 题目1
```js
var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
  n: 2,
  m: 3
}
var c = new A();

console.log(b.n);
console.log(b.m);

console.log(c.n);
console.log(c.m);

```

- 题目2
```js
var F = function() {};

Object.prototype.a = function() {
  console.log('a');
};

Function.prototype.b = function() {
  console.log('b');
}

var f = new F();

f.a();
f.b();

F.a();
F.b();
```

- 题目3 
```js
var foo = {},
    F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a);
console.log(foo.b);

console.log(F.a);
console.log(F.b);
```

## 记住
```js
Function.prototype === Function.__proto__

Function.prototype.__proto__ === Object.prototype

Object.prototype.__proto__ === null

Function.prototype === Object.__proto__

·所有的引用类型(数组，函数，对象)，都具有对象特征，即可自由扩展属性(null除外)
·所有得引用类型(数组，函数，对象)，都有一个__proto__属性，属性值是一个普通得对象
·所有得函数，都有一个prototype属性，属性值也是一个普通得对象
·所有得引用类型(数组，函数，对象)，__proto__属性值指向他的构造函数得prototype属性值

```

- 练习1
```js
function Foo() {
    getName = function () {
        console.log(1)
    };
    return this;
}
Foo.getName = function () {
    console.log(2)
};
Foo.prototype.getName = function () {
    console.log(3)
};
var getName = function () {
    console.log(4)
};
function getName() {
    console.log(5)
}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

- 练习2
```js
Object.prototype.a = 'a';
Function.prototype.a = 'a1';
function Person() {}
var roy = new Person();
console.log(Person.a);
console.log(roy.a);
console.log((1..a));
console.log(
  roy.__proto__.__proto__.constructor.constructor.constructor.constructor
);
```




