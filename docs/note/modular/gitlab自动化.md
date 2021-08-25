# gitlab自动化

## Gitlab
Gitlab是一个开源的版本管理系统，实现一个自托管的Git项目仓库，可通过Web界面进行访问公开的或者私人项目。它拥有与Github类似的功能，能够浏览源码，管理缺陷和注释，可以管理团队对仓库的访问，它非常易于浏览提交的版本并提供一个文件历史库。团队成员可以利用内置的简单的聊天程序进行交流。它还提供一个代码片段收集功能可以实现代码复用。

GitLab对于系统性能有要求，所以我们需要将克隆出来的虚拟机的内存提高到至少2G以上。


### Gitlab安装
方法一:
```js
sudo docker run --detach \
  --hostname localhost \
  --publish 443:443 --publish 8084:8084 --publish 222:22 \
  --name gitlab \
  --restart always \
  --volume /home/docker/gitlab/config:/etc/gitlab \
  --volume /home/docker/gitlab/logs:/var/log/gitlab \
  --volume /home/docker/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```
localhost:主机名,即虚拟机的ip,8084可以自己定义端口号,restart重启方式,volume目录挂载,gitlab/gitlab-ce:latest镜像名。

方法二:
```js
docker pull twang2218/gitlab-ce-zh
```
等待其拉取，然后在 /home下新建docker目录，再在其下新建gitlab目录，进入gitlab目录，在当前目录下新建docker-compose.yml配置文件，编写内容如下。
```js
version: '3'
services:
   web:
     image: 'twang2218/gitlab-ce-zh'   #gitlab镜像
     restart: always
     privileged: true  #权限
     hostname: ''       #主机名,即虚拟机的ip
     environment:
        TZ: 'Asia/Shanghai'
        GITLAB_OMNIBUS_CONFIG: |
            external_url '' #主机名,即虚拟机的ip
            gitlab_rails['gitlab_shell_ssh_port'] = 2222
            unicorn['port'] = 8888
            nginx['listen_port'] = 8084
     ports:
        - '8084:8084'
        - '8443:443'
        - '2222:22'
     volumes:
        - './config:/etc/gitlab'
        - './logs:/var/log/gitlab'
        - './data:/var/opt/gitlab'
```

执行`docker-compose up`，然后进入等待时间，等它下好了去通过自己设置的虚拟机的ip和端口号访问。


![](/modular/1622287438766a.jpg)


如果安装过程中有报错权限问题，那么加上`privileged: true`

查看方式:
```js
root@iZm5ebvlfc3n55vzckl9ifZ:# docker ps
CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS                 PORTS                                                                         NAMES
ddc7d0e214ef        twang2218/gitlab-ce-zh        "/assets/wrapper"        30 hours ago        Up 6 hours (healthy)   80/tcp, 0.0.0.0:8084->8084/tcp, 0.0.0.0:2222->22/tcp, 0.0.0.0:8443->443/tcp   gitlab_web_1

```

通过虚拟主机的ip+端口访问，此时需要设置管理员密码，账号为root，密码最少为8位。

登录成功后，如下:

![](/modular/1622288085865b.jpg)

### 项目创建
点击 `+` 号 --> `新建项目`

![](/modular/7986413-d97bf80a83e45895c.webp)

输入项目名称及描述信息，设置可见等级：私有，内部，公开。

![](/modular/1622288467482d.jpg)

#### 初始化项目
我们可以选择通过增加一个README的方式来初始化项目,如下:

![](/modular/1622288978567e.jpg)


![](/modular/7986413-38bb77b9e693be70f.png)

创建项目的时候有一个问题，在自己最开始定义了端口号，创建项目的时候会没有端口号，这时候clone项目的时候会访问不了，这时候我们在最开始安装定义目录里面config目录下找到`gitlab.rb`,编辑它，搜索`external_url`，没有就添加`external_url:主机ip+端口号`，有就修改就行了。这时候我们就可以去克隆项目了。当然我们也可以通过下面方法去把项目推送到gitlab上面:


![](/modular/1622298003116g.jpg)

![](/modular/1622289009680h.jpg)


## Gitlab-Runner

### 安装
```js
sudo docker run -d --name gitlab-runner --restart always \
  -v /home/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest
```
映射`/var/run/docker.sock`这个文件是为了让容器可以通过`/var/run/docker.sock`与`Docker`守护进程通信，管理其他`Docker`容器
`-v /home/gitlab-runner/config:/etc/gitlab-runner`是将runner的配置文件映射到宿主机`/home/gitlab-runner/config`方便调整和查看配置

安装完成我们需要去注册Gitlab-Runner。

