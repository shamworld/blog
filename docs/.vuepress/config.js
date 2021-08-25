/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-08-08 18:22:47
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-26 16:44:53
 * @Deprecated: 否
 * @FilePath: /my_blog/docs/.vuepress/config.js
 */
const nav = require('./nav.js')
const path = require('path');
const sidebar = require('./sidebar.js')
const setTitle = require('node-bash-title');
const setIterm2Badge = require('set-iterm2-badge');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

setTitle('贪吃的猫的博客');
setIterm2Badge('贪吃的猫的博客');
module.exports = {
    title: '码农机器人',
    head: [
        ['link', { rel: 'icon', href: '/logo.jpg' }]
    ],
    base: '/',
    // dest: './dist',
    // repo: 'https://github.com/Royxc/my_blog.git',
    description: '努力向前',
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    extraWatchFiles: [
        './nav.js',
        './sidebar.js'
    ],
    devServer: {
        host: 'localhost',
        // open:true
    },
    themeConfig: {
        logo: '/logo.jpg',
        sidebarDepth: 2,
        smoothScroll: true,
        // repo: '/',
        nav,
        sidebar,
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '在 Github 上编辑此页',
        lastUpdated: '更新时间',
    },
    plugins: [
        [
            'vuepress-plugin-helper-live2d', {
                // 是否开启控制台日志打印(default: false)
                log: false,
                live2d: {
                    // 是否启用(关闭请设置为false)(default: true)
                    enable: true,
                    // 模型名称(default: hibiki)>>>取值请参考：//z16 koharu unitychan
                    // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
                    model: 'z16',
                    display: {
                        position: "right", // 显示位置：left/right(default: 'right')
                        width: 135, // 模型的长度(default: 135)
                        height: 300, // 模型的高度(default: 300)
                        hOffset: 65, //  水平偏移(default: 65)
                        vOffset: 0, //  垂直偏移(default: 0)
                    },
                    mobile: {
                        show: false // 是否在移动设备上显示(default: false)
                    },
                    react: {
                        opacity: 0.8 // 模型透明度(default: 0.8)
                    }
                }
            }
        ],
        new WebpackBuildNotifierPlugin({
            title: "贪吃的猫得博客",
            logo: path.resolve("./favicon.png"),
            suppressSuccess: true, // don't spam success notifications
        })
    ],

}