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
- src【source】表示对资源的引用，它指向的内容会嵌入所在位置，比如img,iframe,script，当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，所以script一般放页面底部
- href【Hypertext Reference】表示，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加link href="common.css" rel="stylesheet" 那么浏览器会识别该文档为 css 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式来加载 css ，而不是使用 @import 方式