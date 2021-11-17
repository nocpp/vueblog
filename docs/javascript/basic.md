---
title: 面试基础
date: '2021-11-16'
sidebar: 'auto'
categories:
 - javascript
tags:
 - 基础
publish: true
---

## RN与小程序的区别
[区别](https://blog.csdn.net/SemineLee/article/details/97621503)  
RN是原生渲染  
小程序是webview渲染  

## CSS中行内元素是否有margin和padding
1. top, bottom无效
2. left，right有效
3. padding-top，padding-bottom内容范围是增大了，但是对其它元素没有效果

## 讲讲JS的数据类型？
最新的 ECMAScript 标准定义了 9种数据类型:

7 种原始类型
- Boolean
- Undefined
- Null
- Number
- BigInt  11n,22n这就是这个类型的
- String
- Symbol  let s = Symbol()

2 种结构类型
- Object
- Function

## Symbol类型
由于ES5中对象属性名都是字符串，有可能造成命名重复，所以ES6提出的Symbol类型解决这个问题。Symbol 值通过Symbol函数生成。
```js
let s = Symbol();
window[s] = 1000;//第一种写法
let a = {
  [s]: 'Hello!'//第二种写法
};
Object.defineProperty(a, s, { value: 'Hello!' });//第三种写法
console.log(window[s]);//1000
window.s //这样不行，不能用点运算符。因为点运算符后面总是字符串

typeof s
// "symbol"
```
> 上面代码中，变量s就是一个独一无二的值。typeof运算符的结果，表明变量s是 Symbol 数据类型，而不是字符串之类的其他类型。
:::danger
注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
:::

### Symbol函数可以接受一个字符串作为参数
表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
:::danger
注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
:::
```js
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

//ES2019 提供description可以读取描述
s1.description // "foo"

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```

### 如果 Symbol 的参数是一个对象
就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
```js
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```

### Symbol 类型转化
Symbol 值不能与其他类型的值进行运算，会报错，但是可以转为字符串和布尔值，不能转为数值
```js
let s = Symbol();
s + 'abc' //会报错
s.toString() //可以
String(s) //可以
Boolean(s) //可以
!s //可以
```

### Symbol作为属性名被遍历
遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

但是，它也不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
```js
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```

## css水平、垂直居中的写法，请至少写出4种?

>这题考查的是css的基础知识是否全面，所以平时一定要注意多积累

### 水平居中
- 行内元素: text-align: center
- 块级元素: margin: 0 auto
- position:absolute +left:50%+ transform:translateX(-50%)
- display:flex + justify-content: center

### 垂直居中
- 设置line-height 等于height
- position：absolute +top:50%+ transform:translateY(-50%)
- display:flex + align-items: center
- display: table-cell;vertical-align: middle;

## 1rem、1em、1vh、1px各自代表的含义？
### rem
rem是全部的长度都相对于根元素html元素。通常做法是给html元素设置一个字体大小，然后其他元素的长度单位就为rem。

### em
- 子元素字体大小的em是相对于父元素字体大小
- 元素的width/height/padding/margin用em的话是相对于该元素的font-size

### vw/vh
全称是 Viewport Width 和 Viewport Height，视窗的宽度和高度，相当于 屏幕宽度和高度的 1%，不过，处理宽度的时候%单位更合适，处理高度的 话 vh 单位更好。

### px
px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。一般电脑的分辨率有1920*1024等不同的分辨率
，前者是屏幕宽度总共有1920个像素, 后者则是高度为1024个像素

## 画一条0.5px的直线？
> 考查的是css3的transform
```css
.box {
	height: 1px;
	transform: scaleY(0.5);
}
```

## 说一下盒模型？
> 盒模型是css中重要的基础知识，也是必考的基础知识
1. 盒模型的组成  
    由里向外content,padding,border,margin.
2. 盒模型分为两种  
	- border-box: IE盒子模型中，width表示content+padding+border这三个部分的宽度
    - content-box: 在标准的盒子模型中，width指content部分的宽度 (默认是这个)

## 画一个简单的三角形
```css
 .a{
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    border-color: transparent #0099CC transparent transparent;
    transform: rotate(90deg); /*顺时针旋转90°*/
 }

<div class="a"></div>
```

## 清除浮动的几种方式
- 父级div定义height [有效]
- 父元素最后一个标签加空div标签 并添加样式clear:both。[有效]
- 创建父级 BFC,(浮动,绝对和固定定位, 行内块儿元素/弹性盒子/表格单元，标题，滚动) [有效]
- clearfix方法
```html
.box {width: 100px;background-color: pink;margin: 100px;zoom: 1;}//父元素增加zoom: 1;是为了触发hasLayout,兼容IE7
.box::after {content: '';clear: both;display: block;height: 0;}//伪元素一定要增加display: block;
<div class="box">
    <div class="inner"></div>
</div>
```

>BFC （块级格式化上下文），是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。

满足以下条件，就是一个BFC元素

*触发条件:*

- 根元素(html元素)
- 浮动元素
- 绝对和固定定位元素，position: absolute/fixed
- 行内块儿元素/弹性盒子/表格单元，标题，display: inline-block / (table-cell 、 table-caption此元素会作为一个表格标题显示), flex 、inline-flex 之一的元素
- 滚动相关元素 ovevflow !== visible

*解决问题*
 
- margin重合问题
- 高度塌陷问题，（包含浮动元素，高度塌陷问题：在通常情况下父元素的高度会被子元素撑开，
    而在这里因为其子元素为浮动元素所以父元素发生了高度坍塌，上下边界重合。这时就可以用bfc来清除浮动了。）
- 阻止元素被浮动元素覆盖，做流式布局
```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动,
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```

**BFC的使用**

解决margin重合的问题

```html
<div class="aside"></div>
<div class="text">
    <div class="main"></div>
</div>
<!--下面是css代码-->
 .aside {
        margin-bottom: 100px;  
        width: 100px;
        height: 150px;
        background: #f66;
    }
    .main {
        margin-top: 100px;
        height: 200px;
        background: #fcc;
    }
     .text{
        /*盒子main的外面包一个div，通过改变此div的属性使两个盒子分属于两个不同的BFC，以此来阻止margin重叠*/
        overflow: hidden;  //此时已经触发了BFC属性。
    }
```

**遍历A节点的父节点下的所有子节点**
```js
<script>
    var b=document.getElementById("a").parentNode.children;
    console.log(b)
</script>
```

**用js递归的方式写1到100求和？**
```js
function add(num1,num2){
	var num = num1+num2;
        if(num2+1>100){
	 return num;
	}else{
	  return add(num,num2+1)
        }
 }
var sum =add(1,2);   
```

**浏览器内核**

主要分两个部分：渲染引擎、js引擎
渲染引擎：负责取得网页的内容（html css img ...），以及计算网页的显示方式，
    然后会输出至显示器或者打印机。浏览器的内核不同对于网页的语法解释也不同，所以渲染的效果也不一样
js引擎：解析和执行javascript 来实现网页的动态效果
    最开始渲染引擎和js引擎并没有区分的很明确，后来js引擎越来越独立，内核就倾向于只指渲染引擎
IE : trident 内核
Firefox : gecko 内核
Safari : webkit 内核
Opera : 以前是 presto 内核， Opera 现已改用Google - Chrome 的 Blink 内核
Chrome: Blink (基于 webkit ，Google与Opera Software共同开发)

**HTTP 的请求方式场景**

Get 方法：获取数据通常(查看数据)-查看
POST 方法：向服务器提交数据通常(创建数据)-create
PUT 方法：向服务器提交数据通常(更新数据)-update，与POST方法很像，也是提交数据，但PUT制定了资源在服务器上的位置，常用在修改数据
HEAD 方法：只请求页面的首部信息
```
一个HEAD请求的响应可被缓存
HEAD请求常常被忽略，但是能提供很多有用的信息，特别是在有限的速度和带宽下。主要有以下特点：
1、只请求资源的首部；
2、检查超链接的有效性；
3、检查网页是否被修改；
4、多用于自动搜索机器人获取网页的标志信息，获取rss种子信息，或者传递安全认证信息等
```
DELETE 方法：删除服务器上的资源
OPTIONS 方法：用于获取当前URL支持的请求方式
TRACE 方法：用于激活一个远程的应用层请求消息回路
CONNECT 方法：把请求链接转换到透明的TCP/IP的通道
HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。

1）方法名称是区分大小写的，当某个请求所针对的资源不支持对应的请求方法的时候，服务器应当返回状态码405（Mothod Not Allowed）；当服务器不认识或者不支持对应的请求方法时，应返回状态码501（Not Implemented）。
2）HTTP服务器至少应该实现GET和HEAD/POST方法，其他方法都是可选的，此外除上述方法，特定的HTTP服务器支持扩展自定义的方法。

**HTTP状态码**

1XX ：信息状态码
    100 continue 继续，一般在发送 post 请求时，已发送了 http header 之后服务端将返回此信息，表示确认，之后发送具体参数信息

2XX ：成功状态码
    200 ok 正常返回信息
    201 created  请求成功并且服务器创建了新资源
    202 accepted 服务器已经接收请求，但尚未处理

3XX ：重定向
    301 move per 请求的网页已经永久重定向
    302 found 临时重定向
    303 see other 临时重定向，且总是使用get请求新的url
    304 not modified 自从上次请求后，请求的网页未修改过

4XX ：客户端错误
    400 bad request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求
    401 unauthorized 请求未授权
    403 forbidden 禁止访问

    404 not found 找不到如何与url匹配的资源
    405（Mothod Not Allowed）
    
5XX ：服务器错误
    500 internal server error 最常见的服务器端的错误
    503 service unacailable 服务器端暂时无法处理请求（可能是过载或维护）
    501（Not Implemented）

*301重定向和302重定向的区别*
　　302重定向只是暂时的重定向，搜索引擎会抓取新的内容而保留旧的地址，因为服务器返回302，所以，搜索搜索引擎认为新的网址是暂时的。
    比如未登录跳登录页面，访问不存在的页面跳转404页面
    只有在Cache-Control或Expires中进行了指定的情况下，这个响应才是可缓存的。

　　而301重定向是永久的重定向，搜索引擎在抓取新的内容的同时也将旧的网址替换为了重定向之后的网址，比如http跳https
    除非额外指定，否则这个响应也是可缓存的。

*http缓存/浏览器缓存*
浏览器第一次向一个web服务器发起http请求后，服务器会返回请求的资源，
并且在响应头中添加一些有关缓存的字段如：Cache-Control、Expires、Last-Modified、ETag、Date等等。
之后浏览器再向该服务器请求该资源就可以视情况使用强缓存和协商缓存。

- 强缓存：浏览器直接从本地缓存中获取数据，不与服务器进行交互。
- 协商缓存：浏览器发送请求到服务器，服务器判定是否可使用本地缓存。
- 联系与区别：两种缓存方式最终使用的都是本地缓存；前者无需与服务器交互，后者需要。

1. 强缓存，强缓存会触发from disk cache和from memory cache（关闭进程窗口就没了）,先去内存看，如果有，直接加载,如果内存没有，择取硬盘获取，如果有直接加载,如果硬盘也没有，那么就进行网络请求,加载到的资源缓存到硬盘和内存
    强缓存是利用http的返回头中的Expires或者Cache-Control两个字段来控制的，用来表示资源的缓存时间。
    cache-control的优先级更高，max-age 指定一个时间长度，在这个时间段内缓存是有效的，单位是s。
    Cache-Control 可以由多个字段组合而成，（max-age）（s-maxage 同 max-age，覆盖 max-age、Expires，但仅适用于共享缓存，在私有缓存中被忽略。）
    （public 表明响应可以被任何对象（发送请求的客户端、代理服务器等等）缓存。）
    （private 表明响应只能被单个用户（可能是操作系统用户、浏览器用户）缓存，是非共享的，不能被代理服务器缓存。）
    （no-cache 含义是不使用本地缓存，也就是先与服务器确认缓存是否可用。）
    （no-store 禁止缓存，每次请求都要向服务器重新获取数据。）
    （must-revalidate指定如果页面是过期的，则去服务器进行获取。）
2. 协商缓存
    协商缓存是利用http的返回头中的ETag或Last-Modified字段来控制的
    ETag和If-None-Match，优先级更高【
        强ETag表示形式："22FAA065-2664-4197-9C5E-C92EA03D0A16"。
        弱ETag表现形式：w/"22FAA065-2664-4197-9C5E-C92EA03D0A16"。】
    Last-Modified和If-Modified-Since
    有ETag和Last-Modified字段，下次请求会带上这两个字段，名字分别If-None-Match和If-Modified-Since，
    吻合，则返回304响应，使用协商缓存。
    
3. 启发式缓存
如果Expires, Cache-Control: max-age, 或 Cache-Control:s-maxage 都没有在响应头中出现, 并且也没有其它缓存的设置, 
那么浏览器默认会采用一个启发式的算法, RFC建议通常会取响应头的Date_value - Last-Modified_value值的10%作为缓存时间（Chrome，Webkit）。
Firefox是取的（10%和7天的最小值）

![启发式缓存定义](前端基础面试_files/14.jpg)
![启发式缓存浏览器算法](前端基础面试_files/15.jpg)

当 ctrl+f5 强制刷新网页时，直接从服务器加载，跳过强缓存和协商缓存；
当 f5 刷新网页时，跳过强缓存，但是会检查协商缓存；

4. Date和Age的区别，作用？
作用：可以用来判断缓存是否命中，新鲜度
Date比当前时间老，说明命中缓存

Date：Date头域表示报文创建的日期，比如请求一个图片，第一次获取到了，是a时间，然后被缓存，刷新当前页面，date仍然为a时
    时间的描述格式由rfc822定义。例如，Date: Mon, 04 Jul 2011 05:53:36 GMT。
Age： 消息头里包含对象在缓存代理中存贮的时长，以秒为单位。
    Age的值通常接近于0。表示此对象刚刚从原始服务器获取不久；其他的值则是表示代理服务器当前的系统时间与此应答中的通用头 Date 的值之差。

```html
<!-- 页面禁止缓存的方法 -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

5. Http 请求和响应的gzip压缩
[gzip压缩详解](https://www.cnblogs.com/LO-ME/p/7377082.html)
原理：
    简单来说， Gzip压缩是在一个文本文件中找出类似的字符串， 并临时替换他们，使整个文件变小。
    这种形式的压缩对Web来说非常适合， 因为HTML和CSS文件通常包含大量的重复的字符串，例如空格，标签。

优缺点：
    优点是纯文本可以压缩至40%，缺点是增加服务器占用资源，对JPEG压缩不够好。
    
使用方式：
    服务器端进行配置，开始gzip，然后请求头增加Accept-Encoding: gzip即可，服务器会对它进行压缩
```
通过请求和响应头中增加
Accept-Encoding: gzip
Content-Encodin:gzip
确定客户端或服务器端是否支持压缩
```

![控制缓存的请求头字段示例](前端基础面试_files/12.jpg)
[一张图解释缓存](https://segmentfault.com/a/1190000015816331)
[图解强缓存和协商缓存](https://www.cnblogs.com/guwufeiyang/p/12868583.html)
    
**encodeURI和encodeURIComponent的比较
相同点：都可以对url进行一个编码；
区别：encodeURI()不会对本身属于URI的特殊字符进行编码，例如冒号、下划线、问号和井字号；
    而encodeURIComponent()则会对它发现的任何非标准字符进行编码。

适用场景：URL编码
详细场景：

encodeURI：适用于url跳转时。
encodeURIComponent：适用于url作为参数传递时。
注意：当url作为参数传递时如果没有用encodeURIComponent进行编码，往往会造成传递时url中的特殊字符丢失。
    
**从浏览器地址栏输入URL后发生了什么？**
[参考](https://segmentfault.com/a/1190000006879700?utm_source=sf-related)

总体来说分为以下几个过程:

1. DNS解析
2. TCP连接
3. 发送HTTP请求
4. 服务器处理请求并返回HTTP报文,（HTTP1.0返回了数据就会断开TCP连接，Http1.1不会，HTTP1.1的长连接非常easy在空暇后自己主动断开，一般来说这个时间是300s左右。）
5. 浏览器解析渲染页面

```
DNS：域名系统，是一项互联网服务，域名和IP的分布式数据库
扩展问题：
为什么url要解析（也就是编码)？
因为网络标准规定了URL只能是字母，数字，还有一些其它特殊符号（-_.~ ! * ' ( ) ; : @ & = + $ , / ? # [ ]，
特殊符号是我下来查的资料，实在背不住这么多，比较常见的就是不包括百分号和双引号），而且如果不转义会出现歧义，
比如http:www.baidu.com?key=value,
假如我的key本身就包括等于=符号，比如ke=y=value，就会出现歧义，你不知道=到底是连接key和value的符号，还是说本身key里面就有=

