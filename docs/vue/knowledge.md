---
title: Vue知识点
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - vue
publish: true
---

## MVVM与MVC
- MVVM是MVC的改进版；
- MVC, M表示模型/数据，V表示视图，C表示控制器，代码逻辑在控制器里面，随着前端的不断不发展，不断把后端的一些逻辑放到了前端处理，
- MVVM 就是将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。当然这些事 ViewModel 已经帮我们做了，它可以取出 Model 的数据同时帮忙处理 View 中由于需要展示内容而涉及的业务逻辑。

> 数据驱动视图
## 什么是 Vue.js
- Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。
- React 和 Vue 有许多相似之处，它们都有：
- 使用 Virtual DOM
- 提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
- 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。
- 借鉴了MVVM 模式，代码简洁体积小，运行效率高，适合移动PC端开发；
- 本身只关注 UI （和 react 相似），可以轻松引入 Vue 插件或其他的第三方库进行开发。

## Vue.js 的主要特点
1. 轻量级的框架
2. 双向数据绑定 
3. MVVM 模式
4. 指令, Vue.js 与页面进行交互，主要就是通过内置指令来完成的，指令的作用是当其表达式的值改变时相应地将某些行为应用到 DOM 上5. 组件化, 组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码
6. 客户端路由
7. 状态管理

## 响应式声明渲染机制
    Vue 是一个响应式系统，模型（Model）层只是普通的 JavaScript 对象，修改它则视图（View）自动更新。Vue 的工作原理是当把一个普通的 JavaScript 对象传给 Vue 实例的 data 选项时，Vue 会遍历此对象的所有属性，在属性被访问和修改时通知变化，并把数
