# webpack性能优化

## 优化的方向

### 项目开发
对于开发者而言，我们希望webpack这个工具可以给我们带来流畅的开发体验。比如，当不断修改代码时，我们希望代码的变更能及时的通过浏览器刷新页面，而不是手动去刷新页面。更进一步的我们希望，代码修改只会局部更改某个模块，而不是整个页面的刷新。这样可以使我们不需要在等待刷新中浪费很多时间，大大提高了页面的开发效率。

### 项目部署
项目部署上线时，性能优化是我们考虑的重点，有两个方向可以作为核心考虑的点，一个是减少HTTP请求，我们知道在网速相同的条件下，下载一个100KB的图片比下载两个50KB的图片要快，因此，我们要求webpack将多个文件打包成一个或者少量个文件；另外一个优化的重点是减少单次请求的事件，也就是尽可能减少请求文件的提交大小。

webpack中在性能优化所做的努力，也大抵围绕着这两个大方向展开。另外在构建项目中，我们也希望能持续的提供构建效率。

## 提升开发效率

### 减少体积
开发环境下，我们依然对代码的体积有一定的要求，更小的体积可以让加载速度更快，开发效率更高，当然配置也相对简单。
```
// webpack.dev.js 开发环境webpack配置
module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        compress: true, // 代码压缩
      },
}
```
### 模块热更新(HMR)
开发过程中，我们希望修改代码的过程中，页面能实时且不需要手动的刷新。因此使用HRM，HMR既避免了频繁手动刷新页面，也减少了页面刷新时的等待，大幅度提高了开发效率。
```
// webpack.dev.js
module.exports = {
  devServer: {
    compress: true,//代码压缩
    hot: true // 开启热更新配置
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

```

## 构建体积优化

### 生产中的sourcemap模式
webpack在构建中提供了不少于7种的sourcemap模式，其中eval模式虽然可以提高构建效率，但是构建后的脚本较大，因此生产上并不适用。而source-map模式可以通过产生的.map文件来追踪脚本文件的具体位置，进而缩小脚本文件的体积，这是生成模式的首选，并且在生产中，我们需要隐藏具体的脚本信息，因此可以使用cheap和module模式来达到目的。

综上，在生产的webpack devtool选项中，我们使用cheap-module-source-map的配置
```
// webpack.pro.js 生产webpack配置脚本
module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',  
}
```

### 独立css文件
以单入口文件而论，通常我们会将页面的所有静态页面资源都打包成一个js文件，将代码合并成一个静态资源，减少了HTTP请求。

分离前:

![](/webpacks/20181121154128140.png)

但是接下来，我们需要将css代码独立开来，为什么呢？最主要的一点是我们希望更好的利用浏览器的缓存，当单独修改了样式时，独立的css文件可以不需要应用去加载整个的脚本文件，提高效率。并且，当遇到多页面的应用时，可以单独将一些公共部分的样式抽离开来，加载一个页面后，接下来的页面同样可以利用缓存来减少请求。

webpack4.0中提供了抽离css文件的插件，mini-css-extract-plugin，只需要简单的配置便可以将css文件分离开来
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    ···
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [process.env.NODE_ENV == 'production' ? MiniCssExtractPlugin.loader : 'style-loader', {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                },
                }, "sass-loader"]
            }
        ]
    }
    ···
}
```

分离后:

![](/webpacks/2018112115421419.png)

### 压缩js，html，css文件
想要优化构建后的提交，不断减少静态资源文件的大小，我们希望webpack帮助尽可能压缩文件的体积。对于js脚本文件而言，webpack4.0在mode为'production'时，默认会启动代码的压缩。除此之外，我们需要动手对html和css进行压缩。

 针对html 的压缩，只需要对[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#options)进行相关配置。
```
// webpack.base.js 
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
          title: '贪吃的猫',
          filename: 'index.html',
          template: path.resolve(__dirname, '../index.html'),//模板文件地址。可以自定义模板
          minify: { // 压缩 HTML 的配置
            collapseWhitespace: true,//压缩空格，为true则显示一行，为false显示多行
            removeComments: true,//移除引号
            useShortDoctype: true
          }
        }),
    ]
}

