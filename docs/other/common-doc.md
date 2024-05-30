---
title: 常用文档
date: '2021-12-19'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - 文档
publish: true
---

## React文档
- [英文](https://reactjs.org/)
- [中文](https://zh-hans.reactjs.org/)


## 一些常用第三方组件
### React
-  React Transition Group 过渡
-  React Motion 动画库
-  React Spring 动画

## UmiJS配置代理
```js
    proxy: {
        '/api/h': {
            'target': 'http://192.168.1.90:8080',
            'changeOrigin': true,
            'pathRewrite': { '^/api/h': '' },
        },
        '/api': {
            'target': 'http://corp-api-dev.z023.cn:9020/api',
            'changeOrigin': true,
            'pathRewrite': { '^/api': '' },
        }
    },
```


## VSCode常用快捷键
- ctrl + p 搜索文件名
- F8 快速跳转错误的地方