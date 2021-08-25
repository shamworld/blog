# webpack

## 项目初始化

### 安装
```js
npm init -y
npm install webpack webpack-cli html-webpack-plugin webpack-dev-server cross-env -D
```

### webpack.config.js
```js
const path = require('path');
module.exports = {
    mode:'development',//配置的模式
    devtool:'source-map',//调试工具的选择
    content:process.cwd(),//上下文目录
    entry:{
        main:'./src/index.js',
    },
    output:{
        path:path.resolve(__dirname,'dist'),//输出得路径
        filename:'[name].js',//输出得文件名
    }
}
```

### package.json
```js
"scripts": {
    "build": "webpack",
    "start": "webpack serve"
}
```

## 数据分析

### 日志美化
- friendly-errors-webpack-plugin可以识别某些类别得webpack错误，并清理，聚合和优先级，以提供更好得开发人员体验

#### 安装
```js
npm install friendly-errors-webpack-plugin node-notifier
```

#### webpack.config.js
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const ICON = path.join(__dirname,'icon.jpg');
module.exports = {
    mode:'development',//配置的模式
    devtool:'source-map',//调试工具的选择
    content:process.cwd(),//上下文目录
    entry:{
        main:'./src/index.js',
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
    },
    plugins:[
        new FriendlyErrorWebpackPlugin({
            onErrors:(severity,errors)=>{
                let error = errors[0];
                notifier.notifier({
                    title:'webpack编译失败',
                    message:severity+':'+error.name,
                    subTitle:error.file||'',
                    icon:ICON
                })
            }
        }),
    ]
}
```

### 速度分析
- speed-measure-webpack5-plugin 可以分析打包速度

#### 安装
```js
npm install speed-measure-webpack5-plugin -D
```

#### webpack.config.js
```js
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack5-plugin');
const smw = new SpeedMeasureWebpackPlugin();
module.exports = smw.wrap({
    mode:'development',
    devtool:'source-map',
    ...
})
```

### 文件体积监控
- webpack-bundle-analyzer 是一个webpack的插件，需要配合webpack和webpack-cli一起使用，这个插件功能是生成代码分析报告，帮助提升代码指令和网站性能
- 它可以直观分析打包出得文件包含哪些，大小占比如何，模块包含关系，依赖项，文件是否重复，压缩后大小如何，针对这些，我们可以进行文件分割等操作

#### 安装
```js
npm install webpack-bundle-analyzer -D
```

#### webpack.config.js
```js
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
module.exports = {
    plugins:[
        //如果开启打包就启动HTTP服务器就不需要下面两个配置
        new BundleAnalyzerPlugin({
            analyzerMode:'disabled',//不启动展示打包报告得HTTP服务器
            generateStatsFile:true,//要生存stats.json文件
        })
    ]
}
```

![](/webpacks/1611653727254.jpg)

#### package.json
```js
"scripts": {
    "build": "webpack",
    "start": "webpack serve",
    "dev": "webpack --progress",
    "analyzer": "webpack-bundle-analyzer --port 8888 ./dist/stats.json"
  }
