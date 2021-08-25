# node搭建

## 创建项目
```js
npm init -y
```
创建一个package.json文件,然后在下面创建如下目录和app.js

![](/node/1609512672431.jpg)

## 安装koa依赖
```js
npm install koa --save
```

安装完成后去app.js里面引用

```js
const Koa = require('koa');

const app = new Koa();


app.listen(3000,()=>{
    console.log('node服务器启动成功');
})

```
<!-- ![](/node/1609514054839.jpg) -->


## 使用 nodemon 启动调试
nodemon 用来监视node.js应用程序中的任何更改并自动重启服务,不需要我们每次改了代码手动重启。

全局安装 nodemon

```js
npm install nodemon -g //报错就用sudo npm install nodemon -g 然后输入密码
```

执行 `nodemon app.js`,得到如下结果说明成功

![](/node/1609514859156.jpg)

## 环境变量配置
我们可以在config目录下新建一个`index.js`,想要根据mode环境来执行不同得配置，我们需要先安装一个lodash，安装命令:`npm install lodash -S`，安装完成后在`index.js`里面编写如下代码:
```js
const {extend} = require('lodash');
let config = {};
if (process.env.NODE_ENV === 'development') {
    let localConfig = {
        port:8081,
    }
    config = extend(config,localConfig);
}

if (process.env.NODE_ENV === 'production') {
    let proConfig = {
        port:80,
    }
    config = extend(config,proConfig);
}

module.exports = config;
```

我们去app.js里面引入该配置，`const {port} = require('./config')`,然后把监听得3000端口改成port。
```js
app.listen(port,()=>{
    console.log('node服务器启动成功');
})

```

我们现在想要看到该环境信息是否正确，那么就要先安装一个`npm install cross-env --save`, **cross-env** 这是一款运行跨平台设置和使用环境变量的脚本。

安装完成后，去package.json里面得scripts对象下面去配置一行命令:`"start": "cross-env NODE_ENV=development nodemon app.js"`

执行`npm start`,去浏览器打开`http://localhost:8081/`发现能正常访问了，说明我们环境变量配置成功了。


## 路由以及部署项目到node
安装插件:
```js
npm install koa-simple-router --save
npm install koa-swig --save //模板引擎
```

我们通过在controllers目录下创建`index.js ApiController.js Controller.js`,

在ApiController.js代码如下:
```js
const Controller = require('./Controller');
class ApiController extends Controller {
    constructor(){
        super();
    }
    async actionIndex(ctx,next){
        ctx.body = '欢迎来到Node';
    }
}
```

在index.js代码如下:
```js
const router = require('koa-simple-router')
const ApiController = require('./ApiController')
const apiController = new ApiController();

module.exports = (app)=>{
    app.use(
        router((_)=>{
            _.get('/api/actionIndex',apiController.actionIndex);
        })
    )
}

```
我们需要在app.js里面加入一些配置，完整代码如下:
```js
const Koa = require('koa');
const render = require('koa-swig');
const { port,memoryFlag,viewDir } = require('./config')
var co = require('co');

const app = new Koa();
app.context.render = co.wrap(
    render({
        root: viewDir,
        autoescape: true,
        cache: memoryFlag, // disable, set to false
        ext: 'html',
        writeBody:false
    })
);
require('./controllers')(app);


app.listen(port, () => {
    console.log('node服务器启动成功');
})

```
运行`npm start`后，访问`http://localhost:8081/api/actionIndex`,在页面上显示`欢迎来到Node`，说明成功。

### Node启动项目 
首先通过vue创建一个空项目，然后打包成dist，把dist里面得文件拷贝到node文件加中，如下图:

![](/node/1609556226894.jpg)

需要在`ApiController.js`里面加入如下代码:
```js
async actionRender(ctx,next){
    ctx.body = await ctx.render('index');
}
```

然后去controller目录下`index.js`里面加入一个路由，`_.get('/',apiController.actionRender)`,表示我们通过`http://localhost:8081/`就能访问到我们得项目

