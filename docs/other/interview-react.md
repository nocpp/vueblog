---
title: React 知识点
date: '2022-01-19'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - React
publish: true
---

## React state
- hooks中setState存在批量更新，在React事件系统函数上下文中存在批量更新，比如点击事件。但是如果在事件回调函数中异步操作setState，异步回调中将打破批量操作，变成同步操作。setState后，继续执行setState后的代码，排队更新
- 批量更新的事件包含Effect mount事件，点击事件，函数组件的执行代码里，全部生命周期事件(应该是)...
```js
const funC = () => {
	const [ number , setNumber ] = React.useState(0)
	if (number === 0) {//批量更新
	    setNumber(1);
	    console.log('qxdlog_number1: ', number);
	
	    setNumber(2);
	    setNumber(4);
	    setNumber(5);
	    setNumber(200);
	    console.log('qxdlog_number2: ', number);
	}
	return <div>{number}</div>;
}
```
- hooks中不同的state的setState也存在批量更新，和上面条一样的
```js
const change = () => {
	setName('李四');
	console.log('set李四之后');
	setSex('女');
	console.log('set女之后');
	//输出set李四之后，set女之后。然后更新函数组件，执行时name和sex都是新值
};
```
- ReactDom.flushSync 可以提高优先级，会打破批量更新，优先更新回调
- ReactDom.unstable_batchedUpdates 可以强制开启批量更新，它回调函数中操作将执行批量更新

## hooks中setState中传入函数与值的区别
- 传入函数，将会获取最新的state进行操作，返回值将作为新的state
```js
setName(state => state + 1);//state是最新的
setName(name + 1);//这个name是老的
```
- 传入值，赋值给state

## hooks中setState传入相同的值是否会更新？
```js
//这种不会更新
const [ state  , dispatchState ] = useState({ name:'alien' })
const  handleClick = ()=>{ // 点击按钮，视图没有更新。
	state.name = 'Alien'
	dispatchState(state) // 直接改变 `state`，在内存中指向的地址相同。
}

//这种直接放在函数组件代码里的，会更新，而且如果不加if，会报错，re-render次数超过限制
if (state.name !== 'Alien') {
	state.name = 'Alien'
	dispatchState(state) // 直接改变 `state`，在内存中指向的地址相同。
}
```


## React.memo与PureComponent
- React.memo检查 props 变更，用作函数组件性能优化，可以传入第二个参数进行比较过程，true则相等，与shouldComponentUpdate相反
> 如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用
- React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数,shouldComponentUpdate

## React事件
> React中的事件是合成事件，synthetic事件，如果更新了函数组件，会把新的回调函数传给事件，不会重复绑定

## React拖拽
> 函数组件和类组件一样的效果，之前不行是因为事件和state更新理解不到位，还有就是move事件范围
```js
class App extends React.Component {
    state = {
        mouseStartLeft: 0,
        mouseStartTop: 0,
        targetLeft: 0,
        targetTop: 0,
        isDown: false,
        posLeft: 0,
        posTop: 0
    }

    handleMouseDown = (e) => {
        this.setState({
            isDown: true,
            mouseStartLeft: e.clientX,
            mouseStartTop: e.clientY,
            targetLeft: e.target.offsetLeft,
            targetTop: e.target.offsetTop
        });
    }

    handleMouseMove = (e) => {
        if (this.state.isDown) {
            this.setState((state) => {
                return {
                    posLeft: e.clientX - state.mouseStartLeft + state.targetLeft,
                    posTop: e.clientY - state.mouseStartTop + state.targetTop
                }
            });
        }
    }

    handleMouseUp = (e) => {
        this.setState({
            isDown: false
        })
    }

    render() {
        return <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#eee'
        }}
        onMouseMove={this.handleMouseMove}
        >
            <div
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'skyblue',
                    cursor: 'pointer',
                    position: 'absolute',
                    left: this.state.posLeft,
                    top: this.state.posTop
                }}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
            ></div>
        </div>
    }
}
```