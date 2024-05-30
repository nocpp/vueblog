---
title: 高阶组件
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - 高阶组件
publish: true
---
## 定义
高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

属于**装饰器模式**，使用ES7的@decorator可以简写

[装饰者模式的应用：react高阶组件和ES6 装饰器](https://blog.csdn.net/weixin_33693070/article/details/88731569)

具体而言，高阶组件是参数为组件，返回值为新组件的函数。

```jsx
//使用函数语法
const EnhancedComponent = higherOrderComponent(WrappedComponent);

//或者使用装饰器语法
@higherOrderComponent
export class WrappedComponent2 extends React.Component {}

const higherOrderComponent = WrappedComponent => class extends React.Component {
	render() {
		return <WrappedComponent {...this.props} />
	}
}
```

组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

## 实现方式
1. 属性代理
```jsx
import React, { Component } from 'react';
 
const propsProxyHoc = WrappedComponent => class extends Component {
 
  handleClick() {
    console.log('click');
  }
 
  render() {
    return (<WrappedComponent
      {...this.props}
      handleClick={this.handleClick}
    />);
  }
};
```

2. 反向继承
```jsx
const MyContainer = (WrappedComponent) => 
class extends WrappedComponent {
  render() {
    if (this.props.loggedIn) {
        return super.render(); 
    } else {
        return null;
     }
   }
}
```

## 使用情景
当多个组件大部分代码差不多时，可以使用高阶组件提取公共代码并复用，然后用高阶组件生成对应组件

## 特点
1. 高阶组件是纯函数
2. 不用的props应该透传
```jsx
render() {
  // 过滤掉非此 HOC 额外的 props，且不要进行透传
  const { extraProp, ...passThroughProps } = this.props;

  // 将 props 注入到被包装的组件中。
  // 通常为 state 的值或者实例方法。
  const injectedProp = someStateOrInstanceMethod;

  // 将 props 传递给被包装组件
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

## 例子
```jsx
// React Redux 的 `connect` 函数
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

## 注意事项
1. 不要在render函数中使用高阶函数
React 的 diff 算法（称为协调）使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。 如果从 render 返回的组件与前一个渲染中的组件相同（===），则 React 通过将子树与新子树进行区分来递归更新子树。 如果它们不相等，则完全卸载前一个子树。

通常，你不需要考虑这点。但对 HOC 来说这一点很重要，因为这代表着你不应在组件的 render 方法中对一个组件应用 HOC：

2. Refs 不会被传递，因为ref不在props中