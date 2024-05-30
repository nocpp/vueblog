---
title: 元素渲染
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - react
publish: true
---

## 什么是React元素？
React元素是构成React应用的最小砖块，描述来你在屏幕上想看到的内容。
与Dom元素不同，React元素是创建开销极小的普通对象，React Dom会负责更新Dom来与React元素保持一致。
React元素除了可以是Dom标签，还可以是用户自定义组件

## 根Dom节点
React应用都会有个根节点，该节点内所有的内容都将由React Dom管理。
React Dom负责将React元素渲染到Dom节点中，通过render方法。
React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。
要想更新页面的话，要重新生成React元素，重新调用React Dom 的 render方法


## React只更新它需要更新的部分
React Dom 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新