---
title: 二叉搜索树
date: '2021-11-02'
sidebar: 'auto'
categories:
 - 算法与数据结构
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
			root = null;//实际作用就是删除了这个结点
		} else if (root.left) {
			const maxLeft = findMax(root.left);
			root.val = maxLeft.val;//把左子树最大的值赋值给该结点，就相当于把这个结点删除了
			root.left = deleteFn(root.left, maxLeft.val);//把赋值的这个子结点删除，置为null
		} else {
			const minRight = findMin(root.right);
			root.val = minRight.val;//与上面相同
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

### 二叉搜索树的特性
> 二叉搜索树的中序遍历是有序的

### 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
假设一个二叉搜索树具有如下特征：  
节点的左子树只包含小于当前节点的数。  
节点的右子树只包含大于当前节点的数。  
所有左子树和右子树自身必须也是二叉搜索树。
> 示例 1:
输入:
```
    2
   / \
  1   3
```
输出: true

> 思路分析，本题考的其实就是二叉搜索树的定义，如果是空树或者每一个结点都满足二叉搜索树的定义就返回true
```js
const validIsBST = (root) => {
	// min，max的作用是保证左右子树中值有效
	function dfs(node, min, max) {
		if (!node) {
			return true;
		}
		
		if (node.val <= min || node.val >= max) {
			return false;
		}
		
		return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
	}
	
	return dfs(root, -Infinity, Infinity);
};
```

### 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
> 示例:
给定有序数组: [-10,-3,0,5,9],
一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

```
      0
     / \
   -3   9
   /   /
 -10  5
```
:::tip
这个二叉树从形状上来看，像不像是把数组从 0 这个中间位置给“提起来”了？  
1. 二叉搜索树的特性：题目中指明了目标树是一棵二叉搜索树，二叉搜索树的中序遍历序列是有序的，题中所给的数组也是有序的，因此我们可以认为题目中给出的数组就是目标二叉树的中序遍历序列。中序遍历序列的顺序规则是 左 -> 根 -> 右，因此数组中间位置的元素一定对应着目标二叉树的根结点。以根结点为抓手，把这个数组“拎”起来，得到的二叉树一定是符合二叉搜索树的排序规则的。  
2. 平衡二叉树的特性：虽然咱们还没有讲啥是平衡二叉树，但是题目中已经妥妥地给出了一个平衡二叉树的定义：
:::
```js
var sortedArrayToBST = function(nums) {
    if (!nums.length) return null;

    const root = buildTree(0, nums.length - 1);

    function buildTree(low, high) {
        if (low > high) {
            return null;
        }

        const mid = Math.floor((high + low)/2);
        const node = new TreeNode(nums[mid]);

        node.left = buildTree(low, mid - 1);
        node.right = buildTree(mid + 1, high);

        return node;
    }

    return root;
};
```
### 执行用时：64 ms，击败了100%用户的答案，哈哈哈哈哈哈
```js
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if (!nums.length) {
        return null;
    }
    
    const middleIndex = Math.floor(nums.length / 2);
    const root = new TreeNode(nums[middleIndex]);

    root.left = sortedArrayToBST(nums.slice(0, middleIndex));
    root.right = sortedArrayToBST(nums.slice(middleIndex + 1));

    return root;
};
```