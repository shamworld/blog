/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-08-08 18:22:47
 * @LastEditors: Roy
 * @LastEditTime: 2021-08-13 14:48:27
 * @Deprecated: 否
 * @FilePath: /my_blog/docs/.vuepress/nav.js
 */
// blog
const note = {
    text: '博客',
    link: '/note/'
}

// 算法
const algorithm = {
    text: '算法',
    items: [
        {
            text: '每日',
            link: 'https://github.com/Royxc/my_blog/tree/master/docs/every',
        },
        {
            text: 'LeetCode',
            link: 'https://github.com/Royxc/my_blog/tree/master/docs/LeetCode',
        }
    ]
}

const arithmetic = {
    text: '算法',
    link: '/arithmetic/'
}

const react = {
    text: 'react',
    link: '/react/'
}

// more
// const more = {
//     text: '了解更多',
//     ariaLabel: '菜单',
//     items: [
//         {
//             text: '转载',
//             link: '/blog/',
//         }
//     ]
// }

module.exports = [
    note,
    react,
    // arithmetic,
    // algorithm,
    // more
]