运行`docker ps`查看:
```js
root@iZm5ebvlfc3n55vzckl9ifZ:/home/docker/gitlab# docker ps
CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS                 PORTS                                                                         NAMES
ed6c7a038263        gitlab/gitlab-runner:latest   "/usr/bin/dumb-init …"   24 hours ago        Up 24 hours                                                                                          gitlab-runner
ddc7d0e214ef        twang2218/gitlab-ce-zh        "/assets/wrapper"        30 hours ago        Up 6 hours (healthy)   80/tcp, 0.0.0.0:8084->8084/tcp, 0.0.0.0:2222->22/tcp, 0.0.0.0:8443->443/tcp   gitlab_web_1

```

### 注册
```js
docker run --rm -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "" \
  --registration-token "" \
  --description "first-register-runner" \
  --tag-list "vue3-app" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"
```
注册需要输出url，token，描述，tag，执行器等，url和token怎么来的呢?在设置->CI/CD->Runner里面，我这里面注册了一个专用的和共享的Runner，正常情况我们用专用Runner就可以了。共享版Runner是登录root账户在头部小扳手图片里面的Runner得到url和token，然后去注册。这里面的tag值会在编写`.gitlab-ci.yml`时用到。

![](/modular/1622298841818i.jpg)

### 运行流水线
在项目根目录里面创建一个`.gitlab-ci.yml`，编写代码如下:
```js
image: node:alpine

stages: # 分段
  - install
  - eslint
  - build
  - deploy

cache: # 缓存
  paths:
    - node_modules

job_install:
  tags:
    - vue3-app
  stage: install
  script:
    - npm install

job_build:
  tags:
    - vue3-app
  stage: build
  script:
    - npm run build
```
参数说明:
- stages:pipeline的阶段列表，定义整个pipeline阶段
- stage:定义某个job的所在阶段
- image:指定一个基础Docker进行作为基础运行环境，比如:node,python,java
- tags:用于指定Runner，tags的取值范围是在该项目可惜可见的runner tags中，也就是前面我们设置的那个tag
- only/except:知道当前任务条件
- when:实现在发生故障时仍能运行的作业
- cache:讲当前工作环境目录中的一些文件，文件夹存储起来，用于在各个任务初始化的时候恢复
- environment:指定部署相关任务的环境，并非真实环境，是对要部署到某环境的任务的归类。方便在gitlab上聚合以便进行回滚和重新部署操作
- artifacts:保留文档。在每次 job 之前runner会清除未被 git 跟踪的文件。为了让编译或其他操作后的产物可以留存到后续使用，添加该参数并设置保留的目录，保留时间等。被保留的文件将被上传到gitlab以备后续使用。
- dependencies:任务依赖。指定job的前置job。添加该参数后，可以获取到前置job的artifacts。注意如果前置 job 执行失败，导致没能生成artifacts，则 job 也会直接失败。

编写好上面代码后推送到gitlab后就会自己执行里面的语句:

![](/modular/1622299460821j.jpg)

### 部署
在项目中创建一个`Dockerfile`，代码如下:
```js
FROM node:latest as builder
WORKDIR /app
COPY  package.json
RUN npm install --registry=http://registry.npm.taobao.org
COPY ..
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
```
`.gitlab-ci.yml`修改如下:
```js
image: node:alpine

stages: # 分段
  - install
  - eslint
  - build
  - deploy

cache: # 缓存
  paths:
    - node_modules

job_install:
  tags:
    - vue3-app
  stage: install
  script:
    - npm install

job_build:
  tags:
    - vue3-app
  stage: build
  script:
    - npm run build

job_deploy:
    image: docker
    stage: deploy
    script:
      - docker build -t appimages
      - if [ $(docker ps -aq --filter name=app-container) ]; then docker rm -f app-container;fi
      - docker run -d -p 8082:80 --name app-container appimages
```
if语句判断:使用docker命令去搜索docker容器里面是否有一个name为`app-container`的容器，如果有就销毁掉,销毁掉是为了使用新的容器重新运行。

这里`image:docker`不写的话会报错:

![](/modular/1622301667720k.jpg)

代码推送后，流水线工作，到第三步就会出下报错:

![](/modular/1622301866992l.jpg)


![](/modular/1622301814039m.jpg)

解决办法,在runner配置文件中配置docker命令:
```js
"/usr/bin/docker:/usr/bin/docker", "/var/run/docker.sock:/var/run/docker.sock"
```
在gitlab-runner->config-vim config.toml，找到注册runner所对应的token，在volumes数组里面加入上面命令:

```js
concurrent = 1
check_interval = 0

[session_server]
  session_timeout = 1800
  
[[runners]]
  name = "first-register-runner"
  url = ""
  token = ""
  executor = "docker"
  [runners.custom_build_dir]
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
  [runners.docker]
    tls_verify = false
    image = "alpine:latest"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache","/usr/bin/docker:/usr/bin/docker", "/var/run/docker.sock:/var/run/docker.sock"]
    shm_size = 0
```

我们在去重新运行失败的Jobs，这时候发现成功了:

![](/modular/1622302501014n.jpg)

然后通过前面注册的端口号去访问，可以正常访问项目。

















