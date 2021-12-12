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