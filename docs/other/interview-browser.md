---
title: 浏览器相关
date: '2021-12-20'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - 浏览器
publish: true
---

## 浏览器内核
主要分两个部分：渲染引擎、js引擎

### 渲染引擎：
负责取得网页的内容（html css img ...），以及计算网页的显示方式，然后会输出至显示器或者打印机。浏览器的内核不同对于网页的语法解释也不同，所以渲染的效果也不一样

### js引擎：
解析和执行javascript 来实现网页的动态效果，最开始渲染引擎和js引擎并没有区分的很明确，后来js引擎越来越独立，内核就倾向于只指渲染引擎

### 常见浏览器内核
- IE : trident 内核
- Firefox : gecko 内核
- Safari : webkit 内核
- Opera : 以前是 presto 内核， Opera 现已改用Google - Chrome 的 Blink 内核
- Chrome: Blink (基于 webkit的精简版 ，Google与Opera Software共同开发)