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
- Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好
- Proxy支持监听数组改变，defineProperty不支持
- Object.defineProperty 是一次全部递归，性能较差
- Proxy 是惰性递归，性能较好，什么时候get到，什么时候监听
- 可监听新增，删除属性

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

## 为什么Object.definePropety深度监听时不把observe放到get里，实现懒监听。而proxy可以
因为observer里面有遍历对象属性的操作，每次get都要遍历一次，但是proxy不用，只需要劫持整个对象，时间复杂度低的多

## 组合式API(有点像React hooks中的自定义hooks，把类似逻辑放在一起，提取成自定义hooks，包含生命周期，数据逻辑等)
- 当组件逻辑很多很复杂时，代码会难以理解，通过组合式API把相同的逻辑放在一起，让代码逻辑更清晰
- 把组合式API放在setup 中
- setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取
- setup 中 可以放 onMounted生命周期
- setup 可以使用watch
```js
import { ref, onMounted, watch, toRefs } from 'vue'
```

### 新增Ref函数
使任何响应式变量在任何地方起作用
```js
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

## ref和reactive的区别
- reactive定义复杂的数据类型的数据，定义基本类型会有警告
- ref推荐定义基本数据类型
- ref定义的数据打印结果需要.value才能获取到结果
- reactive则不需要

## Reflect内置对象优势
- 和Proxy能力一一对应和Object的一些方法
- 返回值更明确，可以知道是否设置成功
- 规范化，标准化，函数式（使用函数更容易理解，比直接用in或者delete更好理解）
- 慢慢替代Object，因为Object应该作为一种数据格式，不应该包含那么多工具函数

## 生命周期钩子函数
- beforeCreate, 获取不到 props 或者 data 中的数据
- created, 创建了Vue实例，组件还没被挂载
- beforeMount, 开始创建 VDOM
- mounted, 并将 VDOM 渲染为真实 DOM 并且渲染数据。组件中如果有子组件的话，会递归挂载子组件
- beforeUpdate
- updated
- activated,keep-alive
- deactivated,keep-alive
- beforeDestroy
- destroyed

## Vue父子组件生命周期调用顺序
### 挂载阶段
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

### 更新阶段
父beforeUpdate->子beforeUpdate->子updated->父updated

### 卸载阶段
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

## 自定义Model
```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})

<base-checkbox v-model="lovingVue"></base-checkbox>
```

## slot 插槽
- 匿名插槽
- 具名插槽
- 作用域插槽，让插槽内容可以访问子组件属性
```html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
    <footer>
      <slot name="footer"></slot>
    </footer>
</span>

<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
  
<template v-slot:footer>
  <p>Here's some contact info</p>
</template>
</current-user>
```

## 动态组件
不确定的组件可以使用动态组件
```js
<component :is="dyCom" />
```

## 异步加载组件
当遇到某个组件很大，但不会立刻用到时，可以使用异步加载优化
```js
components: [com1: () => import('../../com1')]
```

## 缓存组件
当处理类似Tab页面时，可以使用keep-alive提升性能，与v-if和v-show不同，触发activated与deactivated生命周期
```html
<keep-alive>
	<com1 v-if="state === 1" />
	<com2 v-if="state === 2" />
