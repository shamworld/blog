# Sonar简单使用

## Linux安装java jdk
这个在Jenkins里面已经安装过了。

## Linux 安装 sonarqube
去[官网](https://www.sonarqube.org/downloads/)下载安装包。

在linux服务器上新建一个opt目录，然后把下载好的sonarqube安装包放进去，执行:
```js
unzip sonarqube-8.4.zip
```

- bin目录存放的事各个环境的启动脚本
- conf目录存放sonarqube的配置文件
- logs目录存放着启动和运行时的日志文件

我们进入bin目录下环境启动脚本，根据自己linux环境来:
```js
cd liunx-86x-64/
```

该目录下`sonar.sh`是可执行文件

在启动前先使用chown命令将sonarqube及其子目录授权给一个非root的用户，sonarqube及其es等软件禁止root账户启动，因此需要切换一个非root账户，授权的用户需要有bin目录及其子目录的读取和可执行的权限

### 添加用户
```js
useradd sonar
```

### 设置密码
```js
passwd sonar
```

### 把文件夹的授权给某一个用户
先在cd到服务器根目录
```js
chown -R sonar:sonar /opt/sonarqube-8.4
```
### 切换用户
```js
su sonar
```
### 启动sonar
cd到sonar.sh目录
```js
./sonar.sh start
```
### 查看sonar 是否启动
```js
ss -ntpl | grep 9000
```
![](/modular/1609927936959.jpg)

>注意:这里有坑

如果`ss -ntpl | grep 9000`没有显示就要去logs目录下查看`sonar.log`文件，看它到底报什么错误。

我最开始sonar安装的是8.4的版本，然后由于安装jenkins的时候默认安装的java jdk是1.8版本，所以这个地方报错版本过低，必须要jdk11及其以上才行，后来下了一个jdk11包丢在opt目录下解压后，给了sonar访问jdk11权限后，修改sonarqube下面conf文件里面的wrapper.conf，把`wrapper.java.command=java`默认目录改成了`wrapper.java.command=/opt/jdk-11/bin/java`后到`bin/linux-x86-64`下执行`./sonar.sh start`提示我启动失败，查看日志:
```js
--> Wrapper Started as Daemon
Launching a JVM...
Unable to start JVM: Permission denied (13)
JVM exited while loading the application.
JVM Restarts disabled.  Shutting down.
<-- Wrapper Stopped
```

然后又捣鼓了很久，换了sonarqube版本，java jdk 15版本等等发现了新问题:
```js
2021.01.06 11:23:51 INFO  app[][o.s.a.AppFileSystem] Cleaning or creating temp directory /opt/sonarqube-8.6/temp
2021.01.06 11:23:51 INFO  app[][o.s.a.es.EsSettings] Elasticsearch listening on /127.0.0.1:9001
2021.01.06 11:23:51 INFO  app[][o.s.a.ProcessLauncherImpl] Launch process[[key='es', ipcIndex=1, logFilenamePrefix=es]] from [/opt/sonarqube-8.6/elasticsearch]: /opt/sonarqube-8.6/elasticsearch/bin/elasticsearch
2021.01.06 11:23:51 INFO  app[][o.s.a.SchedulerImpl] Waiting for Elasticsearch to be up and running
Unrecognized VM option 'UseConcMarkSweepGC'
Error: Could not create the Java Virtual Machine.
```
这个是权限问题，给了权限也是不行，后来找来后台大佬来帮我搞权限问题才解决。

## 访问服务器ip+9000端口
点击登录进入，默认账户，密码都是 **admin**

安装中文插件 **chinese**

![](/modular/sonar_chinese.png)

### sonarqube 账号 token 的生成
sonarqube支持生成用户token，以便在命令行或者脚本中使用token代表账号操作sonarqubue，避免造成账号密码的泄露。 点击sonarqube首页右上角头像，进入我的账号

![](/modular/sonar_token.png)

### 检测前端代码
- 创建一个项目如test_01
- 生成token，生成token时会要求输入一个密钥，如果不输入的话直接使用项目名，安全起见，输入一个随机字符串
- 选择语言，进行构建即可。然后需要额外下载sonar-scanner。

### sonar-scanner配置
下载sonar-scanner到本地并配置环境变量

MACOS下:
```js
vim ~/.bash_profile
export sonar = 'sonar-scanner目录'/bin
export PATH=$PATH:${sonar}
source ~/.bash_profile
```

查看sonar-scanner版本
```js
sonar-scanner -v
```

## 测试代码
如果我们要检查项目的代码，那么在项目根目录下 新建 sonar-project.properties,填入一下信息，该信息在配置token的时候都会给你直接复制过来:
```js
sonar.host.url=

#----- Default source code encoding
 sonar.sourceEncoding=UTF-8
 sonar.source=.
 sonar.projectKey=test_01
 sonar.login=
```

在项目终端执行
```js
sonar-scanner
```

![](/modular/sonar-scanner.png)

然后就是等待中。。。

![](/modular/sonar-wait.png)

最后我们查看网站的代码检查报表

![](/modular/sonar-scanner.png)


