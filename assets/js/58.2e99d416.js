(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{494:function(t,s,a){"use strict";a.r(s);var n=a(37),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"敏捷开发、持续集成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#敏捷开发、持续集成"}},[t._v("#")]),t._v(" 敏捷开发、持续集成")]),t._v(" "),a("h2",{attrs:{id:"什么是持续集成-continuous-integration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是持续集成-continuous-integration"}},[t._v("#")]),t._v(" 什么是持续集成(Continuous integration)?")]),t._v(" "),a("h3",{attrs:{id:"ci"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ci"}},[t._v("#")]),t._v(" CI")]),t._v(" "),a("p",[t._v("在持续集成环境中，开发人员将会频繁得提交代码到主干。这些新提交在最终合并到主线之前，都需要通过编译和自动化测试进行验证。这样做是基于之前持续集成过程中很重视自动化测试验证结果，以保障所有得提交在合并主干之后得质量问题，对可能出现得一些问题进行预计。")]),t._v(" "),a("h3",{attrs:{id:"持续交付-continuous-delivery"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#持续交付-continuous-delivery"}},[t._v("#")]),t._v(" 持续交付(Continuous Delivery)")]),t._v(" "),a("p",[t._v("持续交付就是讲我们得应用发布出去的过程。这个过程可以确保我们尽量可能快的实现交付。这就意味着除了自动化测试，我们还需要有自动化的发布流，以及通过一个按键就可以随时随地实现应用的部署上线")]),t._v(" "),a("p",[t._v("通过持续交付，可以决定每天，每周，每两周发布一次，这完全可以根据自己的业务进行设置。")]),t._v(" "),a("p",[t._v("但是，如果你真的希望体验持续交付的优势，就需要先进行小批量发布，尽快部署到生产线，以便在出现问题时方便进行故障排除。")]),t._v(" "),a("h3",{attrs:{id:"持续部署-continuous-deployment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#持续部署-continuous-deployment"}},[t._v("#")]),t._v(" 持续部署(Continuous Deployment)")]),t._v(" "),a("p",[t._v("如果我们想更加深入一步的话，就是持续部署了。通过这个方式，任何修改通过了所有已有的工作流就会直接和客户见面。没有人为干预(没有一键部署按钮)，只有当一个修改在工作流中构建失败才能阻止它部署到产品线。")]),t._v(" "),a("p",[t._v('持续部署是一个很优秀的方式，可以加速与客户的反馈循环，但是会给团队带来压力，因为不再有"发布日"了。开发人员可以专注于构建软件，他们看到他们修改在他们完成工作后几分钟就上线了。基本上，当开发人员在主分支合并一个提交时，这个分支将被构建，测试，如果一切顺利，则部署到生产环境中。')]),t._v(" "),a("h3",{attrs:{id:"持续集成需求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#持续集成需求"}},[t._v("#")]),t._v(" 持续集成需求")]),t._v(" "),a("ul",[a("li",[t._v("持续集成是通过平台串联各个开发环节，实现和沉淀工作自动化的方法。")]),t._v(" "),a("li",[t._v("线上代码和代码仓库不同步，影响迭代和团队协作。")]),t._v(" "),a("li",[t._v("静态资源发布依赖人工，浪费开发人力。")]),t._v(" "),a("li",[t._v("缺少自动化测试，产品质量得不到保障")]),t._v(" "),a("li",[t._v("文案简单修改上线，需要技术介入。")])]),t._v(" "),a("p",[a("img",{attrs:{src:"/modular/1609680100306.jpg",alt:""}})]),t._v(" "),a("h1",{attrs:{id:"前端模块化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前端模块化"}},[t._v("#")]),t._v(" 前端模块化")]),t._v(" "),a("p",[t._v("1.前端模块化框架肩负着模块管理，资源加载两项重要的功能，这两项功能与工具，性能，业务，部署等工程环境都有着非常精密的联系。因此，模块化框架的设计应该最高优先级考虑工程需要。")]),t._v(" "),a("p",[t._v("2.ComminJS API定义很多普通应用程序(主要指非浏览器的应用)使用的API，从而填补了这个空白。它的终极目标是提供一个类似Python，Ruby和Java标准库。")]),t._v(" "),a("p",[t._v("3.根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量，函数，类，都是私有的，对其他文件不可见。")]),t._v(" "),a("p",[t._v("4.CMD和AMD都是CommonJS的一种规范的实现定义，RequireJS和SeaJS是对应的实践。")]),t._v(" "),a("h2",{attrs:{id:"自动化编译流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动化编译流程"}},[t._v("#")]),t._v(" 自动化编译流程")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("foo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("es"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("foo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scss"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("foo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("png\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//foo.es")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'foo.scss'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//foo.less")]),t._v("\nbackground"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("foo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("png"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("ul",[a("li",[t._v("读入foo.es的文件内容，编译成js内容")]),t._v(" "),a("li",[t._v("分析js内容，找到资源定位标记'foo.scss'")]),t._v(" "),a("li",[t._v("对foo.scss进行编译:\n"),a("ul",[a("li",[t._v("读入foo.scss的内疚内容，编译成css内容")]),t._v(" "),a("li",[t._v("分析css内容，找到资源定位标记"),a("code",[t._v("url(foo,png)")])]),t._v(" "),a("li",[t._v("foo.png进行编译:\n"),a("ul",[a("li",[t._v("读入foo.png的内容")]),t._v(" "),a("li",[t._v("图片压缩")]),t._v(" "),a("li",[t._v("返回图片内容")])])]),t._v(" "),a("li",[t._v("根据foo.png的最终内容计算md5戳，替换url(foo.png)为url(/static/img/foo_2af0b.png)")]),t._v(" "),a("li",[t._v("替换完毕所有资源定位标记，对css内容进行压缩")]),t._v(" "),a("li",[t._v("返回css内容")])])]),t._v(" "),a("li",[t._v("根据foo.css的最终内容计算md戳，替换'foo.scss'为'/static/scss/foo_bae39.css'")]),t._v(" "),a("li",[t._v("替换完毕所有资源定位标记，对js内容进行压缩")]),t._v(" "),a("li",[t._v("返回js内容")]),t._v(" "),a("li",[t._v("根据最终的js内容计算md5戳，得到foo.coffee的资源url为'/static/scripts/foo_3fc20.js'")])]),t._v(" "),a("h3",{attrs:{id:"code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#code"}},[t._v("#")]),t._v(" code")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//AMD(Asynchronous Module Definition)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("define")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dep1'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dep2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("functiom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("dep1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("dep2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//内部只能使用指定的模块")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//CMD")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("define")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("require"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("exports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("module")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//此处如果需要加载某xx模块，可以引入")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" xx"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'xx'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"优缺点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优缺点"}},[t._v("#")]),t._v(" 优缺点")]),t._v(" "),a("p",[t._v("1.CMD依赖是就近声明，通过内部require方法进行声明。但是因为是异步模块，加载器需要提前加载这些模块，所以模块真正使用前需要提取模块里面所有的依赖。")]),t._v(" "),a("p",[t._v("2.不能直接压缩，require局部变量如果替换无法加载资源")]),t._v(" "),a("p",[t._v("3.CMD路径参数不能进行字符串运算。")]),t._v(" "),a("p",[t._v("4.AMD的依赖是提前声明。这种优势的好处就是依赖无须通过静态分析，无论是加载器还是自动化工具都可以很直接的获取到依赖。")]),t._v(" "),a("p",[t._v("5.AMD依赖提前声明在代码书写上不是那么友好。")]),t._v(" "),a("p",[t._v("6.AMD模块内部与NodeJS的Modules有一定的差异。")]),t._v(" "),a("h2",{attrs:{id:"依赖后置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#依赖后置"}},[t._v("#")]),t._v(" 依赖后置")]),t._v(" "),a("p",[t._v("1.requirejs和seajs二者在加载上都有缺陷，就是模块的依赖要等到模块加载完成后，通过静态分析(seajs)或者deps参数(requirejs)来获取，这就为合并请求和按需加载带来了实现上的矛盾:要么放弃按需加载，把所有js合成一个文件。要么放弃请求合并，请求独立的模块文件，从而满足按需加载。")]),t._v(" "),a("p",[t._v("2.AMD规范在执行callback的时候，要初始化所有依赖的模块，而CMD只有执行到require的时候才初始化模块。所以用AMD实现某种if-else逻辑分支加载不同的模块的时候，就会比较麻烦了。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'page/index'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'page/detail'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("detail")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("location"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hash"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#index'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("3.以纯前端方式实现模块化框架不能同时满足按需加载，请求合并和依赖管理三个请求。")])])}),[],!1,null,null,null);s.default=e.exports}}]);