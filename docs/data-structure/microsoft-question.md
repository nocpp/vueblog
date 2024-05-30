---
title: 微软真题
date: '2021-11-14'
sidebar: 'auto'
categories:
 - 算法与数据结构
tags:
 - 微软真题
publish: true
---

## 最长回文子串
> 题目描述：给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
:::tip
示例 1：

输入: "babad"  
输出: "bab"  
注意: "aba" 也是一个有效答案。  

示例 2：  

输入: "cbbd"  
输出: "bb"  
:::

### 思路1，使用暴力循环法
1. 遍历找到所有子串
2. 判断每个子串是否是回文字符串
3. 如果字串是回文子串，则与最大的子串进行比较，如果更大则更新最大子串

> 暴力法会导致超时，时间复杂度为O(n^3)

### 思路2，动态规划法
当遇见最值问题，可以考虑动态规划法。求子串需要用到两个指针i, j，然后使用双层数组记录子串是否回文串，d[i][j] = 1时表示是回文子串。
由题可知，d[i][i]肯定等于1，然后d[i][i+1]的状态 看d[i]和d[i+1]是否相等，相等也是1，然后就是根据状态方程来推导

> 状态转移方程
```js
    if (s[i] === s[j]) {
        d[i][j] = d[i + 1][j - 1];//由此可知，d[i][j]状态还由其子串决定
    } else {
        d[i][j] = 0;
    }
```

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let st = 0, ed = 0;//初始化最大子串开始和结束索引
    let d = [];//存放子串是否回文的状态
    
    let len = s.length;
    
    for (let i = 0; i < len; i++) {
        d[i] = [];
        d[i][i] = 1;//初始化单个字符串为回文
    }
    
    for (let i = 0; i < len - 1; i++) {
        if (s[i] === s[i + 1]) {//判断长度为2的子串的回文情况
            d[i][i + 1] = 1;
            st = i;
            ed = i + 1;
        }
    }
    
    for (let n = 3; n <= len; n++) {//判断子串长度为3以上的情况，n <= len因为当len等于3时，也要遍历
        for (let i = 0; i < len - n + 1; i++) {//移动子串，就像游标卡尺移动一样，子串长度由n决定
            let j = n + i - 1;//j为长度为n的子串末端索引
            
            if (d[i + 1][j - 1]) {//状态转移方程，判断出d[i][j]的回文状态
                if (s[i] === s[j]) {
                    d[i][j] = 1;
                    st = i;
                    ed = j;
                }
            }
        }
    }
    
    return s.slice(st, ed + 1);//返回最长回文子串
};
```

## 根据前序遍历和中序遍历生成二叉树
:::tip
前序遍历的特点是第一个元素是根节点  
中序遍历的特点是根节点在数组中间，然后根节点左侧元素是左子树结点，右侧是右子树结点  
然后就可以根据先在前序遍历结果中找到根节点，再在中序遍历中找到根结点索引，再找左右子树结点
:::
> 二叉树就要想到递归，二叉树定义是要求二叉树每个结点都满足，所以挨着判断每个二叉树结点
```js
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
	const len = preorder.length;
	
	function build(preL, preR, inL, inR) {
        if(preL > preR) {//递归终止条件
            return null
        }
		
		const root = new TreeNode()
        root.val = preorder[preL];
		
		const k = inorder.indexOf(root.val)  //找到根节点索引
		
		const numLeft = k - inL;//左子树结点数量，用来划分前序遍历左右子树结点范围的
		
		root.left = build(preL + 1, preL + numLeft, inL, k - 1);//左子树
		root.right = build(preL + numLeft + 1, preR, k + 1, inR);//右子树
		
		return root;
	}
	
	return build(0, len - 1, 0, len - 1);
};
```

## 根据中序遍历和后序遍历生成二叉树
> 思路同上大同小异
```js
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    const len = inorder.length;

    function build(inL, inR, poL, poR) {
        if (inL > inR) {
            return null;
        }

        const root = new TreeNode();
        root.val = postorder[poR];

        const k = inorder.indexOf(root.val);
        const numLeft = k - inL;//左子树结点数量，用来划分后序遍历左右子树结点范围的

        root.left = build(inL, k - 1, poL, poL + numLeft - 1);
        root.right = build(k + 1, inR, poL + numLeft, poR - 1);

        return root;
    }

    return build(0, len - 1, 0, len - 1);
};
```

## 复制带随机指针的链表
:::tip
题目描述：给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。要求返回这个链表的 深拷贝。

示例：  
输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]  
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]  
:::
> 思路分析：此题属于链表复制增强版题目，遍历链表复制链表，并记录复制结点和原结点的对应关系，方便复制random指针，然后再遍历，复制random结点
```js
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (!head) return null;

    let copyHead = new Node();
    let copyNode = copyHead;
    let nodeMap = new Map();

    let cur = head;

    while (cur) {//遍历复制链表，目前只复制链结点值
        copyNode.val = cur.val;
        copyNode.next = cur.next ? new Node() : null;

        nodeMap.set(cur, copyNode);//利用Map结构存储原结点和复制结点的关系，方便后面random结点的复制

        copyNode = copyNode.next;
        cur = cur.next;
    }

    copyNode = copyHead;
    cur = head;

    while (cur) {//复制random结点
        copyNode.random = cur.random ? nodeMap.get(cur.random) : null;
        copyNode = copyNode.next;
        cur = cur.next;
    }

    return copyHead;
};
```