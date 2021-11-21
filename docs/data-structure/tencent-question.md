---
title: 腾讯真题
date: '2021-11-31'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 腾讯真题
publish: true
---

## 寻找二叉树的最近公共祖先
题目描述： 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
:::tip
示例 1:

输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1  
输出: 3  
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。  

示例 2:  

输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4  
输出: 5  
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
:::

> 思路分析：查找两个节点的公共祖先有三种情况
- 要查找的两个节点在当前遍历节点的左右子树中可以找到，则返回当前遍历的节点
- 两个节点都在当前遍历节点的同一侧，则返回最近的那个节点，先找到哪个就返回哪个
- 没找到就返回空

```js
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    function def(root, p, q) {
        if (!root || root === p || root === q) {
            return root;
        }

        const leftNode = def(root.left, p, q);
        const rightNode = def(root.right, p, q);

        if (leftNode && rightNode) {
            return root;
        }

        return leftNode || rightNode;
    }

    return def(root, p, q);
};
```