encodeURIComponent会对所有字符进行编码，而encodeURI会忽略特殊字符
```
1. 把输入的域名解析为IP地址
   [DNS解析过程](https://www.xuecaijie.com/it/157.html#1Q64p5DeC8dKFF)
   域名解析的过程是逐级查询的
   1.1 查找浏览器缓存
   1.2 查找操作系统缓存
   1.3 在host文件中查找
   1.4 查找路由器缓存
   1.5 查找本地DNS服务器 比如互联网服务提供商（如中国电信），比较著名的 114.114.114.114
   1.6 查找根DNS服务器
       客户端先向本地DNS发请求，然后本地DNS再向根域名发请求，会判别这个域名(.com)是授权给哪台服务器管理,并返回这个顶级DNS服务器(.com DNS)的IP。
       本地DNS收到这台顶级DNS的服务器IP后，会向该服务器发起查询，如果该服务器无法解析，会返回权威DNS服务器的IP地址，
       即下一级的DNS服务器IP（nicefilm.com），继续查找，直到服务器找到(www.nicefilm.com)的主机，然后返回给本地DNS，再返回到客户端
       
![DNS解析图](前端基础面试_files/20.jpg)
本地DNS一般是指你电脑上网时IPv4或者IPv6设置中填写的那个DNS。

```
扩展问题：
html如何做dns优化？
使用以下，预获取DNS
<meta http-equiv="x-dns-prefetch-control" content="on" />
<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />
```

2. 建立TCP 连接
   ![TCP报文首部格式](前端基础面试_files/3.jpg)
   ![序号与确认号字段含义，seq，ack](前端基础面试_files/4.jpg)
   ![六个控制位](前端基础面试_files/5.jpg)
   ![六个控制位](前端基础面试_files/6.jpg)
   ![连接图](前端基础面试_files/2.jpg)
   ![三次握手详细描述](前端基础面试_files/7.jpg)
   ![两次握手出现的问题](前端基础面试_files/8.jpg)
   
   2.1 TCP断开连接，四次挥手
   ![图1](前端基础面试_files/9.jpg)
   ![图2](前端基础面试_files/10.jpg)
   
   2.2 掘金详解
   [TCP三次握手，四次挥手详解](https://juejin.cn/post/6919056368250912782)
```
扩展知识：
OSI 7层模型：
应用层,
表示层,
会话层,
传输层(TCP/UDP),
网络层(IP,ICMP,IGMP),
数据链路层(ARP和RARP(Reverse Address Resolve Protocol)即逆地址解析协议，该协议实现了IP地址和物理地址(MAC地址)之间的转换)
物理层(处理数据转电信号)