</keep-alive>
```

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
- Event Bus/也叫自定义事件,使用Vue的实例，实现事件的监听和发布，实现组件之间的传递。

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

### mixins，抽离组件公共逻辑
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
> 使用Object.create(Array.prototype)来复制数组原型方法，对其进行扩展，并且不会改变Array的原型
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

## 模版编译过程
- compiler 将 模版生成 with(this) {}语句
- 然后编译为 render 函数
- 执行 render 函数生成 Virtual DOM 最终映射为真实 DOM
- 访问到变量时，绑定Watcher，添加依赖

### 三个阶段
- 将模板解析为 AST，用正则表达式去匹配模板中的内容
- 优化 AST
- 将 AST 转换为 render 函数(最终也是调用createElement生成vNode)

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
- 遍历触发当前Dep中存放得watchr
- 因为vue数据变化得时候不会马上更新页面需要做些去重等事情，所以它走得是queueWatcher
- 而queueWatcher处理后，把更新Dom放入nextTick这个方法中，触发watcher中的run
- 所以nextTick中回调是能拿到更新后的Dom，因为是两个微任务，先更新Dom，再执行nextTick回调
[Vue更新原理](https://blog.csdn.net/qq_38935512/article/details/121228903)

> vue的数据更新，会开启一个异步队列，将所有得数据变化缓存进去，这里面会做一个去重处理，比如重复的watcher最后都只会执行1个，避免重复得DOM计算消耗性能

## 异步更新队列方法
Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
- Promise.then
- MutationObserver
- setImmediate
- 如果执行环境不支持，则会采用 setTimeout(fn, 0)

### 事件循环说明
vue得数据更新，会开启一个异步队列，将所有得数据变化缓存进去，这里面会做一个去重处理，比如重复得watcher最后都只会执行1个，避免重复得DOM计算消耗性能。


## 组成部分
- Observer, Observer的核心是通过Object.defineProperty()来监听数据的变动，这个函数内部可以定义setter和getter，每当数据发生变化，就会触发setter。这时候Observer就要通知订阅者，订阅者就是Watch
- Watcher, Watcher订阅者作为Observer和Compile之间通信的桥梁
- Compile, Compile主要做的事情是解析模板指令，将模板中变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加鉴定数据的订阅者，一旦数据有变动，收到通知，更新试图

## 虚拟Dom
虚拟Dom是使用JS对象来表示Dom的一种方式，一般由Tag标签，属性值，和children组成，

### 使用VDom好处
- 通过虚拟Dom，可以提升性能，当数据变化引起视图变化时，生成新的VDom，对比旧的VDom，找出patch，只更新变更的部分
- 可以跨平台开发，通过VDom把视图呈现在不同的平台

## Vue响应式原理
### 核心API，Object.defineProperty()来监听数据的变动，监听对象的某个属性的变更
- Vue3.0使用proxy取代，但是有兼容问题，IE11不支持
- 如何监听对象，复杂对象，还有数组
- 几个缺点

### 监听深层次对象属性，通过递归实现
### 监听数组
- 复制数组原型
- 扩展原型方法，比如调用push后，触发notify

## DIFF算法
- 只比较同级VNODE
- 判断是否是相同VNODE，即tag/ele/sel和key是不是相同，都相等才是，sameVnode
- 如果不同，就销毁旧的，创建新的

### patch方法
- （Ele，newVNode）第一个参数不是VNode时，会创建一个空的vNode，关联那个Dom元素
- （oldVNode，newVNode）

### patchVnode方法，当新旧vNode一样时，比较他们的children
- 两者都有children时，UpdateChildren
- Och有， Nch无，移除
- OCh无，新Ch有，增加
- 有text时，类似上面

### UpdateChildren
- oldCh: a  b  c  d,   a(oldStartIdx)0, b(oldEndIdx)3
- newCh: e  f  g  h,   e(newStartIdx)0, b(newEndIdx)3
- 四个指针往中间移动，对比，当startIdx > oldEndIdx时，结束对比
- else if 开始和开始对比，sameVnode，命中之后，指针移动
- else if 最后和最后对比，sameVnode
- else if 旧开始和新结束做对比，sameVnode
- else if 就结束和新开始做对比，sameVnode
- 如果都没有命中，拿新节点key能否对应上oldCh key，就是对比看看处一生四种情况外是否有key相同的节点
- 如果没对应上，就是创建元素，插入
- 对应上了，判断sel是否相等，不等就插入，等的话就patchVnode

### 不使用key和使用key的区别
在diff过程中，如果没有key，就会之间销毁，重建，有key就会判断key是否相等，满足条件的话可以重用节点


## VueX，待完善
- state
- getter
- action
- mutation
- mapGetter
- ...

### VueX为什么有action和mutations
- mutation 必须是同步的
- Action 可以包含任意异步操作
-  vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情
-  mutations 里的同步意义在于，每个mutation执行完毕之后，可以得到对应的状态，使用devtools可以跟踪状态的变化，不同步也行

## VueRouter
### 路由原理
利用url变化来加载不同页面或者组件

### hash模式
- 使用location.href, location.hash更改
- 使用hashChange事件监听

### history模式
- 使用hostory.pushState, history.replaceState, history.back来更改路由，同时触发路由更改事件
- 利用popstate监听浏览器前进，返回操作