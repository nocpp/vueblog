---
title: 装饰器模式
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 设计模式
tags:
 - 装饰器模式
publish: true
---

### 定义
> 装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

### 使用情景
1. React高阶组件
2. Redux中connect函数
3. ES7中@descorator 语法

### 实现方式
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