(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{331:function(t,a,s){"use strict";s.r(a);var e=s(10),v=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"宝典-二"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#宝典-二"}},[t._v("#")]),t._v(" 宝典(二)")]),t._v(" "),a("h2",{attrs:{id:"_1-介绍js数据类型-基本数据类型和引用数据类型区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-介绍js数据类型-基本数据类型和引用数据类型区别"}},[t._v("#")]),t._v(" 1.介绍js数据类型，基本数据类型和引用数据类型区别?")]),t._v(" "),a("h4",{attrs:{id:"_1、栈-stack-和堆-heap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、栈-stack-和堆-heap"}},[t._v("#")]),t._v(" 1、栈(stack)和堆（heap）")]),t._v(" "),a("p",[t._v("stack为自动分配的内存空间，它由系统自动释放；而heap则是动态分配的内存，大小也不一定会自动释放")]),t._v(" "),a("h4",{attrs:{id:"_2、数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、数据类型"}},[t._v("#")]),t._v(" 2、数据类型")]),t._v(" "),a("p",[t._v("JS分两种数据类型：")]),t._v(" "),a("ul",[a("li",[t._v("基本数据类型:Number，String，Boolean，Null，Undefined，Symbol,BigInt,保存在栈内存中，因为这些类型在内存中分别占有固定大小的空间，通过按值来访问")]),t._v(" "),a("li",[t._v("引用数据类型：Object（在JS中除了基本数据类型以外的都是对象，数据是对象，函数是对象，正则表达式是对象）")])]),t._v(" "),a("h4",{attrs:{id:"_3、基本数据类型-存放在栈中"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、基本数据类型-存放在栈中"}},[t._v("#")]),t._v(" 3、基本数据类型（存放在栈中）")]),t._v(" "),a("p",[t._v("基本数据类型是指存放在栈中的简单数据段，数据大小确定，内存空间大小可以分配，它们是直接按值存放的，所以可以直接按值访问")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("var a = 10;\nvar b = a;\nb = 20;\nconsole.log(a); // 10值\nconsole.log(b); // 20值\n")])])]),a("p",[t._v("下图演示了这种基本数据类型赋值的过程：")]),t._v(" "),a("p",[a("img",{attrs:{src:"/interview/stack.png",alt:""}})]),t._v(" "),a("h4",{attrs:{id:"_4、引用数据类型-存放在堆内存中的对象-每个空间大小不一样-要根据情况进行特定的配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、引用数据类型-存放在堆内存中的对象-每个空间大小不一样-要根据情况进行特定的配置"}},[t._v("#")]),t._v(" 4、引用数据类型（存放在堆内存中的对象，每个空间大小不一样，要根据情况进行特定的配置）")]),t._v(" "),a("p",[t._v("引用类型是存放在堆内存中的对象，变量其实是保存的在栈内存中的一个指针（保存的是堆内存中的引用地址），这个指针指向堆内存。")]),t._v(" "),a("p",[t._v("引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址。通过这个引用地址可以快速查找到保存中堆内存中的对象")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('var obj1 = new Object();\nvar obj2 = obj1;\nobj2.name = "我有名字了";\nconsole.log(obj1.name); // 我有名字了\n')])])]),a("p",[t._v("说明这两个引用数据类型指向了同一个堆内存对象。obj1赋值给obj2，实际上这个堆内存对象在栈内存的引用地址复制了一份给了obj2，但是实际上他们共同指向了同一个堆内存对象，所以修改obj2其实就是修改那个对象，所以通过obj1访问也能访问的到")]),t._v(" "),a("p",[a("img",{attrs:{src:"/interview/hape.png",alt:""}})]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("var a = [1,2,3,4,5];\nvar b = a;//传址 ,对象中传给变量的数据是引用类型的，会存储在堆中；\nvar c = a[0];//传值，把对象中的属性/数组中的数组项赋值给变量，这时变量C是基本数据类型，存储在栈内存中；改变栈中的数据不会影响堆中的数据\nalert(b);//1,2,3,4,5\nalert(c);//1\n//改变数值 \nb[4] = 6;\nc = 7;\nalert(a[4]);//6\nalert(a[0]);//1\n")])])]),a("p",[t._v("从上面我们可以得知，当我改变b中的数据时，a中数据也发生了变化；但是当我改变c的数据值时，a却没有发生改变。")]),t._v(" "),a("p",[t._v("这就是传值与传址的区别。因为a是数组，属于引用类型，所以它赋予给b的时候传的是栈中的地址（相当于新建了一个不同名“指针”），而不是堆内存中的对象。而c仅仅是从a堆内存中获取的一个数据值，并保存在栈中。所以b修改的时候，会根据地址回到a堆中修改，c则直接在栈中修改，并且不能指向a堆内存中")]),t._v(" "),a("p",[a("img",{attrs:{src:"/interview/10.png",alt:""}})]),t._v(" "),a("h4",{attrs:{id:"总结基本数据类型和引用数据类型区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结基本数据类型和引用数据类型区别"}},[t._v("#")]),t._v(" 总结基本数据类型和引用数据类型区别")]),t._v(" "),a("h4",{attrs:{id:"_1、声明变量时内存分配不同"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、声明变量时内存分配不同"}},[t._v("#")]),t._v(" 1、声明变量时内存分配不同")]),t._v(" "),a("ul",[a("li",[t._v("原始类型：在栈中，因为占据空间是固定的，可以将他们存在较小的内存中-栈中，这样便于迅速查询变量的值")]),t._v(" "),a("li",[t._v("引用类型：存在堆中，栈中存储的变量，只是用来查找堆中的引用地址。\n这是因为：引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响")])]),t._v(" "),a("h4",{attrs:{id:"_2、不同的内存分配带来不同的访问机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、不同的内存分配带来不同的访问机制"}},[t._v("#")]),t._v(" 2、不同的内存分配带来不同的访问机制")]),t._v(" "),a("p",[t._v("在javascript中是不允许直接访问保存在堆内存中的对象的，所以在访问一个对象时，首先得到的是这个对象在堆内存中的地址，然后再按照这个地址去获得这个对象中的值，这就是传说中的按引用访问。")]),t._v(" "),a("p",[t._v("而原始类型的值则是可以直接访问到的。")]),t._v(" "),a("h4",{attrs:{id:"_3、复制变量时的不同"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、复制变量时的不同"}},[t._v("#")]),t._v(" 3、复制变量时的不同")]),t._v(" "),a("ul",[a("li",[t._v("原始值：在将一个保存着原始值的变量复制给另一个变量时，会将原始值的副本赋值给新变量，此后这两个变量是完全独立的，他们只是拥有相同的value而已。")]),t._v(" "),a("li",[t._v("引用值：在将一个保存着对象内存地址的变量复制给另一个变量时，会把这个内存地址赋值给新变量，也就是说这两个变量都指向了堆内存中的同一个对象，他们中任何一个作出的改变都会反映在另一个身上。（这里要理解的一点就是，复制对象时并不会在堆内存中新生成一个一模一样的对象，只是多了一个保存指向这个对象指针的变量罢了）。多了一个指针")])]),t._v(" "),a("h4",{attrs:{id:"_4、参数传递的不同-把实参复制给形参的过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、参数传递的不同-把实参复制给形参的过程"}},[t._v("#")]),t._v(" 4、参数传递的不同（把实参复制给形参的过程)")]),t._v(" "),a("ul",[a("li",[t._v("原始值：只是把变量里的值传递给参数，之后参数和这个变量互不影响。\n-引用值：对象变量它里面的值是这个对象在堆内存中的内存地址，这一点你要时刻铭记在心！")])]),t._v(" "),a("p",[t._v("因此它传递的值也就是这个内存地址，这也就是为什么函数内部对这个参数的修改会体现在外部的原因了，因为它们都指向同一个对象。")]),t._v(" "),a("h2",{attrs:{id:"_2-堆和栈的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-堆和栈的区别"}},[t._v("#")]),t._v(" 2.堆和栈的区别")]),t._v(" "),a("h3",{attrs:{id:"堆-heap-和栈-stack"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#堆-heap-和栈-stack"}},[t._v("#")]),t._v(" 堆(heap)和栈(stack)")]),t._v(" "),a("p",[t._v("栈会自动分配内存空间，会自动释放，堆动态分配的内存，大小不固定也不会自动释放")]),t._v(" "),a("h3",{attrs:{id:"基本类型和引用类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本类型和引用类型"}},[t._v("#")]),t._v(" 基本类型和引用类型")]),t._v(" "),a("p",[t._v("基本类型:简单的数据类型，存放在栈内存中，占据固定空间大小")]),t._v(" "),a("p",[t._v("引用类型:指那些可能有多个值构成的对象，保存在堆内存中，包含引用类型的变量事件上保存的不是变量本身，而是指向该对象的指针")]),t._v(" "),a("h3",{attrs:{id:"传值和传址"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#传值和传址"}},[t._v("#")]),t._v(" 传值和传址")]),t._v(" "),a("p",[t._v("从一个向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终指向同一个对象。即复制的是栈中的地址而不是堆中的对象。")]),t._v(" "),a("p",[t._v("从一个变量向另一个变量复制基本类型的值，会创建这个值的副本")]),t._v(" "),a("h2",{attrs:{id:"js的垃圾回收机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#js的垃圾回收机制"}},[t._v("#")]),t._v(" js的垃圾回收机制")]),t._v(" "),a("h3",{attrs:{id:"垃圾回收"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收"}},[t._v("#")]),t._v(" 垃圾回收:")]),t._v(" "),a("p",[t._v("找出不在使用的变量，释放其占用的内存，这个过程不是实时的，因为开销比较大，所以垃圾回收器会按照固定时间间隔周期性的执行")]),t._v(" "),a("h3",{attrs:{id:"方法-引用计数-标记清除-常见"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法-引用计数-标记清除-常见"}},[t._v("#")]),t._v(" 方法:引用计数，标记清除(常见)")]),t._v(" "),a("h4",{attrs:{id:"标记清除"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#标记清除"}},[t._v("#")]),t._v(" 标记清除:")]),t._v(" "),a("p",[t._v('当变量进入执行环境时，就标记这个变量为"进入环境"，从逻辑上讲，永远不释放进入环境的变量的内存，因为只要执行流进入相应环境，就可能被用到。当变量离开环境时，则将其标记为"离开环境";')]),t._v(" "),a("h4",{attrs:{id:"引用计数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#引用计数"}},[t._v("#")]),t._v(" 引用计数:")]),t._v(" "),a("p",[t._v('指语言引擎有一张"引用表",保存了内存里面所有的资源的引用次数,如果一个值的引用次数为0，就表示这个值用不到了，因此可以将这块内存释放.')]),t._v(" "),a("h3",{attrs:{id:"引起内存泄漏"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#引起内存泄漏"}},[t._v("#")]),t._v(" 引起内存泄漏:")]),t._v(" "),a("ul",[a("li",[t._v("意外的全局变量引起的内存泄漏。\n原因:全局变量，不会被回收")])]),t._v(" "),a("p",[t._v("解决:使用严格模式避免")]),t._v(" "),a("ul",[a("li",[t._v("闭包引起的内存泄漏(自己代码原因)\n原因:闭包可以维持函数内局部变量，使其得不到释放")])]),t._v(" "),a("p",[t._v("解决:将事件处理函数定义在外部，解除闭包,或者在定义事件处理函数的外部函数中，删除对dom的引用。")]),t._v(" "),a("ul",[a("li",[t._v("没有清理的DOM元素引用\n原因:虽然别的地方删除了，但是对象中还存在对dom的引用")])]),t._v(" "),a("p",[t._v("解决:手动删除。")]),t._v(" "),a("ul",[a("li",[t._v("被遗忘的定时器或者回调\n原因:定时器中有dom的引用，即使dom删除了，但是定时器还在，所以内存中还是有这个dom。")])]),t._v(" "),a("p",[t._v("解决:手动删除定时器和dom。")]),t._v(" "),a("ul",[a("li",[t._v("子元素存在引用引起的内存泄漏\n原因：div中的ul li  得到这个div，会间接引用某个得到的li，那么此时因为div间接引用li，即使li被清空，也还是在内存中，并且只要li不被删除，他的父元素都不会被删除。")])]),t._v(" "),a("p",[t._v("解决:手动删除清空。")]),t._v(" "),a("h2",{attrs:{id:"_3-介绍闭包以及闭包为什么没有清除"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-介绍闭包以及闭包为什么没有清除"}},[t._v("#")]),t._v(" 3.介绍闭包以及闭包为什么没有清除")]),t._v(" "),a("p",[t._v('闭包:能够读取其他函数内部变量的函数.例如:在js中，只有函数内部的子函数才能读取局部变量，所以闭包可以理解成"定义在一个函数内部的函数"，在本质上，闭包是将函数内部和函数外部链接起来的桥梁')]),t._v(" "),a("p",[t._v("闭包是一个绑定了执行环境得函数")]),t._v(" "),a("p",[t._v("闭包不会造成内存泄漏")]),t._v(" "),a("p",[t._v("用途:使用闭包主要为了设计私有的变量和方法")]),t._v(" "),a("p",[t._v("优点:可以避免变量被全局变量污染")]),t._v(" "),a("p",[t._v("缺点:函数中的变量都被保存在内存中，内存消耗比较大，所以不能滥用闭包")]),t._v(" "),a("p",[t._v("解决方法:在退出函数之前，将不使用的局部变量全部删除")]),t._v(" "),a("h2",{attrs:{id:"_4-js怎么实现异步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-js怎么实现异步"}},[t._v("#")]),t._v(" 4.JS怎么实现异步")]),t._v(" "),a("ul",[a("li",[t._v("回调函数（callback）\n缺点：回调地狱，不能用 try catch 捕获错误，不能 return")])]),t._v(" "),a("p",[t._v("优点：解决了同步的问题")]),t._v(" "),a("ul",[a("li",[t._v("Promise\n优点：解决了回调地狱的问题")])]),t._v(" "),a("p",[t._v("缺点：无法取消 Promise ，错误需要通过回调函数来捕获")]),t._v(" "),a("ul",[a("li",[t._v("Generator\n特点：可以控制函数的执行")]),t._v(" "),a("li",[t._v("Async/await\n优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题")])]),t._v(" "),a("p",[t._v("缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低")]),t._v(" "),a("h2",{attrs:{id:"_5-promise的三种状态"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-promise的三种状态"}},[t._v("#")]),t._v(" 5.Promise的三种状态")]),t._v(" "),a("p",[t._v("状态:")]),t._v(" "),a("ul",[a("li",[t._v("pending(等待态)")]),t._v(" "),a("li",[t._v("resolved(成功态)")]),t._v(" "),a("li",[t._v("rejected(失败态)")])]),t._v(" "),a("p",[t._v("变化途径:")]),t._v(" "),a("ul",[a("li",[t._v("异步操作从“未完成”pending到”已完成“resolved")]),t._v(" "),a("li",[t._v('异步操作从“未完成"pending到”失败“rejected')])]),t._v(" "),a("p",[t._v("状态一旦改变，就无法再次改变状态，这也是它名字 promise-承诺 的由来")]),t._v(" "),a("h2",{attrs:{id:"_6-async-await怎么实现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-async-await怎么实现"}},[t._v("#")]),t._v(" 6.Async/Await怎么实现")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const sleep = (timeountMS) => new Promise((resolve) => {\n  setTimeout(resolve, timeountMS);\n});\n \n(async () => {\n  console.log('11111111, ' + new Date());\n  await sleep(2000);\n  console.log('22222222, ' + new Date());\n  await sleep(2000);\n  console.log('33333333, ' + new Date());\n})();\n")])])]),a("h2",{attrs:{id:"_7-promise和settimeout执行的先后的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-promise和settimeout执行的先后的区别"}},[t._v("#")]),t._v(" 7.Promise和setTimeout执行的先后的区别")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("console.log('打印'+1);\nsetTimeout(function(){\n    console.log('打印'+2);\n})\nnew Promise(function(resolve,reject){\n        console.log('打印'+3);\n}).then(\n  console.log('打印'+4));;\n  console.log('打印'+10);\n  new Promise(function(resolve,reject){\n      setTimeout(function () {\n        console.log('打印'+5);\n      });\n  }).then(\n  console.log('打印'+6));\n  setTimeout(function(){\n    new Promise(function(resolve,reject){\n        console.log('打印'+7);\n      });\n})\n// 打印1,打印3,打印4,打印10,打印6,打印2,打印5,打印7\n")])])]),a("p",[t._v("可以看出Promise比setTimeout()先执行。")]),t._v(" "),a("p",[t._v("因为Promise定义之后便会立即执行，其后的.then()是异步里面的微任务。")]),t._v(" "),a("p",[t._v("而setTimeout()是异步的宏任务。")]),t._v(" "),a("h3",{attrs:{id:"浏览器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浏览器"}},[t._v("#")]),t._v(" 浏览器")]),t._v(" "),a("p",[t._v("js是单线程语言，浏览器只分配给js一个主线程，用来执行任务（函数），但一次只能执行一个任务，这些任务形成一个任务队列排队等候执行，但前端的某些任务是非常耗时的，比如网络请求，定时器和事件监听，如果让他们和别的任务一样，都老老实实的排队等待执行的话，执行效率会非常的低，甚至导致页面的假死。所以，浏览器为这些耗时任务开辟了另外的线程，主要包括http请求线程，浏览器定时触发器，浏览器事件触发线程，这些任务是异步的。")]),t._v(" "),a("h3",{attrs:{id:"任务队列"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#任务队列"}},[t._v("#")]),t._v(" 任务队列")]),t._v(" "),a("p",[t._v("刚才说到浏览器为网络请求这样的异步任务单独开了一个线程，那么问题来了，这些异步任务完成后，主线程怎么知道呢？答案就是回调函数，整个程序是事件驱动的，每个事件都会绑定相应的回调函数，举个栗子，有段代码设置了一个定时器")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("setTimeout(function(){\n    console.log(time is out);\n}，1000）;\n")])])]),a("p",[t._v("执行这段代码的时候，浏览器异步执行计时操作，当1000ms到了后，会触发定时事件，这个时候，就会把回调函数放到任务队列里。整个程序就是通过这样的一个个事件驱动起来的。\n所以说，js是一直是单线程的，浏览器才是实现异步的那个家伙")]),t._v(" "),a("p",[a("img",{attrs:{src:"/interview/rw.png",alt:""}})]),t._v(" "),a("p",[t._v("导图要表达的内容用文字来表述的话：")]),t._v(" "),a("ul",[a("li",[t._v('同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。')]),t._v(" "),a("li",[t._v("当指定的事情完成时，Event Table会将这个函数移入Event Queue。")]),t._v(" "),a("li",[t._v("主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。")]),t._v(" "),a("li",[t._v("上述过程会不断重复，也就是常说的Event Loop(事件循环)")])]),t._v(" "),a("h2",{attrs:{id:"主线程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#主线程"}},[t._v("#")]),t._v(" 主线程")]),t._v(" "),a("h4",{attrs:{id:"js一直在做一个工作-就是从任务队列里提取任务-放到主线程里执行。下面我们来进行更深一步的理解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#js一直在做一个工作-就是从任务队列里提取任务-放到主线程里执行。下面我们来进行更深一步的理解"}},[t._v("#")]),t._v(" js一直在做一个工作，就是从任务队列里提取任务，放到主线程里执行。下面我们来进行更深一步的理解")]),t._v(" "),a("ul",[a("li",[t._v("所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。")]),t._v(" "),a("li",[t._v('主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。')]),t._v(" "),a("li",[t._v('一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。')]),t._v(" "),a("li",[t._v("主线程不断重复上面的第三步")])]),t._v(" "),a("p",[a("img",{attrs:{src:"/interview/zxc.png",alt:""}})]),t._v(" "),a("p",[t._v('只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。')]),t._v(" "),a("h3",{attrs:{id:"event-loop"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#event-loop"}},[t._v("#")]),t._v(" Event Loop")]),t._v(" "),a("p",[t._v('主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）')]),t._v(" "),a("p",[a("img",{attrs:{src:"/interview/loop.png",alt:""}})]),t._v(" "),a("p",[t._v('上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数')]),t._v(" "),a("p",[t._v("异步任务有宏任务和微任务。")]),t._v(" "),a("p",[a("img",{attrs:{src:"/interview/hw.png",alt:""}})]),t._v(" "),a("h4",{attrs:{id:"宏任务macrotask"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#宏任务macrotask"}},[t._v("#")]),t._v(" 宏任务macrotask：")]),t._v(" "),a("p",[t._v("（事件队列中的每一个事件都是一个macrotask）")]),t._v(" "),a("p",[t._v("优先级：主代码块 > setImmediate > MessageChannel > setTimeout / setInterval")]),t._v(" "),a("p",[t._v("比如：setImmediate指定的回调函数，总是排在setTimeout前面")]),t._v(" "),a("h4",{attrs:{id:"微任务包括"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#微任务包括"}},[t._v("#")]),t._v(" 微任务包括：")]),t._v(" "),a("p",[t._v("优先级：process.nextTick > Promise > MutationObserver")]),t._v(" "),a("h2",{attrs:{id:"_7-promise-构造函数是同步执行还是异步执行-那么-then-方法呢"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-promise-构造函数是同步执行还是异步执行-那么-then-方法呢"}},[t._v("#")]),t._v(" 7.Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？")]),t._v(" "),a("p",[t._v("promise构造函数是同步执行的，then方法是异步执行的")]),t._v(" "),a("p",[t._v("Promise new的时候会立即执行里面的代码 then是微任务 会在本次任务执行完的时候执行 setTimeout是宏任务 会在下次任务执行的时候执行")]),t._v(" "),a("h2",{attrs:{id:"_8-发布-订阅和观察者模式的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-发布-订阅和观察者模式的区别"}},[t._v("#")]),t._v(" 8.发布-订阅和观察者模式的区别")]),t._v(" "),a("h3",{attrs:{id:"_1、观察者模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、观察者模式"}},[t._v("#")]),t._v(" 1、观察者模式")]),t._v(" "),a("p",[t._v("观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时,所有依赖它的对象都将得到通知，并自动更新。观察者模式属于行为型模式，行为型模式关注的是对象直接的通讯，观察者模式就是观察者和被观察者之间的通讯。")]),t._v(" "),a("h3",{attrs:{id:"_2、订阅-发布模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、订阅-发布模式"}},[t._v("#")]),t._v(" 2、订阅-发布模式")]),t._v(" "),a("p",[t._v("在观察者模式中的subject就像一个发布者，观察者完全和订阅者关联。subject通知观察者就像一个发布者通知他的订阅者。")]),t._v(" "),a("p",[t._v("在发布-订阅模式，消息的发送方，叫做发布者（publishers），消息不会直接发送给特定的接收者，叫做订阅者。")]),t._v(" "),a("p",[t._v("意思就是发布者和订阅者不知道对方的存在。需要一个第三方组件，叫做信息中介，它将订阅者和发布者串联起来，他过滤和分配所有输入的消息。换句话说，发布者-订阅模式用来出来不同系统组件的信息交流，即使这些组件不知道对方的存在。")]),t._v(" "),a("h3",{attrs:{id:"_3、两种模式的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、两种模式的区别"}},[t._v("#")]),t._v(" 3、两种模式的区别")]),t._v(" "),a("p",[a("img",{attrs:{src:"/interview/fbdy.png",alt:""}})]),t._v(" "),a("p",[t._v("可以看出发布订阅模式相比观察者模式多了个事件通道，事件通道作为调度中心，管理事件的订阅和发布工作，彻底隔绝订阅者和发布者的依赖关系。即订阅者在订阅事件的时候，只关注事件本身，而不关心谁会发布这个事件；发布者在发布事件的时候，只关注事件本身，而不关心谁订阅了这个事件。")]),t._v(" "),a("p",[t._v("观察者模式有两个重要的角色，即目标和观察者。在目标和观察者之间是没有事件通道的。一方面，观察者要想订阅目标事件，由于没有事件通道，因此必须将自己添加到目标(Subject) 中进行管理；另一方面，目标在触发事件的时候，也无法将通知操作(notify) 委托给事件通道，因此只能亲自去通知所有的观察者。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("订阅-发布者模式\nclassPubSub {\n    constructor() {\n        this.subscribers = [];\n    }\n     \n    subscribe(topic, callback) {\n        let callbacks = this.subscribers[topic];\n        if(!callbacks) {\n            this.subscribers[topic] = [callback];\n        } else{\n            callbacks.push(callback);\n        }\n    }\n     \n    publish(topic, ...args) {\n        letcallbacks = this.subscribers[topic] || [];\n        callbacks.forEach(callback => callback(...args));\n    }\n}\n \n// 创建事件调度中心，为订阅者和发布者提供调度服务\nlet pubSub = new PubSub();\n// A订阅了SMS事件（A只关注SMS本身，而不关心谁发布这个事件）\npubSub.subscribe('SMS', console.log);\n// B订阅了SMS事件\npubSub.subscribe('SMS', console.log);\n// C发布了SMS事件（C只关注SMS本身，不关心谁订阅了这个事件）\npubSub.publish('SMS', 'I published `SMS` event');\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("观察者模式\nclassSubject {\n    constructor() {\n        this.observers = [];\n    }\n \n    add(observer) {\n        this.observers.push(observer);\n    }\n \n    notify(...args) {\n        this.observers.forEach(observer => observer.update(...args));\n    }\n}\n \nclass Observer {\n    update(...args) {\n        console.log(...args);\n    }\n}\n \n// 创建观察者ob1\nlet ob1 = new Observer();\n// 创建观察者ob2\nlet ob2 = new Observer();\n// 创建目标sub\nlet sub = new Subject();\n// 目标sub添加观察者ob1 （目标和观察者建立了依赖关系）\nsub.add(ob1);\n// 目标sub添加观察者ob2\nsub.add(ob2);\n// 目标sub触发SMS事件（目标主动通知观察者）\nsub.notify('I fired `SMS` event');\n")])])]),a("h2",{attrs:{id:"_8-深拷贝和浅拷贝的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-深拷贝和浅拷贝的区别"}},[t._v("#")]),t._v(" 8.深拷贝和浅拷贝的区别")]),t._v(" "),a("p",[t._v("js把数据类型分为基本数据类型和引用数据类型")]),t._v(" "),a("p",[t._v("基本数据类型只是保存在栈内存中的简单数据段，即这种值是完全保存在内存中的一个位置。包含了Number，String，Boolean，Null，Undefined，Symbol。保存在栈内存中，因为这些类型在内存中分别占有固定大小的空间，通过按值来访问")]),t._v(" "),a("p",[t._v("引用数据类型指的是保存在对内存中的对象，所以引用类型的值保存的是一个指针，这个指针指向的是堆中的一个对象。除了上面6种基本数据类型外，剩下的就是引用类型了，同时Object类型，Object，Array，Date，Function等等。")]),t._v(" "),a("p",[t._v("保存在堆内存中，因为这样值的大小不固定，因此不能把他们保存在栈内存中，但内存地址大小的固定的，因此保存在堆内存中，在栈内存中存放的只是该对象的访问地址。当查询引用类型的变量时，先从栈中读取内存地址，然后通过地址找到堆中的值。")]),t._v(" "),a("h3",{attrs:{id:"区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#区别"}},[t._v("#")]),t._v(" 区别:")]),t._v(" "),a("ul",[a("li",[t._v("层次:")])]),t._v(" "),a("p",[t._v("浅拷贝:只会将对象的各个属性进行一次复制，并不会进行递归复制，也就是说只会赋值目标对象的第一层属性")]),t._v(" "),a("p",[t._v("深拷贝:是递归拷贝目标对象的所有属性")]),t._v(" "),a("ul",[a("li",[t._v("是否开辟新的栈")])]),t._v(" "),a("p",[t._v("浅拷贝：目标对象第一次为基本属性类型的数据，就是直接赋值存在栈内存中的堆内存地址，并没有开辟新的栈，也就是复制的结果是两个对象指向同一个地址，修改其中一个对象的属性，则另一个也会改变")]),t._v(" "),a("p",[t._v("深拷贝：开辟新的栈，两个对象对应不同的地址，修改一个对象属性，不会改变两个对象属性")]),t._v(" "),a("h2",{attrs:{id:"_9-react-中-setstate-什么时候是同步的-什么时候是异步的"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_9-react-中-setstate-什么时候是同步的-什么时候是异步的"}},[t._v("#")]),t._v(" 9.React 中 setState 什么时候是同步的，什么时候是异步的？")]),t._v(" "),a("ul",[a("li",[t._v("setState 只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。")]),t._v(" "),a("li",[t._v("setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。")]),t._v(" "),a("li",[t._v("setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。")])])])}),[],!1,null,null,null);a.default=v.exports}}]);