---
title: 网易云音乐WebAPP
date: '2021-11-22'
sidebar: 'auto'
categories:
 - 实战
tags:
 - react
 - immutable
publish: true
---

## React 的渲染机制————Reconciliation 过程
1. props/state改变
2. render函数返回不同React元素
3. 对比虚拟Dom
4. 生成patch
5. 渲染真实Dom

> 这就是整个 Reconciliation 过程，其核心就是进行新旧 DOM 树对比的 diff 算法。