据渲染进 DOM。 
## 组件间通信方法
- 父子间通过props，$on, $emit方式，$parent, $children(这是个数组)方式
- Pub Sub方式
- Event Bus，空Vue实例的$on, $emit方式
- Vuex的方式，创建Vue对象，把数据放在之前创建的Vue的data中
- Vue.observable Vue2.6新增的，简略版Vuex
- 父组件provide, 子组件inject方式
- $attrs与$listeners的方式，爷孙传值，没放在props上的，就会在$attrs中,v-bind="$attrs"
包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件
[$attrs与$listeners](https://www.jianshu.com/p/a388d38f8c69)

## VueX实现原理
原理就是通过创建一个没有绑定任何元素的Vue实例，把需要管理的值放入这个Vue实例的data中，通过这个Vue实例的响应式原理来同步更新。

## 计算属性与methods的区别
计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 book 的属性还没有发生改变，多次访问 totalPrice 计算属性会立即返回之前的计算结果，而不必再次执行函数。相比之下，每当触发重新渲染时，调用方法将总是再次执行函数。

## 为什么不要把 v-if 和 v-for 同时用在同一个元素上
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
```
```js
// 将会执行以下代码，哪怕只渲染一小部分数据，也会遍历整个数组，
// 所以这种情况一般用计算属性替代，或者把v-if放在子元素上
this.users.map(function (user) {
  if (user.isActive) {
    return user.name
  }
})
```

## 为什么循环时要用key值
- 当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。
- [就地更新解释](https://juejin.cn/post/6872271674692075534)
- 如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。
- 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute
- number | string | boolean (2.4.2 新增) | symbol (2.5.12 新增)
- 这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。（表单时会出现值仍然时上个input的情况，需要用key来让它重新渲染）

- key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。
- 如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
- 而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

- 只需要在li上加上 :key="item.id" 这样Vue就会根据最新的数据对DOM进行调整，
- 而它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
- 可以简单认为key是给每一个DOM节点一个唯一标识，这样Vue就不会启用就地更新了。

- 它也可以用于强制替换元素/组件而不是重复使用它。比如v-if 显示两个input标签，切换时都会重新渲染，不会有相同值

## 数组更新检测
Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

## Vue相关知识点
- ref和reactive的区别
- vite如何配置版本号，在项目中使用
- jsx中如何使用插槽
```vue
// MyComponent.jsx
import { defineComponent } from 'vue';

const MyComponent = defineComponent({
  name: 'MyComponent',
  setup(props, { slots }) {
    const data = { message: 'Hello from MyComponent!' };

    return () => (
      <div>
        <h1>My Component</h1>
        {slots.default ? slots.default(data) : null}
      </div>
    );
  }
});

// App.vue
import { defineComponent } from 'vue';
import MyComponent from './components/MyComponent';

const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div id="app">
        <MyComponent>
          {({ message }) => <p>{message}</p>}
        </MyComponent>
      </div>
    );
  }
});
```
- vue3的ref引用和shallowRef区别
  + ref 对对象和数组进行递归的响应式包装，即使是对象的属性或数组的元素也会成为响应式的。
  + shallowRef 对对象和数组只进行一层的响应式包装，不会对对象的属性或数组的元素进行响应式包装，只有当对象或数组本身发生变化时才会触发响应。
- 如何判断一个变量是否是ref
  + isRef
- 如何解除ref的引用
  + unref
  + toValue
- 返回reactive和readonly的原始值
  + toRaw
- pinia定义的store如何在js文件函数外使用
  + 引入createPinia的实例
  + 传递给useStore
- 如何把组件挂在body上
  + Telepot
- defineProps如何定义默认值
```vue
export interface Props {
  msg?: {
    type: String,
    default: ''
  }
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```
- vue3如何自定义指令
1. 创建指令
```vue
// 通过app.directive全局注册
// directives/focus.js
export default {
  // 支持created后的声明周期都支持
  created(el, binding, vnode, prevVnode) {
    // 在绑定元素的 attribute 或事件监听器被应用之前调用
  },
  mounted(el) {
    el.focus();
  }
};
// 局部注册直接使用vFocus = { mounted: (el) => el.focus()}
// 非setup形式需要写到directives
// <div v-example:[arg]="value"></div>
```
2. 指定支持两种形式，对象和函数，函数形式是仅仅需要在 mounted 和 updated 上实现相同的行为
3. 指令不能通过 v-bind="$attrs"，不推荐在组件上使用自定义指令
4. 当在组件上使用自定义指令时，它会始终应用于组件的根节点，和透传 attributes 类似。

## 需要补充的点
- vue3基础语法和基础面试题
- pinia基础

## Vue2和Vue3用法区别
- 生命周期名字修改beforeDestroy和destroyed改为了beforeUnmount和unmounted
- 自定义指令的生命周期名字改了，bind=>created，inserted=>mounted，update=>updated，destroyed=>ummount
- v-model区别，默认是modelValue而不是value。title.sync语法改为v-model:title
- v-bind 的绑定顺序会影响渲染结果
- v-if 与 v-for 的优先级对比，vue3 v-if优先级更高
- vue3的key可以加在template上
- h 函数现在是全局导入的，而不是作为参数自动传递
- $scopedSlots统一到$slots
- 按键keyCode修饰符废弃。因此，现在建议对任何要用作修饰符的键使用 kebab-cased (短横线) 名称
- 完全移除了 $on、$off 和 $once 方法。$emit 仍然包含于现有的 API 中，因为它用于触发由父组件声明式添加的事件处理函数
- 过滤器移除，使用计算属性和方法代替

### $attrs
- 移除了 .native 修饰符。任何未在 emits 中声明的事件监听器都会被算入组件的 $attrs，并将默认绑定到组件的根节点上
- $listeners 对象在 Vue 3 中已被移除。事件监听器现在是 $attrs 的一部分
- $attrs包含class 和 style


```vue
export default {
  inheritAttrs: false
}
```

## Vue2如何升级Vue3
### 迁移 Vue 插件 API

在 Vue 3 中，插件的 API 有一些变化。以下是一个简单的 Vue 2 插件和它的 Vue 3 版本的比较：

#### Vue 2 插件

```js
// vue2-plugin.js
export default {
  install(Vue, options) {
    // 添加全局方法
    Vue.myGlobalMethod = function() {
      // 逻辑代码
    };

    // 添加全局资源
    Vue.directive('my-directive', {
      bind(el, binding, vnode, oldVnode) {
        // 逻辑代码
      }
    });

    // 注入组件选项
    Vue.mixin({
      created() {
        // 逻辑代码
      }
    });

    // 添加实例方法
    Vue.prototype.$myMethod = function(methodOptions) {
      // 逻辑代码
    };
  }
};
```

#### Vue 3 插件

```js
// vue3-plugin.js
export default {
  install(app, options) {
    // 添加全局方法
    app.config.globalProperties.$myGlobalMethod = function() {
      // 逻辑代码
    };

    // 添加全局资源
    app.directive('my-directive', {
      mounted(el, binding, vnode, oldVnode) {
        // 逻辑代码
      }
    });

    // 注入组件选项
    app.mixin({
      created() {
        // 逻辑代码
      }
    });

    // 添加实例方法
    app.config.globalProperties.$myMethod = function(methodOptions) {
      // 逻辑代码
    };
  }
};
```

### 3. 生命周期钩子变化

Vue 3 修改了一些生命周期钩子名称，例如：

- `beforeDestroy` 改为 `beforeUnmount`
- `destroyed` 改为 `unmounted`

需要更新插件中使用的生命周期钩子名称。

### 4. 全局 API 迁移

Vue 3 将一些 Vue 2 的全局 API 移动到了应用实例上，如 `Vue.use` 现在变为 `app.use`，组件内的Vue上的东西要改为import方式引入。

#### Vue 2

```js
import Vue from 'vue';
import MyPlugin from './vue2-plugin';

Vue.use(MyPlugin);
```

#### Vue 3

```js
import { createApp } from 'vue';
import MyPlugin from './vue3-plugin';
import App from './App.vue';

const app = createApp(App);
app.use(MyPlugin);
app.mount('#app');
```

### 5. 指令的生命周期钩子变化
Vue 3 中指令的生命周期钩子名称有所变化：
- created - 新增！在元素的 attribute 或事件监听器被应用之前调用。
- bind → beforeMount
- inserted → mounted
- beforeUpdate：新增！在元素本身被更新之前调用，与组件的生命周期钩子十分相似。
- update → 移除！该钩子与 updated 有太多相似之处，因此它是多余的。请改用 updated。
- componentUpdated → updated
- beforeUnmount：新增！与组件的生命周期钩子类似，它将在元素被卸载之前调用。
- unbind -> unmounted
例如：

#### Vue 2

```js
Vue.directive('my-directive', {
  bind(el, binding, vnode, oldVnode) {
    // 逻辑代码
  },
  inserted(el, binding, vnode, oldVnode) {
    // 逻辑代码
  }
});
```

#### Vue 3

```js
app.directive('focus', {
  beforeMount(el, binding, vnode, oldVnode) {
    // 逻辑代码
  },
  mounted(el, binding, vnode, oldVnode) {
    // 逻辑代码
  }
});

// 全局函数式写法，仅仅需要在 mounted 和 updated 上实现相同的行为，除此之外并不需要其他钩子
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})

