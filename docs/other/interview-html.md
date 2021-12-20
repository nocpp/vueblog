---
title: 面试之html
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 杂项
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
- mark 高亮的引用文字
- progress

## iframe 框架有那些优缺点？
### 优点
- 展现出嵌入的网页
- 常用于网站后台管理，可以复用菜单栏，导航栏，头部代码
- 可以用来展示第三方广告之类的
### 缺点
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
<meta http-equiv="refresh" content="0;url=" />
<meta http-equiv="x-dns-prefetch-control" content="on" />
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
2. 然后再创建一个cache.manifest文件，它的书写方式如下
- CACHE:（必须） 标识出哪些文件需要缓存，可以是相对路径也可以是绝对路径。
- NETWORK:（可选）这一部分是要绕过缓存直接读取的文件，可以使用通配符＊。
- FALLBACK:（可选）指定了一个后备页面，当资源无法访问时，浏览器会使用该页面。
```html
CACHE MANIFEST
#v0.11

CACHE:
js/app.js
css/style.css

NETWORK:
resourse/logo.png

FALLBACK:
*.html /404.html
```

## 页面可见性（Page Visibility）API 可以有哪些用途？
作用
> 动画，视频，音频等耗费资源的都可以在页面显示时打开，在页面隐藏时关闭

```js
document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    document.title = "hidden";
  } else {
    document.title = "visibile";
  }
});
```

## script标签中defer和async的区别
共同点：
- 都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析
不同点：
- 执行顺序不同,async【谁先加载完谁执行，不是按书写顺序执行】,defer【按书写顺序执行】
- 执行时机不同,async【加载完就执行】,defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前执行

## HTML生命周期
1. DOMContentLoaded，浏览器已经完全加载了 HTML，DOM 树已经构建完毕，但是像是img和样式表等外部资源可能并没有下载完毕；
2. load，浏览器已经加载了所有的资源（图像，样式表等）；
3. beforeunload/unload，当用户离开页面的时候触发；
4. readyState，描述document的loading状态；
    - loading 加载：document仍在加载。
    - interactive 互动 ： 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
    - complete ：文档和所有子资源已完成加载。状态表示 load 事件即将被触发。

## html 常见兼容性问题？
1. IE6中双边距Bug
- 发生场合：当给父元素内第一个浮动元素设置margin-left(元素float:left)或margin-right(元素float:right)时margin加倍。  
- 解决方法：是给浮动元素加上display:inline;CSS属性;或者用padding-left代替margin-left。
2. 3 像素问题
- img标签渲染之后下方会出现几个像素（我用谷歌测试是4px, 火狐3.5px）的空白；
- img是行内元素，默认display：inline; 它与文本的默认行为类似，下边缘是与基线对齐，而不是贴紧容器下边缘，所以会有几像素的空白；
- 解决办法，把img设置为display: block;
3. 超链接 hover 点击后失效，解决办法: 使用正确的书写顺序 link visited hover active
4. ie7 z-index 失效问题，解决办法: 给父级添加 position: relative;和 z-index
5. 大家所说的IE6不支持png透明：这里所说的png的格式是png-24，png-8是让IE6支持的，或者使用gif 图片
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
10. 不同浏览器的标签默认的margin和padding不一样。  
```css
*{margin:0;padding:0;}
```
11. 设置较小高度标签（一般小于10px），在IE6，IE7中高度超出自己设置高度。hack：给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。
12. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

##  渐进增强和优雅降级之间的区别
- 渐进增强：主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验。
- 优雅降级：一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

## 说一下 HTML5 drag API
- dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。
- darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
- dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
- dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。
- dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
- drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
- dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。

## localStorage 和 sessionStorage 和 cookie的区别
- cookie 是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）
- cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递（优化点）
- sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存
- cookie 数据大小不能超过4k
- sessionStorage 和 localStorage 通常限制为5M
- localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
- sessionStorage 数据在当前浏览器窗口关闭后自动删除
- cookie 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭

## 参考其它的资料
- [html常见面试题及答案](https://blog.csdn.net/weixin_45102270/article/details/113064446)
- [掘金300题](https://juejin.cn/post/6914831351271292936#heading-1)
- [掘金2021Html篇](https://juejin.cn/post/6905294475539513352#heading-12)