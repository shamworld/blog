### 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.yourwebsite.com' > CNAME
git init
git add .
git commit -m '权限管理'

# 如果你想要部署到 https://USERNAME.github.io
git push -f https://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@github.com/shamworld/shamworld.github.io.git master

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages

cd -
git add .
git commit -m '权限管理'
git push