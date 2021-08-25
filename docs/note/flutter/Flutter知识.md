# Flutter知识

## Flutter 是什么？
Flutter是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter完全免费，开源的。

## Flutter特性有哪些？
快速开发(毫秒级热重载)
- 绚丽UI(内建漂亮的质感设计Material Design和Cupertino Widget和丰富平滑的动画效果和平台感知)
- 响应式(Reactive,用强大而灵活的API解决2D，动画，手势，效果等难题)
- 原生访问功能
- 堪比原生性能

## Flutter的优点是什么？
- 跨平台开发：此功能使Flutter可以编写一次代码, 进行维护并可以在不同平台上运行。它节省了开发人员的时间, 精力和金钱。
- 更快的开发：Flutter应用程序的性能很快。 Flutter使用arm C / C ++库编译应用程序, 该库使其更接近于机器代码, 并为应用程序提供了更好的本机性能。
- 良好的社区：Flutter具有良好的社区支持, 开发人员可以在其中提出问题并快速获得结果。
- 实时和热重载：它使应用程序开发过程非常快速。此功能使我们能够在更改后立即更改或更新反映的代码。
- 最少的代码：Flutter应用程序是由Dart编程语言开发的, 它使用JIT和AOT编译来缩短总体启动时间, 发挥作用并加速性能。 JIT增强了开发系统并刷新了UI, 而无需花费更多精力来构建新的。
- 专注于UI：它具有出色的用户界面, 因为它使用了以设计为中心的小部件, 高级开发工具, 高级API和许多其他功能。
- 文档：Flutter具有很好的文档支持。它井井有条, 内容更丰富。我们可以将所有想要编写的东西都放在一个地方。

## Flutter和Dart的关系是什么？
Flutter是一个使用Dart语言开发的跨平台移动UI框架，通过自建绘制引擎，能高性能，高保真的进行移动开发。Dart囊括了多数编程语言的优点，它更符合Flutter构建界面的方式。

## Dart语言的特性？
- Productive(生产力高，Dart的语法清晰明了，工具简单但功能强大)
- Fast(执行速度快，Dart提供前优化编译，以在移动设备和Web上获得可预测的高性能和快速启动。)
- Protable(易于移植，Dart可编译成ARM和X86代码，这样Dart移动应用程序可以再iOS，Android和其他地方运行)
- Approachable(容易上手，充分吸收了高级语言特性，如果你已经知道C++，C语言，或者Java，你可以在短短几天内用Dart来开发)
- Reactive(响应式编程)

## Dart的一些重要概念？
- 在Dart中，一切都是对象，所有的对象都继承自Object
- Dart是强类型语言，但可以用var或dynamic来声明一个变量，Dart会自动推断其数据类型，dynamic类似c#
- 没有赋初值的变量都会有默认值null
- Dart支持顶层方法，如main方法，可以在方法内部创建方法
- Dart支持顶层变量，也支持变量或对象变量
- Dart没有public protected private等关键字，如果某个变量以下划线(_)开头，代表这个变量在库中是私有的

## dart是值传递还是引用传递？
dart中，基本数据类型是传值，类传引用。我们每次调用函数，传递过去的都是对象的内存地址，而不是这个对象的复制。

## Widget和element和RenderObject之间的关系？
- Widget是用户界面的一部分，并且是不可变得。
- Element是在树中特定位置Widget的实例。
- RenderObject是渲染树中的一个对象，它的层次结构是渲染库的核心。

Widget会被inflate(填充)到Element，并由Element管理底层渲染树。Widget并不会直接管理状态及渲染，而是通过State这个对象来管理状态。Flutter创建Element的可见树，相对于Widget来说，是可变的，通常界面开发中，我们不用直接操作Element，而是由框架层实现内部逻辑。就如一个UI视图树中，可能包含有多个TextWidget(Widget被使用多次)，但是放在内部视图树的视角，这些TextWidget都是填充到一个个独立的Element中。Element会持有renderObject和widget的实例。记住，Widget只是一个配置，RenderObject负责管理布局，绘制等操作。

在第一次创建Widget的时候，会创建一个Element，然后将该元素插入树中。如果之后Widget发生了变化，则将其与旧的Widget进行比较，并且相应的更新Element。重要的是，Element不会被重建，只是更新而已。

## mixin extends implement之间的关系？
继承(关键字extends),混入mixins(关键字with),接口实现(关键字implements)。这三者可以同时存在，前后顺序是extends->mixins->implements。

Flutter中的继承是单继承，子类重写超类的方法要用@Override,子类调用超类的方法要用super。

在Flutter中，Mixins是一种在多个类层结构中复用类代码的方法。mixins的对象是类，mixins绝不继承，也不是接口，而是一种全新的特性，可以mixins多个类，mixins的使用需要满足一定条件。

## 使用mixins的条件是什么？
因为mixins使用的条件，随着Dart版本一直在变，这里讲的是Dart2.1中使用mixins的条件:
- mixins类只能继承自object
- mixins类不能有构造函数
- 一个类可以mixins多个mixins类
- 可以mixins多个类，不破坏Flutter的单继承

