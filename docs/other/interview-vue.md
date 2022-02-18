---
title: Vue 知识点
date: '2022-02-15'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - Vue
publish: true
---

## Vue3为什么用proxy？
-  Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好
-  并且原本的实现有一些数据更新不能监听到，但是 Proxy 可以完美监听到任何方式的数据改变

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
		getLogger(target, property)
		// 这句判断代码是新增的
		if (typeof target[property] === 'object' && target[property] !== null) {
			return new Proxy(target[property], handler);
		} else {
			return Reflect.get(target, property);
		}
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
```

## 生命周期钩子函数
- beforeCreate, 获取不到 props 或者 data 中的数据
- created, 组件还没被挂载
- beforeMount, 开始创建 VDOM
- mounted, 并将 VDOM 渲染为真实 DOM 并且渲染数据。组件中如果有子组件的话，会递归挂载子组件
- beforeUpdate
- updated
- activated,keep-alive
- deactivated,keep-alive
- beforeDestroy
- destroyed

## 组件通信
### 父子通信
- props和$emit,$on,$off，$once
- $parent和$children
- .sync
```html
<!--父组件中-->
<input :value.sync="value" />
<!--以上写法等同于-->
<input :value="value" @update:value="v => value = v"></comp>
<!--子组件中-->
<script>
  this.$emit('update:value', 1)
</script>
```
- $listener和$attrs和inheritAttrs
	+ $attrs, 包含了父作用域中不被认为 (且不预期为) props 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 props 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind=”$attrs” 传入内部组件——在创建更高层次的组件时非常有用。
	+ $listeners,包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on=”$listeners” 传入内部组件——在创建更高层次的组件时非常有用。
	+ inheritAttrs,默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。而通过 (同样是 2.4 新增的) 实例属性 $attrs 可以让这些特性生效，且可以通过 v-bind 显性的绑定到非根元素上。
```html
//A组件
<template>
 <div id="app">
 <child1
 :p-child1="child1"
 :p-child2="child2"
 v-on:test1="onTest1" //此处监听了两个事件，可以在B组件或者C组件中直接触发
 v-on:test2="onTest2"> 
 </child1>
 </div>
</template>
<script>
 import Child1 from './Child1.vue';
 export default {
 data () {
 return {};
 },
 components: { Child1 },
 methods: {
 onTest1 () {
 console.log('test1 running...');
 },
 onTest2 () {
 console.log('test2 running');
 }
 }
 };
</script>

//B组件
<template>
 <div class="child-1">
 <p>in child1:</p>
 <p>props: {{pChild1}}</p>
 <p>$attrs: {{$attrs}}</p>
 <hr>
 <!-- C组件中能直接触发test的原因在于 B组件调用C组件时 使用 v-on 绑定了$listeners 属性 -->
 <!-- 通过v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的） -->
 <child2 v-bind="$attrs" v-on="$listeners"></child2>
 </div>
</template>
<script>
 import Child2 from './Child2.vue';
 export default {
 props: ['pChild1'],
 data () {
 return {};
 },
 inheritAttrs: false,
 components: { Child2 },
 mounted () {
 this.$emit('test1');
 }
 };
</script>

//C组件
<template>
 <div class="child-2">
 <p>in child2:</p>
 <p>props: {{pChild2}}</p>
 <p>$attrs: {{$attrs}}</p>
 <hr>
 </div>
</template>
<script>
 export default {
 props: ['pChild2'],
 data () {
 return {};
 },
 inheritAttrs: false,
 mounted () {
 this.$emit('test2');
 }
 };
</script>
```

### 兄弟组件通信
- this.$parent.$children
- $children中组件name

### 跨多层级组件通信
- provide/inject
```js
// 父组件 A
export default {
  provide: {
    data: 1
  }
}
// 子组件 B
export default {
  inject: ['data'],
  mounted() {
    // 无论跨几层都能获得父组件的 data 属性
    console.log(this.data) // => 1
  }
}
```

### 任意组件
- Vuex
- Event Bus,使用Vue的实例，实现事件的监听和发布，实现组件之间的传递。

## extend 能做什么
这个 API 很少用到，作用是扩展组件生成一个构造器，通常会与 $mount 一起使用。

## mixin 和 mixins 区别
mixin 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的
```js
Vue.mixin({
    beforeCreate() {
        // ...逻辑
        // 这种方式会影响到每个组件的 beforeCreate 钩子函数
    }
})
```

### mixins
mixins 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。
```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

## computed 和 watch 区别
- computed是计算属性，依赖其他属性，有缓存
- watch 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作
- 支持对象写法
```js
vm.$watch('obj', {
    // 深度遍历
    deep: true,
    // 立即触发
    immediate: true,
    // 执行的函数
    handler: function(val, oldVal) {}
})
var vm = new Vue({
  data: { a: 1 },
  computed: {
    aPlus: {
      // this.aPlus 时触发
      get: function () {
        return this.a + 1
      },
      // this.aPlus = 1 时触发
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
```

## keep-alive 组件有什么作用
如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件。

对于 keep-alive 组件来说，它拥有两个独有的生命周期钩子函数，分别为 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。


## v-show 与 v-if 区别
- v-show 只是在 display: none 和 display: block 之间切换。切换开销很小，适合于频繁切换的场景
- v-if 的话就得说到 Vue 底层的编译了。当属性初始为 false 时，组件就不会被渲染，直到条件为 true，并且切换条件时会触发销毁/挂载组件，所以总的来说在切换时开销更高，更适合不经常切换的场景。

