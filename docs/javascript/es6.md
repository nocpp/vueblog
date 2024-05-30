---
title: ES6 常用属性
date: '2021-10-25'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - ES6
publish: true
---

## es5和es6的区别，说一下你所知道的es6
- ECMAScript5，即ES5，是ECMAScript的第五次修订，于2009年完成标准化
- ECMAScript6，即ES6，是ECMAScript的第六次修订，于2015年完成，也称ES6是继ES5之后的一次改进，相对于ES5更加简洁，提高了开发效率

### ES6新增的一些特性：
1. let声明变量和const声明常量，两个都有块级作用域
2. 箭头函数
3. 模板字符串,模板字符串是增强版的字符串，用反引号（`）标识
4. 解构赋值ES6, 允许按照一定模式，从数组和对象中提取值，对变量进行赋值
5. for of循环, for...of循环可以遍历数组、Set和Map结构、某些类似数组的对象，以及字符串
6. import、export导入导出ES6标准中，Js原生支持模块(module)。将JS代码分割成不同功能的小块进行模块化，将不同功能的代码分别写在不同文件中，各模块只需导出公共接口部分，然后通过模块的导入的方式可以在其他地方使用
7. set数据结构Set数据结构，类似数组。所有的数据都是唯一的，没有重复的值。它本身是一个构造函数
8. ... 展开运算符可以将数组或对象里面的值展开；还可以将多个值收集为一个变量
9. 修饰器 @decorator是一个函数，用来修改类甚至于是方法的行为。修饰器本质就是编译时执行的函数
10. class 类的继承ES6中不再像ES5一样使用原型链实现继承，而是引入Class这个概念
11. async、await使用 async/await, 搭配promise,可以通过编写形似同步的代码来处理异步流程, 
12. Promise是异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理、强大
13. Symbol,Symbol是一种基本类型。Symbol 通过调用symbol函数产生，它接收一个可选的名字参数，该函数返回的symbol是唯一的
14. Proxy代理使用代理（Proxy）监听对象的操作，然后可以做一些相应事情

### var、let、const之间的区别
- var声明变量可以重复声明，而let不可以重复声明
- var是不受限于块级的，而let是受限于块级
- var会与window相映射（会挂一个属性），而let不与window相映射
- var可以在声明的上面访问变量，而let有暂存死区，在声明的上面访问变量会报错
- const声明之后必须赋值，否则会报错
- const定义不可变的量，改变了就会报错
- const和let一样不会与window相映射、支持块级作用域、在声明的上面访问变量会报错

### 使用箭头函数应注意什么？
1. 用了箭头函数，this就不是指向调用者，而是父级
2. 不能够使用arguments对象
3. 不能用作构造函数，这就是说不能够使用new命令，否则会抛出一个错误
4. 不可以使用yield命令，因此箭头函数不能用作 Generator 函数

### 实现一个类模板字符串的功能
```js
window.name = 'web';
window.age = 10;
window.str = '你好，${name} 已经 ${age}岁了'
window.str = window.str.replace(/\$\{(.*?)\}/g,function(){
     return window[arguments[1]];
})
```

### 介绍下 Set、Map的区别？
> 应用场景，Set类似于数组，只是不重复，Map类似于对象，只是key值可以非字符串：　
1. 成员不能重复
2. 只有键值没有键名，类似数组
3. 可以遍历，方法有add, delete,has
> Map:
1. 本质上是健值对的集合，类似集合
2. 可以遍历，可以跟各种数据格式转换

### ECMAScript 6 怎么写 class ，为何会出现 class？
> ES6的class可以看作是一个语法糖，它的绝大部分功能ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法
```js
//定义类
class Point { 
  constructor(x,y) {
      //构造方法
       this.x = x; //this关键字代表实例对象
       this.y = y; 
  }
  
  //静态属性
  static name = 'age'
  
  toString() {
       return '(' + this.x + ',' + this.y + ')'; 
  }
  
  //静态方法
  static test() {
      
  }
}

