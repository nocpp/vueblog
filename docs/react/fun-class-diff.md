---
title: 函数组件和类组件的区别
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - react
 - 函数组件
 - 类组件
publish: true
---

## 函数组件与类组件的共同点
组件是React中可复用的代码片段，他们最终都是返回描述页面展示内容的React元素。

## 函数组件与类组件的不同点
### 设计思想不同
- 类组件的根基是 OOP(面向对象编程)，所以它会有继承，有内部状态管理等
- 函数组件的根基是 FP(函数式编程)，与数学中的函数思想类似，所以假定输入和输出存在某种关联的话，那么相同输入必定会有相同的输出
**所以相对于类组件，函数组件会更加的纯粹，简单，更利于测试**

## 函数组件和类组件的更新机制
### 函数组件的更新
- props变化时会更新
- state hooks变化时会更新

函数组件更新时会把整个函数执行一遍，重新生成一遍函数内**局部变量**

> 当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用 域之外执行。
> 如果将函数（访问它们各自的词法作用域）当作第一 级的值类型并到处传递，你就会看到闭包在这些函数中的应用。在定时器、事件监听器、 Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使 用了回调函数，实际上就是在使用闭包！

[https://segmentfault.com/a/1190000019966124](React Hooks原理)
1. hook是存储在哪里的？
2. 为什么只能在函数内使用？
3. 为什么顺序很重要，不能放入if语句中？

### 类组件的更新
- props变化时会更新
- setState变化时更新
- forceUpdate会更新
> 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。

类组件更新时会把render函数执行一遍

> 模块是自动运行在严格模式下并且没有办法退出运行的JS代码，在模块顶部创建的变量不会自动被添加到全局共享作用域，这个变量仅在模块的顶级作用域中存在.ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。

#### 类组件更新生命周期顺序
- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

## 迷惑性代码
:::danger
以下两个组件，看起来好像一样，但实际不同，当单击任意一个查询按钮后，再在3s内执行切换user，最后结果是函数组件的弹窗显示的名字还是切换前的名字，而类组件则不会
:::
```jsx
class App extends React.Component {
  state = {
    user: '小明',
  };
  render() {
    return (
      <>
        <label>
          <b> : </b>
          <select
            value={this.state.user}
            onChange={e => this.setState({ user: e.target.value })}
          >
            <option value="小明">Dan</option>
            <option value="小白">Sophie</option>
            <option value="小黄">Sunil</option>
          </select>
        </label>
        <h1>{this.state.user}</h1>
        <p>
          <ProfileFunction user={this.state.user} />
          <b> (function)</b>
        </p>
        <p>
          <ProfileClass user={this.state.user} />
          <b> (class)</b>
        </p>
      </>
    )
  }
}

//函数组件的props更新时，整个函数会重新调用，此时props,showMessage,handleClick变量被重新生成，并不会影响之前调用的showMessage，因为之前showMessage中的props已经是之前的props了
const ProfileFunction = (props) => {
  const showMessage = () => {
    alert('用户是' + props.user);
  };
  const handleClick = () => {
    setTimeout(showMessage, 3 * 1000);  // 用 setTimeout 来模拟网络请求
  };
  return (
    <button onClick={handleClick}>查询</button>
  );
}

//这个类组件和函数组件效果不同
//类组件的props更新时是更新了数据，而不是整个类
class ProfileClass extends React.Component {
  showMessage = () => {
	//这是最新的
    alert('用户是' + this.props.user);
  };
  handleClick = () => {
    setTimeout(this.showMessage, 3 * 1000);
  };
  render() {
    return <button onClick={this.handleClick}>查询</button>;
  }
}

//这个类组件和函数组件效果相同
class ProfileClass extends React.Component {
  showMessage = (user) => {
    alert('用户是' + user);
  };
  handleClick = () => {
	const { user } = this.props;
    setTimeout(() => this.showMessage(user), 3 * 1000);
  };
  render() {
    return <button onClick={this.handleClick}>查询</button>;
  }
}
```

## 变量位置影响
- 变量写在组件外面，模块更新时不会重新生成该变量
- 变量写在组件里面，模块更新时，会重新初始化
- 变量赋值是hooks，模块更新时会查找该函数的hooks数组，有state的话会赋值给它