TCP/IP协议四层模型：
1. 网络接口层
 1.1 作用
  (1) 实现网卡接口的网络驱动，以处理数据在以太网线等物理媒介上的传输
  (2) 网络驱动程序隐藏了不同物理网络的不同电气特性，为上层协议提供一个统一的接口
2. 网络层，ARP和RARP(Reverse Address Resolve Protocol)即逆地址解析协议，该协议实现了IP地址和物理地址(MAC地址)之间的转换
3. 传输层
4. 应用层

TCP与UDP区别： 
1、连接方面区别
TCP面向连接（如打电话要先拨号建立连接）。
UDP是无连接的，即发送数据之前不需要建立连接。

2、安全方面的区别
TCP提供可靠的服务，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达。
UDP尽最大努力交付，即不保证可靠交付。

3、传输效率的区别
TCP传输效率相对较低。
UDP传输效率高，适用于对高速传输和实时性有较高的通信或广播通信。

4、连接对象数量的区别
TCP连接只能是点到点、一对一的。
UDP支持一对一，一对多，多对一和多对多的交互通信。

TCP是一个面向连接的、可靠的、基于字节流的传输层协议。
而UDP是一个面向无连接的传输层协议。(就这么简单，其它TCP的特性也就没有了)。
具体来分析，和 UDP 相比，TCP 有三大核心特性:

面向连接。所谓的连接，指的是客户端和服务器的连接，在双方互相通信之前，TCP 需要三次握手建立连接，而 UDP 没有相应建立连接的过程。
可靠性。TCP 花了非常多的功夫保证连接的可靠，这个可靠性体现在哪些方面呢？一个是有状态，另一个是可控制。

TCP 会精准记录哪些数据发送了，哪些数据被对方接收了，哪些没有被接收到，而且保证数据包按序到达，不允许半点差错。这是有状态。
当意识到丢包了或者网络环境不佳，TCP 会根据具体情况调整自己的行为，控制自己的发送速度或者重发。这是可控制。
相应的，UDP 就是无状态 , 不可控的。

