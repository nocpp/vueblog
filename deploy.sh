#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# 进入生成的构建文件夹
cd docs/.vuepress/dist

# 如果你是要部署到自定义域名
# echo 'qiuxd.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:nocpp/nocpp.github.io.git main

# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:nocpp/vueblog.git master:gh-pages

cd -