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
git commit -m 'react基础'

# 如果你想要部署到 https://USERNAME.github.io
git push -f https://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@github.com/shamworld/shamworld.github.io.git master
# git push -f https://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@github.com/shamworld/blog.git master:gh-pages

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages

cd -
git add .
git commit -m 'react基础'
git push