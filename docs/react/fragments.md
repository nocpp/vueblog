---
title: Fragments
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - react
publish: true
---

## 定义
Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

```jsx
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
	
	<>
	<td>Hello</td>
	<td>World</td>
	</>
```

## 注意
key 是唯一可以传递给 Fragment 的属性。