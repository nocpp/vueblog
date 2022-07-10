---
title: TypeScript
date: '2022-07-01'
sidebar: 'auto'
categories:
 - javascript
tags:
 - ts
publish: true
---

## type和interface的区别
- type可以使用联合类型(string | number)
- type可以创建utility types,比如Parameter<typeof http>
- 虽然很多时候可以互换


## utility types
- Parameter, 可以读取后面泛型的参数
- Partial，可以生成根据老类型生成新类型，允许不传任何属性
- Omit，返回一个类型，可以删除一些属性的类型，剩余类型必须传
- Pick
- Exclude