## Flutter main future mirotask的执行顺序？
普通代码都是同步执行的，结束后会开始检查microtask中是否有任务，若有则执行，执行完继续检查microtask，直到microtask列队为空。最后会去执行event队列(future)。

## Future和isolate有什么区别？
future是异步编程，调用本身立即返回，并在稍后的某个时候执行完成时在获得返回结果。在普通代码中可以使用await等待一个异步调用结束。

isolate是并发变成，Dart有并发时的共享状态，所有Dart代码都在isolate中运行，包括最初的main()。每个isolate都有它自己的堆内存，意味着其中所有内存数据，包括全局数据，都仅对该isolate可见，它们之间的通信只能通过传递消息的机制，消息则通过端口(port)收发。isolate只是一个概念，具体取决于如何实现，比如在Dart VM中一个isolate可能会是一个线程，在Web中可能会是一个Web Worker。

## Stream 与 Future是什么关系？
Stream 和 Future 是 Dart 异步处理的核心 API。Future 表示稍后获得的一个数据，所有异步的操作的返回值都用 Future 来表示。但是 Future 只能表示一次异步获得的数据。而 Stream 表示多次异步获得的数据。比如界面上的按钮可能会被用户点击多次，所以按钮上的点击事件（onClick）就是一个 Stream 。简单地说，Future将返回一个值，而Stream将返回多次值。Dart 中统一使用 Stream 处理异步事件流。Stream 和一般的集合类似，都是一组数据，只不过一个是异步推送，一个是同步拉取。

## Stream 两种订阅模式
Stream有两种订阅模式：单订阅(single) 和 多订阅（broadcast）。单订阅就是只能有一个订阅者，而广播是可以有多个订阅者。这就有点类似于消息服务（Message Service）的处理模式。单订阅类似于点对点，在订阅者出现之前会持有数据，在订阅者出现之后就才转交给它。而广播类似于发布订阅模式，可以同时有多个订阅者，当有数据时就会传递给所有的订阅者，而不管当前是否已有订阅者存在。

Stream 默认处于单订阅模式，所以同一个 stream 上的 listen 和其它大多数方法只能调用一次，调用第二次就会报错。但 Stream 可以通过 transform() 方法（返回另一个 Stream）进行连续调用。通过 Stream.asBroadcastStream() 可以将一个单订阅模式的 Stream 转换成一个多订阅模式的 Stream，isBroadcast 属性可以判断当前 Stream 所处的模式。

## await for 如何使用?
await for是不断获取stream流中的数据，然后执行循环体中的操作。它一般用在直到stream什么时候完成，并且必须等待传递完成之后才能使用，不然就会一直阻塞。
```js
Stream<String> stream = new Stream<String>.fromIterable(['不开心', '面试', '没', '过']);
main() async{
  print('上午被开水烫了脚');
  await for(String s in stream){
    print(s);
  }
  print('晚上还没吃饭');
}
```

## Flutter中的Widget、State、Context 的核心概念？是为了解决什么问题？
**Widget** : 在Flutter中，几乎所有东西都是Widget。将一个Widget想象为一个可视化的组件（或与应用可视化方面交互的组件），当你需要构建与布局直接或间接相关的任何内容时，你正在使用Widget。

**Widget树** : Widget以树结构进行组织。包含其他Widget的widget被称为父Widget(或widget容器)。包含在父widget中的widget被称为子Widget。

**Context** : 仅仅是已创建的所有Widget树结构中的某个Widget的位置引用。简而言之，将context作为widget树的一部分，其中context所对应的widget被添加到此树中。一个context只从属于一个widget，它和widget一样是链接在一起的，并且会形成一个context树。

**State** : 定义了StatefulWidget实例的行为，它包含了用于”交互/干预“Widget信息的行为和布局。应用于State的任何更改都会强制重建Widget。

这些状态的引入，主要是为了解决多个部件之间的交互和部件自身状态的维护。

## Widget的两种类型是什么？
**StatelessWidget** : 一旦创建就不关心任何变化，在下次构建之前都不会改变。它们除了依赖于自身的配置信息（在父节点构建时提供）外不再依赖于任何其他信息。比如典型的Text、Row、Column、Container等，都是StatelessWidget。它的生命周期相当简单：初始化、通过build()渲染。

**StatefulWidget** : 在生命周期内，该类Widget所持有的数据可能会发生变化，这样的数据被称为State，这些拥有动态内部数据的Widget被称为StatefulWidget。比如复选框、Button等。State会与Context相关联，并且此关联是永久性的，State对象将永远不会改变其Context，即使可以在树结构周围移动，也仍将与该context相关联。当state与context关联时，state被视为已挂载。StatefulWidget由两部分组成，在初始化时必须要在createState()时初始化一个与之相关的State对象。

