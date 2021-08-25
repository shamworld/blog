# 手写简易webpack

## 核心打包原理

### 打包工作的流程如下:
1. 需要读到入口文件里的内容
2. 分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树
3. 根据AST语法树，生成浏览器能够运行的最终代码

### 具体细节
1. 获取主模块内容
2. 分析模块内容
    - 安装@babel/parser包(转AST)
3. 对模块内容处理
    - 安装@babel/traverse包(遍历AST)
    - 安装@babel/core和@babel/preset-env包(ES6转ES5)
4. 递归处理所有模块
5. 生成最终代码

## 代码实现和分析

整个项目目录如下，其中src下的文件是bundle.js需要打包的代码。
```js
├── bundle.js
├── package.json
└── src
    ├── add.js
    ├── index.js
    └── minus.js
```

src下各文件内容如下:

add.js
```js
export default (a,b)=>{
    return a+b;
}
```

minus.js
```js
export const minus = (a,b)=>{
    return a-b;
}
```

index.js
```js
import add from './add.js'
import {minus} from './minus.js'

const num = add(1,2);
const division = minus(2,1);

console.log(num);
console.log(division);
```

### 实现bundle.js

读取文件内容
```js
const fs = require('fs');
const moduleAnalyser = (fileName)=>{
    // 1.fs模块根据路径读取到了module的内容
    const content = fs.readFileSync(fileName,'utf-8');
    
    console.log(content);
}
moduleAnalyser('./src/index.js');
```

打印如下:
```js
import add from './add.js'
import {minus} from './minus.js'

const num = add(1,2);
const division = minus(2,1);

console.log(num);
console.log(division);
```

接下来我们需要把文件内容转出ast语法树，安装`@babel/parser`，通过`npm install @babel/parser`，引入`@babel/parser`:
```js
const fs = require('fs');
const parser = require('@babel/parser')

const moduleAnalyser = (fileName)=>{
    // 1.fs模块根据路径读取到了module的内容
    const content = fs.readFileSync(fileName,'utf-8');
    // 2.使用@babel/parser将文件内容转换成抽象语法树AST
    const ast = parser.parse(content,{
        sourceType:'module'//表示我们要解析的是es6模块
    })
    console.log(ast);
}

moduleAnalyser('./src/index.js');
```

<details>
  <summary><mark><font color=darkred>输出</font></mark></summary>
  <pre><code>  
Node {
  type: 'File',
  start: 0,
  end: 376,
  loc: SourceLocation {
    start: Position { line: 1, column: 0 },
    end: Position { line: 21, column: 0 },
    filename: undefined,
    identifierName: undefined
  },
  range: undefined,
  leadingComments: undefined,
  trailingComments: undefined,
  innerComments: undefined,
  extra: undefined,
  errors: [],
  program: Node {
    type: 'Program',
    start: 0,
    end: 376,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    range: undefined,
    leadingComments: undefined,
    trailingComments: undefined,
    innerComments: undefined,
    extra: undefined,
    sourceType: 'module',
    interpreter: null,
    body: [ [Node], [Node], [Node], [Node], [Node], [Node] ],
    directives: []
  },
  comments: [
    {
      type: 'CommentBlock',
      value: '',
      start: 0,
      end: 226,
      loc: [SourceLocation]
    }
  ]
}
  </code></pre>
</details>


我们需要拿到program下的body内容：

<details>
  <summary><mark><font color=darkred>输出</font></mark></summary>
  <pre><code>  
