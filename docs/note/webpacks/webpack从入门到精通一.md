# webpack从入门到精通(一)

## webpack的认识
我们平时用vue脚手架自动生成项目，但是它最主要的webpack是怎么搭建的，怎么编译的，估计很少有人去关注，我记录一下我自己学习webpack的一些记录和见解。

首先，什么是webpack？

webpack是一个模块打包工具，通过依赖处理模块，并生成那些模块静态资源。

我们先看一张图:

![](/webpacks/20150802170155415.png)

通过这张图我们可以看出webpack的一些功能:
- 能够把各种资源，例如JS，coffe，样式(含less/sass)，图片等作为模块来使用和处理。
- 能有Grunt和Gulp所有的基本功能，比如打包，压缩混淆，图片转base64等等，将less，sass编译成css文件。
- 解决大型项目初始化加载慢的问题，能够在大型项目中运用。
- 每一个静态文件都可以成为一个模块。
- 可以整合第三方库。
- 可以通过node在浏览器里直接使用。

## 使用webpack
1.安装webpck配置npm init初始化生成package.json文件，需要填写相关项目信息，而通过npm init -y 可以生成一个默认的，如图:

![](/webpacks/1602428407933.jpg)

2.npm install -g webpack全局安装webpack(不推荐全局安装，npm install webpack webpack-cli -D后跳过步奏3和4)

3.npm install webpack --save 通过npm把webpack的依赖导入项目中

4.4.x的版本把cli分离出来了，所以必需安装webpack-cli npm install --save-dev webpack-cli  或者 npm install -D webpack-cli

5.验证是否安装成功：webpack -v，如果出现下面报错

![](/webpacks/20200311163423341.png)

执行一下 npm install -g webpack-cli


## 配置文件的认识
webpack的工作都是通过配置文件来完成的。编译哪个文件，怎么编译，编译成什么样，输出为什么等等，所有的操作都是按照配置文件里面的内容来完成的，webpack想要运行的话配置文件是必不可少的东西。通常我们都是在webpack.config.js文件进行配置，才用CommonJS规范，用module.exports导出。

```
var config = {
    entry: [
    ],
    output: {
    },
    devServer:{
        port:3000,
        progress:true,
        contentBase:'./build',
        compress:true,
    },
    mode:'',
    resolve: {
    },
    module: {
    },
    plugins: [
    ]
}
```
- entry:入口，定义要打包的文件
- output:出口，定义打包输出的文件；包括路径，文件名，还可能有运行时的访问路径(publickPath)参数
- devServer:开发服务器的配置
- mode:模式，默认两种模式 production development
- module:webpack将所有资源都看做一个模块，而模块就需要加载器
- resolve:能够呗打包的文件，文件后缀名
- plugins:定义以下额外的插件

## 小测试
创建一个demo，结构如下:

![](/webpacks/1602429814485.jpg)

在index.html代码如下:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack学习</title>
</head>
<body>
    <div id="box">

    </div>
</body>
</html>
```
js文件夹下面创建一个index.js，里面代码如下:
```
window.onload = ()=>{
	const box = document.getElementById('box');
	box.innerHTML = 'webpack学习！！！';
}
```
webpack.config.js代码如下:
```
const path = require('path'); //nodejs的语法，引入路径模块，为了输出的时候找绝对路径
 
module.exports = {
	entry: './js/index.js', //入口文件为main.js  
	output: { //输出
		path: path.resolve(__dirname, 'dist'), //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径
		filename: 'bundle.js' //输出的文件名
	},
}
```

执行webpack后:

![](/webpacks/1602430442150.jpg)

然后在目录中我们可以看到生成了一个dist目录，下面有一个bundle.js文件

![](/webpacks/1602430558640.jpg)


在index.html里面引入dist目录下的bundle.js，并运行后结果如下:

![](/webpacks/1602430880012.jpg)

## 语法糖和步骤

官网文档 https://www.webpackjs.com/concepts/entry-points/

1.入口文件   ```entry: string|Array<string>| {[entryChunkName: string]: string|Array<string>}```
- 只打包一个文件（单入口），写个字符串
- 把多个文件打包成一个文件，写个数组
- 把多个文件分别打包成多个文件，写成对象
- webpack把打包后的文件叫Chunck

2.出口文件 output 配置 output 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个入口起点，但只指定一个输出配置
- filename  用于输出文件的文件名。字符串
- 目标输出目录 path 的绝对路径。 __dirname是nodejs里的一个模块，表示当前文件的绝对路径 通过引入path模块 通过resolve来定义绝对路径  path.resolve(__dirname,'输出文件的路径');

![](/webpacks/1608540564030.jpg)

## 多文件
目录的话 就是在JS文件夹里多添加了一个文件two.js文件:

![](/webpacks/1602432294713.jpg)

webpack.config.js里面写法如下:

![](/webpacks/1602432390148.jpg)

可以看出webpack会把数组里面的所有文件打包成一个js文件:

![](/webpacks/1602432526926.jpg)

对象格式写法:

![](/webpacks/1602432628492.jpg)

webpack会把对象里的文件分别打包成多个文件:

![](/webpacks/1602432688926.jpg)

