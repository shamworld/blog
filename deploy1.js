/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-01-09 15:35:07
 * @LastEditors: Roy
 * @LastEditTime: 2021-08-25 18:39:40
 * @Deprecated: 否
 * @FilePath: /my_blog/deploy1.js
 */
const shelljs = require('shelljs');
const Rsync = require('rsync');//数据同步
const path = require('path');
const argv = require('yargs').argv;//能够方便的处理命令行参数
const chokidar = require('chokidar');

const [
    targetName,
] = argv._;

const host_map = {
    dev: 'root@xxx:/var/www/test',
    prod: 'root@xxx:/var/www/my_blog',
}
// 用法node deploy.js dev
if (!host_map[targetName]) {
    shelljs.echo('error:主机没找到.');
    shelljs.exit(1);
}

// 通知 开始构建



// 安装依赖
// if (shelljs.exec('npm i').code!==0) {
//     shelljs.echo('error:npm install error.');
//     shelljs.exit(1);
// }
// console.log('开始测试');
// // 测试
// if (shelljs.exec('npm run dev').code!==0) {
//     shelljs.echo('error:npm run dev error.');
//     shelljs.exit(1);
// }
// console.log('开始打包');
// 打包
// if (shelljs.exec('npm run build').code!==0) {
//     shelljs.echo('error:npm run build error.');
//     shelljs.exit(1);
// }

// console.log('开始部署');
// // // 部署
// const rsync = Rsync.build({
//     source: path.join(__dirname, '../','/*'),
//     destination:host_map[targetName],
//     flags:'avz',
//     shell:'ssh'
// });

// rsync.execute((err,code,cmd)=>{
//     console.log(err,code,cmd);
//     console.log('部署完成');
// });

//先执行一次部署仔写下面得自动上传服务器，因为需要先把完整代码丢到服务器，然后关闭自动部署，在执行下面得
//如果只需要打包dist 这不需要下面语句
//修改文件自动上传服务器
const from = "./\\*"
const to = host_map.dev;
const password = "";

const expectPath = path.join(__dirname, './expact.exp');

const watcher = chokidar.watch(process.cwd());
watcher.on('change', function (filePath) {
    console.log(filePath);
    shelljs.exec(`expect ${expectPath} ${filePath} ${to} ${password}`);
});


// shelljs.exec(`scp ${from} ${to}`);



