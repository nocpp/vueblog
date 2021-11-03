---
title: 二叉搜索树
date: '2021-11-02'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 二叉搜索树
publish: true
---

## 二叉搜索树（Binary Search Tree）简称 BST，是二叉树的一种特殊形式。它有很多别名，比如排序二叉树、二叉查找树等等。
## 什么是二叉搜索树？
树的定义总是以递归的形式出现，二叉搜索树也不例外，它的递归定义如下：

1. 是一棵空树
2. 是一棵由根结点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域

满足以上两个条件之一的二叉树，就是二叉搜索树。

> 二叉搜索树强调的是数据域的有序性。也就是说，二叉搜索树上的每一棵子树，都应该满足 左孩子 <= 根结点 <= 右孩子 这样的大小关系。以下都是二叉搜索树
:::tip
     4
    /
   3
 /
2

   5
 /   \
2     7
 \
  3

        6
      /   \
     3     8
    / \   / \
   1   4 7   9
:::

## 二叉搜索树：编码基本功
1. 查找数据域为某一特定值的结点
2. 插入新结点
3. 删除指定结点

### 查找数据域为某一特定值的结点
> 思路分析：根据二叉搜索树的特性进行查找，比较当前遍历结点的值与目标值，如果比目标值小，说明在左子树里面，相反则在右子树里面，相等则输出该结点
```js
const testList = {
	val: 6,
	left: {
		val: 3,
		left: {
			val: 1
		},
		right: {
			val: 4
		}
	},
	right: {
		val: 8,
		left: {
			val: 7
		},
		right: {
			val: 9
		}
	}
}

const testFn = function (root, n) {
	if (!root) {
		return root;
	}
	
	if (root.val === n) {
		return root;
	}
	
	if (root.val < n) {
		return testFn(root.right, n);
	} else {
		return testFn(root.left, n);
	}
	
	return root;
};
```

### 插入新结点
> 思路分析，插入结点和查找结点思路类似，通过大小比较查找位置，找到空位放进去
```js
const testFn = function (root, n) {
	if (!root) {
		root = new TreeNode(n);
		return root;
	}
	
	if (root.val > n) {
		root.left = testFn(root.left, n);
	} else {
		root.right = testFn(root.right, n);
	}
	
	return root;
};
```

### 删除指定值的结点
```js
const deleteFn = function (root, n) {
	if (!root) {
		return root;
	}
	
	if (root.val === n) {
		if (!root.left && !root.right) {
			root = null;
		} else if (root.left) {
			const maxLeft = findMax(root.left);
			root.val = maxLeft.val;
			root.left = deleteFn(root.left, maxLeft.val);
		} else {
			const minRight = findMin(root.right);
			root.val = minRight.val;
			root.right = deleteFn(roo.right, minRight.val);
		}
	} else if (root.val > n) {
		root.left = deleteFn(root.left, n);
	} else {
		root.right = deleteFn(root.right, n);
	}
	
	return root;
};

const findMax = function(root) {
	while(root.right) {
		root = root.right;
	}
	
	return root;
};

const findMin = function(root) {
	while(root.left) {
		root = root.left;
	}
	
	return root;
}
```