```

针对css 的压缩， webpack4.0 使用optimize-css-assets-webpack-plugin来压缩单独的css 文件。
```
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
module.exports = {
    optimization:{
        minimizer:[
            new OptimizeCss()
        ]
    }
}
```

![](/webpacks/20181121154336737.png)
![](/webpacks/20181121154407912.png)

对比之下，我们可以看到明显的效果，关于压缩css 更多的配置可以参考[optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)

### 合并压缩图片
处理完前端的三大块js，html，css后，接下来优化能想到的是处理图片。前面提到，提升性能的一个重要的条件是降低http请求数，而应用中经常会有大大小小的图片需要处理，对应用中的小图标来说，css sprite是首选，将各种图标集合成一张大的图片可以很好的减少网络请求数。而对需要独立开的图片，且大小在合理范围内时，我们可以将图片转换成base64位编码，内嵌到css中，同样可以减少请求。

#### base64转换
处理图片资源时，webpack提供了file-loader和url-loader两个loaders供选择，file-loader和url-loader的作用，可以用来解析项目中图片文件的url引入问题。两者的区别在于，url-laoder可以将小于指定字节的文件转换位DataURL，大小指定字节的依旧会使用file-loader进行解析。
```
// webpack.base.js
module.exports = {
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif|svg|ttf|woff2|woff)(\?.*)?$/,
            use: [{
              loader: 'url-loader',
              options: {
                limit: 10000, // 限制大小
              }
            }, 
        ]
  },
}
```

#### 压缩图片
处理完雪碧图和小图片的base64转换后，对于大图片来说，webpack还可以做到对图片进行压缩，推荐使用image-webpack-loader，插件提供了多种形式的压缩，详细可以参考[官网文档](https://github.com/tcoopman/image-webpack-loader)

```
// webpack.base.js
module.exports = {
    module: {
        rules: [
            {
              loader: 'image-webpack-loader',
              options: {
                optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                  enabled: true,
                },
                pngquant: { // 使用 imagemin-pngquant 压缩 png
                  quality: '65-90',
                  speed: 4
                },
              }
            }
        ]
    }
}
```
效果对比如下：

![](/webpacks/2018112115445663.png)
![](/webpacks/20181121154514208.png)

### 依赖库分离
一个中大型应用中，第三方的依赖，庞大的可怕，占据了打包后文件的一半以上。然而，这些依赖模块又是很少变更的资源，和css代码分离的逻辑相似，分离第三方依赖库，可以更好的利用浏览器缓存，提升应用性能。因此，将依赖模块从业务代码中分离是性能优化重要的一环。

webpack4.0中，依赖库的分离只需要通过optimization.splitChunks 进行配置即可。
```
// webpack.pro.js
module.exports = {
    optimization: {
       splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "initial",
              test: path.resolve(__dirname, "../node_modules"),
              name: "vendor", // 使用 vendor 入口作为公共部分
              enforce: true,
            },
          },
        },
      },
}

```

公共库分离后的结果

![](/webpacks/20181121154537611.png)

### 依赖分析
在优化分析中，实际影响体积最大的是node_modeules的第三方库，这一部分的优化可以大大的减少打包后的体积。这里我们使用最新的webpack-bundle-analyzer插件来分析打包好后的模块，它可以将打包后的内容束展示位方便交互的直观树状图，通过它，可以知道项目大致有哪些模块组成，哪个模块占据的体积较大，是否是可替代的。

我们大致可以从几个方向考虑:
- 判断依赖是否不可或缺，依赖在项目中使用率是否过低。在项目中，可能对某个运算，某个功能，我们使用了一个庞大的库，这个库在体积上的占比较大，而功能使用却较少。这个时候我们可以寻找体积更小，且功能满足的替换库，或者手动实现某些依赖的功能来替换他。
- 大型库是否可以通过定制功能的方式减少体积。明显的一个例子是 echart， echart完全版的依赖压缩后也有几百k 之多，这显示是难以接受的。现实项目中，我们可能只需要少量或者部分的echart 功能，这时我们可以通过制定图表的形式，下载图表用到的功能，达到体积最优化。
- 某些不可优化的大型库是否可以通过外部引用的方式减少文件体积。例如像bootstrap，vue这类无法优化的第三方库，通过免费开源的cdn服务不但可以减少文件体积，还可以提高网站的加载速度，也是个优化性能的方法

### 按需加载
前面提到依赖分析的方向中，如果大型库不可或缺，而且使用率也不算低的时候，我们可以通过按需加载的形式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

webpack中利用require.ensure()实现按需加载，在不使用按需加载的情况下，首屏加载时会把所有的脚本同时加载出来，这往往会拖累首屏显示时间，带来不好的用户体验。例子来说。当项目需要使用大型的图表类库，而首页并不需要时，按需加载往往比同时加载在用户体验上好好得多。

当不需要按需加载的时候，我们的代码可能是这样的：
```
import test from './components/test.vue'
import test2 from './components/test2.vue'
```

开启按需加载时，我们的代码修改为:
```
const test = r => require.ensure([], () => r(require('./components/test.vue')), 'chunk1')
const test2 = r => require.ensure([], () => r(require('./components/test2.vue')), 'chunk2')
```

webpack配置修改为:
```
output: {
    ···
    chunkFilename: '[name].[hash].js'
}
```

这时编译出来的文件会从原来的一个，变成了多个小文件。每个路由加载时会去加载不同的资源。特别在首屏的资源加载上进一步优化了应用的体验。

尽管如此，实际中我们需要根据项目的需求来衡量按需加载的可用性，尽管在首屏优化上取得较大的提升，但按需加载毕竟会将大的文件拆分成多个小文件，增加了http 的请求数。这又违背了性能优化的基础。所以实际中需要取舍，更需要权衡。

### 删除冗余代码
代码体积优化到这一步，基本可以优化的地方已经优化完毕了。接下来可以抓住一些细节做更细的优化。比如可以删除项目中上下文都未被引用的代码。这就是所谓的 Tree shaking 优化。webpack 4.0中，mode 为production 默认启动这一优化。但是，如果在项目中使用到babel的 话，需要把babel解析语法的功能关掉。只需要
```
// .babelrc

