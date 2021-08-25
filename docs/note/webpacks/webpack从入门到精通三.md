# webpack从入门到精通(三)

我们学习webpack的另外一个东西devServer这个插件，传统的开发中，我们每次修改都要把页面刷新一下才可以看到效果，而且ajax请求在file文件协议是发生不出去，需要上传到服务器上，或者本地搭建服务器才可以，而devServer可以让我们直接实现服务器的效果，可用实现热更新，ajax请求的部署在服务器的效果而不用去搭建。

## devServer安装

``` npm i webpack-dev-server -D ```

webpack-dev-server走的是内存，直接在内存中启动

## 配置package.json:在script添加一个dev:webpack-dev-server

![](/webpacks/1602496248026.jpg)

## 配置webpack.config.js 添加 devserver 选择
```
const path = require('path'); //nodejs的语法，引入路径模块，为了输出的时候找绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //引入清除文件插件
module.exports = {
	// entry: ['./js/index.js', './js/two.js', ],
	entry: {
		one: './js/index.js',
		two: ['./js/two.js', ],
	}, //入口文件为main.js  
	output: { //输出
		path: path.resolve(__dirname, 'dist'), //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径
		// filename: 'bundle.js' ,//输出的文件名
		filename: '[name].bundle.js' //可以以name/id/hash放在中括号里区分文件名
	},
	devServer:{//开发服务器的配置
        open:true,//自动打开
        port:3000,//端口
        progress:true,
        contentBase:path.join(__dirname, "dist"),//指向资源函数，默认是指向配置dist文件
        compress:true,
        headers:{
            'token':'231'
        },//请求头
        historyApiFallback:true,
        ////devServer默认行为是在发行源代码被更新后通过自动刷新整个页面来做到实时预览的，
        //开启模块热替换功能后,它是通过在不刷新整个页面的情况下通过使用新模块替换旧模块来做到实时预览的 
        //在package.json 配置 --hot 或者引入webpack的HotModuleReplacementPlugin热更新
		//使用后module里面的MiniCssExtractPlugin.loader改成"style-loader",仅限开发环境用
        hot:true,
		//即便HMR没有生效，浏览器也不会自动刷新
        hotOnly: true
    },
	plugins: [
		new CleanWebpackPlugin(), //位置放在最上面，作用是先删除dist目录再创建新的dist目录。参数在npm官网上有 默认会去清除output.path里的路径，webpack的output.path目录中的所有文件将被删除一次，但是目录本身不会被删除
		new HtmlWebpackPlugin({
			title: '贪吃的猫',
			/*这个值对应html里的title值 配置该项，它并不会替换指定模板文件中的title元素的内容，除非html模板文件中使用了模板引擎语法来获取该配置项值， <title><%= htmlWebpackPlugin.options.title %></title>*/
			template: path.join(__dirname, 'default_index.ejs'), //模板文件地址。可以自定义模板
			filename: 'index.html', //文件名，默认为index.html（路径相对于output.path的值）   还可以为输出文件指定目录位置（例如'html/index.html'）
			hash: false, //true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式如下所示：html <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>
			/* 
			 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；
			 chunks: 'all', 所有的都引入
			 chunks: ['one'],  引入对应的JS 如果有多个相同的  可以通过 entry的 key : array 引入 如 
			 entry: {
			 	one: './js/index.js',
			 	two: ['./js/index.js', './js/two.js', ],
			 },
			 */
			chunks: 'all',
			excludeChunks: [], //这个与chunks配置项正好相反，用来配置不允许注入的thunk。 			
			xhtml: false, //true|fasle, 默认false；是否渲染link为自闭合的标签，true则为自闭合标签
			inject: true, //向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同 1、true或者body：所有JavaScript资源插入到body元素的底部 2、head: 所有JavaScript资源插入到head元素中 3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
			minify: { //html-webpack-plugin内部集成了html-minifier
				collapseWhitespace: true, //压缩空格
				removeAttributeQuotes: true, //移除引号
				removeComments: true, //移除注释
			},
		})
	]
}
```
运行命令 npm run dev

这个时候我们可以通过 http://localhost:30000/ 看到自己的项目  端口号的是自己定义 localhost也是可以自定义的

这里要讲一下devServer的hot，webpack默认行为是在发行源代码被更新后通过自动刷新整个页面来做到实时预览的，页面少的话影响差别不会太大，但一旦页面多的话，每次刷新都是整个刷新，资源加载太多了，所以我们通常会使用webpack里的热更新插件。