但是这样直接访问就会有一个问题，那就是静态资源路径找不到，这时候我们就要借助一个插件来处理这么报错，在终端中输入如下命令:`npm install koa-static --save`

安装完成后我们去修改`app.js`里面得内容，如下:
```js
const Koa = require('koa');
const render = require('koa-swig');
const server = require('koa-static');
const { port,memoryFlag,viewDir,staticDir } = require('./config')
var co = require('co');

const app = new Koa();
app.use(server(staticDir));
app.context.render = co.wrap(
    render({
        root: viewDir,
        autoescape: true,
        cache: memoryFlag, // disable, set to false
        ext: 'html',
        writeBody:false
    })
);
require('./controllers')(app);


app.listen(port, () => {
    console.log('node服务器启动成功');
})

```

值得注意的是，我们从config目录下引入了一下参数，最开始我们说config目录下是配置各种公共参数和环境变量，那么我们来看下这些参数都配置了什么，代码如下:
```js
const {extend} = require('lodash');
const {join} = require('path');
let config = {
    viewDir: join(__dirname, '..','views'),
    staticDir: join(__dirname, '..','assets')
};
if (process.env.NODE_ENV === 'development') {
    let localConfig = {
        port:8081,

        memoryFlag:'memory'
    }
    config = extend(config,localConfig);
}

if (process.env.NODE_ENV === 'production') {
    let proConfig = {
        port:80,
        memoryFlag:false
    }
    config = extend(config,proConfig);
}

module.exports = config;
```

我们再去访问`http://localhost:8081/`，发现可以访问我们得项目

![](/node/1609556980218.jpg)

![](/node/1609557026347.jpg)

点击按钮，路由也能正常跳转。

但是这里会引发一个问题，这里我们可以看到我们访问得项目后，路由会自动带有`#`，那是因为vue打包的时候把路由模式设置得参数是`mode:'hash'`,我们在about页面如何刷新都能正常访问，那么如果把路由模式改成`mode:'history'`，路由路径里面不会带`#`,那么在about页面刷新页面就会报错`Not Found`，这是为什么呢？原因很简单，这里涉及到真假路由问题，我们可以通过node里面修改这个问题或者通过nginx做来处理。

### node中如何解决vue-router使用history模式呢？

安装一下依赖`npm install koa2-connect-history-api-fallback --save`,

koa2的一个中间件，用于处理vue-router使用history模式返回index.html，让koa2支持SPA应用程序

在`app.js`里面加入如下代码:
```js
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
//需要写在require('./controllers')(app);之前
app.use(historyApiFallback({index:'/', whiteList: ['/api'] }));
```

然后`mode:'history'`模式得路由就可以访问了，刷新也正常显示。


## Koa 全局异常处理

### 异常得概念
对于异常，我们可以分为已知异常和未知异常

已知异常就是程序中能够知道得异常，如:客户端参数传递错误，服务端抛出异常，如客户端无权访问等等这类，这类错误就是已知异常。

未知异常就是程序中不能预想得错误，最常见得服务器程序抛出状态码500得异常。如比如我们单词拼写错误，导致程序无法运行等等，这种就是未知异常。

新建一个middlewares文件夹，在下面创建一个`errorHandler.js`文件，
```js
class errorHandler{
     static error(app,logger){
         app.use(async (ctx,next) => {
             try {
                 await next();
             } catch (e) {
                 console.log(e);
             }
         });
         app.use(async (ctx,next) => {
             await next();
             if (404!==ctx.status) {
                 return;
             }
             ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>'
         })
     }
 }

 module.exports = errorHandler;
```

在app.js里面导入模块

```js
const errorHandler = require('./middlewares/errorHandler')
//在这两个之前app.use(historyApiFallback({index:'/', whiteList: ['/api'] }));
// require('./controllers')(app);
errorHandler.error(app,);
```


### 定义异常得返回结果

类似没有定义直接用的变量是空值，导致空指针异常，这类肯定是属于我们前面说的未知异常。那我们怎么区分是已知还是未知呢？

在服务器接口开发中，一个异常得返回结果，通常包含有:
- msg:异常信息
- code:HTTP状态码
- errorCode:自定义的异常状态码

