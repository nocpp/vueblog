---
title: 组件和props
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - react
publish: true
---

## 什么是React组件？
组件，从概念上类似于JS函数，它接受任意的入参，返回用于描述页面展示内容的React元素。
React 组件是组成UI的代码片段，是独立的和可复用的

## 函数组件与class组件
### 函数组件
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
### class组件
```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
上述两个组件在 React 里是等效的

## Props
当React元素为用户自定义组件时，它会将JSX所接收的属性和子组件children转换为单个对象传递给组件，
这个对象被称之为“props”。

组件名称必须以大写字母开头。

## 提取组件
当组件多次被调用时，就要提取出来作为可复用的公共组件，提高可维护性和复用性

## Props的只读性
无论是函数组件还是class组件，都不能修改自身的props

## State与Props
State与Props类似，但是State是私有的，并且完全受控于当前组件

## 不要直接修改state，要通过setState来修改

## 出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用
## this.props 和 this.state 可能会异步更新
```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
可以让 setState() 接收一个函数而不是一个对象。
这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数

## 自上而下”或是“单向”的数据流

## class组件构造函数的使用，constructor
```js
constructor(props) {
  super(props);
  // 不要在这里调用 this.setState()
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

## 避免将 props 的值复制给 state！这是一个常见的错误
如此做毫无必要（你可以直接使用 this.props.color）
只有在你刻意忽略 prop 更新的情况下使用，此时也应该改props的属性名为default或者initial
```js
constructor(props) {
 super(props);
 // 不要这样做
 this.state = { color: props.color };
}
```

## key属性
```js
class EmailInput extends Component {
  state = { email: this.props.defaultEmail };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }
}
```
key属性一般用于列表渲染，但普通组件也可以使用，
当 key 变化时， React 会创建一个新的而不是更新一个既有的组件。
使用此方法，不用为每次输入都添加 key，在整个表单上添加 key 更有位合理。每次 key 变化，表单里的所有组件都会用新的初始值重新创建。

key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值：

## 受控组件
渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

## 非受控组件
因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。
```jsx
<input type="file" />

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

## 处理多个输入
当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作。

## 受控输入空值
在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。

## 默认值
在 React 渲染生命周期时，表单元素上的 value 将会覆盖 DOM 节点中的值。在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个 defaultValue 属性，而不是 value。在一个组件已经挂载之后去更新 defaultValue 属性的值，不会造成 DOM 上值的任何更新。

```html
同样，<input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked，<select> 和 <textarea> 支持 defaultValue。
```

## 文件输入
```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.current.files[0].name}`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);
```