面向字节流。UDP 的数据传输是基于数据报的，这是因为仅仅只是继承了 IP 层的特性，而 TCP 为了维护状态，将一个个 IP 包变成了字节流
```

![TCP层数据](前端基础面试_files/1.jpg)、[详细请看](https://blog.csdn.net/skiwnc/article/details/86681950)

3. 发送HTTP请求，有缓存则使用缓存，没有则请求
    与服务器建立TCP连接后，开始发送HTTP请求
    ![什么是HTTP协议](前端基础面试_files/11.jpg)
    [HTTP原理](https://blog.csdn.net/weixin_42981419/article/details/86162244)
    3.1 http协议特点
        3.1.1 无状态
    　　　　 HTTP是一种不保存状态,即无状态(stateless)协议。
            HTTP协议 自身不对请求和响应之间的通信状态进行保存。也就是说在HTTP这个 级别,协议对于发送过的请求或响应都不做持久化处理。
        3.1.2 无连接
            无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。
            采用这种方式可以节省传输时间，并且可以提高并发性能，不能和每个用户建立长久的连接，请求一次相应一次，
            服务端和客户端就中断了。但是无连接有两种方式，早期的http协议是一个请求一个响应之后，直接就断开了，
            但是现在的http协议1.1版本不是直接就断开了，而是等300秒，这300秒是等什么呢，等着用户有后续的操作，
            如果用户在这几秒钟之内有新的请求，那么还是通过之前的连接通道来收发消息，如果过了这几秒钟用户没有发送新的请求，
            那么就会断开连接，这样可以提高效率，减少短时间内建立连接的次数，因为建立连接也是耗时的，
            默认的好像是3秒中现在，但是这个时间是可以通过咱们后端的代码来调整的，自己网站根据自己网站用户的行为来分析统计出一个最优的等待时间。
        
         3、简单快速
        客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有GET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。
        
        4、灵活
        HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记。
        
        5、支持B/S及C/S模式
            
    3.2 HTTP状态码和请求方法，上面写的有
    
    3.3 HTTP 1.0 1.1 2.0区别
        3.3.1 HTTP 1.0规定浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个TCP连接，
            服务器完成请求处理后立即断开TCP连接，服务器不跟踪每个客户也不记录过去的请求
            请求头里：Connection: close
            
        3.3.2 为了克服HTTP 1.0的这个缺陷，HTTP 1.1支持持久连接（HTTP/1.1的默认模式使用带流水线的持久连接），在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟。
            一个包含有许多图像的网页文件的多个请求和应答可以在一个连接中传输，但每个单独的网页文件的请求和应答仍然需要使用各自的连接。HTTP 1.1还允许客户端不用等待上一次请求结果返回，就可以发出下一次请求，但服务器端必须按照接收到客户端请求的先后顺序依次回送响应结果，以保证客户端能够区分出每次请求的响应内容，这样也显著地减少了整个下载过程所需要的时间。
            
            因此Keep-Alive被提出用来解决效率低的问题。从HTTP/1.1起，默认都开启了Keep-Alive，保持连接特性，简单地说，当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间。
            虽然这里使用TCP连接保持了一段时间，但是这个时间是有限范围的，
            到了时间点依然是会关闭的，所以我们还把其看做是每次连接完成后就会关闭。
            
            请求头里：Connection: Keep-Alive
            
        3.3.3 HTTP 2.0 
            多路复用 (Multiplexing)，多路复用允许同时通过单一的 HTTP/2 连接发起多重的请求-响应消息，http1.1 同一时间域名请求有数量限制
            
            二进制分帧，HTTP/2在 应用层(HTTP/2)和传输层(TCP or UDP)之间增加一个二进制分帧层。
                在不改动 HTTP/1.x 的语义、方法、状态码、URI 以及首部字段的情况下, 解决了HTTP1.1 的性能限制，改进传输性能，
                实现低延迟和高吞吐量。在二进制分帧层中， HTTP/2 会将所有传输的信息分割为更小的消息和帧（frame）,
                并对它们采用二进制格式的编码 ，其中 HTTP1.x 的首部信息会被封装到 HEADER frame，而相应的 Request Body 则封装到 DATA frame 里面。
                
            首部压缩（Header Compression）
                HTTP/1.1并不支持 HTTP 首部压缩，为此 SPDY 和 HTTP/2 应运而生， SPDY 使用的是通用的DEFLATE 算法，而 HTTP/2 则使用了专门为首部压缩而设计的 HPACK 算法。
            
            服务端推送（Server Push）
                说明了若采用服务端推送的功能，则JS/CSS资源基本可以和HTML资源同步到达，浏览器可以“无延时”获取JS/CSS资源，客户端的延时最多可以减少一个RTT。
                前端使用方法，请求头加preload或者link加preload
                
        3.3.1 HTTP 3.0
            解决HTTP2.0中，TCP连接发送失败，重传问题，多路重传互不影响
                
    3.4 HTTPS
        HTTP报文是包裹在TCP报文中发送的，服务器端收到TCP报文时会解包提取出HTTP报文。
        但是这个过程中存在一定的风险，HTTP报文是明文，如果中间被截取的话会存在一些信息泄露的风险。
        那么在进入TCP报文之前对HTTP做一次加密就可以解决这个问题了。HTTPS协议的本质就是HTTP + SSL(or TLS)。
        在HTTP报文进入TCP报文之前，先使用SSL对HTTP报文进行加密。从网络的层级结构看它位于HTTP协议与TCP协议之间。
        
        3.4.1 SSL和TLS的关系
            SSL(Secure Socket Layer 安全套接层)是基于HTTPS下的一个协议加密层
            标准化后的IETF更名为TLS1.0(Transport Layer Security 安全传输层协议)，可以说TLS就是SSL的新版本3.1
        
        3.4.2 面试题
                Q:HTTP与HTTPS区别?
        
        　　　　A: 1.HTTPS需要申请购买CA证书, HTTP不需要
        
        　　　　　 2.HTTP是明文传输,不安全, HTTPS是在HTTP基础上加了SSL层,更安全
        
        　　　　　 3.HTTPS效率低,HTTP效率高
         
        
        　　　　Q:HTTPS传输过程?
        
        　　　　A:客户端发起 HTTPS 请求，协议版本和加密方式（发送随机数1）,服务端返回证书（发送随机数2）,客户端对证书验证,验证通过后本地生成用于改造对称加密算法的随机数（发送随机数3,
                通过证书中的公钥对随机数进行加密传输到服务端，服务端接收后通过私钥解密得到随机数3，之后的数据交互通过（随机数1，2，3）生成对话密钥，
                然后用密钥进行对称加密算法进行加解密。（因为非对称加密比较复杂，耗时更长，所以要换成对称加密）
        
        　　　　Q:为什么需要证书?
        
        　　　　A:防止中间人攻击,验证服务器身份
        　　　
        
        　　　　Q:怎么防止的篡改?
        
        　　　　A:证书是公开的,虽然中间人可以拿到证书,但私钥无法获取,公钥无法推断出私钥,所以篡改后不能用私钥加密,
                强行加密客户也无法解密,强行修改内容,会导致证书内容与签名中的指纹不匹配
    
    3.5 HTTP请求报文与响应报文
        请求报文是由三部分组成: 请求行, 请求报头和请求正文
        响应报文是由三部分组成: 状态行, 响应头部和响应正文
        [HTTP报文示例](https://www.cnblogs.com/an-wen/p/11180076.html)
        
4. 浏览器解析渲染页面
![示意图](前端基础面试_files/13.jpg)
[详细过程参考](https://blog.csdn.net/qq_41807645/article/details/80839757)

先构建DOM树：从上到下解析HTML文档生成DOM节点树（DOM tree），也叫内容树（content tree），遇见script标签和link css标签
    会开始下载执行，没加异步处理会阻塞渲染和解析，CSS只会阻塞渲染，执行完后再往下解析，所以JS文件不要放到head里，css文件尽量小，
    JS通过DOM API和CSSOM API来操作DOM树和CSS树。

再构建CSS Rule Tree：加载解析样式生成CSS树；
    
4.1 Event Loop是什么？
    Event Loop是javascript的执行机制
4.2 为什么有Event Loop？
    因为JS是单线程的，如果没有Event Loop，在执行费时间的任务时，页面会卡顿，不会继续往下执行
任务分为两类：
    - 同步任务：按时间顺序执行，执行完上一个才能执行下一个。
    - 异步任务：不按时间顺序执行，执行到异步任务时，进入Event Table并注册函数，然后往下执行，异步任务完成后，推入事件队列中。
        主线程执行完后，执行事件队列中函数（eg: setTimeout,setInterval,ajax,IO读写）

```js
    console.log('script start');
    
    setTimeout(function() {
      console.log('setTimeout');
    }, 0);
    
    Promise.resolve().then(function() {
      console.log('promise1');
    }).then(function() {
      console.log('promise2');
    });
    
    console.log('script end');
    
    //结果script start, script end, promise1, promise2, setTimeout 已蒙圈。。。
