---
title: DFS（深度优先搜索）和BFS（广度优先搜索）
date: '2021-10-28'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - DFS
 - BFS
publish: true
---

## 深度优先搜索思想DFS
只要没有碰壁，就决不选择其它的道路，而是坚持向当前道路的深处挖掘——像这样将“深度”作为前进的第一要素的搜索方法，就是所谓的“深度优先搜索”。深度优先搜索的核心思想，是试图穷举所有的完整路径。

### 深度优先搜索的本质——栈结构
深度优先搜索的过程可以转化为一系列的入栈、出栈操作。

### DFS编码方法
DFS 中，我们往往使用递归来模拟入栈、出栈的逻辑。和二叉树的先序遍历很像

## 广度优先搜索思想BFS
广度优先搜索每次以“广度”为第一要务、雨露均沾，一层一层地扫描，最后也能够将所有的坐标扫描完全

丢弃已访问的坐标、记录新观察到的坐标，这个顺序毫无疑问符合了“先进先出”的原则，因此整个 BFS 算法的实现过程，和队列有着密不可分的关系。

## BFS实战：二叉树的层序遍历
```js
function cengFn(node) {
    let queen = [node];
    
    while (queen.length > 0) {
        let node = queen.shift();
        console.log(node.val);
        
        if (node.left) {
            queen.push(node.left);
        }
        
        if (node.right) {
            queen.push(node.right);
        }
    }
}
```
> 力扣真题
```js
var levelOrder = function(root) {
    const result = [];
    let queue = [];

    if (root) {
        queue.push(root);
    }

    while (queue.length) {
        const valList = [];
        const nextQueue = [];

        while (queue.length) {
            const node = queue.shift();
            if (node.left) {
                nextQueue.push(node.left);
            }

            if (node.right) {
                nextQueue.push(node.right);
            }
            valList.push(node.val);
        }

        result.push(valList);
        queue = nextQueue;
    }

    return result;
};
```