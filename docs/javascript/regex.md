---
title: 正则表达式
date: '2022-01-18'
sidebar: 'auto'
categories:
 - javascript
tags:
 - 正则
publish: true
---

## ？的用法
- 限定符，用于匹配0次或1次
```json
{
    test: /\.tsx?$/
}
```
- 非贪婪匹配, 能匹配少的就不匹配多的原则, 可以用于获取多个括号内容。不加?，默认是贪婪模式，会按最长的匹配
```js
let str = '你好，${name} 已经 ${age}岁了'
str = str.match(/\$\{(.*?)\}/g)
console.log(str);//结果 ['${name}', '${age}']，贪婪模式['${name} 已经 ${age}']
```
- 先行断言，x 只有在 y 前面才匹配，必须写成/ x(?=y)/的形式
```js
//查找字符串%前面的数字
const str = 'The best way to achieve a goal is to devote 100% of your time and energy to it.'
str.match(/\d+(?=%)/g)
```
- 先行否定断言, x 只有不在 y 前面才匹 配，必须写成/ x(?!y)/的形
```js
//查找字符串中数字不在%前面的数字
let str = 'I have more than 100 books'
str.match(/\d+(?!%)/g)
// ["100"]
str = 'I have more than 100 books, but only 20% is about software'
str.match(/\d+(?!%)/g)
// 【注意】2也匹配到了,如果需要把2也过滤掉，需要额外加代码
// ["100", "2"] 
```
- 非获取匹配,输出内容，但是不匹配
```js
/(?:js|golang) is good/.exec('js is good, golang is good')
// js这个词虽然有（）进行处理，但是不会被匹配到，而是整体输出`js is good`
// ["js is good", index: 0, input: "js is good, golang is good", groups: undefined]

/(js|golang) is good/.exec('js is good, golang is good')
// 去掉“?:”之后的结果
// ["js is good", "js", index: 0, input: "js is good, golang is good", groups: undefined]
```
- 后行断言,"后行断言"正好与"先行断言"相反 ， x 只有在 y 后面才匹配 ， 必须写成/(?<=y)x/的 形式
```js
//查找￥后面的数字
let str = `I spent ￥100 RMB to buy this book`
/(?<=￥)\d+/.exec(str)
```
- 后行否定断言, x 只有不在 y 后面才匹配，必须写成/(?<! y)x/的形式
```js
//查找不是￥后面的数字
let str = `I spent $100 RMB to buy this book`;
/(?<!￥)\d+/.exec(str)
// ["100", index: 9, input: "I spent $100 RMB to buy this book", groups: undefined]
```