// 组合式局部写法在模板中启用 v-focus，用v开头
const vFocus = {
  mounted: (el) => el.focus()
}

// 选项式局部写法
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}
```

### 6. 依赖项的兼容性

确保所有插件依赖项（如第三方库）都兼容 Vue 3。如果某些依赖项不兼容 Vue 3，则可能需要寻找替代方案或等待其更新。

### 7. TypeScript 支持

如果插件使用 TypeScript，Vue 3 提供了更好的类型支持和定义，需要确保类型定义文件的更新。

#### Vue 2

```typescript
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $myMethod(methodOptions: any): void;
  }
}
```

#### Vue 3

```typescript
import { App } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $myMethod(methodOptions: any): void;
  }
}

export default {
  install(app: App, options: any) {
    app.config.globalProperties.$myMethod = function(methodOptions: any) {
      // 逻辑代码
    };
  }
};
```

### 总结

将 Vue 2 插件升级到 Vue 3 需要更新插件的 API 使用，并注意一些全局 API 和生命周期钩子的变化。以下是需要注意的关键点：

1. 更新插件安装函数的签名。
2. 更新生命周期钩子名称。
3. 将全局 API 迁移到应用实例上。
4. 更新指令的生命周期钩子名称。
5. 确保所有依赖项兼容 Vue 3。
6. 如果使用 TypeScript，更新类型定义文件。

通过遵循这些步骤，可以顺利地将 Vue 2 插件升级到 Vue 3。

## TS中class什么时候会用到
- 定义类
- 类的继承
- 类的访问修饰符
- 静态属性和方法
- 抽象类和抽象方法
- 接口实现
- 泛型类
- 一个类只能继承一个抽象类，但可以实现多个接口。
- 接口中只能包含没实现的方法，抽象类可以包含实现的方法
```ts
class Person {
  // 属性
  name: string;
  age: number;

  // 构造函数
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 方法
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// 使用类
const person = new Person('Alice', 30);
person.greet(); // 输出: Hello, my name is Alice and I am 30 years old.

```

## vue2和vue3创建vue应用的区别
- Vue3: createApp
- Vue2: new Vue

## ts中type和interface的区别
### type
- 类型别名在 TypeScript 中非常灵活，可以用来定义对象、函数和数组的类型，甚至可以组合和泛型化类型
- 一个作用域内不能同名
- 可以定义联合类型和交叉类型
### interface
- 接口可以定义对象、函数和数组的类型，不可以定义方法实现
- 可以使用extends
- 可以多个同名的，会自动合并
- 可以被class类型实现
```ts
interface User {
  name: string;
  (age: number): boolean;
  [x: number]: string;
}
```