[
  Node {
    type: 'ImportDeclaration',
    start: 227,
    end: 250,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    range: undefined,
    leadingComments: [ [Object] ],
    trailingComments: undefined,
    innerComments: undefined,
    extra: undefined,
    specifiers: [ [Node] ],
    source: Node {
      type: 'StringLiteral',
      start: 243,
      end: 250,
      loc: [SourceLocation],
      range: undefined,
      leadingComments: undefined,
      trailingComments: undefined,
      innerComments: undefined,
      extra: [Object],
      value: './add.js'
    }
  },
  Node {
    type: 'ImportDeclaration',
    start: 251,
    end: 280,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    range: undefined,
    leadingComments: undefined,
    trailingComments: undefined,
    innerComments: undefined,
    extra: undefined,
    specifiers: [ [Node] ],
    source: Node {
      type: 'StringLiteral',
      start: 271,
      end: 280,
      loc: [SourceLocation],
      range: undefined,
      leadingComments: undefined,
      trailingComments: undefined,
      innerComments: undefined,
      extra: [Object],
      value: './minus.js'
    }
  },
  Node {
    type: 'VariableDeclaration',
    start: 282,
    end: 303,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    range: undefined,
    leadingComments: undefined,
    trailingComments: undefined,
    innerComments: undefined,
    extra: undefined,
    declarations: [ [Node] ],
    kind: 'const'
  },
  Node {
    type: 'VariableDeclaration',
    start: 304,
    end: 332,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    range: undefined,
    leadingComments: undefined,
    trailingComments: undefined,
    innerComments: undefined,
    extra: undefined,
    declarations: [ [Node] ],
    kind: 'const'
  },
  Node {
    type: 'ExpressionStatement',
    start: 334,
    end: 351,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    range: undefined,
    leadingComments: undefined,
    trailingComments: undefined,
    innerComments: undefined,
    extra: undefined,
    expression: Node {
      type: 'CallExpression',
      start: 334,
      end: 350,
      loc: [SourceLocation],
      range: undefined,
      leadingComments: undefined,
      trailingComments: undefined,
      innerComments: undefined,
      extra: undefined,
      callee: [Node],
      arguments: [Array]
    }
  },
  Node {
    type: 'ExpressionStatement',
    start: 352,
    end: 374,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    range: undefined,
    leadingComments: undefined,
    trailingComments: undefined,
    innerComments: undefined,
    extra: undefined,
    expression: Node {
      type: 'CallExpression',
      start: 352,
      end: 373,
      loc: [SourceLocation],
      range: undefined,
      leadingComments: undefined,
      trailingComments: undefined,
      innerComments: undefined,
      extra: undefined,
      callee: [Node],
      arguments: [Array]
    }
  }
]
  </code></pre>
</details>

这时候我们看到，我们需要遍历拿到node下面source里面的value路径，然后拼接成路径，这时候我们需要借助`@babel/traverse`来循环处理ast，`npm install @babel/traverse`:
```js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default;

const moduleAnalyser = (fileName)=>{
    // 1.fs模块根据路径读取到了module的内容
    const content = fs.readFileSync(fileName,'utf-8');
    // 2.使用@babel/parser将文件内容转换成抽象语法树AST
    const ast = parser.parse(content,{
        sourceType:'module'//表示我们要解析的是es6模块
    })
    //3.使用@babel/traverse遍历AST，对每个ImportDeclaration节点做映射，把依赖关系拼接在dependencies对象里
    let dependencies = {};
    traverse(ast,{
        ImportDeclaration({node}){
            const dirName = path.dirname(fileName);
            const newFile = "./" + path.join(dirName,node.source.value);
            // key是相对于当前模块的路径，value为相对于bundler.js的路径。
            dependencies[node.source.value] = newFile;
        }
    });
    console.log(dependencies);
}

moduleAnalyser('./src/index.js');
```

这时候我们打印dependencies结果是`{ './add.js': './src/add.js', './minus.js': './src/minus.js' }`，这时候我们就把依赖模块的路径拿到了。

接下来就是需要把AST转换成浏览器可以执行的代码,这时候我们需要借助`@babel/core`和`@babel/preset-env`,`npm install @babel/core @babel/preset-env`

