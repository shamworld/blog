# Jenkins

## Jenkins做什么的？
Jenkins是一个开源自动化服务器，可用于轻松设置持续集成和持续交付(CI/CD)管道。Jenkins可以作为独立应用程序安装，也可以作为JavaScript servlet容器,也可以作为Docker容器运行。

持续集成（CI）是DevOps的一种实践，其中团队成员定期将其代码更改提交到版本控制存储库，然后运行自动构建和测试。持续交付（CD）是一系列实践，其中代码更改会自动生成，测试并部署到生产中。

## 安装Java(以下都是Ubuntu上操作)
```js
sudo apt update
sudo apt install openjdk-11-jdk
```
安装完成后，通过检查Java版本进行验证:
```js
java -version
```

## 安装Jenkins
在Ubuntu上安装Jenkins相对简单。我们将启用Jenkins APT存储库，导入存储库GPG密钥，并安装Jenkins软件包。

使用以下wget命令导入Jenkins存储库的GPG密钥：
```js
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
```

接下来，使用以下命令将Jenkins存储库添加到系统中：
```js
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
```

启用Jenkins存储库后，更新apt软件包列表并通过键入以下命令安装最新版本的Jenkins：
```js
sudo apt update
sudo apt install jenkins
```

如果收到错误消息，提示：
```js
Error: W: GPG error: https://pkg.jenkins.io/debian-stable binary/ Release: The following signatures couldn’t be verified because the public key is not available: NO_PUBKEY 9B7D32F2D50582E6"
```

通过以下方式导入密钥：
```js
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 9B7D32F2D50582E6
```

安装过程完成后，Jenkins服务将自动启动。可以通过打印服务状态来验证它：
```js
systemctl status jenkins
```

应该会看到以下内容：
```js
● jenkins.service - LSB: Start Jenkins at boot time
  Loaded: loaded (/etc/init.d/jenkins; bad; vendor preset: enabled)
  Active:active (exited) since Thu 2021-01-05 16:51:13 UTC; 2min 7s ago
    Docs: man:systemd-sysv-generator(8)
```

## 设置Jenkins
要建立新的Jenkins的安装，打开浏览器，输入您的域名或IP地址，后跟端口8080，http://your_ip_or_domain:8080。

将显示类似于以下内容的页面，提示您输入在安装过程中创建的管理员密码：

![](/modular/20210402150521483.png)

用于cat在终端上显示密码：
```js
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

应该看到一个32个字符长的字母数字密码，如下所示：
```js
06cbf25d811a424bb236c76fd6e04c47
```

从终端复制密码，将其粘贴到“管理员密码”字段中，然后单击“继续”。

在下一个屏幕上，安装向导将询问您是要安装建议的插件还是要选择特定的插件。

![](/modular/1609863482744.jpg)

单击“安装建议的插件”框，安装过程将立即开始。

![](/modular/1609863544489.jpg)

安装插件后，系统将提示您设置第一个管理员用户。填写所有必需的信息，然后单击“保存并继续”。

![](/modular/0190402150701948.png)

一旦第一个管理员用户到位，你应该看到一个“Jenkins准备好了！” 确认屏幕。
![](/modular/20190402150722233.png)

点击“开始使用Jenkins”来访问主要的Jenkins仪表板：
![](/modular/1609863772295.jpg)

重启Jenkins
```js
sudo systemctl restart jenkins
```