Point.age = 10; //静态属性
Point.prototype.test = function(){};
```

### Promise异常处理
```js
const proM = () => {
	return new Promise((resolve, reject) => {
		reject('hello')
	})
}

async function main () {
	await proM() // 没处理异常，会报错
	proM() // 同样会报错
	
	proM().catch(e => console.log(e))  // OK
	try{
		proM()  // 同样会报错
		await proM()  // OK
	}catch(e){
		//TODO handle the exception
	}
}

main()
```

### Promise是什么？
Promise 对象用于表示一个异步操作的最终完成 (或失败)及其结果值。

### Promise相关JS
- Promise构造函数，用于生成Promise对象
- Promise.all(iterable)，静态方法，如果有Promise失败，返回的是失败的那个Promise的错误信息，成功的话返回的是有顺序的结果数组，与Promise顺序一致
> 这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。Promise.all方法常被用于处理多个promise对象的状态集合
- Promise.allSettled(iterable)
> 等到所有promises都已敲定（settled）（每个promise都已兑现（fulfilled）或已拒绝（rejected））。返回一个promise，该promise在所有promise完成后完成。并带有一个对象数组，每个对象对应每个promise的结果。
- Promise.any(iterable)
> 接收一个Promise对象的集合，当其中的一个 promise 成功，就返回那个成功的promise的值。
- Promise.race(iterable)
> 当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。
- Promise.reject(reason)
> 返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法
- Promise.resolve(value)
> 返回一个状态由给定value决定的Promise对象。如果该值是thenable(即，带有then方法的对象)，返回的Promise对象的最终状态由then方法执行决定；否则的话(该value为空，基本类型或者不带then方法的对象),返回的Promise对象状态为fulfilled，并且将该value传递给对应的then方法。通常而言，如果您不知道一个值是否是Promise对象，使用Promise.resolve(value) 来返回一个Promise对象,这样就能将该value以Promise对象形式使用。

### Promise构造函数是同步执行还是异步执行，那么 then 方法呢？
- 构造函数是同步执行
- then是异步，回调进入微任务队列

### promise有几种状态，什么时候会进入catch？
> 三个状态：pending、fulfilled、rejectd
> 两个过程：padding -> fulfilled、padding -> rejected当pending为rejectd时，会进入catch

### 使用结构赋值，实现两个变量的值的交换
```js
let a = 1;let b = 2;
[a,b] = [b,a];
```


### 设计一个对象，键名的类型至少包含一个symbol类型，并且实现遍历所有key
```js
let name = Symbol('name');
 let product = {
    [name]:"洗衣机",    
    "price":799
  };
  Reflect.ownKeys(product);
```
  
### 下面Set结构，打印出的size值是多少
```js
 let s = new Set();
 s.add([1]);s.add([1]);
 console.log(s.size);
```
> 答案：2, 两个数组[1]并不是同一个值，它们分别定义的数组，在内存中分别对应着不同的存储地址，因此并不是相同的值都能存储到Set结构中，所以size为2
 
### Promise 中 reject 和 catch 处理上有什么区别
- reject 是用来抛出异常，catch 是用来处理异常
- reject 是 Promise 的方法，而 catch 是 Promise 实例的方法
- reject后的东西，一定会进入then中的第二个回调，如果then中没有写第二个回调，则进入catch
- 网络异常（比如断网），会直接进入catch而不会进入then的第二个回调

### 如何使用Set去重
```js
let arr = [12,43,23,43,68,12];
let item = [...new Set(arr)];
console.log(item);//[12, 43, 23, 68]
```

### forEach、map、for in、for of三者区别
- forEach更多的用来遍历数组
- map遍历后返回新数组
- for in 一般常用来遍历对象或json
- for of数组对象都可以遍历，遍历对象需要通过和Object.keys()
- for in循环出的是key，for of循环出的是value

### ES6模块和CommonJS的区别
- CommonJS 模块输出的是一个值的拷贝（一旦输出一个值，模块内部的变化就影响不到这个值），ES6 模块输出的是值的引用
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
- CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段
- CommonJS 模块就是对象，输入时必须查找对象属性，这种加载称为“运行时加载”,浏览器不支持
```js
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于, 实质是整体加载fs模块生成一个对象（_fs），然后再从这个对象上面读取 3 个方法
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```
- ES6属于“编译时加载”或者静态加载
- ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入
- ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高
- 没法引用 ES6 模块本身，因为它不是对象
- ES6 的模块自动采用严格模式
```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

