(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{510:function(t,e,n){"use strict";n.r(e);var a=n(33),s=Object(a.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"webpack从入门到精通-三"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#webpack从入门到精通-三"}},[t._v("#")]),t._v(" webpack从入门到精通(三)")]),t._v(" "),n("p",[t._v("我们学习webpack的另外一个东西devServer这个插件，传统的开发中，我们每次修改都要把页面刷新一下才可以看到效果，而且ajax请求在file文件协议是发生不出去，需要上传到服务器上，或者本地搭建服务器才可以，而devServer可以让我们直接实现服务器的效果，可用实现热更新，ajax请求的部署在服务器的效果而不用去搭建。")]),t._v(" "),n("h2",{attrs:{id:"devserver安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#devserver安装"}},[t._v("#")]),t._v(" devServer安装")]),t._v(" "),n("p",[n("code",[t._v("npm i webpack-dev-server -D")])]),t._v(" "),n("p",[t._v("webpack-dev-server走的是内存，直接在内存中启动")]),t._v(" "),n("h2",{attrs:{id:"配置package-json-在script添加一个dev-webpack-dev-server"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置package-json-在script添加一个dev-webpack-dev-server"}},[t._v("#")]),t._v(" 配置package.json:在script添加一个dev:webpack-dev-server")]),t._v(" "),n("p",[n("img",{attrs:{src:"/webpacks/1602496248026.jpg",alt:""}})]),t._v(" "),n("h2",{attrs:{id:"配置webpack-config-js-添加-devserver-选择"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置webpack-config-js-添加-devserver-选择"}},[t._v("#")]),t._v(" 配置webpack.config.js 添加 devserver 选择")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("const path = require('path'); //nodejs的语法，引入路径模块，为了输出的时候找绝对路径\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\nconst { CleanWebpackPlugin } = require('clean-webpack-plugin'); //引入清除文件插件\nmodule.exports = {\n\t// entry: ['./js/index.js', './js/two.js', ],\n\tentry: {\n\t\tone: './js/index.js',\n\t\ttwo: ['./js/two.js', ],\n\t}, //入口文件为main.js  \n\toutput: { //输出\n\t\tpath: path.resolve(__dirname, 'dist'), //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径\n\t\t// filename: 'bundle.js' ,//输出的文件名\n\t\tfilename: '[name].bundle.js' //可以以name/id/hash放在中括号里区分文件名\n\t},\n\tdevServer:{//开发服务器的配置\n        open:true,//自动打开\n        port:3000,//端口\n        progress:true,\n        contentBase:path.join(__dirname, \"dist\"),//指向资源函数，默认是指向配置dist文件\n        compress:true,\n        headers:{\n            'token':'231'\n        },//请求头\n        historyApiFallback:true,\n        ////devServer默认行为是在发行源代码被更新后通过自动刷新整个页面来做到实时预览的，\n        //开启模块热替换功能后,它是通过在不刷新整个页面的情况下通过使用新模块替换旧模块来做到实时预览的 \n        //在package.json 配置 --hot 或者引入webpack的HotModuleReplacementPlugin热更新\n\t\t//使用后module里面的MiniCssExtractPlugin.loader改成\"style-loader\",仅限开发环境用\n        hot:true,\n\t\t//即便HMR没有生效，浏览器也不会自动刷新\n        hotOnly: true\n    },\n\tplugins: [\n\t\tnew CleanWebpackPlugin(), //位置放在最上面，作用是先删除dist目录再创建新的dist目录。参数在npm官网上有 默认会去清除output.path里的路径，webpack的output.path目录中的所有文件将被删除一次，但是目录本身不会被删除\n\t\tnew HtmlWebpackPlugin({\n\t\t\ttitle: '贪吃的猫',\n\t\t\t/*这个值对应html里的title值 配置该项，它并不会替换指定模板文件中的title元素的内容，除非html模板文件中使用了模板引擎语法来获取该配置项值， <title><%= htmlWebpackPlugin.options.title %></title>*/\n\t\t\ttemplate: path.join(__dirname, 'default_index.ejs'), //模板文件地址。可以自定义模板\n\t\t\tfilename: 'index.html', //文件名，默认为index.html（路径相对于output.path的值）   还可以为输出文件指定目录位置（例如'html/index.html'）\n\t\t\thash: false, //true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式如下所示：html <script type=\"text/javascript\" src=\"common.js?a3e1396b501cdd9041be\"><\/script>\n\t\t\t/* \n\t\t\t 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；\n\t\t\t chunks: 'all', 所有的都引入\n\t\t\t chunks: ['one'],  引入对应的JS 如果有多个相同的  可以通过 entry的 key : array 引入 如 \n\t\t\t entry: {\n\t\t\t \tone: './js/index.js',\n\t\t\t \ttwo: ['./js/index.js', './js/two.js', ],\n\t\t\t },\n\t\t\t */\n\t\t\tchunks: 'all',\n\t\t\texcludeChunks: [], //这个与chunks配置项正好相反，用来配置不允许注入的thunk。 \t\t\t\n\t\t\txhtml: false, //true|fasle, 默认false；是否渲染link为自闭合的标签，true则为自闭合标签\n\t\t\tinject: true, //向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同 1、true或者body：所有JavaScript资源插入到body元素的底部 2、head: 所有JavaScript资源插入到head元素中 3、false： 所有静态资源css和JavaScript都不会注入到模板文件中\n\t\t\tminify: { //html-webpack-plugin内部集成了html-minifier\n\t\t\t\tcollapseWhitespace: true, //压缩空格\n\t\t\t\tremoveAttributeQuotes: true, //移除引号\n\t\t\t\tremoveComments: true, //移除注释\n\t\t\t},\n\t\t})\n\t]\n}\n")])])]),n("p",[t._v("运行命令 npm run dev")]),t._v(" "),n("p",[t._v("这个时候我们可以通过 http://localhost:30000/ 看到自己的项目  端口号的是自己定义 localhost也是可以自定义的")]),t._v(" "),n("p",[t._v("这里要讲一下devServer的hot，webpack默认行为是在发行源代码被更新后通过自动刷新整个页面来做到实时预览的，页面少的话影响差别不会太大，但一旦页面多的话，每次刷新都是整个刷新，资源加载太多了，所以我们通常会使用webpack里的热更新插件。")]),t._v(" "),n("p",[t._v("引入webpack:")]),t._v(" "),n("p",[n("code",[t._v("const webpack=require('webpack');")])]),t._v(" "),n("p",[t._v("在plugins挂载插件")]),t._v(" "),n("p",[n("code",[t._v("new webpack.HotModuleReplacementPlugin()")])]),t._v(" "),n("p",[t._v("配置如下:")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("const path = require('path'); //nodejs的语法，引入路径模块，为了输出的时候找绝对路径\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\nconst webpack=require('webpack');\nconst { CleanWebpackPlugin } = require('clean-webpack-plugin'); //引入清除文件插件\nmodule.exports = {\n\t// entry: ['./js/index.js', './js/two.js', ],\n\tentry: {\n\t\tone: './js/index.js',\n\t\ttwo: ['./js/two.js', ],\n\t}, //入口文件为main.js  \n\toutput: { //输出\n\t\tpath: path.resolve(__dirname, 'dist'), //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径\n\t\t// filename: 'bundle.js' ,//输出的文件名\n\t\tfilename: '[name].bundle.js' //可以以name/id/hash放在中括号里区分文件名\n\t},\n\tdevServer:{//开发服务器的配置\n        open:true,//自动打开\n        port:3000,//端口\n        progress:true,\n        contentBase:path.join(__dirname, \"dist\"),//指向资源函数，默认是指向配置dist文件\n        compress:true,\n        headers:{\n            'token':'231'\n        },//请求头\n        historyApiFallback:true,\n        ////devServer默认行为是在发行源代码被更新后通过自动刷新整个页面来做到实时预览的，\n        //开启模块热替换功能后,它是通过在不刷新整个页面的情况下通过使用新模块替换旧模块来做到实时预览的 \n        //在package.json 配置 --hot 或者引入webpack的HotModuleReplacementPlugin热更新\n\t\t//使用后module里面的MiniCssExtractPlugin.loader改成\"style-loader\",仅限开发环境用\n        hot:true,\n\t\t//即便HMR没有生效，浏览器也不会自动刷新\n        hotOnly: true\n    },\n\tplugins: [\n\t\t//new webpack.HotModuleReplacementPlugin(),    //引入热更新插件 \n\t\tnew CleanWebpackPlugin(), //位置放在最上面，作用是先删除dist目录再创建新的dist目录。参数在npm官网上有 默认会去清除output.path里的路径，webpack的output.path目录中的所有文件将被删除一次，但是目录本身不会被删除\n\t\tnew HtmlWebpackPlugin({\n\t\t\ttitle: '贪吃的猫',\n\t\t\t/*这个值对应html里的title值 配置该项，它并不会替换指定模板文件中的title元素的内容，除非html模板文件中使用了模板引擎语法来获取该配置项值， <title><%= htmlWebpackPlugin.options.title %></title>*/\n\t\t\ttemplate: path.join(__dirname, 'default_index.ejs'), //模板文件地址。可以自定义模板\n\t\t\tfilename: 'index.html', //文件名，默认为index.html（路径相对于output.path的值）   还可以为输出文件指定目录位置（例如'html/index.html'）\n\t\t\thash: false, //true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式如下所示：html <script type=\"text/javascript\" src=\"common.js?a3e1396b501cdd9041be\"><\/script>\n\t\t\t/* \n\t\t\t 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；\n\t\t\t chunks: 'all', 所有的都引入\n\t\t\t chunks: ['one'],  引入对应的JS 如果有多个相同的  可以通过 entry的 key : array 引入 如 \n\t\t\t entry: {\n\t\t\t \tone: './js/index.js',\n\t\t\t \ttwo: ['./js/index.js', './js/two.js', ],\n\t\t\t },\n\t\t\t */\n\t\t\tchunks: 'all',\n\t\t\texcludeChunks: [], //这个与chunks配置项正好相反，用来配置不允许注入的thunk。 \t\t\t\n\t\t\txhtml: false, //true|fasle, 默认false；是否渲染link为自闭合的标签，true则为自闭合标签\n\t\t\tinject: true, //向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同 1、true或者body：所有JavaScript资源插入到body元素的底部 2、head: 所有JavaScript资源插入到head元素中 3、false： 所有静态资源css和JavaScript都不会注入到模板文件中\n\t\t\tminify: { //html-webpack-plugin内部集成了html-minifier\n\t\t\t\tcollapseWhitespace: true, //压缩空格\n\t\t\t\tremoveAttributeQuotes: true, //移除引号\n\t\t\t\tremoveComments: true, //移除注释\n\t\t\t},\n\t\t})\n\t]\n}\n")])])]),n("p",[t._v("有时候我们也可以在page.json中配置 添加 --hot 他也等同于上面的引入")]),t._v(" "),n("p",[n("img",{attrs:{src:"/webpacks/1602499433529.jpg",alt:""}})]),t._v(" "),n("h2",{attrs:{id:"mode的使用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#mode的使用"}},[t._v("#")]),t._v(" mode的使用")]),t._v(" "),n("p",[t._v("官方的介绍提供mode配置选项，告知webpack使用相应模式的内置优化，其实简单来说就是让我们可以在开发模式下和上线模式下配个不同模式下的相关配置信息，默认为开发模式，可以在生成模式和开发模式切换，唯一区别，开发环境的代码不提供压缩，生成环境的代码提供压缩。")]),t._v(" "),n("p",[t._v("切换的方式，一个是在命令窗口执行命令:")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("webpack --mode development\nwebpack --mode production\n")])])]),n("p",[t._v("一个是在package.json配置:")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('\n{\n  "name": "test",\n  "version": "1.0.0",\n  "description": "",\n  "main": "index.js",\n  "scripts": {\n    "test": "echo \\"Error: no test specified\\" && exit 1",\n\t"dev" : "webpack-dev-server --hot --mode development",\n\t"build" : "webpack --hot --mode production"\n  },\n  "author": "",\n  "license": "ISC",\n  "devDependencies": {\n    "clean-webpack-plugin": "^3.0.0",\n    "html-webpack-plugin": "^3.2.0",\n    "web-dev-server": "^1.6.7",\n    "webpack": "^4.42.0",\n    "webpack-cli": "^3.3.11",\n    "webpack-dev-server": "^3.10.3"\n  }\n}\n')])])]),n("p",[t._v("在命令运行npm run dev 的话执行开发模式 ，而执行 npm run build 的话就是生产模式")])])}),[],!1,null,null,null);e.default=s.exports}}]);