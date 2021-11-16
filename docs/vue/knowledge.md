---
title: Vue知识点
date: '2021-10-09'
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
publish: true
---

**MVVM与MVC**
MVVM是MVC的改进版；

MVC, M表示模型/数据，V表示视图，C表示控制器，代码逻辑在控制器里面
随着前端的不断不发展，不断把后端的一些逻辑放到了前端处理，

MVVM 就是将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。
当然这些事 ViewModel 已经帮我们做了，
它可以取出 Model 的数据同时帮忙处理 View 中由于需要展示内容而涉及的业务逻辑。

**什么是 Vue.js**
Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。

React 和 Vue 有许多相似之处，它们都有：
- 使用 Virtual DOM
- 提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
- 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。

借鉴了MVVM 模式，代码简洁体积小，运行效率高，适合移动PC端开发；
本身只关注 UI （和 react 相似），可以轻松引入 Vue 插件或其他的第三方库进行开发。

**Vue.js 的主要特点**
1．轻量级的框架

2．双向数据绑定 

3. MVVM 模式

4．指令 
    Vue.js 与页面进行交互，主要就是通过内置指令来完成的，指令的作用是当其表达式
    的值改变时相应地将某些行为应用到 DOM 上。 
    5．组件化 
    组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装
    可重用的代码。
    
6．客户端路由

7．状态管理

**响应式声明渲染机制**
    Vue 是一个响应式系统，模型（Model）层只是普通的 JavaScript 对象，修改它则视
图（View）自动更新。Vue 的工作原理是当把一个普通的 JavaScript 对象传给 Vue 实例
的 data 选项时，Vue 会遍历此对象的所有属性，在属性被访问和修改时通知变化，并把数
据渲染进 DOM。 

**组件间通信方法**
- 父子间通过props，$on, $emit方式，$parent, $children(这是个数组)方式
- Pub Sub方式
- Event Bus，空Vue对象的$on, $emit方式
- Vuex的方式，创建Vue对象，把数据放在之前创建的Vue的data中
- Vue.observable Vue2.6新增的，简略版Vuex
- 父组件provide, 子组件inject方式
- $attrs与$listeners的方式，爷孙传值，没放在props上的，就会在$attrs中,v-bind="$attrs"
包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件
[$attrs与$listeners](https://www.jianshu.com/p/a388d38f8c69)

**VueX实现原理**
原理就是通过创建一个没有绑定任何元素的Vue实例，把需要管理的值放入这个Vue实例的data中，
通过这个Vue实例的响应式原理来同步更新。

**计算属性与methods的区别**
计算属性是基于它们的依赖进行缓存的。计算属性只有在它的
相关依赖发生改变时才会重新求值。这就意味着只要 book 的属性还没有发生改变，多次访
问 totalPrice 计算属性会立即返回之前的计算结果，而不必再次执行函数。 
相比之下，每当触发重新渲染时，调用方法将总是再次执行函数。

**为什么不要把 v-if 和 v-for 同时用在同一个元素上**
当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级，所以这个模板：
```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

将会执行以下代码，哪怕只渲染一小部分数据，也会遍历整个数组，
所以这种情况一般用计算属性替代，或者把v-if放在子元素上
this.users.map(function (user) {
  if (user.isActive) {
    return user.name
  }
})
```

**为什么循环时要用key值**
当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。
[就地更新解释](https://juejin.cn/post/6872271674692075534)
如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。
为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute
number | string | boolean (2.4.2 新增) | symbol (2.5.12 新增)

这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。（表单时会出现值仍然时上个input的情况，
需要用key来让它重新渲染）

key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。
如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

只需要在li上加上 :key="item.id" 这样Vue就会根据最新的数据对DOM进行调整，
而它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
可以简单认为key是给每一个DOM节点一个唯一标识，这样Vue就不会启用就地更新了。


它也可以用于强制替换元素/组件而不是重复使用它。比如v-if 显示两个input标签，切换时都会重新渲染，不会有相同值

**数组更新检测**
Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()