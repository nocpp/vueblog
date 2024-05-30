---
title: TypeScript
date: '2022-07-08'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - ts
publish: true
---

## const 和 let 类型推断
```ts
const strA = 'abc';//是'abc'字面量类型
let strN = 'def';//是string类型
```

## 数组不同类型的值的问题
```ts
const test = ['123', {}, function];//test 是 number | {} | () => {}[]
const test2 = ['123', {}, function] as const;//可以解决类型问题
```
## type和interface的区别
- type可以使用联合类型(string | number)
- type可以创建utility types,比如Parameter&lt;typeof http&gt;
- 虽然很多时候可以互换
- interface 同名会合并


## utility types
> [参考](https://juejin.cn/post/6994038108543156238#heading-11)
- Parameter, 可以读取后面函数的的参数类型，返回元组
- Partial，可以生成根据老类型生成新类型，允许不传任何属性
- Omit，返回一个类型，可以删除一些属性的类型，剩余类型必须传
- Pick
- Exclude


## React中获取一个组件的属性值
- React.componentProps<Select.Option>可以获取

## .d.ts文件作用
统一被称为描述文件，至于前面的文字是什么无所谓，不管是a.d.ts还是jQuery.d.ts都可以，它的作用就是为js文件描述类型
> .d.ts描述文件，它的主要作用就是弥补一些缺失的类型，使得Javascript文件也可以在Typescript中继续使用，比如使用jquery
> 其主要方式就是通过关键词declare来描述各种类型，比如变量，对象，函数等等，描述完成后，Typescript可以自动的去识别.ts文件里对应的变量、函数、对象；
- 关键字：declare，它代表是一个声明，声明后面为定义类型的代码的类型
- [参考](https://blog.csdn.net/zy21131437/article/details/121946978)
- declare function
- declare module
- declare const
- declare namespace,描述用点表示法访问的类型或值
- declare interface