{
  "presets": [["env", { "modules": false }]]
}

```

## 构建速度优化
说完如何减少项目构建后的大小后，接下来简单的谈一下如何提高构建的速度。实际上webpack的 构建速度，只需要简单的修改配置便能大幅提高速度。常见的设置如下。

### babel-loader构建时间过长

#### 限定加载器作用范围
由于babel-loader需要将语法进行转换，所消耗的时间较长，所以第一步需要限定babel-loader作用的范围，让babel-loader的搜索和转换准确的定位到指定模块。大幅提高构建速度。

例如:
```
// webpack.base.js
module.exports = {
    module:{
        rules: [
            {
                test: /\.js$/,
                include: [resolve('src')],// 限定范围
                use: {
                  loader: 'babel-loader',
                },
            },]
    }
}
```

### happypack多进程打包和ParallelUglifyPlugin多进程压缩JS
```
const HappyPack = require('happypack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
module.exports = {
    module:{
        rules: [
            {
                test: /\.js$/,
                // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
                use: ['happypack/loader?id=babel'],
                include: srcPath,
                // exclude: /node_modules/
            },]
    },
    plugins: [
      // happyPack 开启多进程打包
        new HappyPack({
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'babel',
            // 如何处理 .js 文件，用法和 Loader 配置中一样
            loaders: ['babel-loader?cacheDirectory']
        }),
         // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS 的参数
            // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
            uglifyJS: {
                output: {
                    beautify: false, // 最紧凑的输出
                    comments: false, // 删除所有的注释
                },
                compress: {
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }
        })
    ]
}
```

关于开启多进程的问题:

- 项目较大，打包较慢，开启多进程能提高速度
- 项目较小，打包很快，开启多进程会降低速度(进程开销)
- 按需使用


#### 缓存加载器执行结果
正因为babel-loader在解析转换上耗时太长，所以我们希望能缓存每次执行的结果。webpack的loader中刚好有cacheDirectory的选项，默认为false开启后将使用缓存的执行结果，打包速度明显提升。
```
// webpack.base.js
module.exports = {
    module: {
        rules: [
            {
            test: /\.js$/,
            include: [resolve('src')],
            use: {
              loader: 'babel-loader?cacheDirectory',
            },
        },]
    }
}
```

### resolve解析优化
webpack 的resolve 做相关的配置后，也可以让项目的构建速度加快。具体看下文的配置：
- 当项目中出现 import 'react' 既不是绝对路径也不是相对路径时，指定好搜索的路径，可以不用过多的查询
- 尽可能少的使用 resolve.alias 来设置路径别名，因为会影响到tree shaking 的优化
- 后缀自动补全尽可能的少。减少路径查询的工作
- 当使用的第三方库过大，并且不包含import require define 的调用。可以使用noParse让库不被loaders 解析

```
// webpack.base.js
module.exports = {
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
      ],

      extensions: [".js"], 
    
      // 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
      mainFiles: ['index'],
    }，
    module: {
        noParse: function(content){
            return /jquery/.test(content)
        }
    }
}

```

## DllPlugin 打包第三方库
DllPlugin是基于window动态链接库(dll)的思想被创作出来的。这个插件会把第三方单独打包到一个文件中，这个文件就是单纯的依赖库。这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包。

用DllPlugin处理文件，要分两步走:
- 基于dll专属的配置文件，打包dll库
- 基于webpack.config.js文件，打包业务代码

以自己vue项目为例，我的dll配置文件如下:

新建webpack.dll.config.js文件
```
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = 'public/vendor'

