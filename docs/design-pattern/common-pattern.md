---
title: 常用设计模式
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 设计模式
tags:
 - 设计模式
publish: true
---

## 装饰器模式
> 装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

### 使用情景
1. React高阶组件
2. Redux中connect函数
3. ES7中@decorator 语法

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

## 观察者模式
> 当对象之间存在一对多的依赖关系时，其中一个对象的状态发生改变，所有依赖它的对象都会收到通知，这就是观察者模式。
- 比如Vue中的双向数据绑定就用了观察者模式

## 发布订阅模式
> 发布订阅模式指的是希望接收通知的对象（Subscriber）基于一个主题通过自定义事件订阅主题，发布事件的对象（Publisher）通过发布主题事件的方式通知各个订阅该主题的 Subscriber 对象。
- Event Bus就是使用的发布订阅模式

## 观察者模式与发布订阅模式的区别
- 发布订阅模式有个调度中心，可以通过它知道有哪些订阅者
- 观察者模式是发布者直接与订阅者沟通