```

执行步骤：
    同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数
    当指定的事情完成时，Event Table会将这个函数移入Event Queue。
    主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
    上述过程会不断重复，也就是常说的Event Loop(事件循环)。
    
我们不禁要问了，那怎么知道主线程执行栈为空呢？js引擎存在monitoring process进程，
会持续不断的检查主线程执行栈是否为空，一旦为空，就会去Event Queue那里检查是否有等待被调用的函数。

[加入async看顺序](https://www.cnblogs.com/shaozhu520/p/11341030.html)
async执行返回值是一个promise，遇见promise会resolve它

```js
let data = [];
$.ajax({
    url:www.javascript.com,
    data:data,
    success:() => {
        console.log('发送成功!');
    }
})
console.log('代码执行结束');
```
上面是一段简易的ajax请求代码：

    ajax进入Event Table，注册回调函数success。
    执行console.log('代码执行结束')。
    ajax事件完成，回调函数success进入Event Queue。
    主线程从Event Queue读取回调函数success并执行。
    
*宏任务与微任务*
Event Loop中，每一次循环称为tick，每一次tick的任务如下：

执行栈选择最先进入队列的宏任务（一般都是script），执行其同步代码直至结束；
检查是否存在微任务，有则会执行至微任务队列为空；
如果宿主为浏览器，可能会渲染页面；
开始下一轮tick，执行宏任务中的异步代码（setTimeout等回调）。

而宏任务一般是：包括整体代码script，mousemove，setTimeout，setInterval、setImmediate。（macrotask queue）
微任务：原生Promise(有些实现的promise将then方法放到了宏任务中)、process.nextTick、Object.observe(已废弃)、 MutationObserver
记住就行了。（microtask queue）



构建渲染树(render tree)：根据DOM树和CSSOM树,生成渲染树(render tree)；

渲染树：按顺序展示在屏幕上的一系列矩形，这些矩形带有字体，颜色和尺寸等视觉属性。
渲染树会忽略掉不需要渲染的元素，比如head、display:none的元素等

布局（layout）：根据渲染树将节点树的每一个节点布局在屏幕上的正确位置；
        这里涉及到两个重要的概念reflow和repaint：
        repaint（重绘）：元素的某一部分属性发生改变，如字体颜色，背景颜色等改变，尺寸并未改变，这时发生的改变过程就是repaint。
        reflow（回流）： 因为浏览器渲染是一个由上而下的过程，当发现某部分的变化影响了布局时，就需要倒回去重新渲染，
        这个过程就称之为reflow。reflow几乎是没法避免的，现在一些常用的效果，比如树状目录的折叠、展开（实质上是元素的显示与隐藏）等，
        都将引起浏览器的 reflow。鼠标滑过、点击……只要这些行为引起了页面上某些元素的占位面积、定位方式、边距等属性的变化，
        都会引起它内部、周围甚至整个页面的重新渲染。基本上能引起reflow的主要有几个原因：
        1，网页初始化。
        2，JS操作DOM树的时候，增加删除元素等。
        3，某些元素的尺寸改变。
        4，CSS属性的改变，
        
        reflow影响性能，优化方法如下：
        
        通常reflow比repaint会耗费更多的时间，从而也就会影响性能，所以编写代码的时候要尽可能避免过多的reflow或者repaint。
        减少reflow/repaint的方法：
        
        1，修改样式不要逐条修改，建议定义CSS样式的class，然后直接修改元素的className。

        2，不要将DOM节点的属性值放在循环中当成循环的变量。

        3，为动画的 HTML 元素使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是不会 reflow 的。

        4，把DOM离线后修改。如设置DOM的display：none，然后进行你需要的多次修改，然后再显示出来，或者clone一个节点到内存中，
        然后随意修改，修改完成后再与在线的交换。

        5，千万不要使用table布局，一个微小的改变就可能引起整个table的重新布局。

绘制（painting）：遍历渲染树绘制所有节点，为每一个节点适用对应的样式，Native GUI的API绘制;

以上步骤并不是一次性顺序完成的。如果DOM或者CSSOM被修改，以上过程会被重复执行。实际上，CSS和JavaScript往往会多次修改DOM或者CSSOM。

注意：上述这个过程是理论上是逐步完成的，但是实际实现中为了更好的用户体验，渲染引擎为了尽可能早的将内容呈现到屏幕上，
会在构建DOM树的同时去解析CSS构建CSS树，并且还会去生成Rendering Tree。解析完一部分内容就显示一部分内容，
同时，可能还在通过网络下载其余内容，这样就可以更快的显示出页面，
其中解析后面的内容涉及到布局和样式的改变引起的reflow过程和repaint，我们后面在详细说明。

5. 页面渲染优化

HTML文档结构层次尽量少，最好不深于六层；
脚本尽量后放，放在前即可；
少量首屏样式内联放在标签内；
样式结构层次尽量简单；
在脚本中尽量减少DOM操作，尽量缓存访问DOM的样式信息，避免过度触发回流；
减少通过JavaScript代码修改元素样式，尽量使用修改class名方式操作样式或动画；
动画尽量使用在绝对定位或固定定位的元素上；
隐藏在屏幕外，或在页面滚动时，尽量停止动画；
尽量缓存DOM查找，查找器尽量简洁；
涉及多域名的网站，可以开启域名预解析

6. 并行下载，串行执行
页面依赖外部资源下载是并行的，但是DOM树解析、js执行和首屏渲染却是串行的。
理解整个过程，就能明白为什么Head中不要放JS的原因，以及CSS为什么要尽量小。

页面渲染的大致过程为，先下载解析HTML并建立DOM树，再解析css绘制渲染树。前者搭建页面结构，
后者增添页面样式。而在建立DOM树的过程就会遇到诸如img、外联css和script标签，此时就要加载外部资源了。
加载资源是由单独的下载线程进行异步加载的，浏览器会并行加载，不过具体并行最大数量是有一定限制的，不同浏览器可能不一样。

但是加载css和js资源比较特殊，它们的加载会影响页面渲染。css加载不会阻塞DOM树解析，
但会阻塞渲染（这是由于渲染依赖于css，如果不等css加载完就渲染的话那么等css加载解析完又得重新渲染，
可能又要重绘或者回流）。对于js资源的加载，则会阻塞DOM树的构建和渲染，除非设置了script标签的异步属性。

放在head中会在解析DOM树和渲染页面前就加载，并阻塞页面。js正常情况下加载完就会立即执行，
在js脚本中只能访问当前script 以上的DOM，脚本执行结束后再继续解析DOM。js执行引擎和页面渲染是由不同的线程来执行，
但这两者是互斥的，也就是说js执行过程是无法构建DOM和渲染页面的。这是一种优化机制，由于js可能会对DOM及样式进行修改，
如果解析js过程中同时构建DOM，就可能造成前后内容不一致或者重复构建。所以应该把script放在body中，使页面更快完成渲染。

*async与defer*
现在大家习惯于在页面中引用各种的第三方脚本，如果第三方服务商出现了一些小问题，比如延迟之类的，就会使得页面白屏。
好在script提供了两种方式来解决上述问题，async和defer，这两个属性使得script都不会阻塞DOM的渲染。
但既然会存在两个属性，那么就说明，这两个属性之间肯定是有差异的。

区别：
如果script标签设置了该属性，则浏览器会异步的下载该文件并且不会影响到后续DOM的渲染；
如果有多个设置了defer的script标签存在，则会按照顺序执行所有的script；
defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前，按照顺序执行所有的script。

async的执行是加载完成就会去执行，而不像defer那样要等待所有的脚本加载完后按照顺序执行。
          
**HTML生命周期**
HTML页面的生命周期有以下以下几个重要事件：

DOMContentLoaded ：浏览器已经完全加载了 HTML，DOM 树已经构建完毕，但是像是<img>和样式表等外部资源可能并没有下载完毕。
load：浏览器已经加载了所有的资源（图像，样式表等）。
beforeunload/unload ：当用户离开页面的时候触发。
readyState ：描述document的loading状态，其实是对页面加载事件的细化，比如loading表示DOMContentLoaded还没有触发，
我们在这个时候注册DOMContentLoaded事件是有效的。interactive后会触发DOMContentLoaded，comoplete之后会触发load事件。
readyState的改变会触发readystatechange事件。
    loading 加载：document仍在加载。
    interactive 互动 ： 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
    complete ：文档和所有子资源已完成加载。状态表示 load 事件即将被触发。
            
**URL与URI的区别**
URI 是统一资源标识符，而 URL 是统一资源定位符，URL是URI的子集。

**数据传输过程**
[参考文章](https://blog.51cto.com/14557673/2440993)

**说一下CORS？**

CORS是一种新标准，支持同源通信，也支持跨域通信。fetch是实现CORS通信的

**如何中断ajax请求？**

一种是设置超时时间让ajax自动断开，另一种是手动停止ajax请求，其核心是调用XML对象的abort方法，ajax.abort()

**说一下事件代理？**

事件委托是指将事件绑定到目标元素的父元素上，利用冒泡机制触发该事件
```js
ulEl.addEventListener('click', function(e){
    var target = event.target || event.srcElement;
    if(!!target && target.nodeName.toUpperCase() === "LI"){
        console.log(target.innerHTML);
    }
}, false);
```

**target、currentTarget的区别？**

currentTarget当前所绑定事件的元素

target当前被点击的元素

**说一下宏任务和微任务？**

1. 宏任务：当前调用栈中执行的任务称为宏任务。（主代码块，定时器等等）。
2. 微任务： 当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务为微任务。（可以理解为回调事件，promise.then，proness.nextTick等等）。
3. 宏任务中的事件放在callback queue中，由事件触发线程维护；微任务的事件放在微任务队列中，由js引擎线程维护。

**绕不过去的闭包**
闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个

函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域

闭包的实质是因为函数嵌套而形成的作用域链

特点：
- 函数内再嵌套函数
- 内部函数可以引用外层的参数和变量
- 参数和变量不会被垃圾回收机制回收

优点：能够实现封装和缓存等
缺点：消耗内存、使用不当会内存溢出，
解决方法：在退出函数之前，将不使用的局部变量全部删除

**说说你对作用域链的理解**

作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，
变量访问到 window对象即被终止，作用域链向下访问变量是不被允许的。
简单的说，作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期。

**说一下继承的几种方式及优缺点？**

1. 原型链继承
```js
function P() {}//父类
function C() {}//子类
C.prototype = new P();
C.prototype.name = 'yes';
let cItem = new C();
```
　缺点：1、新实例无法向父类构造函数传参。
　　　　2、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）

2. 借用/盗用 构造函数继承
```js
function P() {}//父类
function C() {P.call(this, "jer")}//子类
let cItem = new C();
```
　　缺点：1、只能继承父类构造函数的属性。
　　　　　　　2、无法实现构造函数的复用。（每次用每次都要重新调用）
　　　　　　　3、每个新实例都有父类构造函数的副本，臃肿。

3. 组合继承（组合原型链继承和借用构造函数继承）（常用）
```js
function P() {}//父类
function C(name) {P.call(this, name);}//子类
C.prototype = new P();
C.prototype.name = 'yes';
let cItem = new C("pig");
```
　　　　特点：1、可以继承父类原型上的属性，可以传参，可复用。
　　　　　　　2、每个新实例引入的构造函数属性是私有的。
　　　　缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

4. 寄生式继承
```js
function createAnother(original){ 
 let clone = object(original); // 通过调用函数创建一个新对象
 clone.sayHi = function() { // 以某种方式增强这个对象
 console.log("hi"); 
 }; 
 return clone; // 返回这个对象
} ```

5. 寄生组合式继承（常用）
```js
function inheritPrototype(subType, superType) { 
 let prototype = Object.create(superType.prototype); // 创建对象, 深拷贝
 prototype.constructor = subType; // 增强对象
 
 subType.prototype = prototype; // 赋值对象
} 

