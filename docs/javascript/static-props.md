---
title: class中静态属性和实例属性的区别
date: '2021-10-09'
sidebar: 'auto'
categories:
 - javascript
tags:
 - static
publish: true
---

## class中静态方法
类相当于实例的原型， 所有在类中定义的方法， 都会被实例继承。 如果在一个方法前， 加上static关键字， 就表示该方法不会被实例继承， 而是直接通过类来调用， 这就称为“ 静态方法”。
```js
class Foo {
	constructor() {
		this.myProps2 = '实例属性2';
	}
	
	//静态方法
	static classMethod() {
		return 'hello';
	}
	
	//ES7提案，Babel转码支持
	static staticProps = '静态属性';
	
	//实例属性
	myProps = '实例属性';
	
	//实例方法
	myMethod() {
		
	}
}

//静态属性
Foo.prop = 1;

Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod();
```
> ES6 明确规定， Class 内部只有静态方法， 没有静态属性。所以静态属性只能写在外面

## class中静态属性
静态属性指的是 Class 本身的属性， 即Class.propname， 而不是定义在实例对象（ this） 上的属性。

## 父类Foo有一个静态方法， 子类Bar可以调用这个方法。静态方法也是可以从super对象上调用的。