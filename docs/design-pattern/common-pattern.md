---
title: 常用设计模式
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 算法与数据结构
tags:
 - 设计模式
publish: true
---
# JS设计模式

## 工厂模式, new 实例
```js
class Man {
  constructor(name) {
    this.name = name
  }
  alertName() {
    alert(this.name)
  }
}

class Factory {
  static create(name) {
    return new Man(name)
  }
}

Factory.create('yck').alertName()
```

## 单例模式
在 Vuex 源码中，你也可以看到单例模式的使用，虽然它的实现方式不大一样，通过一个外部变量来控制只安装一次 Vuex

## 适配器模式
适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。
```js
class Plug {
  getName() {
    return '港版插头'
  }
}

class Target {
  constructor() {
    this.plug = new Plug()
  }
  getName() {
    return this.plug.getName() + ' 适配器转二脚插头'
  }
}

let target = new Target()
target.getName() // 港版插头 适配器转二脚插头
```

## 装饰模式
装饰模式不需要改变已有的接口，作用是给对象添加功能。就像我们经常需要给手机戴个保护套防摔一样，不改变手机自身，给手机添加了保护套提供防摔功能。
以下是如何实现装饰模式的例子，使用了 ES7 中的装饰器语法
```js
function readonly(target, key, descriptor) {
  descriptor.writable = false
  return descriptor
}

class Test {
  @readonly
  name = 'yck'
}

let t = new Test()

t.yck = '111' // 不可修改
```

## 代理模式
代理是为了控制对对象的访问，不让外部直接访问到对象。
在现实生活中，也有很多代理的场景。比如你需要买一件国外的产品，这时候你可以通过代购来购买产品。
```js
<ul id="ul">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<script>
    let ul = document.querySelector('#ul')
    ul.addEventListener('click', (event) => {
        console.log(event.target);
    })
</script>
```

## 外观模式
外观模式提供了一个接口，隐藏了内部的逻辑，更加方便外部调用。
```js
function addEvent(elm, evType, fn, useCapture) {
  if (elm.addEventListener) {
    elm.addEventListener(evType, fn, useCapture)
    return true
  } else if (elm.attachEvent) {
    var r = elm.attachEvent("on" + evType, fn)
    return r
  } else {
    elm["on" + evType] = fn
  }
}
```
对于不同的浏览器，添加事件的方式可能会存在兼容问题。如果每次都需要去这样写一遍的话肯定是不能接受的，
所以我们将这些判断逻辑统一封装在一个接口中，外部需要添加事件只需要调用 addEvent 即可。

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

## 门面模式
例如Vue.$forceUpdate, 只是提供给你了一个便捷的api

## 策略模式
例如路由，不同的path，不同的页面