function SuperType(name) { 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 

SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 

function SubType(name, age) { 
 SuperType.call(this, name); 
  this.age = age; 
} 

inheritPrototype(SubType, SuperType); 
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
};
```
这里只调用了一次 SuperType 构造函数，避免了 SubType.prototype 上不必要也用不到的属性，
因此可以说这个例子的效率更高。而且，原型链仍然保持不变，因此 instanceof 操作符和
isPrototypeOf()方法正常有效。寄生式组合继承可以算是引用类型继承的最佳模式。

6. 原型式继承，就是对象浅拷贝，Object.create方法
```js
function object(o) { 
 function F() {} 
 F.prototype = o; 
 return new F(); 
} ```

>构造函数中的共有属性无法做到数据共享，要做到数据共享，需要用到prototype

**JavaScript原型，原型链 ? 有什么特点？**
![prototype是什么](前端基础面试_files/16.jpg)
每个函数都有一个属性，叫prototype，它的值是一个对象，默认包含constructor，指向本身，在Object函数中，还包含toString, hasOwnProperty等方法

关系： 每个对象都有一个隐藏的属性——“__proto__”，这个属性引用了创建这个对象的函数的prototype。即：fn.__proto__ === Fn.prototype
![prototype与__proto__](前端基础面试_files/17.jpg)

访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是**原型链**。

那么我们在实际应用中如何区分一个属性到底是基本的还是从原型中找到的呢？大家可能都知道答案了——hasOwnProperty，
特别是在for…in…循环(enumerable)中，一定要注意。

Instanceof的判断队则是：沿着A的__proto__这条线来找，
同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。
![instance的逻辑](前端基础面试_files/18.jpg)

特点：JavaScript 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。
当我们修改原型时，与之相关的对象也会继承这一改变当我们需要一个属性的时， Javascript 引擎会先看当前对象中是否有这个属性，
 如果没有的,就会查找__proto__这条线来找

**this的取值, 分五种情况**
情况1：构造函数
    如果函数作为构造函数用，那么其中的this就代表它即将new出来的对象。
    例如：var foo = new Foo()
情况2：函数作为对象的一个属性
    如果函数作为对象的一个属性时，并且作为对象的一个属性被调用时，函数中的this指向该对象。
    例如：var obj = {
        name: 'aa',
        fn: function() {
            console.log(this.name)
        }
    }
情况3：函数用call或者apply调用
    当一个函数被call和apply调用时，this的值就取传入的对象的值。
情况4：全局 & 调用普通函数
    在全局环境下，this永远是window，这个应该没有非议。
    ![特例](前端基础面试_files/19.jpg)
    
情况5：监听事件回调函数中的this, 指向触发这个事件的对象，特殊的是， IE 中的 attachEvent 中的this 总是指向全局对象 Window

**new操作符具体干了什么呢?**

创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型
属性和方法被加入到 this 引用的对象中
新创建的对象由 this 所引用，并且最后隐式的返回 this

**跨域相关**
跨域问题来源于浏览器的同源策略，浏览器为了提高网站的安全性
>同源是指"协议+域名+端口

1. 通过jsonp跨域，需要服务端配合
```js
var script = document.createElement('script');
script.type = 'text/javascript';
// 传参并指定回调执行函数为onBack
script.src = 'http://www.....:8080/login?user=admin&callback=onBack';
document.head.appendChild(script);
// 回调执行函数
function onBack(res) {
 alert(JSON.stringify(res));
}
```
2. nginx代理跨域
```shell
server {
        listen       80;
        server_name  localhost;
        ## 用户访问 localhost，则反向代理到https://api.shanbay.com
        location / {
            root   html;
            index  index.html index.htm;
            proxy_pass https://api.shanbay.com;//增加这行
        }
}
```
3. 后端在头部信息里面设置安全域名
```php
add_header 'Access-Control-Allow-Origin' *;
```

**commonjs 规范**
exports = module.exports
主要变量
exports
module
require

**export和export default的区别？**
```js
export default  xxx
import xxx from './'