```js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = (fileName)=>{
    // 1.fs模块根据路径读取到了module的内容
    const content = fs.readFileSync(fileName,'utf-8');
    // 2.使用@babel/parser将文件内容转换成抽象语法树AST
    const ast = parser.parse(content,{
        sourceType:'module'//表示我们要解析的是es6模块
    })
    //3.使用@babel/traverse遍历AST，对每个ImportDeclaration节点做映射，把依赖关系拼接在dependencies对象里
    let dependencies = {};
    traverse(ast,{
        ImportDeclaration({node}){
            const dirName = path.dirname(fileName);
            const newFile = "./" + path.join(dirName,node.source.value);
            // key是相对于当前模块的路径，value为相对于bundler.js的路径。
            dependencies[node.source.value] = newFile;
        }
    });
    //4.使用@babel/core和@babel/preset-env讲ast转换成浏览器可以执行的代码
    const {code} = babel.transformFromAst(ast,null,{
        presets:["@babel/preset-env"]
    });
    return {
        fileName,
        dependencies,
        code
    }
}

console.log(moduleAnalyser('./src/index.js'));
```

模块分析流程图如下：
![](/webpacks/20200922153129521.png)

调用console.log(moduleAnalyser('./src/index.js'))，可以在控制台打印出以下内容:
```js
{
  fileName: './src/index.js',
  dependencies: { './add.js': './src/add.js', './minus.js': './src/minus.js' },
  code: '"use strict";\n' +
    '\n' +
    'var _add = _interopRequireDefault(require("./add"));\n' +
    '\n' +
    'var _minus = require("./minus");\n' +
    '\n' +
    'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
    'var num = (0, _add["default"])(1, 2);\n' +
    'var division = (0, _minus.minus)(2, 1);\n' +
    'console.log(num);\n' +
    'console.log(division);'
}
```

执行moduleAnalyser(module)，可以返回module的fileName,dependencies,code信息。注意在code里， **import语法已经变成一个require函数了，export语法，也变成了在给一个exports变量赋值。**

## 依赖图谱生成

调用moduleAnalyser('./src/index.js')拿到入口文件的dependencies映射，接下来再把入口文件的依赖路径再一次做模块分析，再把依赖模块的依赖路径再一次做模块分析...其实就是广度优先遍历，我们可以很轻松得到这次打包所有需要的模块的分析结果。

```js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = (fileName)=>{
    // 1.fs模块根据路径读取到了module的内容
    const content = fs.readFileSync(fileName,'utf-8');
    // 2.使用@babel/parser将文件内容转换成抽象语法树AST
    const ast = parser.parse(content,{
        sourceType:'module'//表示我们要解析的是es6模块
    })
    //3.使用@babel/traverse遍历AST，对每个ImportDeclaration节点做映射，把依赖关系拼接在dependencies对象里
    let dependencies = {};
    traverse(ast,{
        ImportDeclaration({node}){
            const dirName = path.dirname(fileName);
            const newFile = "./" + path.join(dirName,node.source.value);
            // key是相对于当前模块的路径，value为相对于bundler.js的路径。
            dependencies[node.source.value] = newFile;
        }
    });
    //4.使用@babel/core和@babel/preset-env讲ast转换成浏览器可以执行的代码
    const {code} = babel.transformFromAst(ast,null,{
        presets:["@babel/preset-env"]
    });
    return {
        fileName,
        dependencies,
        code
    }
}

//生成依赖图谱
const makeDependenciesGraph = (entry) => {
    //entryModule:入口文件的dependencies映射
    const entryModule = moduleAnalyser(entry);
    //graphArray:图谱动态数组，初始只有一个元素entryModule
    const graphArray = [entryModule];
    for(let i=0;i<graphArray.length;i++){
        const item = graphArray[i];
        //dependencies:当前模块的dependencies映射
        const {dependencies} = item;
        //如果当前模块有依赖文件，则遍历dependencies，调用moduleAnalyser,对依赖文件进行模块分析
        if(dependencies){
            for(let key in dependencies){
                graphArray.push(moduleAnalyser(dependencies[key]));
            }
        }
    }
    //graph:遍历graphArray生成便利于打包使用的graph。其中key未fileName,value为dependencies和code
    const graph = {};
    graphArray.forEach(item=>{
        graph[item.fileName] = {
            dependencies:item.dependencies,
            code:item.code
        }
    });
    console.log(graph);
    return graph;
}

makeDependenciesGraph('./src/index.js');
```
调用makeDependenciesGraph('./src/index.js'),控制台打印:

