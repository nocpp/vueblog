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

## 寻找两个正序数组的中位数
题目描述：给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。你可以假设 nums1 和 nums2 不会同时为空。
:::tip
示例 1:  
nums1 = [1, 3]  
nums2 = [2]  
则中位数是 2.0  

示例 2:  
nums1 = [1, 2]  
nums2 = [3, 4]  
则中位数是 (2 + 3)/2 = 2.5
:::

> 中位数就是数组中间的数，如果数组长度是奇数，就直接是中间那个值，如果是偶数，则是中间两个数的和的1/2
> 思路分析：由于时间复杂度限制了是log，所以要想到二分查找法
1. 分别把两个数组各切一刀，分为两块儿，如下所示
```js
[1, 2, ｜ 3, 4, 5] //L1就是2, R1就是3；slice1就是第一个数组“下刀”的位置的右侧第一个元素，也就是R1的索引，此时是2；slice1L是二分查找的的左侧值，slice1R是二分查找的右侧值
[7, 8, 9, ｜ 10, 11] //L2就是9, R2就是10，slice2就是就是第二个数组“下刀”的位置的右侧第一个元素，也就是R2的索引，此时是3
```
2. 满足slice1 + slice2 = Math.floor(len / 2), len是总长度
3. 当满足L1 < R2 且 L2 < R1时，如果len是奇数，返回R1，R2中最小值，如果是偶数，就是L1,L2 最大值 加上 R1，R2最小值除以2

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const len1 = nums1.length;
    const len2 = nums2.length;
	
	//保证长度较小的数组是num1
    if (len1 > len2) {
        return findMedianSortedArrays(nums2, nums1);
    }

    const len = len1 + len2;
    let slice1 = 0, slice2 = 0, slice1L = 0, slice1R = len1;

    while (slice1 <= len1) {
        slice1 = Math.floor((slice1R - slice1L) / 2) + slice1L;
        slice2 = Math.floor(len / 2) - slice1;

        const L1 = (slice1 === 0) ? -Infinity : nums1[slice1 - 1];
        const L2 = (slice2 === 0) ? -Infinity : nums2[slice2 - 1];
        const R1 = (slice1 === len1) ? Infinity : nums1[slice1];
        const R2 = (slice2 === len2) ? Infinity : nums2[slice2];

        if (L1 > R2) {
            slice1R = slice1 - 1;
        } else if (L2 > R1) {
            slice1L = slice1 + 1;
        } else {
            if (len % 2 === 0) {
                const L = L1 > L2 ? L1 : L2;
                const R = R1 > R2 ? R2 : R1;

                return (L + R) / 2;
            } else {
                const mediaVal = R1 > R2 ? R2 : R1;
                return mediaVal;
            }
        }
    }
};
```

:::tip
时间复杂度为O(m + n)版本
:::
```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const len1 = nums1.length;
    const len2 = nums2.length;
    const len = len1 + len2;

    if (len1 > len2) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    for (let i = 0; i <= len1; i++) {
        let slice1 = i;
        let slice2 = Math.floor(len / 2) - slice1;

        let R1 = slice1 === len1 ? Infinity : nums1[slice1];
        let R2 = slice2 === len2 ? Infinity : nums2[slice2];
        let L1 = slice1 === 0 ? -Infinity : nums1[slice1 - 1];
        let L2 = slice2 === 0 ? -Infinity : nums2[slice2 - 1];

        if ((L1 <= R2) && (L2 <= R1)) {
            if (len % 2 === 0) {
                return (Math.max(L1, L2) + Math.min(R1, R2)) / 2;
            } else {
                return Math.min(R1, R2);
            }
        }
    }
};
```