---
title: 数组的应用
date: '2021-10-14'
sidebar: 'auto'
categories:
 - 算法与数据结构
tags:
 - 数组
publish: true
---

## Map 的妙用，两数求和问题
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


## 贪心算法
K 次取反后最大化的数组和
:::tip
给你一个整数数组 nums 和一个整数 k ，按以下方法修改该数组：  

选择某个下标 i 并将 nums[i] 替换为 -nums[i] 。  
重复这个过程恰好 k 次。可以多次选择同一个下标 i 。  

以这种方式修改数组后，返回数组 可能的最大和 。  

输入：nums = [4,2,3], k = 1  
输出：5  
解释：选择下标 1 ，nums 变为 [4,-2,3] 。  

输入：nums = [3,-1,0,2], k = 3  
输出：6  
解释：选择下标 (1, 2, 2) ，nums 变为 [3,1,0,2] 。  
:::

> 思路分析，暴力枚举法，把可能的情况枚举出来
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function(nums, k) {
    // 1. 根据k在数组中找到负数和0的，先对数组进行排序
    // 2. 优先翻转负数，然后翻转0，然后再是正数
    // 3. 最后求和

    //1. 先对数组进行排序，增序
    //2. 然后找到前k个数并分析

    //3. 如果前k个都是负数，则全部翻转。如果k大于ken，则需要翻转全部负数后找到最小值进行翻转【解决】
    //4. 如果前k个都是正数，则找到最小值进行k次翻转【解决】
    //5. 如果前k个都是0，则直接求和【解决】
    //6. 如果前k个有负有正，就对负数进行翻转，然后看剩下数量是否为偶数，是就直接就和，否则找到最小正数进行k次翻转【解决】
    //7. 如果前k个是负数和0，对全部负数进行翻转，求和【解决】
    //8. 如果前k个是正数和0，直接求和【解决】
    //9. 如果前k个是正数，负数，和0，就直接把负数转正，然后求和【解决】

    let maxSum = 0;
    let sortedNum = [...nums].sort((a, b) => a - b);
    let kNum = sortedNum.slice(0, k);
    const len = nums.length;

    const containZero = kNum.includes(0);
    const containNegative = kNum.some(item => item < 0);
    const everyNegative = kNum.every(item => item < 0);

    if ((containZero || everyNegative) && len >= k) {
        if (!containNegative) {
            maxSum = sortedNum.reduce((sum, cur) => sum + cur, 0);
        } else {
            for (let i = 0; i < len; i++) {
                if (i < k && sortedNum[i] < 0) {
                    maxSum += -sortedNum[i];
                } else {
                    maxSum += sortedNum[i];
                }
            }
        }
    } else {
        if (!containNegative) {
            sortedNum[0] = Math.pow(-1, k) * sortedNum[0];
        } else {
            let remainNum = k;
            for (let i = 0; i < k; i++) {
                if (sortedNum[i] < 0) {
                    sortedNum[i] = -sortedNum[i];
                    remainNum--;
                }
            }

            sortedNum = sortedNum.sort((a, b) => a - b);
            sortedNum[0] = Math.pow(-1, remainNum) * sortedNum[0];
        }
        maxSum = sortedNum.reduce((sum, cur) => sum + cur, 0);
    }

    return maxSum;
};
```


### 贪心算法解法
1. 贪心的思路，局部最优：让绝对值大的负数变为正数，当前数值达到最大，整体最优：整个数组和达到最大。局部最优可以推出全局最优。
2. 那么如果将负数都转变为正数了，K依然大于0，此时的问题是一个有序正整数序列，如何转变K次正负，让 数组和 达到最大。那么又是一个贪心：局部最优：只找数值最小的正整数进行反转，当前数值可以达到最大
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function(nums, k) {
    let sortedNums = nums.sort((a, b) => Math.abs(b) - Math.abs(a));

    const len = sortedNums.length;

    for (let i = 0; i < len && k > 0; i++) {
        if (sortedNums[i] < 0) {
            sortedNums[i] *= -1;
            k--;
        }
    }

    if (k % 2 === 1) {
        sortedNums[len - 1] *= -1;
    }

    return sortedNums.reduce((sum, cur) => sum + cur, 0);
};
```