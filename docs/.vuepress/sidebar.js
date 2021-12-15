/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-08-08 18:22:53
 * @LastEditors: Roy
 * @LastEditTime: 2021-12-13 11:47:09
 * @Deprecated: 否
 * @FilePath: /my_blog/docs/.vuepress/sidebar.js
 */
// note
const note = [
    {
        title: '建立前端知识体系',
        collapsable: true,
        children: [
            'handwritten/手写',
            'knowledge/JS数据类型',
            'knowledge/变量、作用域、内存问题',
            'knowledge/复杂数据类型',
            // 'knowledge/JS运算符',
            'knowledge/JS原型-原型链',
            'knowledge/函数表达式',
            'knowledge/事件循环机制EventLoop',
            'knowledge/深拷贝、浅拷贝',
            'knowledge/迭代器',
            'knowledge/tcp',
            'knowledge/HTTPS和HTTP2.0',
            'knowledge/call,apply,bind,new的内部原理实现',
            'knowledge/JavaScript工作原理',
            'knowledge/元编程',
        ]
    },
    {
        title: 'Vue源码分析',
        collapsable: true,
        children: [
            'vue3/vue基础',
            'vue3/初始化',
            'vue3/mount',
            'vue3/双向绑定',
            'vue3/编译器',
            'vue3/数据驱动',
            'vue3/nextTick',
            'vue3/$set原理',
            'vue3/watch原理',
            'vue3/vuex',
            'vue3/vue3',
            'vue3/生态系统',
        ]
    },

    {
        title: '提效赋能 前端工程化篇',
        collapsable: true,
        children: [
            "modular/脚手架",
            "modular/自动化部署",
            "modular/gitlab自动化",
            "modular/Jenkins",
            "modular/Sonar简单使用",
            "modular/前端工程与构建",
            "modular/前端工程与性能优化",
            "modular/敏捷开发持续集成",
        ]
    },
    {
        title: '全栈赋能 Node篇',
        collapsable: true,
        children: [
            'node/node搭建',
            // 'node/技术闭环',
        ]
    },
    {
        title: '程序员PLUS篇',
        collapsable: true,
        children: [
            'plus/git校验',
        ]
    },
    {
        title: 'JavaScript设计模式',
        collapsable: true,
        children: [
            'JavaScript设计模式/创建型设计模式',
            'JavaScript设计模式/结构型设计模式',
            'JavaScript设计模式/行为型设计模式',
            'JavaScript设计模式/技巧型设计模式',
            'JavaScript设计模式/架构型设计模式',
        ]
    },
    // {
    //     title: '三大明星产品案例 提炼开发全流程经验',
    //     collapsable: true,
    //     children: [
    //         'project/QQ阅读',
    //         'project/千亿流量阿里淘宝中台化战略',
    //         'project/小米商城',
    //     ]
    // },

    {
        title: 'HTTP',
        collapsable: true,
        children: [
            'http/HTTP协议',
            'http/HTTP缓存',
            'http/DNS',
            'http/TCP-IP',
            'http/http基础'
        ]
    },
    {
        title: 'webpack',
        collapsable: true,
        children: [
            'webpacks/webpack',
            'webpacks/webpack运行流程',
            'webpacks/webpack从入门到精通一',
            'webpacks/webpack从入门到精通二',
            'webpacks/webpack从入门到精通三',
            'webpacks/webpack从入门到精通四',
            'webpacks/webpack从入门到精通四',
            'webpacks/webpack4源码',
            'webpacks/手写简易webpack',
            'webpacks/webpack性能优化',
        ]
    },
    {
        title: '性能优化',
        collapsable: true,
        children: [
            'optimization/性能优化初探',
            'optimization/测试网速',
            'optimization/资源加载顺序',
            'optimization/浏览器渲染流程',
            'optimization/各项指标的意义',
            'optimization/Chrome性能分析',
            'optimization/资源优化',
            'optimization/传输加载优化',
            'optimization/用RAIL模型分析性能',
            'optimization/performance面板解决性能',
            'optimization/Node性能调优'
            // 'optimization/性能测试',
            // 'optimization/性能优化一',
            // 'optimization/性能优化二',
            // 'optimization/性能优化三',
            // 'optimization/性能优化四',
        ]
    },
    {
        title: 'Flutter',
        collapsable: true,
        children: [
            'flutter/搭建Flutter开发环境',
            'flutter/Flutter知识',
        ]
    },
    // {
    //     title: '算法',
    //     collapsable: true,
    //     children: [
    //         '算法/algorithm'

    //     ]
    // },
    // {
    //     title: '习题',
    //     collapsable: true,
    //     children: [
    //         'interview/知识点',
    //         'interview/宝典一',
    //         'interview/宝典二',
    //         'interview/前端基础题',
    //         'interview/宝典三',
    //         'interview/宝典四',

    //     ]
    // },

    {
        title: '忍者秘籍书',
        collapsable: true,
        children: [
            'book/忍者秘籍书'
        ]
    },

]

// 算法
const arithmetic = [
    {
        titie: '实战特训',
        collapsable: true,
        children: [
            'principle/skill'
        ]
    },
    {
        title: '递归',
        collapsable: true,
        children: [
            'recursion/递归'
        ]
    },
    {
        title: '栈',
        collapsable: true,
        children: [
            'stack/栈',
            'stack/进制转换',
            'stack/有效的括号'
        ]
    },
    {
        title: '队列',
        collapsable: true,
        children: [
            "queue/队列",
            "queue/练习"
        ]
    },
    {
        title: '字典和散列表',
        collapsable: true,
        children: [
            'dictionary/字典和散列表'
        ]
    },
    {
        title: '链表',
        collapsable: true,
        children: [
            'linkedList/链表',
            'linkedList/套路'
        ]
    },
    {
        title: '集合',
        collapsable: true,
        children: [
            'set/集合'
        ]
    },
    {
        title: '排序',
        collapsable: true,
        children: [
            "sort/排序和搜索"
        ]
    },

]

var react = [
    {
        title: '基础',
        collapsable: true,
        children: [
            "基础/react基础",
            "基础/从零实现react",
            "基础/fiber",
            "基础/redux",
        ]
    },
    // {
    //     title: 'Api',
    //     collapsable: true,
    //     children: [
    //         "api/",
    //     ]
    // },
]

module.exports = {
    '/note/': note,
    '/react/': react,
    // '/arithmetic/': arithmetic,
}