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

## 简述一下你对 HTML 语义化的理解？
1. 用正确的标签做正确的事
2. html语义化可以让页面的内容结构化，结构更清晰
3. 有利于SEO
4. 有利于开发人员维护
### H5新增的语义标签
- header
- footer
- nav
- section
- article
- aside
- figure, figcaption 用作文档中插图
```html
<figure> 
<img src="" alt="">
<figcaption>这是一张图片</figcaption>
</figure>
```
- mark
- progress 高亮的引用文字

## iframe 框架有那些优缺点？
优点
- 展现出嵌入的网页
- 常用于网站后台管理，可以复用菜单栏，导航栏，头部代码
- 可以用来展示第三方广告之类的
缺点
- 可能会出现滚动条
- 会阻塞主页面load事件
- 不利于SEO
- 和主页面共享连接池，会影响页面并行加载

## 说说常用的meta标签
```html
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="author" content="author,email address">
<meta name="Description" content=""/>
<meta name="Keywords" content=""/>
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<meta name="robots" content="index,follow">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="format-detection" content="telphone=no, email=no" />
```

## DOCTYPE的作用
1. 告诉浏览器使用哪种HTML或者XHTML规范
2. 告诉浏览器按照何种规范解析页，如果不写，就会以怪异模式来解析页面
3. HTML5为什么只需要写 !DOCTYPE HTML？
因为HTML5不基于SGML，所以不需要引用DTD，而HTML4.01基于SGML，所以需要引用

##  src和href的区别
- src 用于引用资源，替换当前元素
src 表示引用资源，替换当前元素，用在 img，script，iframe 上，src 是页面内容不可缺少的一部分。当浏览器解析到 src ，会暂停其他资源的下载和处理（图片不会暂停其他资源下载和处理），直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。
- href 用于在当前文档和引用资源之间确立联系
href 标识超文本引用，用在 link 和 a 等元素上，href 是引用和页面关联，是在当前元素和引用资源之间建立联系。若在文档中添加 href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。

## Html5 的离线储存资源进行管理和加载
1. 在头部加一个 manifest 
```html
<!DOCTYPE html>
<html manifest="cache.manifest">
  ...
</html>

```
2. 然后 cache.manifest 文件的书写方式如下
```html
CACHE MANIFEST
#v0.11

CACHE:

js/app.js
css/style.css

NETWORK:
resourse/logo.png

FALLBACK:
/ /offline.html
```

## 页面可见性（Page Visibility）API 可以有哪些用途？
作用
> 动画，视频，音频都可以在页面显示时打开，在页面隐藏时关闭

```js
document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    document.title = "hidden";
  } else {
    document.title = "visibile";
  }
});
```


## HTML生命周期
1. DOMContentLoaded，浏览器已经完全加载了 HTML，DOM 树已经构建完毕，但是像是img和样式表等外部资源可能并没有下载完毕；
2. load，浏览器已经加载了所有的资源（图像，样式表等）；
3. beforeunload/unload，当用户离开页面的时候触发；
4. readyState，描述document的loading状态；
    - loading 加载：document仍在加载。
    - interactive 互动 ： 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
    - complete ：文档和所有子资源已完成加载。状态表示 load 事件即将被触发。

## html 常见兼容性问题？
1. IE6中双边距Bug，float 引起的，解决办法: 使用 display解决
- 发生场合：当给父元素内第一个浮动元素设置margin-left(元素float:left)或margin-right(元素float:right)时margin加倍。  
- 解决方法：是给浮动元素加上display:inline;CSS属性;或者用padding-left代替margin-left。
2. 3 像素问题
- img标签渲染之后下方会出现几个像素（我用谷歌测试是4px, 火狐3.5px）的空白；
- img是行内元素，默认display：inline; 它与文本的默认行为类似，下边缘是与基线对齐，而不是贴紧容器下边缘，所以会有几像素的空白；
- 解决办法，把img设置为display: block;
3. 超链接 hover 点击后失效，解决办法: 使用正确的书写顺序 link visited hover active
4. ie7 z-index 问题，解决办法: 给父级添加 position: relative;和 z-index
5. 大家所说的IE6不支持png透明：这里所说的png的格式是png-24，png-8是让IE6支持的。或者使用gif 图片
6. IE6 不支持 Min-height 最小高度 ，解决办法: 
```css
.box{
	min-height:775px;
	height: 775px;
	height: auto !important;
	background:url(../min-hight.jpg) no-repeat 0 0;
}
```
7. select 在 ie6 下遮盖，解决办法: 利用iframe来遮挡select，再用div来遮挡iframe
8. 为什么没有办法定义 1px 左右的宽度容器，解决办法: （IE6 默认的行高造成的，使用 over:hidden,zoom:0.08 line-height:1px）
9. IE5-8 不支持 opacity，解决办法
```css
.opacity {
  opacity: 0.4;
  filter: alpha(opacity=60); /_ for IE5-7 _/
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; /_ for IE 8_/
}
```