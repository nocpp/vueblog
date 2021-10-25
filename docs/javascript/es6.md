---
title: ES6 常用属性
date: '2021-10-25'
sidebar: 'auto'
categories:
 - javascript
tags:
 - es6
publish: true
---

## Symbol的用法
ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。

Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。

```js
let s = Symbol();

typeof s
// "symbol"
```

:::danger
基本上，它是一种类似于字符串的数据类型。所以不能使用new来生成。
:::

Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```js
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

s1.description // "foo", ES2019 提供了一个实例属性description
```

### Symbol作为对象属性名的使用
```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```