## State 对象的初始化流程？
**initState()** : 一旦State对象被创建，initState方法是第一个（构造函数之后）被调用的方法。可通过重写来执行额外的初始化，如初始化动画、控制器等。重写该方法时，应该首先调用super.initState()。在initState中，无法真正使用context，因为框架还没有完全将其与state关联。initState在该State对象的生命周期内将不会再次调用。

**didChangeDependencies()** : 这是第二个被调用的方法。在这一阶段，context已经可用。如果你的Widget链接到了一个InheritedWidget并且/或者你需要初始化一些listeners（基于context），通常会重写该方法。

**build(BuildContext context)** : 此方法在didChangeDependencies()、didUpdateWidget()之后被调用。每次State对象更新（或当InheritedWidget有新的通知时）都会调用该方法！我们一般都在build中来编写真正的功能代码。为了强制重建，可以在需要的时候调用setState((){...})方法。

**dispose()** : 此方法在Widget被废弃时调用。可重写该方法来执行一些清理操作（如解除listeners），并在此之后立即调用super.dispose()。


## Widget 唯一标识Key有那几种？
在flutter中，每个widget都是被唯一标识的。这个唯一标识在build或rendering阶段由框架定义。该标识对应于可选的Key参数，如果省略，Flutter将会自动生成一个。

在flutter中，主要有4种类型的Key：GlobalKey（确保生成的Key在整个应用中唯一，是很昂贵的，允许element在树周围移动或变更父节点而不会丢失状态）、LocalKey、UniqueKey、ObjectKey。


## 什么是Navigator? MaterialApp做了什么？
Navigator是在Flutter中负责管理维护页面堆栈的导航器。MaterialApp在需要的时候，会自动为我们创建Navigator。Navigator.of(context)，会使用context来向上遍历Element树，找到MaterialApp提供的_NavigatorState再调用其push/pop方法完成导航操作。

## StatefulWidget的声明周期
- initState():Widget初始化当前State，在当前方法中是不能获取到Context的，如果想要获取，可以事Flutter.delaved()。
- didChangeDependencies():在initState()后调用，State对象依赖关系发生变化的时候也会调用。
- deactivate():当state被暂时从视图树中移除时会调用这个方法，页面切换时也会调用该方法，和Android里的onPause差不多。
- dispose():Widget销毁时调用。
- didUpdateWidget:Widget状态发生变化的时候调用。

## Flutter如何与Android和iOS通信？
Flutter通过PlatformChannel与原生进行交互，其中PlatformChannel分为三种:
- BasicNessageChannel:用于产地字符串和半结构化的信息。
- MethodChannel:用于传递方法调用。Flutter主动调用Native的方法，并获取相应的返回值。
- EventChannel：用于数据流(event streams)的通信。

具体可以查看 [闲鱼技术：深入理解 Flutter Platform Channe](https://www.jianshu.com/p/39575a90e820)

## 什么是 Widgets、RenderObjects 和 Elements?
-	Widget 仅用于存储渲染所需要的信息。
-	RenderObject 负责管理布局、绘制等操作。
-	Element 才是这颗巨大的控件树上的实体。

具体可以查看[Flutter，什么是 Widgets、RenderObjects 和 Elements?](https://juejin.cn/post/6844903639119560711)


## 说一下什么是状态管理，为什么需要它？
首先状态其实是一个概念上的东西，区分全局状态和局部状态。

局部状态比如说一个控件中输入的信息，全局状态比如是登陆后从后台请求回来的 userId。

当全局状态越来越多，多个页面共享一个状态时，我们就需要管理它。

常用的状态管理有：
-	ScopedModel
-	BLoC
-	Redux / FishRedux
-	Provider

## 如何统一管理错误页面？
我们都知道，如果在 Flutter 当中出错的话，那就是一片红。

可以使用 ErrorWidget.builder 来自定义一个 Widget 就 ok 了。

具体可以看一下 [小德 - 教你自定义Flutter错误页面](https://juejin.cn/post/6844903762398560270)

## 什么是ScopedModel / BLoC模式？
ScopedModel和BLoC（业务逻辑组件）是常见的Flutter应用程序架构模式，可帮助将业务逻辑与UI代码分离，并使用更少的状态窗口小部件。




## Dart当中的[..]标识什么意思？
Dart当中的`[..]`意思是`[级联操作符]`，为了方便配置而使用。`[..]`和`[.]`不同的是调用`[..]`后返回的相当于是this，而`[.]`返回的则是该方法返回的值。

## Dart的作用域
Dart没有public,private等关键字，默认就是公开的，私有变量使用下划线_开头。

## Dart是不是单线程模型？是如何运行的？
Dart是单线程模型，如图

![](/flutter/1608220395606.jpg)

Dart在单线程中是以消息循环机制来运行的，其中包含两个任务队列，一个是"微任务队列"microtask queue,另一个叫做"事件队列"event queue。

入口函数main()执行完后，消息循环机制便启动了。首先会按照先进先出的顺序逐个执行微任务队列中的任务，当所有微任务队列执行完后便开始执行事件队列中的任务，事件任务执行完毕后再去执行微任务，如此循环往复，生生不息。