```js
{
  './src/index.js': {
    dependencies: { './add.js': './src/add.js', './minus.js': './src/minus.js' },
    code: '"use strict";\n' +
      '\n' +
      'var _add = _interopRequireDefault(require("./add.js"));\n' +
      '\n' +
      'var _minus = require("./minus.js");\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      '\n' +
      'var num = (0, _add["default"])(1, 2);\n' +
      'var division = (0, _minus.minus)(2, 1);\n' +
      'console.log(num);\n' +
      'console.log(division);'
  },
  './src/add.js': {
    dependencies: {},
    code: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      'exports["default"] = void 0;\n' +
      '\n' +
      'var _default = function _default(a, b) {\n' +
      '  return a + b;\n' +
      '};\n' +
      '\n' +
      'exports["default"] = _default;'
  },
  './src/minus.js': {
    dependencies: {},
    code: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      'exports.minus = void 0;\n' +
      '\n' +
      'var minus = function minus(a, b) {\n' +
      '  return a - b;\n' +
      '};\n' +
      '\n' +
      'exports.minus = minus;'
  }
}
```

生成一栏图谱流程图如下:

![](/webpacks/20200922155610825.png)

看到这是不是很熟悉了，这就是我们打包dist的之后，删除eval和多余的代码后的函数自执行代码里面的代码。[详情请看](./webpack4源码.md)


## 生成代码
我们需要开始生成最终课运行的代码了。在上文"模块分析"部分，我们知道@babel/core和@babel/preset-env生成的浏览器课执行代码里，import语法已经变成一个require函数了，export语法，也变成了在给一个exports变量赋值。所以我们的"生成代码"部分，需要提供一个require函数和exports对象。

```js
//generateCode 根据依赖图谱生成浏览器可执行的代码
const generateCode = (entry)=>{
    //根据entry,调用makeDependenciesGraph生成依赖图谱graph
    const graph = JSON.stringify(makeDependenciesGraph(entry));
    //根据依赖图谱生成浏览器可执行代码
    return `
    (function(graph){
        // todo
      })(${graph})
    `
}
```

为了不污染全局作用域，我们使用立即执行函数来包装我们的代码，将依赖图谱graph作为参数传入。

在graph中找到入口文件的code，并运行它:
```js
return `
  (function(graph){
    function require(module){
      eval(graph[module].code)
    }
    require('${entry}')
  })(${graph})

```

在入口文件的code，我们同样需要调用require去获取依赖模块，模块导出的对象exports，所以require函数必须有导出对象，还要支持内部调用require函数。但是注意!!次require并非在声明的require函数，定义code内部使用的require函数->localRequire。因为我们观察之前编译出的代码，可以知道在code中，require函数传的参数是相对于当前module的相对路径，但是我们打包生成可运行代码时，需要的是相对于bundle.js的相对路径。这时候，我们之前给每个module存的dependencies映射再次派上了用场，localRequire()传入依赖相对于module的相对路径，根据graph对象，返回依赖相对于bundle.js的相对路径。

```js
 (function(graph){
    function require(module){
        function localRequire(relativePath){
            return require(graph[module].dependencies[relativePath])
        }
        var exports = {};
        eval(graph[module].code)
        return exports;
    }
    require('${entry}');
})(${graph})
```

为了防止模块内部变量污染其他模块，我们在eval外面包一层立即执行函数，讲localRequire,exports和code作为参数传入。
```js
(function(graph){
    function require(module){
        function localRequire(relativePath){
            return require(graph[module].dependencies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
            eval(code)
        })(localRequire,exports,graph[module].code)
        return exports;
    }
    require('${entry}');
})(${graph})
```
由此一个bundle就写完了，最终生成的代码，也是可以直接在浏览器中运行的。
调用console.log(generateCode('./src/index.js'))，可以在控制台打印出以下内容：
```js
(function(graph){
    function require(module){
        function localRequire(relativePath){
            return require(graph[module].dependencies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
            eval(code)
        })(localRequire,exports,graph[module].code)
        return exports;
    }
    require('./src/index.js');
})({"./src/index.js":{"dependencies":{"./add.js":"./src/add.js","./minus.js":"./src/minus.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _minus = require(\"./minus.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar num = (0, _add[\"default\"])(1, 2);\nvar division = (0, _minus.minus)(2, 1);\nconsole.log(num);\nconsole.log(division);"},"./src/add.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports[\"default\"] = _default;"},"./src/minus.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.minus = void 0;\n\nvar minus = function minus(a, b) {\n  return a - b;\n};\n\nexports.minus = minus;"}})
```

把代码复制到浏览器发现正常输出:

![](/webpacks/1611560676293.jpg)

最后一步，就是把文件打包到dist目录下:
```js
const content = generateCode('./src/index.js');

