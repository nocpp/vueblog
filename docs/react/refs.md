---
title: refs
date: '2021-10-09'
sidebar: 'auto'
categories:
 - react
tags:
 - react
publish: true
---

## 是什么？
Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。

## 使用方法
```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;

//然后可以通过ref.current访问Dom
```

## 注意
第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。
Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。

- uesRef 返回的对象将在组件的整个生命周期内保持。
- ref 不仅仅用于访问DOM节点，他其实是一个通用容器，其 current 属性是可变的，可以保存任何值，类似于类上的实例属性。