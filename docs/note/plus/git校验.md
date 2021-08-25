# git校验

husky 是一个增强的 git hook 工具，借助husky在每次 commit 时执行 commitlint来检查我们输入的 message。从husky5开始版本有了重大变化，旧配置方式无法直接使用，需要重新配置，当前已经更新到husky7版本，以下用husky7版本来讲解。

## 提交规范
每次进行 `git` 提交时，需要写提交说明，规范提交说明的好处如下
-   更加结构化的提交历史
-   保证每次信息都有确切的含义
-   方便直接生成 changelog
-   方便信息搜索和过滤


## 依赖版本
- "husky":"^7.0.1"
- "lint-staged": "^11.1.2",
- "@commitlint/cli":"^13.1.0"
- "@commitlint/config-conventional":"^13.1.0"

## 安装依赖
```
yarn add husky lint-staged @commitlint/config-conventional @commitlint/cli 或 npm install husky lint-staged @commitlint/config-conventional @commitlint/cli -D
```
- commitlint:检测提交commit提交记录是否符合规范
- lint-staged:检查提交暂存区代码是否符合规范

## 配置
### lint-staged
在package.json中的配置
```
"lint-staged": {
    "*.{js,ts,vue,css}": "eslint"//检查eslint
}
```

### commitlint
在根目录下创建一个`commitlint.config.js`文件，内容如下:
```js
module.exports = {
    extends: [
        "@commitlint/config-conventional"
    ],
    rules: {
        'body-leading-blank': [2, 'always'],//body上面有换行
        'footer-leading-blank': [1, 'always'],//footer上面有换行
        'header-max-length': [2, 'always', 108],//header上最大108字符
        'type-case': [0],
        'type-empty': [0],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'feat',//新功能（feature）
                'fix',//修补bug
                'perf',//优化相关，比如性能提升、体验
                'style',//仅仅修改了空格,格式缩进,逗号等等（不影响代码运行的变动）
                'docs',//文档（documentation）
                'test',//增加测试
                'refactor',//重构（即不是新增功能，也不是修改bug的代码变动）
                'build',//主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
                'ci',//cli配置相关,如对k8s，docker相关配置
                'chore',//构建过程或辅助工具的变动
                'revert',//回滚到上一个版本 
            ],
        ],
    },
}
```
[相关配置文档](https://github.com/conventional-changelog/commitlint)

### husky
上述相关配置好了，我们需要通过husky把它们与实际操作关联起来。

在package.json中添加新的script命令
```js
"scripts": {
    "prepare": "husky install"
 },
```
执行`npm run prepare`会在根目录创建一个`.husky`文件夹，相关配置在里面编写。

在.husky目录下创建一个`pre-commit`文件,编写内容如下:
```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npx lint-staged --allow-empty $1
```
这样就把`lint-staged`关联起来。

创建一个`commit-msg`文件，编写内容如下:
```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit $1
```

## 测试
运行`git add . && git commit -m '添加git校验文档'`，如果说错误就说明没有权限，需要运行` chmod 777 .husky/commit-msg .husky/pre-commit`。
```
hint: The '.husky/pre-commit' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.
hint: The '.husky/commit-msg' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.
```

如果报错是如下，说明git校验已经开启，提示提交规范错误
```
✔ Preparing...
✔ Running tasks...
✔ Applying modifications...
✔ Cleaning up...
⧗   input: 添加git校验
✖   subject may not be empty [subject-empty]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

修改git命令`git add . && git commit -m 'docs: 添加git校验文档'`，如下信息说明提交成功，最后`git push`即可。
```
✔ Preparing...
✔ Running tasks...
✔ Applying modifications...
✔ Cleaning up...
[master bd4489e] docs: 添加git校验文档
 1 file changed, 15 insertions(+), 1 deletion(-)
```

### 禁用 husky
某一次提交想要禁用 husky，可以添加参数--no-verify
```
git commit --no-verify -m "xxx"
```
