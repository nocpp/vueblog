---
title: 知识总结
date: '2021-11-16'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - 总结
publish: true
---

## RN与小程序的区别
[区别](https://blog.csdn.net/SemineLee/article/details/97621503)  
- RN是原生渲染 
- 小程序是webview渲染 

## VueX中为什么要有actions存在？为什么不直接操作mutations？VueX的实现原理是什么？
- actions里是业务代码和异步操作，mutations是同步操作。分成两块儿更高效维护，逻辑更清晰。
```txt
区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。
事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，
只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情。vuex 真正限制你的只有 mutation 必须是同步的这一点
（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态
（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。如果你开着 devtool 调用一个异步的 action，
你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。

```
[VueX的实现原理](https://www.cnblogs.com/tg666/p/11532587.html)

## $attrs和$listener什么时候会用到？
- 爷孙传值，其实$attrs，$listeners，$props都是一样的，我们可以通过当前组件实例访问到，具体包含如下：
- $attrs：当前组件的属性，通俗的讲也就是在组件标签定义的一系列属性，如input的value，placeholder等，但是不包括在当前组件里面定义的props属性
- $listeners：当前组件监听的事件，通俗的讲也就是在使用组件的时候在标签中定义的事件，如@input，以及一些自定义事件@tempFn等
- $props：当前组件从父组件那里接收的参数，通俗的讲和$attr差不多，但是只包括在当前组件中定义了的props属性
```js
<template>
	<div id="father">
		<child :temp="tempdata" @tempFn="fatherFn" prop='$attrs不会传递child组件中定义的props值'>
		</child>
	</div>
</template>
<script>
	import Child from './child'
	export default {
		component: {
			Child
		},
		data() {
			tempdata: 'i am father'
		},
		methods: {
			fatherFn: function() {
				console.log('father function!');
			}
		}
	}
</script>

// child组件
<template>
	<div id="child">
		<son v-bind="$attrs" v-on="$listener"></son>
	</div>
</template>
<script>
	import Son from './son'
	export default {
		component: {
			Son
		},
		props: {
			'prop'
		},
		data() {
			return {}
		},
		mounted() {
			// 结果显示为$attrs.temp，不包含prop
			console.log(this.$attrs)
			this.$emit('tempFn')
		},
		methods: {}
	}
</script>

// son组件
<template>
	<div id="son">
		{{ $attrs.temp }}
	</div>
</template>
<script>
	export default {
		prop: {},
		data() {
			return {}
		},
		mounted() {
			this.$emit('tempFn')
		},
		methods: {}
	}
</script>
```

## MVVM解释
- Model:模型层，可能是固定写死的数据，更多的是网络请求中获取的数据；
- View:视图层，前端开发中通常就是DOM层，主要做用给用户展示各种信息；
- ViewModel：视图模型层，视图模型是VIew和Model沟通的桥梁；一方面实现了Data Binding（数据绑定），
- 将Model的改变实时地反映到 View 中；另一方面实现了 DOM Listener（DOM监听），当DOM发生一些事件时监听并改变对应的 Data

## Vue双向绑定原理？
vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的。 实现mvvm主要包含两个方面，数据变化更新视图，视图变化更新数据：
![流程图](面试被问到的问题_files/2.jpg)
[双向绑定原理](https://www.cnblogs.com/canfoo/p/6891868.html)

## 前端UI框架哪些？ElementUI，bootstrap，layui？

## Vue兄弟组件间通信有哪些方式？
Event Bus

## Array中forEach和Map的区别？
Map有返回值，是返回新对象

## 什么时候会用到call和apply?
1. 继承会用
2. 调用原型上的方法会用，比如伪数组转数组

##  git和svn的区别
- SVN是集中式版本控制系统，版本库是集中放在中央服务器，而工作的时候，用自己的电脑，首先要从中央服务器得到最新的版本，然后工作后，需要把自己做完的活推送到中央服务器。集中式版本控制系统必须联网才能工作，对网络要求比较高。
- Git是分布式版本控制系统，没有中央服务器，每个人电脑都有一个完整的版本库，工作的时候不需要联网，Git是世界上最先进的分布式版本控制器
[常规使用流程](https://blog.csdn.net/weixin_42490398/article/details/90212418)

## 具名插槽，作用域插槽区别？
- 具名插槽：单个插槽和具名插槽中插槽上不绑定数据，所以父组件提供的模板既要包括样式又要包括数据
- 作用域插槽：作用域插槽是子组件提供数据


## JS设计模式
1. 工厂模式, new 实例
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

2. 单例模式
在 Vuex 源码中，你也可以看到单例模式的使用，虽然它的实现方式不大一样，通过一个外部变量来控制只安装一次 Vuex

3. 适配器模式
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

4. 装饰模式
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

5. 代理模式
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

6. 发布-订阅模式 事件监听

7. 外观模式
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