```

## 编译时间优化
- 减少要处理的文件
- 缩小查找的范围

### 缩小查找范围

#### extensions
- 指定extensions之后可以不用在`require`或是`import`的时候加文件扩展名
- 查找得时候会依次尝试添加扩展名进行匹配

```js
resolve:{
    extensions:['.js','.jsx','.json']
}
```

#### alias
- 配置别名可以加快webpack查找模块得速度
- 每当引入bootstrap模块的时候，它会直接引入`bootstrap`，而不需要从`node_modules`文件夹按模块的查找规则查找

```js
npm install bootstrap css-loader style-loader -S
```

```js
const bootstrap = path.resolve(__dirname,'node_modules/bootstrap/dist/bootstrap.css');
module.exports = smw.wrap({
    mode:'development',//配置的模式
    devtool:'source-map',//调试工具的选择
    content:process.cwd(),//上下文目录
    entry:{
        main:'./src/index.js',
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
    },
    resolve:{
        extensions:['.js','.jsx','.json'],
        alias:{bootstrap}
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    }
})
```

#### modules
- 对于直接声明依赖名的模块webpack会使用类似`Node.js`一样进行路径搜索，搜索`node_modules`目录
- 如果可以确定想买内所有的第三方依赖模块都是在项目根目录下的`node_modules`中的话可以直接指定
- 默认配置
```js
resolve:{
    extensions:['.js','.jsx','.json'],
    alias:{bootstrap},
    modules:['node_modules']
}
```
- 直接指定  diff reslove:{}
- modules:{['C:/node_modules','node_modules']}

#### mainFields
- 默认情况下`package.json`文件则按照文件中`main`字段的文件名来查找文件
```js
resolve:{
    //配置target==='web'或者target==='webworker'时mainFields默认是:
    mainFields:['browser','module','main'],
    //target的值是其他时，mainFields默认值为:
    mainFields:['module','main'],
}
```

#### oneOf
- 每个文件对于rules中的所有规则都会遍历一遍，如果使用oneOf就可以解决该问题，只要能匹配一个即可退出
- 在oneOf中不能两个匹配处理同一种类型文件

**webpack.config.js**
```js
rules:[
    {
        oneOf:[
            {
                test:/\.js$/,
                include:path.resolve(__dirname,'src'),
                exclude:/node_modules/,//不解析node_modules
                use:[
                    //thread-loader开启线程池，开线程和线程通信都需要时间
                    {
                    loader:'thread-loader',options:{workers:3}}
                    ,{
                        loader:'babel-loader',
                        options:{
                            cacheDirectory:true //启动babel缓存
                        }
                    }]
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            
        ]
    }
]
```

#### external
- 如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD，AMD或者window/global全局等方式进行使用，那就可以配置externals

##### 安装
```js
npm install jquery html-webpack-externals-plugin -D
```

##### 使用jquery

src/index.js

```js
const jQuery = require('jquery');
import jQuery from 'jquery';
```

**index.html**

src/index.html

```js
<sript src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></sript>
```

##### webpack.config.js
webpack.config.js
```js
externals:{
    jquery:'jQuery'
},
module:{}
```

#### resolveLoader
`resolve.resolveLoader`用于配置解析loader时的resolve配置，默认的配置

##### logger-loader.js
loaders/logger-loader.js

```js
//loader就是一个函数，接收一个内容，返回处理后的内容
function loader(source){
  console.log('@@@@@@@logger-loader@@@@@@@@@@');
  return source;
}
module.exports = loader;
```

##### webpack.config.js
webpack.config.js
```js
const loadersPath = path.resolve(__dirname,'loader.js');

module.exports = smw.wrap({
    resolveLoader:{
        modules:[loadersPath,'node_modules']
    },
    externals:{
        jquery:'jQuery'
    },
    module:{}
})
```

### noParse
- `module.noParse`字段，可以用于配置哪些模块文件的内容不需要进行解析
- 不需要解析依赖(即无依赖)的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度
- 使用`noParse`进行忽略的模块文件中不能使用`import`,`require`等语法

#### src/index.js
```js
let title = require('./title');
console.log(title);
```

#### src/title.js
```js
let name = require('./name');
module.exports = `hello ${name}`;
```
#### src/name.js
```js
module.exports = 'Roy';
```

#### webpack.config.js
```js
module.exports = {
    module:{
        noParse:/title.js/,//正则表达式
    }
}
```

### IgnorePlugin
- ignore-plugin用于忽略某些特定的模块，让webpack不把这些指定的模块打包进去
- requestRegExp匹配(test)资源请求路径的正则表达式
- contextRegExp(可选)匹配(test)资源上下文(目录)的正则表达式
- moment会将所有本地化内容和核心功能一起打包，你可使用`ignorePlugin`,在打包时忽略本地化内容

#### 安装
```js
npm install moment -S
```

#### src/index.js
```js
import moment from 'moment'
console.log(moment);
```

#### webpack.config.js
```js
plugins:[
    new webpack.IgnorePlugin({
        resourceRegexp:/^\.\/locale$/,//资源正则
        contextRegExp:/moment$/,//上下文，目录正则
    })
]
```

### thread-loader(多进程)
- 把thread-loader放置在其他loader之前，放置在这个loader之后的loader就会在一个单独的worker池(worker pool)中运行
- include表示哪些目录中的`.js`文件需要进行`babel-loader`
- exclude表示哪些目录中的`.js`文件不需要进行`babel-loader`
- exclude的优先级高于include，尽量避免exclude，更倾向于使用include

#### 安装
```js
npm install thread-loader babel-loader @babel/core @babel/preset-env -D
```

#### webpack.config.js
```js
rules:[
    {
        test:/\.js$/,
        include:path.resolve(__dirname,'src'),
        exclude:/node_modules/,//不解析node_modules
        use:[
            //thread-loader开启线程池，开线程和线程通信都需要时间
            {
            loader:'thread-loader',options:{workers:3}}
        ]
    },
    {
        test:/\.css$/,
        use:[
            'logger-loader',
            'style-loader',
            'css-loader'
        ]
    },
]
```

### 利用缓存
- 利用缓存可以提升重复构建的速度

#### babel-loader
- Babel在转义js文件过程中消耗性能较高，将babel-loader执行的结果缓存起来，当重新打包构建时会尝试读取缓存，从而提高构建速度，降低消耗
- 默认存放位置是`node_modules/.cache/babel-loader`

```js
{
    test:/\.js$/,
    include:path.resolve(__dirname,'src'),
    exclude:/node_modules/,//不解析node_modules
    use:[
        //thread-loader开启线程池，开线程和线程通信都需要时间
        {
        loader:'thread-loader',options:{workers:3}}
        ,{
            loader:'babel-loader',
            options:{
                cacheDirectory:true //启动babel缓存
            }
        }]
}
```

#### cache-loader
- 在一些性能开销较大的cache-loader之前添加此`loader`,可以将结果缓存在磁盘中
- 默认保存在`node_modules/.cache/cache-loader`目录下

```js
npm install cache-loader -D
```

#### hard-source-webpack-plugin
- HardSourceWebpackPlugin为模块提供了中间缓存，缓存默认的存放路径是`node_modules/.cache/hard-source`
- 配置`hard-source-webpack-plugin`后，首次构建时间并不会有太大的变化，但是从第二次开始，构建时间大约可以减少80%左右
- webpack5中已经内置了模块缓存，不需要再使用此插件

##### 安装 
```js
npm install hard-source-webpack-plugin -D
```
##### webpack.config.js
```js
{
    test:/\.css$/,
    use:[
        'cache-loader',
        'logger-loader',
        'style-loader',
        'css-loader'
    ]
}
```

##### webpack.config.js
```js
let HardSourceWebpackPlugin=require('hard-source-webpack-plugin');
module.exports = {
    plugins:[
        new HardSourceWebpackPlugin()
    ]
}
```

## 编译体积优化

### 压缩JS，CSS，HTML和图片
- optimize-css-assets-webpack-plugin是一个优化和压缩CSS资源的插件
- terser-webpack-plugin是一个优化和压缩JS资源的插件
- image-webpack-loader可以帮助我们对图片进行压缩和优化

##### 安装
```js
npm install terser-webpack-plugin optimize-css-assets-webpack-plugin image-webpack-loader -D
```

##### webpack.config.js
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require('min-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    devtool:false,
    entry:'./src/index.js',
    optimization:{
        minimize:true,
        minimizer:{
            new TerserPlugin(),
        }
    },
    module:{
        rules:[
            {
                test:/\.(jpg|png|gif|bmp)$/,
                use:[
                        {
                            loader:'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments: true
            }
        }),
        new OptimizeCssAssetsWebpackPlugin(),//压缩CSS

    ]
}
```

### 清除无用的CSS
- purgecss-webpack-plugin 单独提取CSS并清除用不到的CSS

#### 安装
```js
npm install purgecss-webpack-plugin mini-css-extract-plugin -D
```

#### src/index.js
```js
import './index.css'
```

#### src/index.css
```js
body{
    background-color:red;
}
#root{
    color:red
}
#other{
    color:green
}
```

#### webpack.config.js
```js
//因为CSS和JS的加载可以并行，所以我们可以通过此插件提取CSS成单独的文件，然后去掉无用的CSS并进行压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');//文件匹配模式
const {PATH} = {
    src:path.resolve(__dirname,'src')
}
module.exports = {
    rules:[
        {
            test:/\.css$/,
            use:[
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }
    ],
    plugins:[
        new MiniCssExtractPlugin(),
        //**匹配任意字段，包括路径分隔符，*匹配任意自动，不包含路径分隔符
        new PurgecssWebpackPlugin({
            path:glob.sync(`${PATH.src}/**/*`,{nodir:true})
        })
    ]
}
```

### Tree Shaking
- 一个模块可以有多个方法，只要其中某个方法使用到了，则整个文件都会被打到bundle里面去，tree shaking就是只把用到的方法打入bundle，没用到的方法会`uglify`阶段擦除掉
- 原理是利用es6模块的特定，只能作为模块顶层语句出现，import的模块名只能是字符串常量

#### 开启
- webpack默认支持，可在production mode下默认开启
- 在package.json 中配置:
    - "sideEffects":false 所有的代码都没有副作用(都可以进行tree shaking)
    - 可能会把css和@babel/polyfill文件干掉 可以设置"sideEffects":["*.css"]

#### 没有导入和使用
functions.js
```js
function func1(){
    return 'func1';
}
function func2(){
    return 'func2';
}
export {
    func1,
    func2
}
```

```js
import {func2} from './functions';
var result2 = func2();
console.log(result2);
```

#### 代码不会被执行，不可到达
```js
if(false){
    console.log('false');
}
```

#### 代码中只写不读的变量
```js
var aabbcc = 'aabbcc';
aabbcc = 'eeffgg';
```


### Scope Hoisting
- Scope Hoisting 可以让webpack打包出来的代码文件更小，运行的更快，它又译作"作用域提升"，是在webpack3中新推出的功能
- scope hoisting 的愿你是讲所有的模块按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止命名冲突
- 这个功能在mode为production下默认开启，开发环境要用`webpack.optimizeModuleConcatenationPlugin`插件

hello.js
```js
export default 'Hello';
```

index.js  
```js
import str from './hello.js'
console.log(str);
```

main.js  
```js
var hello = {'hello'};
console.log(hello);
```


## 运行速度优化

### 代码分割
- 对于大的web应用来讲，将所有的代码都放在一个文件中显然是不够有效的，特别是当你的某些代码块是在某些特殊的时候才会被用到
- webpack有一个功能就是将你的代码库分割成chunks语块，当代码运行到需要它们的时候进行加载

#### 入口点分割
- Entry Points:入口文件设置的时候可以配置
- 这种方法的问题
    - 如果入口chunks之间包含重复的模块(lodash)，那些重复模块都会被引入到各个bundle中
    - 不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码
```js
//mpa多页应用
entry:{
    index:"./src/index.js",
    login:"./src/login.js",
}
```

#### 懒加载
- 用户当前需要用什么功能就只加载这个功能对应的代码，也就是所谓的按需加载，在给单页应用做按需加载优化时
- 一般采用以下原则:
    - 对网站功能进行划分，每一类一个chunk
    - 对于首次打开页面需要的功能直接加载，尽快展示给用户，某些依赖大量代码的功能点可以按需加载
    - 被分割出去的代码需要一个按需加载的时机

##### hello.js
```js
module.exports = 'hello';
```

##### index.js
```js
//渲染首页得时候先不加载hello模块，等当点击按钮得时候，才去服务器动态加载hello模块
//import语法 vue react angular的懒加载组件原理是一样得
document.querySelector('#clickBtn').addEventListener('click',() => {
    //import语句是一个天然得代码分割点。如果遇到import就会分割了去一个单独得代码块，可以单独加载
    import('./hello').then(result =>{
        console.log(result.default);
    })
})
```

##### index.html
```js
<button id="clickBtn">点我</button>
```

#### prefetch
- 使用预先拉取，你表示改模块可能以后会用到。浏览器会在空闲事件下载该模块
- prefetch得作用是告诉浏览器未来可能会使用到的某个资源，浏览器就会在闲时去加载对应的资源，若能预测到用户的行为，比如懒加载，点击到其他页面等则相当于提前预加载了需要的资源
- 此导入会让`<link rel="prefetch" as="script" href="http://localhost:8080/hello.js">`被添加直页面的头部，因此浏览器会在空闲时预先拉取该文件

webpack.config.js
```js
document.querySelector('#clickBtn').addEventListener('click',() => {
    import(/*webpackChunkName:'hello',webpackPrefetch:true*/'./hello').then(result =>{
        console.log(result.default);
    })
})
```

::: tip preload与prefetch区别
preload:预加载,此资源肯定会用到，优先较高，需要提前获取。它要慎用，有可能有性能隐患

prefetch:预获取，此资源在以后可能会用到，它是在浏览器空闲的时候加载，没有性能问题
:::

#### 提取公共代码
- 怎么配置单页应用？怎么配置多页应用？

##### 为什么需要提取公共代码
- 大网站有多个页面，每个页面由于采用相同技术栈，会包含很多公共代码,如果都包含进来还会有问题
- 相同的资源被重复的加载，浪费用户的流量和服务器的成本
- 每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验
- 如果能把公共代码抽离成单独文件进行加载能进行优化，可以减少网络传输流量，降低服务器成本

##### 如何提取
- 基础类库，方便长期缓存
- 页面之间的公用代码
- 各个页面单独生成文件

##### splitChunks
- split-chunks-plugin

##### module chunk bundle
- module:就是js的模块化webpack支持commonJS，ES6等模块化规范，简单来说就是你通过import语句引入的代码
- chunk:chunk是webpack根据功能拆分出来的，包含三种情况
    - 你得项目入口(entry)
    - 通过import()动态引入的代码
    - 通过splitChunks拆分出来的代码
- bundle:bundle是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，bundle就是兑chunk进行编译压缩打包等处理之后的产出

![](/webpacks/1611731367206.jpg)

**page1.js**
```js
import module1 from './module1';
import module2 from './module2';
import $ from 'jquery';
console.log(module1,module2,$);
import(/* webpackChunkName: 'asyncModule1'*/'./asyncModule1').then(result=>{
    console.log(result);
})
```

**page2.js**
```js
import module1 from './module1';
import module2 from './module2';
import $ from 'jquery';
console.log(module1,module2,$);
```

**page3.js**
```js
import module1 from './module1';
import module2 from './module3';
import $ from 'jquery';
console.log(module1,module3,$);
```

**module1.js**
```js
console.log('module1');
```

**module2.js**
```js
console.log('module2');
```

**module3.js**
```js
console.log('module3');
```

**webpack.config.js**
```js
entry:{
    page1:'./src/page1.js',
    page2:'./src/page2.js',
    page3:'./src/page3.js'
},
optimization: { 
    splitChunks: {
        //initial 入口chunk，对于异步导入的文件不处理
        // async 异步chunk，只对异步导入的文件处理
        // all 全部chunk
        chunks: 'all',//默认只分割异步模块
        minSize: 0,//分割出去的代码块的最小体积，0表示不限制
        maxSize: 0,//分割出去的代码块的最大体积，0表示不限制
        minRemainingSize: 0,//分割后剩下体积 0表示不限制 webpack5新添的参数
        //minChunks: 1,//如果此模块被多个入口引用几次会被分割
        maxAsyncRequests: 30,//异步请求最大分割出去几个代码块
        maxInitialRequests: 30,//同步时最大分割出去几个代码块
        automaticNameDelimiter: '~',//名称的分隔符
        enforceSizeThreshold: 50000,//强制阈值 新增加的参数
        cacheGroups: {//缓存组配置 配置如何对模块分组相同分组会分到一个代码块中
            defaultVendors: {//第三方模块
                test: /[\\/]node_modules[\\/]/,//如果模块的路径匹配此正则的话
                priority: -10,//很多缓存组，如果一个模块同属于多个缓存组，应该分到哪个组里，看优先级高
                reuseExistingChunk: true//是否可复用现有的代码块
            },
            default: {
                minChunks: 2,//此模块最几个入口引用过,最少2个才取提取
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
},
plugins:[
    new HtmlWebpackPlugin({
        template:'./src/index.html',
        filename:'page1.html',
        chunks:['page1']//往HTML页面里播放哪些资源文件(bundle)
    }),
    new HtmlWebpackPlugin({
        template:'./src/index.html',
        filename:'page2.html',
        chunks:['page2']
    }),
    new HtmlWebpackPlugin({
        template:'./src/index.html',
        filename:'page3.html',
        chunks:['page3']
    })
]
```



## 环境

### 模式(mode)
- 日常的前端开发工作中，一般都会又两套构建环境
- 一套开发时使用，构建结果用于本地开发调试，不进行代码压缩，打印debug信息，包含sourcemap文件
- 一套构建后的结果是直接应用于线上的，即代码都是压缩后，运行时不打印debug信息，静态文件不包括sourcemap
- webpack 4.x引入了mode的概念
- 当你指定使用production mode时，默认会启用各种性能优化的功能，包括构建结果优化以及webpack运行性能优化
- 而如果时development mode的话，则会开启debug工具，运行时打印详细的错误信息，以及更加快读的增量编译构建

| 构建 | 描述 |
| -- | -- |
| development | 会讲process.env.NODE_ENV的值设为development,启用NamedChunksPlugin和NamedModulesPlugin |
| production | 会讲process.env.NODE_ENV的值设置为production，启用FlagDependencyUsagePlugin,FlagIncludedChunksPlugin,ModuleConcatenationPlugin,NoEmitOnErrorsPlugin,OccurrenceOrderPlugin,SideEffectsFlagPlugin和UglifyJsPlugin |


#### 环境差异
- 开发环境
    - 需要生成sourcemap文件
    - 需要打印debug信息
    - 需要live reload或者hot reload的功能
- 生产环境
    - 可能需要分离CSS成单独的文件，以便多个页面共享同一个CSS文件
    - 需要压缩HTML/CSS/JS代码
    - 需要压缩图片
- 其默认值为production

#### 区分环境
- --mode 用来设置模块内的process.env.NODE_ENV
- --env 用来设置webpack配置文件的函数参数
- cross-env用来设置node环境的process.env.NODE_ENV
- dotenv可以按需加载不同的环境变量文件
- define-plugin用来配置在 **编译时候** 用的 **全局常量**

##### 安装
```js
npm install cross-env dotenv terser-webpack-plugin optimize-css-assets-webpack-plugin -D
```

##### mode默认值
- webpack的mode默认为production
- webpack serve 的mode默认为development
- 可以在模块内通过process.env.NODE_ENV获取当前的环境变量，无法在webpack配置文件中获取此变量
```js
"scripts": {
    "build": "webpack",
    "start": "webpack serve"
}
```

index.js
```js
console.log(process.env.NODE_ENV)//development | production
```

##### 命令行传mode
```js
"scripts": {
    "build": "webpack --mode=production",
    "start": "webpack --mode=development serve"
}
```

##### 命令行配置env
- 无法在模块内通过process.env.NODE_ENV访问
- 可以通过webpack配置文件中通过函数获取当前环境变量
```js
"scripts": {
    "build": "webpack --mode=production",
    "start": "webpack --mode=development serve"
}
```

index.js
```js
console.log(process.env.NODE_ENV)//undefined
```

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = (env)=>{
    return {
        optimization:{
            minimize:env&&env.production,
            minimizer:(env&&env.production)?[
                new TerserPlugin({
                    parallel:true,//开启多进程并行压缩
                }),
                new OptimizeCssAssetsWebpackPlugin(),
            ]:[]
        },
    }
}
```

##### mode配置
```js
module.exports = {
    mode:'development',
}
```

##### DefinePlugin
- 设置全局变量(不是`window`)，所有模块都能读取到该变量的值
- 可以在任意模块内通过`process.env.NODE_ENV`获取当前的环境变量
- 但无法在`node环境`(wenpack配置文件中)下获取当前的环境变量

**webpack.config.js**
```js
console.log('process.env.NODE_ENV',process.env.NODE_ENV);//undefined
console.log('NODE_ENV',NODE_ENV);//error
module.exports = {
    plugins:[
        //定义在编译使用的全局变量，在浏览器运行阶段就只是值了
        new webpack.DefinePlugin({
            "process.env.NODE_ENV":JSON.stringify("development"),//注意用双引号引起了，否则就变成变量了
            "NODE_ENV":JSON.stringify("production"),
        })
    ]
}
```

**src/index.js**
```js
console.log(NODE.ENV);//production
```

**src/logger.js**
```js
export default function logger(...args) {
    if(process.env.NODE_ENV == 'development'){
        console.log.apply(console, args);
    }
}
```

##### cross-env

.env
```js
NODE_ENV=development
```

webpack.config.js
```js
//可以读取.env文件，获取里面的值，设置到process.env.NODE_ENV里面
require('dotenv').config();
console.log('webpack.config.js process.env.NODE_ENV',process.env.NODE_ENV);
```

### JavaScript兼容性

#### Babel
- Babel是一个JavaScript编译器
- Babel是一个工具链，主要用于讲ECMAScript 2015+版本的代码转换为向后兼容的JavaScript语法，以便能够运行在当前和旧版本的浏览器或其他环境中
- Babel能为你做的事
    - 语法转换

##### 安装
```js
npm install @babel/core @babel/cli -D
```

##### 命令行使用

**src/index.js**
```js
const sum = (a,b)=>a+b;
console.log(sum(1,2));
```

**package.json**
```js
"scripts": {
    "build": "babel src --out-dir dist",
},
```

#### 插件
- Babel是一个编译器(输入源码=>输出编译后的代码)。就像其他编译器一样，编译过程分为三个阶段:解析、转换和打印输出
- 现在，Babel虽然开箱即用，但是什么动作都不做，它基本上类似于`const babel=code=>code;`，讲代码解析之后在输出同样的代码。如果想要Babel做一些实际的工作，就需要其添加插件。

##### 安装
```js
npm install @babel/plugin-transform-arrow-functions -D
```

##### .babelrc
```js
{
    "plugins":["@babel/plugin-transform-arrow-functions"]
}
```

#### 预设
- @babel/preset-env可以让你使用最新的JavaScript语法，而不需要去管理语法转换器(并且可选的支持目标浏览器环境的polyfills)
```js
module.exports = function (){
    return {plugins:["pluginA","pluginB","pluginC"]}
}
```

##### 安装
```js
npm install --save-dev @babel/preset-env
```

##### .babelrc
```js
{
    "presets": ["@babel/preset-env"]
}
```

##### browsers
- @babel/preset-env会根据你配置的目标环境，生成插件列表来编译
- 可以使用.browserslistrc 文件来指定目标环境
- browserslist详细配置
```js
//.browserslistrc
>0.25%
not head
```

```js
last 2 Chrome versions
```

#### polifill
- @babel/preset-env默认只转换新的JavaScript语法，而不转换新的API，比如 Iterator,Generator,Set,Maps,Proxy,Reflect,Symbol,Promise等全局对象。以及一些在全局对象上的方法(比如Object.assign)都不会转码
- 比如说，ES6在Array对象上新增了Array.from方法，Babel就不会转码这个方法，如果想让这个方法运行，必须使用babel-polyfill来转换等。
- polyfill的中文意思是垫片，所谓垫片不同浏览器或者不同环境下的差异，让新的内置函数，实例方法等在低版本浏览器中也可以使用
- 官方给出@babel/polyfill和babel-runtime两种解决方案来解决这种全局对象或全局对象方法不足的问题
- babel-runtime适合在组件和类库项目中使用，而babel-polyfill适合在业务项目中使用

##### polyfill
- @babel/polyfill模块可以模拟完整的ES2015+环境
- 这意味着可以使用诸如Promise和WeakMap之类的新的内置对象，Array.from或Object.assign之类的静态方法，Array.prototype.includes之类的实例方法以及生成器函数
- 它是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持Array.prototype.find方法，引入polyfill，我们就可以使用es6方法来编写了，但是缺点就是会造成全局空间污染
- V7.4.0版本开始,@babel/polyfill已经被废弃

##### 安装
```js
npm install --save @babel/polyfill core-js@3
npm install --save-dev webpack webpack-cli babel-loader
```

##### useBuiltIns:fase
- "useBuiltIns:false"此时不对polyfill做操做。如果引入@babel/polyfill,则无视配置的浏览器兼容,引入所有的polyfill

src/index.js
```js
import "@babel/polyfill";
console.log(Array.isArray([]));
let p = new Promise();
```

webpack.config.js
```js
const path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),//输出的路径
        filename:'[name].js'//输出的文件名
    },
    module: {
        rules: [
        {
            test: /\.js?$/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ["@babel/preset-env",{
                        useBuiltIns:false
                    }]
                ]
            },
            },
        },
        ]
    },
}
```

package.json
```js
"scripts": {
    "build": "babel src --out-dir dist --watch",
    "pack": "webpack --mode=development"
}
```


##### useBuiltIns:entry
- "useBuiltIns":"entry"根据配置的浏览器兼容，引入浏览器不兼容的polyfill。需要在入口文件手动添加`import '@babel/polyfill'`，会自动根据browserslist替换成浏览器不兼容的所有polyfill
- 这里需要指定core-js的版本，如果"corejs":3,则`import '@babel/polyfill'`需要改成`import 'core-js';import 'regenerator-runtime/runtime'`
- `core-js@2`分支中已经不会在添加新特性，新特性都会添加到`core-js@3`，比如`Array.prototype.flat()`

webpack.config.js
```js
module: {
    rules: [
        {
            test: /\.js?$/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ["@babel/preset-env",{
                        useBuiltIns:'entry',
                        corejs:2,
                        targets:"last 2 Chrome versions"
                    }]
                ]
            },
            },
        },
    ]
},
```

src/index.js
```js
import 'core-js/stable';
import 'regenerator-runtime/runtime'
console.log(Array.isArray([]));
let p = new Promise(resolve=>resolve('ok'));
p.then(result=>console.log(result));
```

##### useBuiltIns:usage
- "useBuiltIns":"usage" usage会根据配置的浏览器兼容，以及你代码中用到的API来进行polyfill，实现了按需添加

src/index.js
```js
console.log(Array.isArray([]));
let p = new Promise(resolve=>resolve('ok'));
p.then(result=>console.log(result));
async function fn() {}
```

webpack.config.js
```js
module: {
    rules: [
        {
            test: /\.js?$/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ["@babel/preset-env",{
                        useBuiltIns:'usage',
                        corejs:3,
                        targets:">0.25%,not dead"
                    }]
                ]
            },
            },
        },
    ]
},
```

dist/index.js
```js
"use strict";
require('core-js/stable');
require('regenerator-runtime/runtime');
console.log(Array.isArray());
let p = new Promise(resolve=>resolve('ok'));
p.then(result=>console.log(result));
async function d() {}
```

#### babel-runtime
- Babel为了解决全局空间污染问题，提供了单独的包babel-runtime用以提供编译模块的工具函数
- 简单的说`babel-runtime`更像是一种按需加载的实现，比如你哪里需要使用Promise，只要在这个文件头部`require Promise from 'bable-runtime/core-js/promise'`就行了

##### 安装
```js
npm install babel-runtime -D
```

##### src/index.js
```js
import Promise from 'babel-runtime/core-js/promise';
const p = new Promise((resolve)=>{
    resolve('ok');
})
console.log(p);
```

##### webpack.config.js
```js
module: {
    rules: [
        {
            test: /\.js?$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["@babel/preset-env"]
                    ]
                },
            },
        },
    ]
},
```

#### babel-plugin-transform-runtime
- 启用插件`babel-plugin-transform-runtime`后，Babel就会使用`babel-runtime`下的工具函数
- `babel-plugin-transform-runtime`插件能够将这些工具函数的代码转换成`require`语句,指向为对`babel-runtime`的引用
- `babel-plugin-transform-runtime`就是可以在我们使用新API时自动`import babel-runtime`里面的polyfill
    - 当我们使用async/await时，自动引入`babel-runtime/regenerator`
    - 当我们使用ES6的静态事件或内置对象时，自动引入`babel-runtime/core-js`
    - 移除内联`babel helpers`并替换使用`babel-runtime/helpers`来替换
- `babel-plugin-transform-runtime`自带的是`core-js@3`，如果配置corejs配置为2需要单独安装`@babel/runtime-corejs2`
- `@babel/polyfill`自带的`core-js@2`，如果配置corejs配置为3，需要单独安装`core-js@3`
- `@babel/plugin-transform-runtime`可以减少编译后代码的提交外，我们使用它还有一个好处，它可以为代码创建一个沙盒环境，如果使用`@babel/polyfill`及其提供的内置程序(例如Promise，Set和Map)，则它们将污染全局范围，虽然这对于应用程序或命令行工具可能时可以的，但是如果你得代码是要发布供其他人使用的库，或者无法完全控制代码运行的环境，则将成为一个问题

##### 安装
```js
npm install @babel/plugin-transform-runtime @babel/runtime-corejs2 @babel/runtime-corejs3 -D
```

##### webpack.config.js
```js
module: {
    rules: [
        {
            test: /\.js?$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["@babel/preset-env",{
                            useBuiltIns:'usage',
                            corejs:3,
                            targets:">0.25%,not dead"
                        }]
                    ],
                    plugins:[
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                corejs:2,//当我们使用ES6的静态事件或内置对象时自动引入babel-runtime/core-js
                                helpers:true,//移除内联babel helpers并替换使用babel-runtime/helpers来替换
                                regenerator:true,//是否开启regenerator函数转换或使用regenerator runtime来避免污染全局域
                            }
                        ],
                        ['@babel/plugin-proposal-decorators',{legacy:true}],
                        ['@babel/plugin-proposal-class-properties',{loose:true}],
                    ]
                },
            },
        },
    ]
},
```

src/index.js
```js
//corejs
const p = new Promise(()=>{});
console.log(p);
//helpers
class A{

}
class B extends A{

}

//regenerator
function*gen(){

}
console.log(gen());
```

##### 执行顺序
- 插件在Presets前运行
- 插件属性从前往后排列
- presets顺序从后往前

webpack.config.js
```js
const path = require('path');
const plugin1 = path.resolve(__dirname, 'plugins', 'plugin1.js');
const plugin2 = path.resolve(__dirname, 'plugins', 'plugin2.js');
const plugin3 = path.resolve(__dirname, 'plugins', 'plugin3.js');
const plugin4 = path.resolve(__dirname, 'plugins', 'plugin4.js');
const plugin5 = path.resolve(__dirname, 'plugins', 'plugin5.js');
const plugin6 = path.resolve(__dirname, 'plugins', 'plugin6.js');
function preset1() { 
  return  { plugins: [plugin5,plugin6] } 
}
function preset2() { 
  return  { plugins: [plugin3,plugin4] } 
}
//plugins: [plugin1,plugin2],
//presets: [preset1,preset2]
//插件先执行预设后执行
//插件是从前往后
//预设是从后往前
//plugin1,plugin2 plugin3,plugin4 plugin5,plugin6
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [plugin1,plugin2],
            presets: [preset1,preset2]
          },
        },
      },
    ]
  },
  plugins: []
};
```

