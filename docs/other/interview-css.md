---
title: css面试知识
date: '2021-12-12'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - css
publish: true
---

## CSS中行内元素是否有margin和padding
- top, bottom无效
- left，right有效
- padding-top，padding-bottom内容范围是增大了，但是对其它元素没有效果

## css水平、垂直居中的写法，请至少写出4种?
### 水平居中
- 行内元素: text-align: center
- 块级元素: margin: 0 auto
- position:absolute +left:50%+ transform:translateX(-50%) || maringleft: -50%
- display:flex + justify-content: center

### 垂直居中
- 设置line-height 等于height
- position：absolute +top:50%+ transform:translateY(-50%) || maringTop: -50%
- display:flex + align-items: center
- display: table-cell;vertical-align: middle;

## 1rem、1em、1vh、1px各自代表的含义？
### rem
rem是全部的长度都相对于根元素html元素。通常做法是给html元素设置一个字体大小，然后其他元素的长度单位就为rem。

### em
- 子元素字体大小的em是相对于父元素字体大小
- 元素的width/height/padding/margin用em的话是相对于该元素的font-size

### vw/vh
全称是 Viewport Width 和 Viewport Height，视窗的宽度和高度，相当于 屏幕宽度和高度的 1%，不过，处理宽度的时候%单位更合适，处理高度的 话 vh 单位更好。

### px
px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。一般电脑的分辨率有1920*1024等不同的分辨率
，前者是屏幕宽度总共有1920个像素, 后者则是高度为1024个像素

## 画一条0.5px的直线？
```css
.box {
	height: 1px;
	transform: scaleY(0.5);
}
```

## 说一下盒模型？
1. 盒模型的组成  
    由里向外content,padding,border,margin.
2. 盒模型分为两种  
	- border-box: IE盒子模型中，width表示content+padding+border这三个部分的宽度
    - content-box: 在标准的盒子模型中，width指content部分的宽度 (默认是这个)

## 画一个简单的三角形(利用边框透明来画)
```css
 .a{
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    border-color: transparent #0099CC transparent transparent;
    transform: rotate(90deg); /*顺时针旋转90°*/
 }
```

## 清除浮动的几种方式
- 父级div定义height
- 父元素最后一个标签加空div标签 并添加样式clear:both。
- 创建父级 BFC,(浮动,绝对和固定定位, 行内块儿元素/弹性盒子/表格单元，标题，滚动) 
- clearfix方法
```less
.box {
    width: 100px;
    margin: 100px;
    zoom: 1;//父元素增加zoom: 1;是为了触发hasLayout,兼容IE7
    .inner {
        float: left;
    }
    &::after {content: '';clear: both;display: block;height: 0;}//伪元素一定要增加display: block;
}
```

## BFC （块级格式化上下文）
> BFC是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。
> BFC是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

### 触发条件:
- 根元素(html元素)
- 浮动元素
- 绝对和固定定位元素，position: absolute/fixed
- 行内块儿元素/弹性盒子/表格单元，标题，display: inline-block / (table-cell 、 table-caption此元素会作为一个表格标题显示), flex 、inline-flex 之一的元素
- 滚动相关元素 ovevflow !== visible
> IE下为 Layout，可通过 zoom:1 触发

### 解决问题
- margin重合问题【“为首个子元素添加20px的上边距，父元素竟跟着子元素下沉了”】
- 高度塌陷问题，（包含浮动元素，高度塌陷问题：在通常情况下父元素的高度会被子元素撑开，而在这里因为其子元素为浮动元素所以父元素发生了高度坍塌，上下边界重合。这时就可以用bfc来清除浮动了。）
- 阻止元素被浮动元素覆盖，做流式布局
```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动,也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```

## margin折叠的意义是什么？
是为了让多段落文章这种布局，更容易定义垂直间距，便于用户阅读。具体可以参照下面文章。在多个P段落中，如果想要保证每个段落间距是10px，并且开头结尾都要10px，只需要写margin 的top和bottom都等于10px就行了，如果没有这个特性，写了top 10px后，还得找到最后一个元素写10pxbottom
[margin折叠的意义](https://medium.com/@joseph0crick/margin-collapse-in-css-what-why-and-how-328c10e37ca0)

## 圣杯布局和双飞翼布局
### 圣杯布局
```html
<div class="outer">
    <div class="center"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
```
```css
.outer {
  height: 100px;
  padding-left: 100px;
  padding-right: 200px;
}

.left {
  position: relative;
  left: -100px;

  float: left;
  margin-left: -100%;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: relative;
  left: 200px;

  float: right;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}
```

### 双飞翼布局
```html
<div class="outer">
    <div class="center"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```
```css
.outer {
    float: left;
    height: 100px;
    width: 100%;
}

.center {
    margin-left: 100px;
    margin-right: 200px;
    background-color: lightgreen;
    height: 100px;
    width: auto;
}

.left {
    float: left;
    width: 100px;
    background-color: tomato;
    height: 100px;
    margin-left: -100%;
}

.right {
    float: left;
    width: 200px;
    background-color: gold;
    height: 100px;
    margin-left: -200px;
}
```

## flex属性
### flex-grow 与 flex的区别
1. 剩余宽度计算方式不同, flex-grow的剩余宽度等于容器宽度减去所有项目宽度和, 而flex的剩余宽度等于容器宽度减去设置了flex属性的项的宽度和
2. 计算宽度方式都是剩余宽度*设置比例/设置了项目个数
3. flex是几个值的简写，flex-grow, flex-basis, flex-shrink