export xxx
import {xxx} from './'
```

**JS有哪些方法定义对象**
对象字面量： var obj = {};
构造函数： var obj = new Object();
Object.create(): var obj = Object.create(Object.prototype);

**说一下自己常用的es6的功能？**

>此题是一道开放题，可以自由回答。但要注意像let这种简单的用法就别说了，说一些经常用到并有一定高度的新功能

像module、class、promise等，尽量讲的详细一点。

**什么是会话cookie,什么是持久cookie?**

cookie是服务器返回的，指定了expire time（有效期）的是持久cookie,没有指定的是会话cookie
![cookie其它字段](前端基础面试_files/21.jpg)

name，value，domain，path，expires/Max-Age，Size，http，secure

**如何通过JS判断一个数组**
1. instanceof  (arr instanceof Array)
2. isArray (Array.isArray([]) //true)
3. constructor (arr.constructor == Array; //true)
4. Object.prototype  (Object.prototype.toString.call([]) == '[object Array]')
5. Array.prototype.isPrototypeOf(obj)

**sort 快速打乱数组**
```js
var arr = [1,2,3,4,5,6,7,8,9,10];
arr.sort(()=> Math.random() - 0.5)
//利用sort return 大于等于0不交换位置，小于0交换位置
// [5, 8, 4, 3, 2, 9, 10, 6, 1, 7]
```

**数组去重？**

```js
var arr=['12','32','89','12','12','78','12','32'];
    // 最简单数组去重法
    function unique1(array){
        var n = []; //一个新的临时数组
        for(var i = 0; i < array.length; i++){ //遍历当前数组
            if (n.indexOf(array[i]) == -1) //或者用includes
                n.push(array[i]);
        }
        return n;
    }
    arr=unique1(arr);
    // 速度最快， 占空间最多（空间换时间），通过对象key不重复去重
    function unique2(array){
        var n = {}, r = [], type;
        for (var i = 0; i < array.length; i++) {
            type = typeof array[i];
            if (!n[array[i]]) {
                n[array[i]] = [type];
                r.push(array[i]);
            } else if (n[array[i]].indexOf(type) < 0) {
                n[array[i]].push(type);
                r.push(array[i]);
            }
        }
        return r;
    }
    //数组下标判断法，从第二个开始提高性能
    function unique3(array){
        var n = [array[0]]; //结果数组
        for(var i = 1; i < array.length; i++) { //从第二项开始遍历
            if (array.indexOf(array[i]) == i) 
                n.push(array[i]);
        }
        return n;
    }
```

```es6
es6方法数组去重
arr=[...new Set(arr)];
es6方法数组去重，第二种方法
function dedupe(array) {
  return Array.from(new Set(array));       //Array.from()能把set结构转换为数组
}
```

**节流防抖**
节流：每隔一段时间执行一次，通常用在高频率触发的地方，降低频率。--如：鼠标滑动 拖拽
```js
时间戳实现：
var throttle = function(func, delay){
    var prev = Date.now();
    return function(){
        var context = this;
        var args = arguments;
        var now = Date.now();
        if(now-prev >= delay){
            func.apply(context,args);
            prev = Date.now();
        }
    }
}

