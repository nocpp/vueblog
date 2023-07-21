---
title: GASP动画
date: '2023-06-28'
sidebar: 'auto'
categories:
 - javascript
tags:
 - gasp,animation
publish: true
---
## GASP实现的案例
### Loading动画，转的动画
### 数字翻转
### 方块梯形出现
- [](http://www.benbenwang.com/#/service)
### 电话摇摆

## GASP是什么？
GreenSock动画平台（GSAP）是一套业界著名的工具，在1100多万个网站上使用，其中包括50%以上的获奖网站！在任何框架中，您都可以使用GSAP来动画化JavaScript所能触及的几乎任何东西。无论您是想制作UI、SVG、Three.js还是React组件的动画，GSAP都为您提供了相关内容。

## 简单使用方法
```html
<div class="box"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
<script>gsap.to(".box", { x: 200 })</script>//效果类似：transform: translateX(200px)
```
> 上面的单个动画成为补间动画，Tween

## 调用方法可以分为三部分
1. 方法名-method
2. 动画的目标-target
3. 变量对象-vars

## method
- gsap.to()，从当前状态运动到目标状态
- gsap.from()，从目标状态运动到当前状态
- gsap.fromTo()，从目标开始状态运动到目标结束状态
- gsap.set()，立刻修改属性，没有动画

## target
```js
// use a class or ID
gsap.to(".box", { x: 200 });

// a complex CSS selector
gsap.to("section > .box", { x: 200 });

// a variable
let box = document.querySelector(".box");
gsap.to(box, { x: 200 })

// or even an Array of elements
let square = document.querySelector(".square");
let circle = document.querySelector(".circle");
                                      
gsap.to([square, circle], { x: 200 })
```

## variables
> vars对象包含有关动画的所有信息。这可以是要设置动画的任意属性，也可以是影响动画行为的特殊属性，如持续时间、onComplete或repeat。
```js
gsap.to(target, {
  // this is the vars object
  // it contains properties to animate
  x: 200,
  rotation: 360,
  // and special properties
  duration: 2
})
```
支持的属性包含css的属性等，用的最多的是transform和opacity变换
> 如果可能，请对动画使用transform，而不是“top”、“left”或“margin”等布局属性。你会得到更流畅的动画！transform不会影响布局

### 相比css更简洁
```scss
.box {
  transform: rotate(360deg) translateX(10px) translateY(50%);
  // { rotation: 360, x: 10, yPercent: 50 }
}
```

### 常见css属性和gasp的对照
| GASP | CSS |
|--	|--	|
| x: 100 | translateX(100px) |
| y: 100 | translateY	|
| xPercent: -50	| translateX(-50%)|
| yPercent: -50	| translateY(-50%) |
| rotation: 360	| rotate(360deg)	|
| scale: 2|	transform: scale(2, 2) |
|transformOrigin: "0% 100%" |transform-origin: 0% 100%;|
|duration: 2 |transform-duration|

### 实例，一个滚动的方块
```js
gsap.to(".box", { 
  duration: 2, // 动画时间
  x: 200,
  rotation: 360,
  repeat: 2 // 额外的重复次数
});
```

### 单位
数值的单位默认是px或者角度，但也可以传入vw这种
```js
x: 200, // use default of px
x: "+=200" // relative values
x: '40vw', // or pass in a string with a different unit for GSAP to parse
x: () => window.innerWidth / 2, // you can even use functional values to do a calculation!
  
rotation: 360 // use default of degrees
rotation: "1.25rad" // use radians
```

### 支持SVG属性动画
```js
gsap.to(".svgBox", { 
  duration: 2,
  x: 100, // use transform shorthand (this is now using SVG units not px, the SVG viewBox is 100 units wide)
  xPercent: -100,
  // or target SVG attributes
  attr: {
    fill: '#8d3dae',
    rx: 50, 
  },
});
```

### 支持JS操作动画，比如canvas
```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#28a92b";

let position = { x: 0, y: 0 };

function draw() {
  // erase the canvas
  ctx.clearRect(0, 0, 300, 300);
  // redraw the square at it's new position
  ctx.fillRect(position.x, position.y, 100, 100);
}

//animate x and y of point
gsap.to(position, { 
  x: 200, 
  y: 200, 
  duration: 4,
  // unlike DOM elements, canvas needs to be redrawn and cleared on every tick
  onUpdate: draw 
});
```

## 特殊属性
- duration，持续时间
- delay，动画开始之前的时间
- repeat，动画重复次数.-1表示无限循环
- yoyo，如果是true，每隔一次重复，青少年就会朝相反的方向跑。（像溜溜球一样）
- stagger，多个target时，动画错开的时间，单位s
- ease，控制动画过程中的更改速率。none｜bounce.out
  + in：开始的速度慢
  + out：结束的速度慢
  + inOut：开始和结束慢
- onComplete，动画完成的回调
```js
ease: "power1.in"
// start slow and end faster, like a heavy object falling

ease: "power1.out"
// start fast and end slower, like a rolling ball slowly coming to a stop

ease: "power1.inOut"
// start slow and end slow, like a car accelerating and decelerating
```

## 序列动画
使用delay让动画顺序进行

## 时间线TimeLine
> 让动画按照顺序运行
```js
// create a timeline
let tl = gsap.timeline()

// add the tweens to the timeline - Note we're using tl.to not gsap.to
tl.to(".green", { x: 600, duration: 2 });
tl.to(".purple", { x: 600, duration: 1 });
tl.to(".orange", { x: 600, duration: 1 });
```

### 位置参数
- 1，时间线开始的第1s
- "+=1"，时间线结束后1s
- "<1"，前一个动画开始1s后
- ">1",">+=50%"，前一个动画结束后1s
- "myLabel+=1"
```js
let tl = gsap.timeline()

// start at exactly 1 second into the timeline (absolute)
tl.to(".green", { x: 600, duration: 2 }, 1);

// insert at the start of the previous animation
tl.to(".purple", { x: 600, duration: 1 }, "<");

// insert 1 second after the end of the timeline (a gap)
tl.to(".orange", { x: 600, duration: 1 }, "+=1");
```

### 配置默认属性
```js
var tl = gsap.timeline({defaults: {duration: 1}});

//no more repetition of duration: 1!
tl.to(".green", {x: 200})
  .to(".purple", {x: 200, scale: 0.2})
  .to(".orange", {x: 200, scale: 2, y: 20});
```

## 动画控制
```js
// store the tween or timeline in a variable
let tween = gsap.to("#logo", {duration: 1, x: 100});

//pause
tween.pause();

//resume (honors direction - reversed or not)
tween.resume();

//reverse (always goes back towards the beginning)
tween.reverse();

//jump to exactly 0.5 seconds into the tween
tween.seek(0.5);

//jump to exacty 1/4th into the tween's progress:
tween.progress(0.25);

//make the tween go half-speed
tween.timeScale(0.5);

//make the tween go double-speed
tween.timeScale(2);

//immediately kill the tween and make it eligible for garbage collection
tween.kill();
```

## 回调函数
- onComplete: invoked when the animation has completed.
- onStart: invoked when the animation begins
- onUpdate: invoked every time the animation updates (on every frame while the animation is active).
- onRepeat: invoked each time the animation repeats.
- onReverseComplete: invoked when the animation has reached its beginning again when reversed.

## 参考链接
- [入门教程](https://greensock.com/get-started/)