引入webpack:

``` const webpack=require('webpack'); ```

在plugins挂载插件 

``` new webpack.HotModuleReplacementPlugin() ```

配置如下:
```
const path = require('path'); //nodejs的语法，引入路径模块，为了输出的时候找绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack=require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //引入清除文件插件
module.exports = {
	// entry: ['./js/index.js', './js/two.js', ],
	entry: {
		one: './js/index.js',
		two: ['./js/two.js', ],
	}, //入口文件为main.js  
	output: { //输出
		path: path.resolve(__dirname, 'dist'), //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径
		// filename: 'bundle.js' ,//输出的文件名
		filename: '[name].bundle.js' //可以以name/id/hash放在中括号里区分文件名
	},
	devServer:{//开发服务器的配置
        open:true,//自动打开
        port:3000,//端口
        progress:true,
        contentBase:path.join(__dirname, "dist"),//指向资源函数，默认是指向配置dist文件
        compress:true,
        headers:{
            'token':'231'
        },//请求头
        historyApiFallback:true,
        ////devServer默认行为是在发行源代码被更新后通过自动刷新整个页面来做到实时预览的，
        //开启模块热替换功能后,它是通过在不刷新整个页面的情况下通过使用新模块替换旧模块来做到实时预览的 
        //在package.json 配置 --hot 或者引入webpack的HotModuleReplacementPlugin热更新
		//使用后module里面的MiniCssExtractPlugin.loader改成"style-loader",仅限开发环境用
        hot:true,
		//即便HMR没有生效，浏览器也不会自动刷新
        hotOnly: true
    },
	plugins: [
		//new webpack.HotModuleReplacementPlugin(),    //引入热更新插件 
		new CleanWebpackPlugin(), //位置放在最上面，作用是先删除dist目录再创建新的dist目录。参数在npm官网上有 默认会去清除output.path里的路径，webpack的output.path目录中的所有文件将被删除一次，但是目录本身不会被删除
		new HtmlWebpackPlugin({
			title: '贪吃的猫',
			/*这个值对应html里的title值 配置该项，它并不会替换指定模板文件中的title元素的内容，除非html模板文件中使用了模板引擎语法来获取该配置项值， <title><%= htmlWebpackPlugin.options.title %></title>*/
			template: path.join(__dirname, 'default_index.ejs'), //模板文件地址。可以自定义模板
			filename: 'index.html', //文件名，默认为index.html（路径相对于output.path的值）   还可以为输出文件指定目录位置（例如'html/index.html'）
			hash: false, //true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式如下所示：html <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>
			/* 
			 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；
			 chunks: 'all', 所有的都引入
			 chunks: ['one'],  引入对应的JS 如果有多个相同的  可以通过 entry的 key : array 引入 如 
			 entry: {
			 	one: './js/index.js',
			 	two: ['./js/index.js', './js/two.js', ],
			 },
			 */
			chunks: 'all',
			excludeChunks: [], //这个与chunks配置项正好相反，用来配置不允许注入的thunk。 			
			xhtml: false, //true|fasle, 默认false；是否渲染link为自闭合的标签，true则为自闭合标签
			inject: true, //向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同 1、true或者body：所有JavaScript资源插入到body元素的底部 2、head: 所有JavaScript资源插入到head元素中 3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
			minify: { //html-webpack-plugin内部集成了html-minifier
				collapseWhitespace: true, //压缩空格
				removeAttributeQuotes: true, //移除引号
				removeComments: true, //移除注释
			},
		})
	]
}
```
有时候我们也可以在page.json中配置 添加 --hot 他也等同于上面的引入

![](/webpacks/1602499433529.jpg)

## mode的使用

官方的介绍提供mode配置选项，告知webpack使用相应模式的内置优化，其实简单来说就是让我们可以在开发模式下和上线模式下配个不同模式下的相关配置信息，默认为开发模式，可以在生成模式和开发模式切换，唯一区别，开发环境的代码不提供压缩，生成环境的代码提供压缩。

切换的方式，一个是在命令窗口执行命令:
```
webpack --mode development
webpack --mode production
```

一个是在package.json配置:
```

{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
	"dev" : "webpack-dev-server --hot --mode development",
	"build" : "webpack --hot --mode production"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^3.2.0",
    "web-dev-server": "^1.6.7",
    "webpack": "^4.42.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
  }
}
```
 在命令运行npm run dev 的话执行开发模式 ，而执行 npm run build 的话就是生产模式 

