---
title: 面试总结
date: '2021-11-16'
sidebar: 'auto'
categories:
 - javascript
tags:
 - 面试
publish: true
---

# 面试被问到的题

1. 为什么离职？
    答： 1. 距离远，要转3趟车。 2. 想去更大的平台发展和提升自己技术。

2. 问的问题？
    2.1 试用期多长时间，什么时候会买保险？工资多少？每月到手多少？几点上班几点下班？
    
1. Websocket原理？
    WebSocket 是一个持久化的协议，所以在握手阶段使用了 HTTP，然后就可以互相通信。

### 方法
1. new WebSocket
2. 事件onopen，onmessage ，onerror ，onclose
3. websocket.send(JSON.stringify(msg));
    
### WebSocket 的其他特点：
- 建立在 TCP 协议之上，服务器端的实现比较容易。
- 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
- 数据格式比较轻量，性能开销小，通信高效。
- 可以发送文本，也可以发送二进制数据。
- 没有同源限制，客户端可以与任意服务器通信。
- 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。
```js
   GET /chat HTTP/1.1
   Host: server.example.com
   Upgrade: WebSocket
   Connection: Upgrade
   Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
   Sec-WebSocket-Protocol: chat, superchat
   Sec-WebSocket-Version: 13
   Origin: http://example.com
```
    
```js
   Upgrade: websocket
   Connection: Upgrade 
   关键是Upgrade
   Connection: closed,keep-alive,Upgrade
```

```js
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
    Sec-WebSocket-Protocol: chat
```

至此，HTTP 已经完成它所有工作了，接下来就是完全按照 WebSocket 协议进行了。

long poll 其实原理跟 ajax轮询 差不多，都是采用轮询的方式，不过采取的是阻塞模型（一直打电话，没收到就不挂电话），
也就是说，客户端发起请求后，如果没消息，就一直不返回 Response 给客户端。

从上面可以看出其实这两种方式，都是在不断地建立HTTP连接，然后等待服务端处理，可以体现HTTP协议的另外一个特点，被动性。

Websocket只用过一次Http请求就可以源源不断的信息传送。

2. VueX中为什么要有actions存在？为什么不直接操作mutations？VueX的实现原理是什么？
    actions里是业务代码和异步操作，mutations是同步操作。分成两块儿更高效维护，逻辑更清晰。
```txt
区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。
事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，
只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情。vuex 真正限制你的只有 mutation 必须是同步的这一点
（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态
（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。如果你开着 devtool 调用一个异步的 action，
你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。

```