定时器实现：
var throttle = function(func, delay){
    var timer = null;
    return function(){
        var context = this;
        var args = arguments;
        if(!timer){
            timer = setTimeout(function(){
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}
```
防抖：一段时间内连续触发，不执行，直到超出限定时间执行最后一次。--如：input 模糊搜索
```js
// debounce 函数接受一个函数和延迟执行的时间作为参数, 此函数用作监听回调函数
function debounce(fn, delay){
    // 维护一个 timer
    let timer = null;
    
    return function() {
        // 获取函数的作用域和变量
        let context = this;
        let args = arguments;
        
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(context, args);
        }, delay)
    }
}
```

**get、post的区别**

1.get传参方式是通过地址栏URL传递，是可以直接看到get传递的参数，post传参方式参数URL不可见，get把请求的数据在URL后通过？连接，通过&进行参数分割。psot将参数存放在HTTP的包体内

2.get传递数据是通过URL进行传递，对传递的数据长度是受到URL大小的限制，URL最大长度是2048个字符。post没有长度限制

3.get后退不会有影响，post后退会重新进行提交

4.get请求可以被缓存，post不可以被缓存

5.get请求只URL编码，post支持多种编码方式

6.get请求的记录会留在历史记录中，post请求不会留在历史记录

7.get只支持ASCII字符，post没有字符类型限制


**常见的兼容性问题？**
1. 不同浏览器的标签默认的margin和padding不一样。  
*{margin:0;padding:0;}

2. IE6双边距bug：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。hack：display:inline;将其转化为行内属性。

3. 渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用“9”这一标记，将IE浏览器从所有情况中分离出来。接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
```css
{
background-color:#f1ee18;/*所有识别*/
.background-color:#00deff\9; /*IE6、7、8识别*/
+background-color:#a200ff;/*IE6、7识别*/
_background-color:#1e0bd1;/*IE6识别*/
}
```

4. 设置较小高度标签（一般小于10px），在IE6，IE7中高度超出自己设置高度。hack：给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。

5. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

6. 超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不再具有hover和active了。解决方法是改变CSS属性的排列顺序:L-V-H-A ( love hate ): a:link {} a:visited {} a:hover {} a:active {}

**display:none与visibility：hidden的区别？**

display：none 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）

visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘），会被子元素继承，可以通过设置子元素visibility:visible 使子元素显示出来

opacity: 0 也会被子元素继承，但是不能通过设置子元素opacity: 1 使其重新显示

**CSS优化、提高性能的方法有哪些？**

1. 避免过度约束
2. 避免后代选择符
3. 避免链式选择符
4. 使用紧凑的语法
5. 避免不必要的命名空间
6. 避免不必要的重复
7. 最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么
8. 避免！important，可以选择其他选择器
9. 尽可能的精简规则，你可以合并不同类里的重复规则

**浏览器是怎样解析CSS选择器的？**

CSS选择器的解析是从右向左解析的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。
而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。

**全屏滚动的原理是什么？用到了CSS的哪些属性？**

原理：有点类似于轮播，整体的元素一直排列下去，假设有5个需要展示的全屏页面，那么高度是500%，只是展示100%，剩下的可以通过transform进行y轴定位，也可以通过margin-top实现

overflow：hidden；transition：all 1000ms ease；

**什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？**

响应式网站设计(Responsive Web design)是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。  
基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理。  
页面头部必须有meta声明的viewport。

**视差滚动效果？**

视差滚动（Parallax Scrolling）通过在网页向下滚动的时候，控制背景的移动速度比前景的移动速度慢来创建出令人惊叹的3D效果。

1. CSS3实现
优点：开发时间短、性能和开发效率比较好，缺点是不能兼容到低版本的浏览器
2. jQuery实现
通过控制不同层滚动速度，计算每一层的时间，控制滚动效果。  
优点：能兼容到各个版本的，效果可控性好  
缺点：开发起来对制作者要求高  
3. 插件实现方式
例如：parallax-scrolling，兼容性十分好

** png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？**

1. png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。
2. jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
3. gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.
4. webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。

**style标签写在body后与body前有什么区别？**

页面加载自上而下 当然是先加载样式。
写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

**谈谈flex布局**

*容器的属性*

- flex-direction
- flex-wrap
- flex-flow flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
- justify-content
- align-items
- align-content

*子元素属性*

- order  属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- flex-grow 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
- flex-shrink 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- flex-basis 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
- flex
- align-self

**浅拷贝和深拷贝的区别**
- 浅拷贝：一般指的是把对象的第一层拷贝到一个新对象上去，比如
```js
var a = { count: 1, deep: { count: 2 } }
var b = Object.assign({}, a)
// 或者
var b = {...a}
```

- 深拷贝：一般需要借助递归实现，如果对象的值还是个对象，要进一步的深入拷贝，完全替换掉每一个复杂类型的引用。
```js
var deepCopy = (obj) => {
    var ret = {}
    for (var key in obj) {
        var value = obj[key]
        ret[key] = typeof value === 'object' ? deepCopy(value) : value
    }
    return ret
}
```

**webpack的基础知识**

*webpack 是什么？*

webpack 是一个现代 JavaScript 应用程序的静态模块打包器，当 webpack 处理应用程序时，会递归构建一个依赖关系图，
其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle。

*webpack 的核心概念*

- entry: 入口
- output: 输出
- loader: 模块转换器，用于把模块原内容按照需求转换成新内容
- 插件(plugins): 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

**css 2倍，3倍背景图使用**
```css
  .star.star-36 .star-item.on {
     background-image: url("./images/stars/star36_on@2x.png");
   }
   @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    .star.star-36 .star-item.on {
       background-image: url("./images/stars/star36_on@3x.png");
     }
   }
   
   bg-image($url)
     background-image url($url + "@2x.png")
     @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
       background-image url($url + "@3x.png")
```


**JS设计模式**
1. 工厂模式, new 实例
```js
class Man {
  constructor(name) {
    this.name = name
  }
  alertName() {
    alert(this.name)
  }
}

class Factory {
  static create(name) {
    return new Man(name)
  }
}

Factory.create('yck').alertName()
```

2. 单例模式
在 Vuex 源码中，你也可以看到单例模式的使用，虽然它的实现方式不大一样，通过一个外部变量来控制只安装一次 Vuex

3. 适配器模式
适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。
```js
class Plug {
  getName() {
    return '港版插头'
  }
}

class Target {
  constructor() {
    this.plug = new Plug()
  }
  getName() {
    return this.plug.getName() + ' 适配器转二脚插头'
  }
}

let target = new Target()
target.getName() // 港版插头 适配器转二脚插头
```

4. 装饰模式
装饰模式不需要改变已有的接口，作用是给对象添加功能。就像我们经常需要给手机戴个保护套防摔一样，不改变手机自身，给手机添加了保护套提供防摔功能。
以下是如何实现装饰模式的例子，使用了 ES7 中的装饰器语法
```js
function readonly(target, key, descriptor) {
  descriptor.writable = false
  return descriptor
}

class Test {
  @readonly
  name = 'yck'
}

let t = new Test()

t.yck = '111' // 不可修改
```

5. 代理模式
代理是为了控制对对象的访问，不让外部直接访问到对象。
在现实生活中，也有很多代理的场景。比如你需要买一件国外的产品，这时候你可以通过代购来购买产品。
```js
<ul id="ul">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<script>
    let ul = document.querySelector('#ul')
    ul.addEventListener('click', (event) => {
        console.log(event.target);
    })
</script>
```

6. 发布-订阅模式 事件监听

7. 外观模式
外观模式提供了一个接口，隐藏了内部的逻辑，更加方便外部调用。
```js
function addEvent(elm, evType, fn, useCapture) {
  if (elm.addEventListener) {
    elm.addEventListener(evType, fn, useCapture)
    return true
  } else if (elm.attachEvent) {
    var r = elm.attachEvent("on" + evType, fn)
    return r
  } else {
    elm["on" + evType] = fn
  }
}
```
对于不同的浏览器，添加事件的方式可能会存在兼容问题。如果每次都需要去这样写一遍的话肯定是不能接受的，
所以我们将这些判断逻辑统一封装在一个接口中，外部需要添加事件只需要调用 addEvent 即可。