---
title: 二叉树的遍历
date: '2021-10-19'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 二叉树
 - 遍历
publish: true
---

## 二叉树的遍历方式

### 根据顺序规则遍历，分为以下四种
- 先序遍历（递归，栈实现）
- 中序遍历（递归，栈实现）
- 后序遍历（递归，栈实现）
- 层次遍历（队列实现）

### 根据实现方式不同，分为以下两种
- 递归遍历（先，中，后序遍历）
- 迭代遍历（层次遍历，队列实现）

:::tip
编程语言中，函数Func(Type a,……)直接或间接调用函数本身，则该函数称为递归函数。
:::

### 递归函数
- 递归式
- 递归边界

- 递归式就是每一次重复的内容
- 递归边界就是什么时候停下来

## 二叉树的递归定义
如果我们要创建一个二叉树结点为根节点，那么它的左侧子结点和右侧子结点必须满足二叉树结点定义，这意味着我们要反复执行二叉树的构造函数，直到数据被分配完毕为止。


### 先序遍历
根-->左-->右
```js
//需要被遍历的二叉树
const root = {
	val: 'A',
	left: {
		val: 'B',
		left: {
			val: 'D'
		},
		right: {
			val: 'E'
		}
	},
	right: {
		val: 'C',
		right: {
			val: 'F'
		}
	}
}
```

```js
//先序遍历
function firstTraverse(tree) {
	if (!tree) return;
	
	console.log(tree.val);
	
	firstTraverse(tree.left);
	firstTraverse(tree.right);
}
```

### 中序遍历
左-->中-->右
```js
function centerTraverse(tree) {
	if (!tree) return;
	
	centerTraverse(tree.left);
	console.log(tree.val);
	centerTraverse(tree.right);
}
```

### 后序遍历
```js
function endTraverse(tree) {
	if (!tree) return;
	
	endTraverse(tree.left);
	endTraverse(tree.right);
	console.log(tree.val);
}
```