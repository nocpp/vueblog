---
title: 内存泄漏排查
date: '2023-01-31'
sidebar: 'auto'
categories:
 - javascript
tags:
 - memory
publish: true
---

## 常见的内存泄漏
1. console方法输出对象，对象是不能被垃圾回收的，有文章说不开devtools就不会泄漏，可以不管

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
