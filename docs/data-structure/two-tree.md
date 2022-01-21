---
title: 二叉树的应用
date: '2021-11-02'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 二叉树
publish: true
---

## 题目描述：给定一个二叉树，返回它的前序（先序）遍历序列。
> 示例:
输入: [1,null,2,3]
:::tip
1   
 \   
  2   
 /  
3 

输出: [1,2,3]
进阶: 递归算法很简单，你可以通过迭代算法完成吗？
:::

> 递归和栈有着脱不开的干系。当一道本可以用递归做出来的题，突然不许你用递归了，此时我们本能的反应，就应该是往栈上想。  
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    const stack = [];
    const ret = [];

    if (root) {
        stack.push(root);
    }

    while (stack.length) {
        const cur = stack.pop();
        ret.push(cur.val);

        if (cur.right) {
            stack.push(cur.right);
        }

        if (cur.left) {
            stack.push(cur.left);
        }
    }

    return ret;
};
```

## 用迭代法后序遍历二叉树
> 思路分析，先序遍历和后序遍历的差别就是，根结点一个在前，一个在后，使用unshift代替push即可
```js
const testFn = function (root) {
	if (!root) return;
	
	let res = [];
	let stack = [];
	
	stack.push(root);
	
	while(stack.length) {
		const cur = stack.pop();
		res.unshift(cur.val);
		
		if (cur.left) {
			stack.push(cur.left);
		}
		
		if (cur.right) {
			stack.push(cur.right);
		}
	}
	
	console.log(res);
};
```

## 用迭代法实现二叉树中序遍历
中序与前两种不同，因为根节点是在中间，所以需要对statck进行操作
```js
const testFn = function (root) {
	let res = [];
	let stack = [];
	let cur = root;
	
	while (cur || stack.length) {
		while (cur) {
			stack.push(cur);
			cur = cur.left;
		}
		
		cur = stack.pop();
		res.push(cur.val);
		cur = cur.right;
	}
	
	console.log(res);
	
	return res;
};
```

```js
//思路二
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const ret = [];
    const stack = [];

    if (root) {
        stack.push(root);
    }

    while (stack && stack.length) {
        const stackTop = stack[stack.length - 1];

        if (stackTop.left) {
            stack.push({...stackTop.left});
            stackTop.left = null;
            continue;
        }

        const curNode = stack.pop();
        ret.push(curNode.val);

        if (curNode.right) {
            stack.push({...curNode.right});
            curNode.right = null;
        }
    }

    //  1
    // 2 3
    //4 5
    // 6 7

    return ret;
};
```

## 层序遍历的衍生问题    
### 题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
> 示例：
二叉树：[3,9,20,null,null,15,7],
```
  3
 / \
9  20
  /  \
 15   7
```
> 返回其层次遍历结果：
```
[
[3],
[9,20],
[15,7]
]
```
> 思路分析：想到层次遍历二叉树，就要想到队列
```js
var levelOrder = function(root) {
    let queue = [];
    const ret = [];

    if (root) {
        queue.push(root);
    }

    while (queue.length) {
        const tempRet = [];
        const nextQueue = [];
        while (queue.length) {
            const top = queue.shift();
            tempRet.push(top.val);

            top.left && nextQueue.push(top.left);
            top.right && nextQueue.push(top.right);
        }

        ret.push(tempRet);

        queue = nextQueue;
    }

    return ret;
};
```


## 翻转二叉树
> 题目描述：翻转一棵二叉树。
> 示例：
> 输入
```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```
> 输出
```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```
> 思路分析：翻转二叉树就是把每个结点的左右子树对换，这种重复的操作就要想到递归
```js
const testFn = function (root) {
	if (!root) {
		return root;
	}
	
	let temp = root.left;
	root.left = root.right;
	root.right = temp;
	
	testFn(root.left);
	testFn(root.right);
	
	return root;
};
```
> 思路2
```js
var invertTree = function(root) {
    function dfs(node) {
        if (!node) return;

        [node.left, node.right] = [node.right, node.left];
        dfs(node.left);
        dfs(node.right);
    }

    dfs(root);

    return root;
};
```
> 先交换最深处的子节点
```js
//参考答案
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = function(root) {
    // 定义递归边界
    if(!root) {
        return root;
    }
    // 递归交换右孩子的子结点
    let right = invertTree(root.right);
    // 递归交换左孩子的子结点
    let left = invertTree(root.left);
    // 交换当前遍历到的两个左右孩子结点
    root.left = right;
    root.right = left;
    return root;
};
```