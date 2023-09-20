# Gulp

## 什么是 Gulp？

一个工具包，可以帮你自动化和增加你的工作流。
![](/webpacks/1695180386089.jpg)

## Gulp 和 Webpack

gulp 的核心理念是 task runner

- 可以定义自己的一系列任务，等待任务被执行；
- 基于文件 Stream 的构建流；
- 我们可以使用 gulp 的插件体系来完成某些任务；

webpack 的核心理念是 module bundler

- webpack 是一个模块化的打包工具；
- 可以使用各种各样的 loader 来加载不同的模块；
- 可以使用各种各样的插件在 webpack 打包的生命周期完成其他的任务；

gulp 相对于 webpack 的优缺点：

- gulp 相对于 webpack 思想更加的简单、易用，更适合编写一些自动化的任务；
- 但是目前对于大型项目（Vue、React、Angular）并不会使用 gulp 来构建，比如默认 gulp 是不支持模块化的；

## 创建 gulp 任务

每个 gulp 任务都是一个异步的 JavaScript 函数：

- 此函数可以接受一个 callback 作为参数，调用 callback 函数那么任务会结束；
- 或者是一个返回 stream、promise、event emitter、child process 或 observable 类型的函数；

任务可以是 public 或者 private 类型的：

- 公开任务（Public tasks） 从 gulpfile 中被导出（export），可以通过 gulp 命令直接调用；
- 私有任务（Private tasks） 被设计为在内部使用，通常作为 series() 或 parallel() 组合的组成部分；

```js
const { series, parallel } = require("gulp");
const foo1 = (cb) => {
  setTimeout(() => {
    console.log("foo1 task exec~");
    cb();
  }, 2000);
};
const foo2 = (cb) => {
  setTimeout(() => {
    console.log("foo2 task exec~");
    cb();
  }, 1000);
};
const foo3 = (cb) => {
  setTimeout(() => {
    console.log("foo3 task exec~");
    cb();
  }, 3000);
};
// 多个任务串行执行
const seriesFoo = series(foo1, foo2, foo3);
// 多个任务并行执行
const parallelFoo = parallel(foo1, foo2, foo3);
module.exports = {
  seriesFoo,
  parallelFoo,
};
```

> 执行 npx gulp

## 读取和写入文件

gulp 暴露了 src() 和 dest() 方法用于处理计算机上存放的文件。

- src() 接受参数，并从文件系统中读取文件然后生成一个 Node 流（Stream），它将所有匹配的文件读取到内存中并通过流
  （Stream）进行处理；
- 由 src() 产生的流（stream）应当从任务（task 函数）中返回并发出异步完成的信号；
- dest() 接受一个输出目录作为参数，并且它还会产生一个 Node 流(stream)，通过该流将内容输出到文件中；

```js
const { src, dest } = require("gulp");
const copyFile = () => {
  // 1.读取文件 2.写入文件
  return src("./src/**/*.js").pipe(dest("./dist"));
};
module.exports = {
  copyFile,
};
```

流（stream）所提供的主要的 API 是 .pipe() 方法，pipe 方法的原理是什么呢？

- pipe 方法接受一个 转换流（Transform streams）或可写流（Writable streams）；
- 那么转换流或者可写流，拿到数据之后可以对数据进行处理，再次传递给下一个转换流或者可写流；

## 对文件进行转换

如果在这个过程中，我们希望对文件进行某些处理，可以使用社区给我们提供的插件。

- 比如我们希望 ES6 转换成 ES5，那么可以使用 babel 插件；
- 如果我们希望对代码进行压缩和丑化，那么可以使用 uglify 或者 terser 插件；

```js
const { src, dest, watch } = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const jsTask = () => {
  return src("./src/**/*.js")
    .pipe(babel())
    .pipe(terser({ mangle: { toplevel: true } }))
    .pipe(dest("./dist"));
};

// watch函数监听内容的改变
watch("./src/**/*.js", jsTask);
module.exports = {
  jsTask,
};
```

## glob 文件匹配

src() 方法接受一个 glob 字符串或由多个 glob 字符串组成的数组作为参数，用于确定哪些文件需要被操作。

- glob 或 glob 数组必须至少匹配到一个匹配项，否则 src() 将报错；

glob 的匹配规则如下：

- (一个星号\*)：在一个字符串中，匹配任意数量的字符，包括零个匹配；
  > '\*.js'
- (两个星号\*\*)：在多个字符串匹配中匹配任意数量的字符串，通常用在匹配目录下的文件；
  > 'scripts/\*/.js'
- (取反!)：
  - 由于 glob 匹配时是按照每个 glob 在数组中的位置依次进行匹配操作的；
  - 所以 glob 数组中的取反（negative）glob 必须跟在一个非取反（non-negative）的 glob 后面；
  - 第一个 glob 匹配到一组匹配项，然后后面的取反 glob 删除这些匹配项中的一部分；
    > ['scripts/\*/.js','!scripts/vendor/']

## Gulp 案例

通过 gulp 来开启本地服务和打包：

- 打包 html 文件；
  - ✓ 使用 gulp-htmlmin 插件；
- 打包 JavaScript 文件；
  - ✓ 使用 gulp-babel，gulp-terser 插件；
- 打包 less 文件；
  - ✓ 使用 gulp-less 插件；
- html 资源注入
  - ✓ 使用 gulp-inject 插件；
- 开启本地服务器
  - ✓ 使用 browser-sync 插件；
- 创建打包任务
- 创建开发任务

```js
const { src, dest, parallel, series, watch } = require("gulp");

const htmlmin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const less = require("gulp-less");

const inject = require("gulp-inject");
const browserSync = require("browser-sync");

// 1.对html进行打包
const htmlTask = () => {
  return src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist"));
};

// 2.对JavaScript进行打包
const jsTask = () => {
  return src("./src/**/*.js")
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser({ toplevel: true }))
    .pipe(dest("./dist"));
};

// 3.对less进行打包
const lessTask = () => {
  return src("./src/**/*.less").pipe(less()).pipe(dest("./dist"));
};

// 4.在html中注入js和css
const injectTask = () => {
  return src("./dist/**/*.html")
    .pipe(
      inject(src(["./dist/**/*.js", "./dist/**/*.css"]), { relative: true })
    )
    .pipe(dest("./dist"));
};

// 5.开启一个本地服务器
const bs = browserSync.create();
const serve = () => {
  watch("./src/**", buildTask);

  bs.init({
    port: 8080,
    open: true,
    files: "./dist/*",
    server: {
      baseDir: "./dist",
    },
  });
};
// 创建项目构建的任务
const buildTask = series(parallel(htmlTask, jsTask, lessTask), injectTask);
const serveTask = series(buildTask, serve);
// webpack搭建本地 webpack-dev-server
module.exports = {
  buildTask,
  serveTask,
};
```
