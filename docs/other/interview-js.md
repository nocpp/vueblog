---
title: JS相关知识
date: '2021-12-20'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - JS
publish: true
---

## 讲讲JS的数据类型？
最新的 ECMAScript 标准定义了 9种数据类型:

### 7 种原始类型
- Boolean
- Undefined
- Null
- Number
- BigInt  11n,22n这就是这个类型的
- String
- Symbol  let s = Symbol()

### 2 种结构类型
- Object
- Function

## Symbol类型
由于ES5中对象属性名都是字符串，有可能造成命名重复，所以ES6提出的Symbol类型解决这个问题。Symbol 值通过Symbol函数生成。
```js
let s = Symbol();
window[s] = 1000;//第一种写法
let a = {
  [s]: 'Hello!'//第二种写法
};
Object.defineProperty(a, s, { value: 'Hello!' });//第三种写法
console.log(window[s]);//1000
window.s //这样不行，不能用点运算符。因为点运算符后面总是字符串

typeof s
// "symbol"
```
> 上面代码中，变量s就是一个独一无二的值。typeof运算符的结果，表明变量s是 Symbol 数据类型，而不是字符串之类的其他类型。
:::danger
注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
:::

### Symbol函数可以接受一个字符串作为参数
表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
:::danger
注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
:::
```js
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

//ES2019 提供description可以读取描述
s1.description // "foo"

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```

### 如果 Symbol 的参数是一个对象
就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
```js
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```

### Symbol 类型转化
Symbol 值不能与其他类型的值进行运算，会报错，但是可以转为字符串和布尔值，不能转为数值
```js
let s = Symbol();
s + 'abc' //会报错
s.toString() //可以
String(s) //可以
Boolean(s) //可以
!s //可以
```

### Symbol作为属性名被遍历
遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

但是，它也不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
```js
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```

## 异步编程实现方式
- 回调函数
	+ 优点：简单、容易理解
	+ 缺点：不利于维护，代码耦合高
- 事件监听(采用时间驱动模式，取决于某个事件是否发生)【Dom添加事件监听】
	+ 优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数
	+ 缺点：事件驱动型，流程不够清晰
- 发布/订阅(观察者模式)【pubSub库】
	+ 类似于事件监听，但是可以通过‘消息中心‘，了解现在有多少发布者，多少订阅者
- Promise对象
	+ 优点：可以利用then方法，进行链式写法；可以书写错误时的回调函数；
	+ 缺点：编写和理解，相对比较难
- Generator函数
	+ 优点：函数体内外的数据交换、错误处理机制
	+ 缺点：流程管理不方便
- async函数
	+ 优点：内置执行器、更好的语义、更广的适用性、返回的是Promise、结构清晰。
	+ 缺点：错误处理机制

## 找到A节点的父节点下的所有子节点
```js
var b=document.getElementById("a").parentNode.children;
console.log(b)
```
    
## encodeURI和encodeURIComponent的比较
- 相同点：都可以对url进行一个编码；
- encodeURI()不会对本身属于URI的特殊字符进行编码，例如冒号、下划线、问号和井字号，适用于url跳转时；
- encodeURIComponent()则会对它发现的任何非标准字符进行编码，适用于有参数要传递时。
> 注意：当url作为参数传递时如果没有用encodeURIComponent进行编码，往往会造成传递时url中的特殊字符丢失。

