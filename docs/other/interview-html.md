---
title: 面试之html
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 面试
tags:
 - html
publish: true
---

##  src和href的区别
- src【source】表示对资源的引用，它指向的内容会嵌入所在位置，比如script，当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，所以script一般放页面底部【图片不会阻塞JS执行】
- href【Hypertext Reference】表示，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加link href="common.css" rel="stylesheet" 那么浏览器会识别该文档为 css 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式来加载 css ，而不是使用 @import 方式

## HTML生命周期
1. DOMContentLoaded，浏览器已经完全加载了 HTML，DOM 树已经构建完毕，但是像是img和样式表等外部资源可能并没有下载完毕；
2. load，浏览器已经加载了所有的资源（图像，样式表等）；
3. beforeunload/unload，当用户离开页面的时候触发；
4. readyState，描述document的loading状态；
    - loading 加载：document仍在加载。
    - interactive 互动 ： 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
    - complete ：文档和所有子资源已完成加载。状态表示 load 事件即将被触发。