因此我们可以定义HttpException只要是出现这异常属于HttpException都属于已知异常。

```js
// 定义HttpException继承Error这个类
class HttpException extends Error {

    constructor(msg = '服务器异常', errorCode = 500, code = 400) {
        super()
        /**
         * 错误信息
         */
        this.msg = msg
        /**
         * Http 状态码
         */
        this.code = code
        /**
         * 自定义的异常状态码
         */
        this.errorCode = errorCode

    }
}
```

我们改写下中间件那里，区分是已知异常还是未知异常
```js
const { HttpException } = require("./httpException")

class errorHandler {
    static error(app, logger) {
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                const isHttpException = error instanceof HttpException
                //判断是否是已知错误
                if (isHttpException) {
                    ctx.body = {
                        msg: error.msg,
                        errorCode: error.errorCode,
                        request: `${ctx.method} ${ctx.path}`
                    }
                    ctx.status = error.code
                } else {
                    ctx.body = {
                        msg: '服务器出现了未知异常',
                        errorCode: 999,
                        request: `${ctx.method} ${ctx.path}`
                    }
                    ctx.status = 500
                }
            }
        });
        app.use(async (ctx, next) => {
            await next();
            if (404 !== ctx.status) {
                return;
            }
            
            ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>'
        })
    }
}

module.exports = errorHandler;
```

Ok,我们现在测试下

我们启动服务 访问 http://localhost:8000/ 发现抛出了

```js
{"msg":"服务器出现了未知异常","errorCode":999,"request":"GET /"}
```

说明我们自定义的中间件已经捕拦截到异常错误了


### 定义常见的异常状态

有了上面的 异常的基类，我们很容易定义一些常见的异常，如：参数校验失败
```js
class ParameterExceptio extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400;
        this.msg = msg || '参数错误';
        this.errorCode = errorCode || 400;
    }
}
```

成功返回
```js
class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 200;
        this.msg = msg || '成功';
        this.errorCode = errorCode || 200;
    }
}
```

权限认证
```js
class AuthFaild extends HttpException {
    constructor() {
        super()
        this.code = 401;
        this.msg = '认证失败'；
        this.errorCode = 1004;
    }
}
```

## BFF

### 什么是BFF以及node.js在BFF层能做的事情

**BFF-服务于前端的后端** 。比如，现在有一个后端接口，他不满足我前端要求的格式，或者很多无用的数据格式，那么我们就可以在 **BFF** 层把数据格式化。

### 在Node的模板渲染

我们在views目录下新建一个`index.html`，在`body`标签加入`<h1>[[data]]</h1>`,然后去app.js里面加入`varControls: ['[[', ']]']`，如下:
```js
app.context.render = co.wrap(
    render({
        root: viewDir,
        autoescape: true,
        cache: memoryFlag, // disable, set to false
        ext: 'html',
        writeBody:false,
        varControls: ['[[', ']]']
    })
);
```

然后在接口路由里面代码如下:
```js
async actionRender(ctx,next){
    ctx.body = await ctx.render('index',{
        data:"后端数据"
    });
}
```

我们访问`http://localhost:8081/`就可以看到页面上显示我们想要的数据了。

![](/node/1609595307925.jpg)

## JS type module 和 systemjs

使用JavaScript模块依赖于 **import** 和 **export** ,最新的浏览器开始原生支持模块功能了，浏览器能够最优化加载模块，是它比使用库更有效率:使用库通常需要做额外的客户端处理。

首先，你需要把type="module"放到 **script** 标签中，来声明这个脚本是一个模板:
```js
<script type="module">
    // 1.支持module 支持nomodule
    import("./js/data.js").then(_ => {
        console.log(_.default);
    })
</script>
```
浏览器中可用的JavaScript模块功能的最新部分是动态模块加载。这允许你仅在需要时动态加载模块，而不必预先加载所有模块。如上

那如果浏览器不支持 **module** 呢，支持 **nomodule** 如下:
```js
<script type='nomodule'>
    ...
</script>
```

这时候我们就需要用 **balel**进行打包编译

