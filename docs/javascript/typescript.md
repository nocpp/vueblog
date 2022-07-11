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


## React中获取一个组件的属性值
- React.componentProps<Select.Option>可以获取
