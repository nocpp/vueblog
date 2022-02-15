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