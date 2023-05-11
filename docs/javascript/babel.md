---
title: Babel
date: '2022-12-05'
sidebar: 'auto'
categories:
 - typescript
tags:
 - babel
publish: true
---

## Banbel
相当于中介，把新出的代码转译为浏览器支持的版本代码，比如ES6转ES5
	
## Babel远离
利用AST，把代码转译为ES5

## 架构
- babel/core
babel核心功能都在这里
- babel/cli
cli工具，使得我们可以使用命令行运行npm run build
- babel/preset-env
预置功能，就是一段段代码，使用插件式，把高版本代码替换成兼容的的代码