## 组件中 data 什么时候可以使用对象
- 组件复用时所有组件实例都会共享 data，如果 data 是对象的话，就会造成一个组件修改 data 以后会影响到其他所有组件，所以需要将 data 写成函数，每次用到就调用一次函数获得新的数据。
- 当我们使用 new Vue() 的方式的时候，无论我们将 data 设置为对象还是函数都是可以的，因为 new Vue() 的方式是生成一个根组件，该组件不会复用，也就不存在共享 data 的情况了。

## 响应式原理
- Vue2 内部使用了 Object.defineProperty() 来实现数据响应式，通过这个函数可以监听到 set 和 get 的事件。Vue 3使用proxy
```js
var data = { name: 'yck' }
observe(data)
let name = data.name // -> get value
data.name = 'yyy' // -> change value

function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  Object.defineProperty(obj, key, {
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,
    // 自定义函数
    get: function reactiveGetter() {
      console.log('get value')
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
    }
  })
}
```

### Dep收集依赖
Dep 类，用于解耦属性的依赖收集和派发更新操作
```js
// 通过 Dep 解耦属性的依赖和更新操作
class Dep {
  constructor() {
    this.subs = []
  }
  // 添加依赖
  addSub(sub) {
    this.subs.push(sub)
  }
  // 更新
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
// 全局属性，通过该属性配置 Watcher
Dep.target = null
```

### Watcher观察
 Watcher（订阅者） : Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是：
- 在自身实例化时往属性订阅器(dep)里面添加自己
- 自身必须有一个update()方法
- 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调
```js
class Watcher {
  constructor(obj, key, cb) {
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]//手动触发了get，添加监听
    Dep.target = null
  }
  update() {
    // 获得新值
    this.value = this.obj[this.key]
    // 调用 update 方法更新 Dom
    this.cb(this.value)
  }
}
```

### 响应
```js
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  let dp = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      // 将 Watcher 添加到订阅
      if (Dep.target) {
        dp.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
      // 执行 watcher 的 update 方法
      dp.notify()
    }
  })
}

var data = { name: 'yck' }
observe(data)
function update(value) {
  document.querySelector('div').innerText = value
}
// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', update)
// update Dom innerText
data.name = 'yyy' 
```

## Object.defineProperty 的缺陷
- 通过下标方式修改数组数据或者给对象新增属性并不会触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作

### 给对象添加属性
通过Vue.set解决

### 对于数组而言，Vue 内部重写了以下函数实现派发更新
```js
this.list[1] = 'x'; //不是响应式
this.items.length = 2; //不是响应式

Vue.set(vm.items, indexOfItem, newValue) //可以
vm.items.splice(indexOfItem, 1, newValue) //可以
vm.items.splice(newLength)//可以
```
- 执行原函数
- 监听新数据
- 手动派发更新
```js
// 获得数组原型
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
// 重写以下函数
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(function (method) {
  // 缓存原生函数
  const original = arrayProto[method]
  // 重写函数
  def(arrayMethods, method, function mutator (...args) {
  // 先调用原生函数获得结果
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    // 调用以下几个函数时，监听新数据
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // 手动派发更新
    ob.dep.notify()
    return result
  })
})
```

## 编译过程
- 编译器将模板通过几个阶段最终编译为 render 函数
- 执行 render 函数生成 Virtual DOM 最终映射为真实 DOM

### 三个阶段
- 将模板解析为 AST，用正则表达式去匹配模板中的内容
- 优化 AST
- 将 AST 转换为 render 函数

## NextTick 原理分析
nextTick 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。

在 Vue 2.4 之前都是使用的 microtasks，但是 microtasks 的优先级过高，在某些情况下可能会出现比事件冒泡更快的情况，但如果都使用 macrotasks 又可能会出现渲染的性能问题。所以在新版本中，会默认使用 microtasks，但在特殊情况下会使用 macrotasks，比如 v-on。

### 微任务
- Promise
- MutationObserver
- setImmediate
- setTimeout

对于实现 macrotasks ，会先判断是否能使用 setImmediate ，不能的话降级为 MessageChannel ，以上都不行的话就使用 setTimeout

```js
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (
  typeof MessageChannel !== 'undefined' &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

### Vue更新原理
- 当数据变化得时候，会促发它得set方法中得派发更新 notify()
- 遍历触发当前Dep中存放得watche
- 因为vue数据变化得时候不会马上更新页面需要做些去重等事情，所以它走得是queueWatcher
- nextTick这个方法来触发watcher中得run
- 所以nextTick中回调是能拿到更新后的Dom，因为是两个微任务，先更新Dom，再执行nextTick回调
[Vue更新原理](https://blog.csdn.net/qq_38935512/article/details/121228903)

## 异步更新队列方法
Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
- Promise.then
- MutationObserver
- setImmediate
- 如果执行环境不支持，则会采用 setTimeout(fn, 0)

### 事件循环说明
vue得数据更新，会开启一个异步队列，将所有得数据变化缓存进去，这里面会做一个去重处理，比如重复得watcher最后都只会执行1个，避免重复得DOM计算消耗性能。


## 组成部分
- Observer, Observer的核心是通过Object.defineProprtty()来监听数据的变动，这个函数内部可以定义setter和getter，每当数据发生变化，就会触发setter。这时候Observer就要通知订阅者，订阅者就是Watch
- Watcher, Watcher订阅者作为Observer和Compile之间通信的桥梁
- Compile, Compile主要做的事情是解析模板指令，将模板中变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加鉴定数据的订阅者，一旦数据有变动，收到通知，更新试图