---
title: 数组的应用
date: '2021-10-14'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 数组
publish: true
---

## Map 的秒用，两数求和问题
真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

:::tip
示例:
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
:::

```js
/**
 * 技巧：
 * 1. 求和问题转为求差问题
 * 2. 双循环问题尽量转化为单循环
 * 3. 使用空间换时间问题，使用Map提前将值和索引存起来
 * @param {Object} _nums
 * @param {Object} _target
 */
function getIndexByTarget(_nums, _target) {
    let map = new Map();
    const len = _nums.length;
    for (let i = 0; i < len; i++) {
        if (map.has(_target - _nums[i])) {
            return [map.get(_target - _nums[i]), i];
        } else {
            map.set(_nums[i], i);
        }
    }
    
    return false;
}
```

## 强大的双指针法
### 合并两个有序数组
:::tip
真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6], n = 3
输出: [1,2,2,3,5,6]

说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
:::

```js
//做题先考虑清楚输入，输出，有哪些内容，测试用例，有哪几种情况
function doubleThis(_nums1, _m, _nums2, _n) {
    let i = _m - 1, j = _n - 1, lastIndex = 0;
    while (j >= 0 && i >= 0) {
        if (_nums1[i] <= _nums2[j]) {
            _nums1.splice(i + 1, 0, _nums2[j]);
            lastIndex = i + 1;
            j--;
        } else {
            i--;
        }
    }
    
    if (j >= 0) {
        for (let k = j; k >= 0; k--) {
            _nums1.splice(lastIndex, 0, _nums2[k]);
        }
    }
    
    
    return _nums1;
}

//参考答案
const merge = function(nums1, m, nums2, n) {
    // 初始化两个指针的指向，初始化 nums1 尾部索引k
    let i = m - 1, j = n - 1, k = m + n - 1
    // 当两个数组都没遍历完时，指针同步移动
    while(i >= 0 && j >= 0) {
        // 取较大的值，从末尾往前填补
        if(nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i] 
            i-- 
            k--
        } else {
            nums1[k] = nums2[j] 
            j-- 
            k--
        }
    }
    
    // nums2 留下的情况，特殊处理一下 
    while(j>=0) {
        nums1[k] = nums2[j]  
        k-- 
        j--
    }
};
```
> 指针就是个索引，通过移动指针访问不同元素


### 三数求和问题
:::tip
真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

示例:
给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
:::
```js
function threeSum(_arr) {
    let result = [];

    _arr = _arr.sort((a, b) => a - b);
    
    const len = _arr.length;
    for (let i = 0; i < len - 2; i++) {
        let j = i + 1, k = len - 1;
        
        //防止重复元素
        if (i > 0 && _arr[i] === _arr[i - 1]) {
            continue;
        }
        
        while (j < k) {
            if (_arr[i] + _arr[j] + _arr[k] === 0) {
                result.push([_arr[i], _arr[j], _arr[k]]);
                k--;
                j++;
                
                //防止重复元素
                while (j < k && _arr[j] === _arr[j - 1]) {
                    j++;
                }
                
                //防止重复元素
                while (j < k && _arr[k] === _arr[k + 1]) {
                    k--;
                }
            } else if (_arr[i] + _arr[j] + _arr[k] > 0) {
                k--;
                
                //防止重复元素
                while (j < k && _arr[k] === _arr[k + 1]) {
                    k--;
                }
            } else {
                j++;
                
                //防止重复元素
                while (j < k && _arr[j] === _arr[j - 1]) {
                    j++;
                }
            }
        }
    }
    
    return result;
}
```

> 当想到“有序”和“数组”时，就应该想到对撞指针解法