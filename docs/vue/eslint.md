---
title: Vue Eslint
date: '2022-12-08'
sidebar: 'auto'
categories:
 - vue
tags:
 - eslint
publish: true
---

## vue eslint 使用
### 配置方法
- [eslint](https://www.jianshu.com/p/4b94540dd998)
- 下载eslint
- 运行eslint -init，然后选择就可以了

### 安装依赖
```shell
npm install --save-dev eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint eslint-plugin-vue babel-eslint eslint-plugin-html vite-plugin-eslint
npm install -D @vue/eslint-config-standard    
```

### 配置.eslintignore
```js
src/assets/css
src/assets/js
src/assets/fonts
/public

.DS_Store
node_modules
/dist
/lib/assets
*.min.*


# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```