如果浏览器既不支持 **module** 也不支持 **nomodule** 这个时候我们需要用到 **systemjs**

### 安装依赖
```js
npm install @babel/cli @babel/core @babel/plugin-transform-modules-systemjs @babel/preset-env -D
```

### 配置.babelrc
```js
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "@babel/plugin-transform-modules-systemjs"
    ]
}
```

### 执行打包
```js
 "build": "babel ./assets/scripts/data.js -o ./assets/scripts/data_bundle.js"
```

>systemjs 是一个 通用模块加载器，支持AMD、Commonjs、ES6等各种格式的js模块加载

在index.html引入systemjs
```js
<script nomodule src="https://cdn.staticfile.org/systemjs/6.3.3/system.js"></script>
<script nomodule>
    // 不支持module 不支持nomodule 下面
    System.import("./scripts/data_bundle.js").then((_) => {
        console.log(_.default)
    });
</script>
```

最坑的来了, 如果 支持 module 不支持 nomodule,那我们上面的代码会执行2次,那么怎么解决呢

```js
<script>
    (function () {
        var check = document.createElement('script');
        if (!('noModule' in check) && 'onbeforeload' in check) {
            var support = false;
            document.addEventListener('beforeload', function (e) {
                if (e.target === check) {
                    support = true;
                } else if (!e.target.hasAttribute('nomodule') || !support) {
                    return;
                }
                e.preventDefault();
            }, true);

            check.type = 'module';
            check.src = '.';
            document.head.appendChild(check);
            check.remove();
        }
    }());
</script>
```

总结如下:
- 支持module 支持nomodule
- 支持module 不支持nomodule xx 代码会执行2次
- 不支持module 不支持nomodule

## node链接数据库

### 安装依赖
```js
npm install sequelize mysql2 --save
```

### 初始化 Sequelize

在config目录下新建一个`sql.js`
```js
const Sequelize = require('sequelize')
const { database, host, sqlPort, username, password } = require('../config')
const Op = Sequelize.Op;
const sequelize = new Sequelize(database, username, password, {
    port:sqlPort,
    host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
    },
    dialectOptions: {
        // 字符集
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    timezone: '+08:00' //时区转换
})

module.exports = sequelize;
```

### 定义一个测试数据模型
在model目录下创建一个`test.js`:
```js
var Sequelize = require('sequelize');
var sequelize = require('../config/sql');

// 创建 model
const User = sequelize.define('user', {
    userName: {
        type: Sequelize.STRING, // 指定值的类型
        field: 'user_name' // 指定存储在表中的键名称
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 email
    email: {
        type: Sequelize.STRING
    }
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: false
});
//如果不存在就创建此表
var user = User.sync({ force: false });

// module.exports = user;
// 添加新用户
exports.addUser = function (userName, email) {
    // 向 user 表中插入数据
    return User.create({
        userName: userName,
        email: email
    });
};

exports.findOne = function(userName){
    return User.findOne({
        where: {
            userName: userName,
        }
    })
}
```

### 测试方法
在controller目录下创建一个`TestController.js`目录:
```js
const Test = require('../models/Test')
const Controller = require('./Controller');
const user = require('../models/Test');
class TestController extends Controller {
    constructor() {
        super();
    }
    async add(ctx,next) {
        var resFind = await user.findOne('roy1');
        if (!resFind) {
            var resSave = await user.addUser('roy1', 'jack@163.com');
            if (resSave) {
                ctx.body = '请求成功'
            }else{
                ctx.body = '保存失败'
            }
        }else{
            ctx.body = '用户名已经存在'
        }

    }
}
module.exports = TestController;
```

### 添加路由访问

在controller目录下的index.js路由里面添加一行` _.get('/api/test', testController.add)`,

然后运行`node start`，在浏览器输入`http://localhost:8081/api/test`，终端打印如下:

![](/node/1609604880414.jpg)

浏览器显示如下:

![](/node/1609604939059.jpg)

数据库显示如下:

![](/node/1609605019159.jpg)

至此,我们利用 Sequelize 完成了一个简单的操作

