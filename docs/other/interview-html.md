---
title: html常见知识
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
- 常用于网站后台框架，内容区域使用iframe，然后可以共用导航栏，侧边菜单栏
- 插入第三方广告很方便
### 缺点
- 可能会出现滚动条
- 会阻塞主页面load事件
- 不利于SEO
- 和主页面共享连接池，会影响页面并行加载

## 说说常用的meta标签
> httpEquiv 属性把 content 属性连接到 HTTP 头部, 也就是http响应头
- name，content组成
- http-equiv，content组成
- charset组成
```html
<meta name="author" content="author,email address">
<meta name="Description" content=""/>
<meta name="Keywords" content=""/>
<meta name="robots" content="index,follow">

<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />

<meta name="format-detection" content="telphone=no, email=no" />

<!-- 适配IE最新版本 -->
<meta http-equiv="x-ua-compatible" content="ie=edge">
<!-- 用在首页可以提升整站性能，且不会影响首页加载，火狐是并行的 -->
<meta http-equiv="x-dns-prefetch-control" content="on" />
<link rel="dns-prefetch" href="http://www.spreadfirefox.com/">

<!-- 可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输 -->
<meta http-equiv="expires" content="Wed, 20 Jun 2007 22:33:00 GMT" />
<!-- 是用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出 -->
<meta http-equiv="Pragma" content="no-cache">  
<!-- 清除缓存（再访问这个网站要重新下载！）  -->
<meta http-equiv="cache-control" content="no-cache">  

<!-- 自动刷新并重定向到新页面。  -->
<meta http-equiv="Refresh" content="2；URL=http://www.net.cn/">  
<!-- 每五秒刷新一次页面 -->
<meta http-equiv="refresh" content="5" />
<!-- 如果网页过期，那么存盘的cookie将被删除。  -->
<meta http-equiv="Set-Cookie" content="cookievalue=xxx;expires=Wednesday, 20-Jun-2007 22:33:00 GMT； path=/"> 
<!-- 设定页面使用的字符集。老写法   -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- 新写法 -->
<meta charset="utf-8">
```

## DOCTYPE的作用
1. 告诉浏览器使用哪种HTML或者XHTML规范
2. 告诉浏览器按照何种规范解析页，如果不写，就会以怪异模式来解析页面
3. HTML5为什么只需要写 !DOCTYPE HTML？
> 因为HTML5不基于SGML，所以不需要引用DTD，而HTML4.01基于SGML，所以需要引用

##  src和href的区别
- src 用于引用资源，替换当前元素
	+ src 表示引用资源，替换当前元素，用在 img，script，iframe 上，src 是页面内容不可缺少的一部分。当浏览器解析到 src ，会暂停其他资源的下载和处理（图片不会暂停其他资源下载和处理），直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。
- href 用于在当前文档和引用资源之间确立联系
	+ href 标识超文本引用，用在 link 和 a 等元素上，href 是引用和页面关联，是在当前元素和引用资源之间建立联系。若在文档中添加 link css href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。

## Html5 的离线储存资源进行管理和加载
1. 在html标签中加一个**manifest**属性，然后指向一个配置文件
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
```text
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
### 作用
> 动画，视频，音频等耗费资源的都可以在页面显示时打开，在页面隐藏时关闭
### 主要属性
- visibilitychange 事件
- document.hidden 属性

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
- 都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析
- 执行顺序不同,async【谁先加载完谁执行，不是按书写顺序执行】,defer【按书写顺序执行】
- 执行时机不同,async【加载完就执行】,defer脚本会在文档渲染完毕后，【DOMContentLoaded事件】调用前执行。
- module等同于defer，是浏览器加载ES6模块的方法
```html
<script type="module">
```
> defer脚本执行完了才会触发DOMContentLoaded事件

## HTML生命周期
1. DOMContentLoaded
	- 当HTML文档被_加载_和_解析_完成
	- DOMContentLoaded事件的触发时机为: HTML解析为DOM之后，如果有JS执行，要等到JS执行完毕之后
	- Rener Tree之前
	- 执行JS时会堵塞HTML解析
	- [详细参考](https://blog.csdn.net/zyj0209/article/details/79698430)
2. load，浏览器已经加载了所有的资源（图像，样式表等）；
3. beforeunload/unload，当用户离开页面的时候触发；
4. readyState，描述document的loading状态；
    - loading 加载：document仍在加载。
    - interactive 互动 ： 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
    - complete ：文档和所有子资源已完成加载。状态表示 load 事件即将被触发。

## 关于首屏时间
> “计算这个网页从空白到出现内容所花费的时间”。那怎么计算这段时间？这段时间其实就是HTML 文档加载和解析的时间。也就是DOMContentLoaded 事件触发之前所经历的时间。

## 浏览器如何缺点资源加载的优先级
- 对资源分类
- 确定安全策略
- 下载，图片默认为low，可视区域的图片为high
[优先级详解](https://blog.csdn.net/hbiao68/article/details/119871598)

## html 常见兼容性问题？
1. IE6中双边距Bug
- 发生场合：当给父元素内第一个浮动元素设置margin时margin长度会加倍（fl,ml或fr,mr）
- 解决方法：是给浮动元素加上display:inline，或者用padding代替margin
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
8. 为什么没有办法定义 1px 左右的高度容器，解决办法: （IE6 默认的行高造成的，使用 overflow:hidden,zoom:0.08 line-height:1px）
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
11. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

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

### 总结主要三点区别
1. 是否会自动发给服务器
2. 存储大小不同
3. 存储有效期不同

## 会话 cookie和持久性 cookie
- 如果 cookie 包含到期日期，则可视为持久性 cookie。 在指定的到期日期，cookie 将从磁盘中删除
- 如果 cookie 不包含到期日期，则可视为会话 cookie。 会话 cookie 存储在内存中，决不会写入磁盘。 当浏览器关闭时，cookie 将从此永久丢失

## Service Worker
Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。但是不管开多少个页面都只有一个Worker在负责管理
> 使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。

### 使用步骤
1. 注册 Service Worker
2. 监听到 install 事件
3. 拦截请求
4. 开启后，可与在开发者工具中Application面板中Service Workers面板看到。Cache 中也可以发现我们所需的文件已被缓存

### 示例代码
```js
// index.js
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function(registration) {
      console.log('service worker 注册成功')
    })
    .catch(function(err) {
      console.log('servcie worker 注册失败')
    })
}
// sw.js
// 监听 `install` 事件，回调中缓存所需文件
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll(['./index.html', './index.js'])
    })
  )
})

// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        return response
      }
      console.log('fetch source')
	  
	return fetch(event.request).then(
	  function(response) {
		// Check if we received a valid response
		if(!response || response.status !== 200 || response.type !== 'basic') {
		  return response;
		}

		// IMPORTANT: Clone the response. A response is a stream
		// and because we want the browser to consume the response
		// as well as the cache consuming the response, we need
		// to clone it so we have two streams.
		var responseToCache = response.clone();

		caches.open(CACHE_NAME)
		  .then(function(cache) {
			cache.put(event.request, responseToCache);
		  });

		return response;
	  }
	);
    })
  )
})
```

### 利用Service Worker实现PWA应用
Service Worker是谷歌发起的实现PWA（Progressive Web App）的一个关键角色，PWA是为了解决传统Web APP的缺点
> PWA（Progressive web apps）也既渐进式Web应用。它不是特指某一项技术，而是一种理念。一种运用多种技术来增强web app的功能，可以让网站的体验变得更好的理念。比如模拟一些原生功能，通知推送、请求拦截、桌面图标。
**传统PWA的缺点**
1. 没有桌面入口
2. 无法离线使用
3. 没有Push推送

> PWA 桌面入口解决办法，使用Maifest.json文件配置
- 然后给页面添加一个link
```html
<link rel="manifest" href="/html/app-manifest/manifest.json">
```
- 以下是manifest.json
```json
{
  "short_name": "人人FED",
  "name": "人人网FED，专注于前端技术",
  "icons": [
    {
      "src": "/html/app-manifest/logo_48.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "/html/app-manifest/logo_96.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "/html/app-manifest/logo_192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/html/app-manifest/logo_512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/?launcher=true",
  "display": "standalone",
  "background_color": "#287fc5",
  "theme_color": "#fff"
}
```
> 把start_url指向的页面用Service Worker缓存起来，这样当用户用Chrome浏览器打开这个网页的时候，Chrome就会在底部弹一个提示，询问用户是否把这个网页添加到桌面，如果点“添加”就会生成一个桌面图标，从这个图标点进去就像打开一个App一样。

## WebWorker
> JS是单线程，无法充分发挥多核CPU的能力。WebWorker为JS创造了多线程环境，允许主线程创建Worker线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。
### Web Worker 有以下几个使用注意点
- 同源限制
- DOM 限制
- 通信联系
- 脚本限制
- 文件限制

### 基本用法
```js
//主线程执行代码
var worker = new Worker('work.js');//这个脚本必须来自网络
//发送参数
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});
//接收消息
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
  doSomething();
}

function doSomething() {
  // 执行任务
  worker.postMessage('Work done!');
}
//关闭
worker.terminate();

//捕获异常
worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});

// 或者
worker.addEventListener('error', function (event) {
  // ...
});
```

```js
//Worker代码
self.addEventListener('message', function (e) {
  self.postMessage('You said: ' + e.data);
}, false);

//上面代码中，self代表子线程自身，即子线程的全局对象。因此，等同于下面两种写法。
// 写法一
this.addEventListener('message', function (e) {
  this.postMessage('You said: ' + e.data);
}, false);

// 写法二
addEventListener('message', function (e) {
  postMessage('You said: ' + e.data);
}, false);

self.addEventListener('message', function (e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);
//上面代码中，self.close()用于在 Worker 内部关闭自身。
```

### Worker 加载脚本
```js
importScripts('script1.js');
importScripts('script1.js', 'script2.js');//加载多个
```

### 参考
[WebWorker详解](https://www.ruanyifeng.com/blog/2018/07/web-worker.html)

## MessageChannel
可以通过MessageChannel解决父子页面通信问题

## Web Components
> Web Components是一系列可以用来定义自己的组件的API，比如user-card.
[Web Components 入门实例教程](https://www.ruanyifeng.com/blog/2019/08/web_components.html)

## 参考其它的资料
- [html常见面试题及答案](https://blog.csdn.net/weixin_45102270/article/details/113064446)
- [掘金300题](https://juejin.cn/post/6914831351271292936#heading-1)
- [掘金2021Html篇](https://juejin.cn/post/6905294475539513352#heading-12)