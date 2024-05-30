---
title: 二叉平衡树
date: '2021-11-05'
sidebar: 'auto'
categories:
 - 算法与数据结构
tags:
 - 二叉平衡树
publish: true
---

> 二叉搜索树是二叉树的特例，平衡二叉树则是二叉搜索树的特例。
## 什么是平衡二叉树?
> 在上一节的末尾，我们已经通过一道真题和平衡二叉树打过交道。正如题目中所说，平衡二叉树（又称 AVL Tree）指的是任意结点的左右子树高度差绝对值都不大于1的二叉搜索树。

## 为什么要有平衡二叉树？
平衡二叉树的出现，是为了降低二叉搜索树的查找时间复杂度。
> 平衡二叉树由于利用了二分思想，查找操作的时间复杂度仅为 O(logN)。

## 命题考点
- 对特性的考察（本节以平衡二叉树的判定为例）
- 对操作的考察（本节以平衡二叉树的构造为例）

## 给定一个二叉树，判断它是否是高度平衡的二叉树。
本题中，一棵高度平衡二叉树定义为： 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
> 示例 1:
给定二叉树 [3,9,20,null,null,15,7]
```
    3
   / \
  9  20
    /  \
   15   7
```
> 返回 true 。

```js
/**
 * 思路分析
 * 采用了深度遍历，从外到里计算深度，遍历到最深处结点的时候，深度为0，然后倒推回上一层结点的深度，一次遍历就获取到了所有结点的深度。广度遍历时间复杂度要高很多。
 */
const isBalance = (root) => {
	let flag = true;
	
	function dfs(root) {
		if (!root || !flag) {
			return 0;
		}
		
		const left = dfs(root.left);
		const right = dfs(root.right);
		
		if (Math.abs(left - right) > 1) {
			flag = false;
			return 0;
		}
		
		return Math.max(left, right) + 1;
	}
	
	dfs(root);
	
	return flag;
};
```

## 题目描述：给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。
如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是平衡的。
如果有多种构造方法，请你返回任意一种。
> 思路分析，二叉搜索树的中序遍历是有序的，这道题就可以转变为根据有序数组，生成平衡二叉树，和上次讲的题一样了，从中间拿起来
```js
const generateTree = (root) => {
	let sorted = [];
	
	function scan(rootInner) {
		if (!rootInner) return;
		
		scan(rootInner.left);
		sorted.push(rootInner.val);
		scan(rootInner.right);
	}
	
	scan(root);
	
	function dfs(low, high) {
		if (low > high) return;
		
		const mid = Math.floor(low + (high - low) / 2);
		const node = new TreeNode(sorted[mid]);
		node.left = dfs(low, mid - 1);
		node.right = dfs(mid + 1, high);
		
		return node;
	}
	
	return dfs(0, sorted.length - 1);
};
```