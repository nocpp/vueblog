---
title: 内存泄漏排查
date: '2023-01-31'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - memory
publish: true
---

## 常见的内存泄漏
1. console方法输出对象，对象是不能被垃圾回收的，有文章说不开devtools就不会泄漏，可以不管
2. 未正确使用闭包
3. 事件监听器未移除
4. 定时器忘记清理
5. 使用插件时,未销毁
6. 意外的使用全局变量未回收

### 必包使用不当会泄漏
```js
function fn2(){
  let test = new Array(100000).fill('isboyjc')
  return function(){
	return test
  }
}
const testFn = () => {
	for (let i = 0; i < 10000; i++) {
		var fn2Child = fn2()
		fn2Child();
		// fn2Child = null;
	}
}
```


###  计时器和回调函数timers
###  DOM泄漏