[VueX的实现原理](https://www.cnblogs.com/tg666/p/11532587.html)

3. position值有哪些？inherit什么时候会用到？可以用来制作列表的固定表头？父级固定定位，子元素继承
![position](面试被问到的问题_files/1.jpg)

background-image:inherit 背景图也可以继承

4. http请求options和get请求的区别？http头有哪些？
[http请求头详解](https://cloud.tencent.com/developer/article/1165530)
[http请求头详解2](https://www.cnblogs.com/caijinghong/p/14116560.html)
[options具体用法](https://www.cnblogs.com/kaiqinzhang/p/12090285.html)
options请求，在响应头里会有个allow字段，值是运行的请求方法

TRACE方法是HTTP（超文本传输）协议定义的一种协议调试方法，该方法使得服务器原样返回任何客户端请求的内容。

CONNECT作用
```
1、HTTP代理使用的就是connect这个方法，connect在网页开发中不会使用到。

2、connect的作用就是将服务器作为代理，让服务器代替用户去访问其他网页（说白了，就是翻墙），之后将数据返回给用户。

3、connect是通过TCP连接代理服务器的。加入我想告诉代理服务器向访问https://www.jianshu.com/u/f67233ce6c0c网站，就需要首先建立起一条从我的客户端到代理服务器的TCP连接，然后给代理服务器发送一个HTTP报文：
```

常用请求头：
Host,User-Agent,Accept,Accept-Language,Accept-Encoding,Accept-Charset,Content-Type,Connection,cookie,Referer

响应头：
Allow，Age，Cache-Control，Content-Encoding，Content-Language，Content-Length，Content-Type，Date，Etag，Expires
Last-Modified，Pragma，Location，Server，Set-Cookie

5. $attrs和$listener什么时候会用到？
爷孙传值
```js
其实$attrs，$listeners，$props都是一样的，我们可以通过当前组件实例访问到，具体包含如下：

$attrs：当前组件的属性，通俗的讲也就是在组件标签定义的一系列属性，如input的value，placeholder等，但是不包括在当前组件里面定义的props属性

$listeners：当前组件监听的事件，通俗的讲也就是在使用组件的时候在标签中定义的事件，如@input，以及一些自定义事件@tempFn等

$props：当前组件从父组件那里接收的参数，通俗的讲和$attr差不多，但是只包括在当前组件中定义了的props属性
```

```js
1 // father组件
 2 <template>
 3   <div id="father">
 4     <child :temp="tempdata" @tempFn="fatherFn" prop='$attrs不会传递child组件中定义的props 
 5      值'>
 6     </child>
 7   </div>
 8 </template>
 9 <script>
10 import Child from './child'
11 export default {
12    component: { Child },
13   data() {
14     tempdata: 'i am father'
15   },
16   methods: {
17     fatherFn: function() {
18       console.log('father function!');
19     }
20   }
21 }
22 </script>
23 
24 // child组件
25 <template>
26   <div id="child">
27     <son v-bind="$attrs" v-on="$listener"></son>
28   </div>
29 </template>
30 <script>
31 import Son from './son'
32 export default {
33   component: {Son},
34   props: { 'prop' },
35   data() {
36     return {}
37   },
38   mounted() {
39     // 结果显示为$attrs.temp，不包含prop
40     console.log(this.$attrs)
41     this.$emit('tempFn')
42   },
43   methods: {}
44 }
45 </script>
46 
47 // son组件
48 <template>
49   <div id="son">
50     {{ $attrs.temp }}
51   </div>
52 </template>
53 <script>
54 export default {
55   prop: {},
56   data() {
57     return {}
58   },
59   mounted() {
60     this.$emit('tempFn')
61   },
62   methods: {}
63 }
64 </script>
```

6.1 MVVM解释
Model:模型层，可能是固定写死的数据，更多的是网络请求中获取的数据；
View:视图层，前端开发中通常就是DOM层，主要做用给用户展示各种信息；
ViewModel：视图模型层，视图模型是VIew和Model沟通的桥梁；一方面实现了Data Binding（数据绑定），
将Model的改变实时地反映到 View 中；另一方面实现了 DOM Listener（DOM监听），当DOM发生一些事件时监听并改变对应的 Data

6. Vue双向绑定原理？
vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的?
实现mvvm主要包含两个方面，数据变化更新视图，视图变化更新数据：
![流程图](面试被问到的问题_files/2.jpg)
[双向绑定原理](https://www.cnblogs.com/canfoo/p/6891868.html)

把伪数组转成数组后就可以使用数组的方法了。

7. 前端UI框架哪些？ElementUI，bootstrap，layui？

8. Vue兄弟组件间通信有哪些方式？
Event Bus

9. Array中forEach和Map的区别？
Map有返回值，是返回新对象

10. 什么时候会用到call和apply?
1. 继承会用
2. 调用原型上的方法会用，比如伪数组转数组

12. git和svn的区别
SVN是集中式版本控制系统，版本库是集中放在中央服务器，而工作的时候，用自己的电脑，
首先要从中央服务器得到最新的版本，然后工作后，需要把自己做完的活推送到中央服务器。
集中式版本控制系统必须联网才能工作，对网络要求比较高。

Git是分布式版本控制系统，没有中央服务器，每个人电脑都有一个完整的版本库，工作的时候不需要联网
Git是世界上最先进的分布式版本控制器
[常规使用流程](https://blog.csdn.net/weixin_42490398/article/details/90212418)

13. 具名插槽，作用域插槽区别？
具名插槽：单个插槽和具名插槽中插槽上不绑定数据，所以父组件提供的模板既要包括样式又要包括数据
作用域插槽：作用域插槽是子组件提供数据