## 事件循环【Event Loop】
[讲的最好的](https://javascript.info/event-loop#macrotasks-and-microtasks)
[什么是事件循环](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)
[Event Loop](https://segmentfault.com/a/1190000016278115)
[视频讲解](https://www.ixigua.com/6806218718264164877?wid_try=1)
[详解](https://www.cnblogs.com/mfyngu/p/11747533.html)
### Event Loop是什么？
事件循环是JS的执行机制。

### 为什么有Event Loop？
因为JS是单线程的，如果没有Event Loop，在执行费时间的任务时，页面会卡顿，不会继续往下执行。

### 任务分为两类
- 同步任务：按时间顺序执行，执行完上一个才能执行下一个，是否进入异步队列来判断【React中setState目前就是同步的】。
- 异步任务：不按时间顺序执行，执行到异步任务时，进入Event Table并注册函数，然后往下执行，异步任务完成后，推入事件队列中。主线程执行完后，执行事件队列中函数（eg: setTimeout,setInterval,ajax,IO读写）

### 执行顺序测试题
```js
    console.log('script start');
    
    setTimeout(function() {
      console.log('setTimeout');
    }, 0);
    
    Promise.resolve().then(function() {
      console.log('promise1');
    }).then(function() {
      console.log('promise2');
    });
    
    console.log('script end');
    
    //结果script start, script end, promise1, promise2, setTimeout
```

### 执行步骤：
1. 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数
2. 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
3. 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
4. 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

### 代码解析：
```js
/**
 * 1. ajax进入Event Table，注册回调函数success。
 * 2. 执行console.log('代码执行结束')。
 * 3. ajax事件完成，回调函数success进入Event Queue。
 * 4. 主线程从Event Queue读取回调函数success并执行。
 */
let data = [];
$.ajax({
    url: 'www.javascript.com',
    data:data,
    success:() => {
        console.log('发送成功!');
    }
})
console.log('代码执行结束');
```
    
### 那怎么知道主线程执行栈为空呢？
js引擎存在monitoring process进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去Event Queue那里检查是否有等待被调用的函数。

### 加入async的执行顺序测试题
[加入async看顺序](https://www.cnblogs.com/shaozhu520/p/11341030.html)
- async执行返回值是一个promise，遇见promise会resolve它
    
## 宏任务与微任务【异步任务】
- 宏任务：当前调用栈中执行的任务称为宏任务。宏任务中的事件放在callback queue中，由事件触发线程维护；
- 微任务：当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务为微任务。微任务的事件放在微任务队列中，由js引擎线程维护。

### 在Event Loop中，每一次tick任务的执行顺序
> Event Loop中，每一次循环称为tick

1. 执行栈选择最先进入队列的宏任务（一般都是script），执行其同步代码直至结束；
2. 检查是否存在微任务，有则会执行至微任务队列为空；
3. 如果宿主为浏览器，可能会渲染页面；
4. 开始下一轮tick，执行宏任务中的异步代码（setTimeout等回调）;

### 有哪些是宏任务（macrotask queue）
- 整体代码script
- mousemove
- setTimeout
- setInterval
- setImmediate

### 有哪些是微任务（microtask queue）
- 原生Promise(有些实现的promise将then方法放到了宏任务中)
- process.nextTick
- Object.observe(已废弃)
- MutationObserver


## repaint（重绘）和 reflow（回流）
- 重绘：元素的某一部分属性发生改变，如字体颜色，背景颜色等改变，尺寸并未改变，这时发生的改变过程就是repaint。
- 回流：因为浏览器渲染是一个由上而下的过程，当发现某部分的变化影响了布局时，就需要倒回去重新渲染，这个过程就称之为reflow。reflow几乎是没法避免的，现在一些常用的效果，比如树状目录的折叠、展开（实质上是元素的显示与隐藏）等，都将引起浏览器的 reflow。鼠标滑过、点击……只要这些行为引起了页面上某些元素的占位面积、定位方式、边距等属性的变化，都会引起它内部、周围甚至整个页面的重新渲染。

### 基本上能引起reflow的主要有几个原因
- 网页初始化
- JS操作DOM树的时候，增加删除元素等
- 某些元素的尺寸改变
- CSS属性的改变

### reflow影响性能，优化方法如下
- 修改样式不要逐条修改，建议定义CSS样式的class，然后直接修改元素的className
- 不要将DOM节点的属性值放在循环中当成循环的变量
- 为动画的 HTML 元素使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是不会 reflow 的
- 把DOM离线后修改。如设置DOM的display：none，然后进行你需要的多次修改，然后再显示出来，或者clone一个节点到内存中，然后随意修改，修改完成后再与在线的交换【虚拟Dom，Diff算法就是这么优化的】
- 不使用table布局，因为一个微小的改变就可能引起整个table的重新布局

## 说一下继承的几种方式及优缺点？
### 原型链继承
```js
function P() {}//父类
function C() {}//子类
C.prototype = new P();
C.prototype.name = 'yes';
let cItem = new C();
```
缺点
1. 新实例无法向父类构造函数传参。
2. 所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）

### 借用/盗用 构造函数继承
```js
function P() {}//父类
function C() {P.call(this, "jer")}//子类
let cItem = new C();
```
缺点
1. 只能继承父类构造函数的属性
2. 无法实现构造函数的复用（每次用每次都要重新调用）
3. 每个新实例都有父类构造函数的副本，臃肿

### 组合继承（组合原型链继承和借用构造函数继承）（常用）
```js
function P() {}//父类
function C(name) {P.call(this, name);}//子类
C.prototype = new P();
C.prototype.name = 'yes';
let cItem = new C("pig");
```
- 特点：
1. 可以继承父类原型上的属性，可以传参，可复用。
2. 每个新实例引入的构造函数属性是私有的。
- 缺点：
1. 调用了两次父类构造函数（耗内存）
2. 子类的构造函数会代替原型上的那个父类构造函数。

### 寄生式继承
```js
function createAnother(original){ 
 let clone = object(original); // 通过调用函数创建一个新对象
 clone.sayHi = function() { // 以某种方式增强这个对象
 console.log("hi"); 
 }; 
 return clone; // 返回这个对象
} ```

### 寄生组合式继承（常用）
```js
function inheritPrototype(subType, superType) { 
 let prototype = Object.create(superType.prototype); // 创建对象, 深拷贝
 prototype.constructor = subType; // 增强对象
 
 subType.prototype = prototype; // 赋值对象
} 

function SuperType(name) { 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 

SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 

function SubType(name, age) { 
 SuperType.call(this, name); 
  this.age = age; 
} 

inheritPrototype(SubType, SuperType); 
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
};
```
:::tip
这里只调用了一次 SuperType 构造函数，避免了 SubType.prototype 上不必要也用不到的属性，因此可以说这个例子的效率更高。而且，原型链仍然保持不变，因此 instanceof 操作符和isPrototypeOf()方法正常有效。寄生式组合继承可以算是引用类型继承的最佳模式。
:::

### 原型式继承，就是对象浅拷贝，Object.create方法
```js
function object(o) { 
 function F() {} 
 F.prototype = o; 
 return new F(); 
} 
```
- 构造函数中的共有属性无法做到数据共享，要做到数据共享，需要用到prototype

## JavaScript原型，原型链 ? 有什么特点？
### 原型prototype
> 原型就是，创建一个函数时，会同时创建一个对象，函数的prototype会指向这个对象，然后这个对象默认有个属性叫constructor，指向这个函数。prototype指向的对象就是函数的原型对象，简称函数的原型
![prototype是什么](./img/16.jpg)
- 每个函数都有一个属性，叫prototype，它的值是一个对象，默认包含constructor属性，constructor属性是指向自己（即构造函数）。在Object函数的prototype中，还包含toString, hasOwnProperty等方法，所以创建的对象可以直接使用toString等方法
- 每个对象都有一个隐藏的属性——“__proto__”，这个属性指向创建这个对象的函数的prototype。即：fn.__proto__ === Fn.prototype（除了Object.create(null)没有），所以对象可以访问原型上的属性和方法
![prototype与__proto__](./img/17.jpg)

### 实例 
> 通过构造函数和new创建出来的对象，便是实例。 实例通过__proto__指向它构造函数的原型，通过constructor指向构造函数。

### 原型链
访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，直至最顶级的原型对象Object.prototype，这就是**原型链**。

### 如何区分一个属性到底是基本的还是从原型中找到的呢
通过hasOwnProperty方法，特别是在for…in…循环(enumerable)中，一定要注意。

### instanceof原理
Instanceof的判断准则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。
![instance的逻辑](./img/18.jpg)

### 特点
JavaScript 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变当我们需要一个属性的时， Javascript 引擎会先看当前对象中是否有这个属性，如果没有的,就会查找__proto__这条线来找。

## 作用域链
> 函数是特殊的可执行对象,函数中存在这一个内部属性[[Scope]]（我们不能使用，供js引擎使用）.
> 函数被创建时，这个内部属性就会包含函数被创建的作用域中对象的集合，这个集合呈链式链接，被称为函数的作用域链。
> 作用域链上的每一个对象被称为可变对象（Variable Obejct），每一个可变对象都以键值对形式存在。
我们知道，我们可以在执行上下文中访问到父级甚至全局的变量，这便是作用域链的功劳。作用域链可以理解为一组对象列表，包含 父级和自身的变量对象，因此我们便能通过作用域链访问到父级里声明的变量或者函数。
- 由两部分组成:
	+ [[scope]]属性: 指向父级变量对象和作用域链，也就是包含了父级的[[scope]]和AO
	+ AO: 自身活动对象
如此 [[scope]]包含[[scope]]，便自上而下形成一条 链式作用域。
### 例子
```js
var a = 1;
function foo(){
    ...
}
```
它对应的[scope]
```js
// 伪代码
foo.[[Scope]] = {
	GO: {
		this: window ,
		window: ... ,
		document: ... ,
		......
		a: undefined, // 预编译阶段还不知道a值是多少
		foo: function(){...},
	}
}
```

### [[Scope]]和执行上下文的区别
- 共同：都保存了函数作用域链
- [[Scope]]属性是函数创建时产生的，会一直存在
- 而执行上下文在函数执行时产生，函数执行结束便会销毁

### 参考文章
[CSDN详解](https://blog.csdn.net/q1056843325/article/details/53086893)


## 执行上下文(EC)/执行环境
> 执行上下文可以简单理解为一个对象【内部对象】
- 它包含三个部分:
	+ 变量对象(VO)
	+ 作用域链(词法作用域)
	+ this指向
- 它的类型:
	+ 全局执行上下文
	+ 函数执行上下文
	+ eval执行上下文
- 代码执行过程:
	+ 创建 全局上下文 (global EC)
	+ 全局执行上下文 (caller) 逐行 自上而下 执行。遇到函数时，函数执行上下文 (callee) 被push到执行栈顶层
	+ 函数执行上下文被激活，成为 active EC, 开始执行函数中的代码，caller 被挂起
	+ 函数执行完后，callee 被pop移除出执行栈，控制权交还全局上下文 (caller)，继续执行
### 特点
- 它定义了一个函数执行时的环境
- 函数每次执行时的执行环境独一无二
- 多次调用函数就多次创建执行环境
- 并且函数执行完毕后，执行环境就会被销毁
- 执行环境有自己的作用域链，用于解析标识符

### 变量对象
变量对象，是执行上下文中的一部分，可以抽象为一种 数据作用域，其实也可以理解为就是一个简单的对象，它存储着该执行上下文中的所有 变量和函数声明(不包含函数表达式)。
> 活动对象 (AO): 当变量对象所处的上下文为 active EC 时，称为活动对象。

### 作用域
执行上下文中还包含作用域链。理解作用域链之前，先介绍下作用域。作用域其实可理解为该上下文中声明的 变量和函数的作用范围。可分为 块级作用域 和 函数作用域。（js引擎根据名称查找变量的一套规则）
- 特性:
	+ 声明提前: 一个声明在函数体内都是可见的, 函数优先于变量
	+ 非匿名自执行函数，函数变量为 只读 状态，无法修改
```js
let foo = function() { console.log(1) };
(function foo() {//如果去掉foo，打印的就是10
    foo = 10  // 由于foo在函数中只为可读，因此赋值无效
    console.log(foo)
}()) 

// 结果打印：  ƒ foo() { foo = 10 ; console.log(foo) }
```

## 闭包
> 闭包属于一种特殊的作用域，称为 静态作用域。它的定义可以理解为: 父函数被销毁 的情况下，返回出的子函数的[[scope]]中仍然保留着父级的单变量对象和作用域链，因此可以继续访问到父级的变量对象，这样的函数称为闭包。

### 特点：
- 函数内再嵌套函数
- 内部函数可以引用外层的参数和变量
- 参数和变量不会被垃圾回收机制回收
- 优点：能够实现封装和缓存等
- 缺点：消耗内存、使用不当会内存溢出，
- 解决方法：在退出函数之前，将不使用的局部变量全部删除

## this的取值, 分五种情况
1. 构造函数，如果函数作为构造函数用，那么其中的this就代表它即将new出来的对象
2. 函数作为对象的一个属性，如果函数作为对象的一个属性时，并且作为对象的一个属性被调用时，函数中的this指向该对象。
```js
var obj = {
	name: 'aa',
	fn: function() {
		console.log(this.name)
	}
}
```
3. 函数用call或者apply调用, 当一个函数被call和apply调用时，this的值就取传入的对象的值。
4. 全局 & 调用普通函数, 在全局环境下，this永远是window
![特例](./img/19.jpg)
5. 监听事件回调函数中的this, 指向触发这个事件的对象，特殊的是， IE 中的 attachEvent 中的this 总是指向全局对象 Window


## new操作符具体干了什么呢?
- 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型
- 属性和方法被加入到 this 引用的对象中
- 新创建的对象由 this 所引用，并且最后隐式的返回 this

## commonjs 规范
- exports = module.exports
- exports
- module
- require

## export和export default的区别？
```js
export default  xxx
import xxx from './'

export xxx
import {xxx} from './'
```

## JS有哪些方法定义对象
- 对象字面量： var obj = {};
- 构造函数： var obj = new Object();
- Object.create(): var obj = Object.create(Object.prototype);

## 如何通过JS判断一个数组
1. instanceof  (arr instanceof Array)   ifrmae不行（iframe.createElement（'script'）instanceof Element）
2. isArray (Array.isArray([]) //true)
3. constructor (arr.constructor == Array; //true)
4. Object.prototype  (Object.prototype.toString.call([]) == '[object Array]')
5. Array.prototype.isPrototypeOf(obj)

## 跨域
- jsonp
- cors
> 参考掘金收藏文章，完善

## 参考文章
[中高级](https://juejin.cn/post/6844903776512393224#heading-20)
[2021](https://juejin.cn/post/6940945178899251230)