module.exports = {
  entry: {
    // 需要提取的库文件
    vendor: ['vue', 'vue-router', 'vuex', 'axios', 'element-ui']
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(['*.*'], {
      root: path.join(__dirname, dllPath)
    }),
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}

```

在vue.config.js中配置dll
```
plugins: [
    new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
    }),
    // 将 dll 注入到 生成的 html 模板中
    new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: './vendor',
        // dll最终输出的目录
        outputPath: './vendor'
    }),
]
```

## Tree Shaking 删除冗余代码
意思是基于 import/export 语法，Tree-Shaking 可以在编译的过程中获悉哪些模块并没有真正被使用，这些没用的代码，在最后打包的时候会被去除。

在 Webpack3 中，我们一般使用 UglifyJS 来删除压缩代码，我们可以使用 uglifyjs-webpack-plugin 来并行运行 UglifyJsPlugin，从而提高效率

```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
 plugins: [
   new UglifyJsPlugin({
     // 允许并发
     parallel: true,
     // 开启缓存
     cache: true,
     compress: {
       // 删除所有的console语句    
       drop_console: true,
       // 把使用多次的静态值自动定义为变量
       reduce_vars: true,
     },
     output: {
       // 不保留注释
       comment: false,
       // 使输出的代码尽可能紧凑
       beautify: false
     }
   })
 ]
}
```

手动引入 UglifyJsPlugin 的代码其实是 webpack3 的用法，webpack4 现在已经默认使用 uglifyjs-webpack-plugin 对代码做压缩了——在 webpack4 中，我们是通过配置 optimization.minimize 与 optimization.minimizer 来自定义压缩相关的操作的。

## Gzip 压缩原理
说到压缩，可不只是构建工具的专利。我们日常开发中，其实还有一个便宜又好用的压缩操作:开启Gzip。

具体的做法非常简单，只需要你在你的request headers中加上这么一句:

``` accept-encoding:gzip ```

HTTP压缩:

HTTP压缩时一种内置到网页服务器和网页客户端中以改进传输速度和带宽利用率的方式。在使用HTTP压缩的情况下，HTTP数据在从服务器发送前究以压缩:兼容的浏览器将在下载所需的格式前宣告支持何种方法给服务器；不支持压缩方法的浏览器将下载未经压缩的数据。

### HTTP压缩就是已缩小体积为目的，对HTTP内容进行重新编码的过程
Gzip的内核就是Deflate，目前我们压缩文件用的最多的就是Gzip。可以说，Gzip就是HTTP压缩的经典例题。

### 该不该用Gzip
如果你的项目不是极端迷你的超小型文件，我都建议你试试Gzip。

有的人或许存在这样的疑问:压缩Gzip，服务端要花时间；解压Gzip，浏览器要花时间。中间节省出来的传输时间，真的那么可观吗？

答案时肯定的。如果你手上的项目时1k,2k的小文件，那确实有点高炮打蚊子的意思，不值当。但更多的时候，我们处理的都是具备一定规模的项目文件。

实践时肯定的，这种情况下压缩和解压带来的时间开销相当于传输过程中节省下的时间开销来说，可以说是微不足道的。

### Gzip是万能的吗
首先要承认Gzip是搞笑的，压缩后通常能帮我们减少影响70%左右的大小。

它并非万能。Gzip并不保证针对每一个文件的压缩都会使其变小。

Gzip压缩背后的原理，是在一个文本文件中找出一些重复出现的字符串，临时替换他们，从而是整个文件变小。根据这个原理，文件中代码的重复率越高，那么压缩的效率就越高，使用Gzip的收益也就越大。反之依然。

### webpack的Gzip和服务端的Gzip
一般来说，Gzip压缩是服务端的活儿:服务端了解到我们这边有一个Gzip压缩的需求，它会启动自己的CPU去为我们完成这个任务。而压缩文件这个过程本身是需要耗费时间的，大家可以理解为我们以服务端压缩的时间开销和CPU开销(以及浏览器解析压缩文件的开销)为代价，省下了一些传输过程中的事件开销。

既然存在着这样的交换，那么就需要我们学会权衡。服务器的CPU性能不是无限的，如果存在大量的压缩需求，服务器也扛不住的。服务器一旦因此慢下来了，用户还是要等。Webpack中Gzip压缩操作的存在，事实上就是为了在构建过程中去做一部分服务器的工作，为服务器分压。

因此，这两个地方的Gzip压缩，谁也不能替代谁。它们必须和平共处，好好合作。作为开发者，我们也应该结合业务压力的实际强度情况，去做好这其中的权衡。