### ES6 export通过接口，输出的是同一个值，不同的脚本加载这个接口，得到的都是同样的实例。
```js
// mod.js
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}

export let c = new C();
```
> 不同模块加载mod.js模块，都是同一个实例，所以EventBus和PubSub库可以跨组件使用
```js
// x.js
import {c} from './mod';
c.add();

// y.js
import {c} from './mod';
c.show();

// main.js
import './x';
import './y';
```

### 说一下es6的导入导出模块
- 导入通过import关键字
```js
// 只导入一个
import {sum} from "./example.js"
// 导入多个
import {sum,multiply,time} from "./exportExample.js"
// 导入一整个模块， 整体加载
import * as example from "./exportExample.js"
// 导入default
import a from 'example';
```
- 导出通过export关键字
```js
//可以将export放在任何变量,函数或类声明的前面
export var firstName = 'Michael';
//也可以使用大括号指定所要输出的一组变量
var firstName = 'Michael';
var lastName = 'Jackson';
export {firstName, lastName};
//使用export default时，对应的import语句不需要使用大括号
let bosh = function crs(){}
//为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。
export default bosh;
//把default用sss别名导出，和export {a}原理一样
export {default as sss} from 'example';
//把模块导出为default
export {aa as default} from 'example'
```
- export 复合写法
```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

### 扩展运算符
```js
//1. 复制数组
let arr1 = [1,2,3];
let arr2 = [...arr1];

//2. 合并数组
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [...arr1, ...arr2];

//3. 应用于对象
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}

// 去除数组的重复成员
[...new Set(array)]
//上面的方法也可以用于，去除字符串里面的重复字符。
[...new Set('ababbc')].join('')
```

### Generator
> Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。Generator 函数的执行方法如下。next传递的参数会被当做上一次yield的返回值
> Generator 函数返回的是生成器对象
```js
function* gen(x) {
  var y = yield x + 2;//把 yield 看作特殊的return好理解
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```

### fetch与Generator结合
```js
function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```

### Thunk 函数是自动执行 Generator 函数的一种方法。
- 传值调用和传名调用，哪一种比较好？  
回答是各有利弊。传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。
- 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。

## async和await的实现原理
- 主要就是Generator+自动执行器
- [参考](https://www.cnblogs.com/jerryfish/p/15436841.html)

## ['10', '10', '10', '10', '10'].map(parseInt) 的输出值是什么？
- [10, NaN, 2, 3, 4]

## js装饰器简单理解
> 装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。
```js
@frozen
class Foo {
	@configurable(false)
	@enumerable(true)
	method() {}
	
	@throttle(500)
	expensiveMethod() {}
}
```
上面用了四个装饰器，一个用在类本身，另外三个用在类函数上
### 类装饰
装饰器对类的行为的改变，是在代码编译时发生的，而不是运行时
```js
// 上面个类等同于
Foo = frozen(Foo) || Foo;
```
### 方法装饰
与装饰类不同，对类方法的装饰本质是操作起描述符，可以看作是Object.defineProperty的语法糖

### 装饰器的参数
- target
- name
- descriptor

## JS的get和set属性
```js
// js里class有get和set两种修饰符
class Obj {
    c=1
    get a(){
        this.c = "修改后的c"
        return "a的值"
    }
 
}
 
const obj = new Obj()
obj.a 
```

## ES版本
- ES6->ES10
[ES6->ES10](https://juejin.cn/post/6844903811622912014)
- ES11
[ES11](https://juejin.cn/post/6883306672064987149)
- ES12
[ES12](https://juejin.cn/post/6973838198891872269)
- ES13
[ES13](https://juejin.cn/post/7144852096024576036)