---
title: Vue知识
date: '2022-11-30'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - vue
publish: true
---

## h函数和jsx
> 一般我们是把html写到template中，其实也可以写在h中和setup中
### h函数可以生成Vnode
- 可以在options api中render函数中使用
- setup函数选项中
```vue
  render() {
    return h("div", { className: "app" }, [
      // 因为不是在模板中使用, 因此无需注册, 直接使用
      h(Home)
    ])
  }
  
	setup() {
	  // setup是一个函数, 让这个函数再返回一个函数
	  return () => h("div", { class: "app" }, [
		h("h2", { class: "title" }, "我是标题"),
		h("p", null, "我是内容")
	  ])
	}
```

### jsx函数
webpack配置插件
```js
// babel.config.js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    "@vue/babel-plugin-jsx"
  ]
}
```
Vite环境
```js
import jsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    jsx()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}
```
jsx使用方法
```js
<script lang="jsx">
  render() {
    // jsx中使用大括号引用js中的语法
    return (
      <div class="app">
        <h2>当前计数: { this.counter }</h2>
        <button onclick={ this.increment }>+</button>
        <button onclick={ this.decrement }>-</button>
      </div>
    )
  }
  
  setup() {
	  return () => (
	  	<div class="app">
	  	  <h2>当前计数: { counter.value }</h2>
	  	  <button onclick={ increment }>+</button>
	  	  <button onclick={ decrement }>-</button>
	  	</div>
	  )
  }
</script>
```

## 可以用作参数传递，但是显示还是需要放到render或者h函数中，不能直接放到template里