//写入到dist目录下
fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js',content);
```

执行`node bundle.js` 文件被打进dist目录下。


完整bundle.js代码如下:
```js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = (fileName)=>{
    // 1.fs模块根据路径读取到了module的内容
    const content = fs.readFileSync(fileName,'utf-8');
    // 2.使用@babel/parser将文件内容转换成抽象语法树AST
    const ast = parser.parse(content,{
        sourceType:'module'//表示我们要解析的是es6模块
    })
    //3.使用@babel/traverse遍历AST，对每个ImportDeclaration节点做映射，把依赖关系拼接在dependencies对象里
    let dependencies = {};
    traverse(ast,{
        ImportDeclaration({node}){
            const dirName = path.dirname(fileName);
            const newFile = "./" + path.join(dirName,node.source.value);
            // key是相对于当前模块的路径，value为相对于bundler.js的路径。
            dependencies[node.source.value] = newFile;
        }
    });
    //4.使用@babel/core和@babel/preset-env讲ast转换成浏览器可以执行的代码
    const {code} = babel.transformFromAst(ast,null,{
        presets:["@babel/preset-env"]
    });
    return {
        fileName,
        dependencies,
        code
    }
}

//生成依赖图谱
const makeDependenciesGraph = (entry) => {
    //entryModule:入口文件的dependencies映射
    const entryModule = moduleAnalyser(entry);
    //graphArray:图谱动态数组，初始只有一个元素entryModule
    const graphArray = [entryModule];
    for(let i=0;i<graphArray.length;i++){
        const item = graphArray[i];
        //dependencies:当前模块的dependencies映射
        const {dependencies} = item;
        //如果当前模块有依赖文件，则遍历dependencies，调用moduleAnalyser,对依赖文件进行模块分析
        if(dependencies){
            for(let key in dependencies){
                graphArray.push(moduleAnalyser(dependencies[key]));
            }
        }
    }
    //graph:遍历graphArray生成便利于打包使用的graph。其中key未fileName,value为dependencies和code
    const graph = {};
    graphArray.forEach(item=>{
        graph[item.fileName] = {
            dependencies:item.dependencies,
            code:item.code
        }
    });
    return graph;
}

//generateCode 根据依赖图谱生成浏览器可执行的代码
const generateCode = (entry)=>{
    //根据entry,调用makeDependenciesGraph生成依赖图谱graph
    const graph = JSON.stringify(makeDependenciesGraph(entry));
    //根据依赖图谱生成浏览器可执行代码
    return `
    (function(graph){
        function require(module){
            function localRequire(relativePath){
                return require(graph[module].dependencies[relativePath])
            }
            var exports = {};
           (function(require,exports,code){
                eval(code)
           })(localRequire,exports,graph[module].code)
            return exports;
        }
        require('${entry}');
      })(${graph})
    `
}

const content = generateCode('./src/index.js');

//写入到dist目录下
fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js',content);

```
