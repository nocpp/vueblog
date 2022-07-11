---
title: TypeScript
date: '2022-07-08'
sidebar: 'auto'
categories:
 - typescript
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