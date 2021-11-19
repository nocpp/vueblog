---
title: 易错点
date: '2021-11-15'
sidebar: 'auto'
categories:
 - javascript
tags:
 - 易错点
publish: true
---

## 类型转换，字面量直接调用方法
```js
6.toString();//只有这个错误，因为JS引擎会误以为是小数点，而下面的就不会

6..toString();

6 .toString();
6    .    toString();//这样也可以调用

(6).toString();
```

## 正则，先行断言
以下可以匹配abc的是？
```js
/^abc$/

/...(?=.)/ //先行断言，相当于前面三个字符后面必须再跟着一个字符，需要四个以上字符，所以不对

/ab[^defg]/ //[^]和/^/的区别，前者是非defg字符，后者是以指定字符开头的意思

/[defg]*/ // *表示可以匹配空字符，包含一切
```

## 变量声明
以下输出的结果？
```js
var res = func();
var func = function func() {};

//会输出type error, 因为变量声明提升了，但是function func() {};不会执行，所以func是undefined
```