---
title: 个人收藏
date: '2021-12-07'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - person
publish: false
---

## 解决BUG的通用步骤方法
1. 沟通：搞清楚问题是什么
2. 复现：在原环境复现，然后找到出问题的地方；
  2.1 如果很复杂难以找到错因，比如是框架报错，可以先安装一个同版本的简单框架，慢慢增加代码的方式查看是否复现
  2.2 也可以直接在代码中通过注释多余代码的方式进行排查
  2.3 复现一致性：检查代码的版本，代码运行环境，进行的业务操作是否一致
  2.4 找到原因：可以通过查看开源项目源码进行分析
3. 解决：修改代码解决问题，要分析评估影响范围，不要造成多余影响

## 搜索引擎调教
### 不看某个网站结果
```shell
如何学习看一本书？- csdn
```
### 只搜索某个网站结果
```shell
site:xiaohongshu.com 护士科研
```


### 资料检索
- site:blog.sina.com.cn 在新浪博客检索
- site:xiaohongshu.com
- site:weixin1

## sub 和 sup
> 可以用来显示上标和下标，比如2^10 = 2 <sup>10</sup>,sub是下标，两者不能同时使用

## 为什么前端人员要熟悉nodejs
1. 了解Server端开发后，更容易理解后端开发，和后端沟通
2. 在大前端中，可以更有效的进行开发，前端负责接口层，后端只负责数据和底层
[参考](https://www.imooc.com/article/293310/)

## 参考书
- [代码整洁之道](https://github.com/glen9527/Clean-Code-zh/blob/master/docs/ch1.md)
- [重构](https://github.com/NxeedGoto/Refactoring2-zh)

## 需要掌握的知识
- JS（基础面试题，手写代码题，算法题）
- CSS，HTML（常见布局，flex，grid，position）
- React（React-router,redux,antd,formily,react-native）
- Vue（Vue3,vuex,vue-router,element-ui,uniapp）
- 浏览器性能调优（Chrome开发工具的使用）
- Webpack
- 网络协议
- PgRest

- TypeScript [doing]
- Nodejs [doing]
- SSR 
- Threejs 3D方向

## 常见问题
### 什么是闭包？
    答：闭包是函数+创建函数的词法作用域的组合的概念，通过它，子函数可以访问外部函数作用域的变量，即使外部函数已经执行完了
### 什么是跨域？怎么解决跨域？
    答：当一个请求url的协议、域名、端口三者之间任意一个与当前页面url不同即为跨域。可以使用jsonp，cors，nginx反代解决跨域
### 对自己的职业规划？
    答：职业方向是成为团队带头人，能够独立带团队完成开发。具体我会从以下几个方面提升自己。第一，学习公司的产品以及客户的需求，站在
客户的角度上去考虑优化使用体验，学习产品设计，原型图设计。第二，学习开发流程，从接到需求到产品上线，开发过程中的步骤都要
去学习了解。第三，深入前端框架选型、架构设计、构建工具，到后端通信机制、设计与交互、网络和浏览器优化等各方面的知识，做到一专多长。
### 个人介绍？
    答：面试官您好，我是邱晓东，于2017年毕业于内蒙古大学，专业是信息与计算科学，从事前端快5年了。我目前是在千变科技工作，主要负责公司业主平台前端的相关业务的开发和一些前端小组的管理工作--包含需求分析，任务拆分及招聘工作。这个项目有APP端，小程序端，大屏端和Web端，项目主要功能是帮客户管理工程的投资流程，从项目立项，招标，到最后施工完成，资金的流向，审批等。让客户能在系统中便捷的管理投资，把控投资进度，解决线下审批繁琐，资料多整理困难的问题。项目主要的技术栈是React，ReactNative，Uniapp。在项目开发中，最困难的模块就是投资模块，因为要把之前线下的流程转换成线上流程，

### Vue和React的区别？
### Vue的响应式原理？Vue 3更新内容
### TCP三次握手
### 从输入地址到页面展现的过程
### React Fiber是什么？是为了解决什么问题？
### React Hooks是为了解决什么问题？
### position有几种值？
### 项目优化？减小打包体积，提升打包速度，提升页面展示速度？
### Vue插槽种类
### Diff算法
### Https加密过程


## yarn报错
- [Integrity check failed](https://blog.csdn.net/fatpsm/article/details/118193334)
```js
yarn cache clean
yarn --update-checksums
```

## 发票四联
- 存根联：是指已开具的发票用来存档的。
- 记账联：是自己开完发票后用来记账的。
- 发票联：是给对方用来做账的。
- 抵扣联：是给对方用来抵扣进项税额的。

## 园区代开
- 园区个人代开，是指地方政府指定的税收优惠园区，园区内进行纳税可以享受到一定的税收扶持和优惠，通过园区内进行办理个人代开优势也更多，因为个人代开每个地方限制不同，园区自然人代开是运用了核定征收，综合税率在1.5%左右，完税后有完税凭证。

## 上下文无关文法
- [上下文无关文法](https://www.zhihu.com/question/21833944/answer/307309365)

## JSON序列化三种情况
```js
JSON.parse(JSON.stringify({num: NaN}))
{num: null}num: null[[Prototype]]: Object

JSON.parse(JSON.stringify({num: undefined}))
{}

JSON.parse(JSON.stringify({num: null}))
{num: null}
```


## 小程序生命周期Taro
### 冷启动
1. componentDidMount
2. onLaunch
3. onShow(componentDidShow)
4. onHide

### 热启动
1. componentDidShow

### 页面生命周期
1. 小程序跳转页面生命周期（冷启动，热启动）componentDidMount和componentDidShow都执行
2. 普通打开小程序，热启动只执行componentDidShow

## 锁包机制
- package.json 和 package.lock 关系，npm安装依赖时，看看lock是否和package兼容，兼容的话，就用lock中的，否则用package
- yarn.lock，yarn安装时，使用yarn.lock
- cnpm，没有锁
- pnpm，使用pnpm.lock.yaml，可以用pnpm import

## Taro版本控制
如果发现不一致的情况可以使用 Taro 升级命令 taro update self [版本号] 和 taro update project [版本号]来分别将 CLI 和项目依赖升级到指定版本；或者也可以手动安装相应版本 CLI，修改 package.json 依赖版本号，然后重装依赖来解决。

## vim常用快捷键
```shell
gg 回到开头
shift+g 到结尾

w 向右跳光标
b 向左跳光标

向下翻一页：Ctrl + f 或 PageDown
向上翻一页：Ctrl + b 或 PageUp
向下翻半页：Ctrl + d
向上翻半页：Ctrl + u

0 回到当前行首
$ 跳到当前行尾

:set cursorline 高亮光标


:changes 查看修改历史

p：粘贴
u：撤消上一步操作
Ctrl+r：重做上一步操作
/：进入搜索模式
n：查找下一个匹配项
N：查找上一个匹配项

i：进入插入模式
Esc：退出插入模式
:w：保存文件
:q：退出 Vim
:wq：保存并退出 Vim
:x：保存并退出 Vim
:q!：强制退出 Vim
dd：删除当前行
yy：复制当前行

:set number：显示行号
:set nonumber：隐藏行号

:set cursorline 设置光标下划线
:set nocursorline 设置不要光标下划线
:highlight CursorLine guibg=yellow ctermbg=yellow 设置光标下划线样式
```

## Linux目录名解释
### bin目录，存放执行二进制可执行文件
> binary二进制
比如ls,ping,cp,mv等基本命令
### etc目录，存放系统管理和配置文件，如ssh，apache，nginx，mysql配置文件
> 它是英文单词"et cetera"的缩写，意思是“等等，其他的事情”
如ssh，apache，nginx，mysql配置文件
### home，存放所有用户文件的根目录
### usr，存放系统应用程序
> 是Unix Software Resource的缩写
- /usr/bin 存在用户安装的二进制程序
- /usr/sbin root权限安装的程序
- /usr/doc linux帮助文档
- /usr/include 头文件
- /usr/lib 动态库
- /usr/man 帮助
- /usr/src 源码
- /usr/local/bin 本地增加的命令
- /usr/local/lin 本地库
### opt目录，可以选择额外安装的一些应用，比如java,php
> optional
/opt目录是可选的应用程序包的安装目录。它通常用于存储第三方软件包和应用程序，而不是由操作系统提供的软件包。/opt目录通常是只读的，只有root用户才有写权限，因此安装应用程序时需要使用sudo或root权限。

### proc目录
虚拟文件系统目录，是系统内存的映射，可以获取CPU，内存，温度等系统信息

### root目录
超级用户的主目录，只有root用户可以访问

### sbin目录
存放二进制可执行文件，只有root可以访问

### dev目录
> devices缩写
存放设备的驱动文件

### boot
存放系统引导时使用的各种文件

### lib
存放程序运行时需要的共享库，类似.dll文件

### tmp
临时文件，公用的临时文件存储点

### var
> variable
存放运行时需要改变数据的文件，某些大型文件的一出去，比如服务的日志文件。系统启动日志等


## 马云刘强东视频思考
1. 当你觉得一个行业满是问题的时候，那恰恰是有机会成功的行业。比如当初京东物流成立
2. 企业管理的制度很重要，管理不行，人性的恶就会逐渐出现
3. 与大企业竞争小心被控股后控制，比如马云公司被电信140w控股，导致董事会没有发言权，公司就不行了
4. 选择的行业要有前景，要坚持下去
5. 当与投资人谈判的时候，不要把他当爸爸，要当舅舅，腰杆挺直、好坏都要说，不然光说好话，万一以后遇到情况会失去信任
6. 做事情方向很重要，并不需要说具体到每个步骤都要十全十美，开始再说，逐步完美
7. 必须学好英语，与国际接轨！第一至少要能无障碍看懂英文文章，速度要能达到和中文一样！！其次下一步口语达到常用对话！！