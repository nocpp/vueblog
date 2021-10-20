---
title: 时间复杂度和空间复杂度
date: '2021-10-19'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 时间复杂度
 - 空间复杂度
publish: true
---

> 时间复杂度和空间复杂度是评价算法的一个方法

## 时间复杂度
时间复杂度就是代码执行的次数
```js
function traverse(arr) {
    var len = arr.length //1次
    for(var i=0;i<len;i++) {//1 + len + 1 + len
        console.log(arr[i])//len次
    }
}
```
所以以上代码执行次数是 1 + 1 + len + 1 + len + len = 3len + 3，所以时间复杂度就是3n+3

### 二维数组的遍历
```js
function traverse(arr) {
    var outLen = arr.length // 1次

    for(var i=0;i<outLen;i++) { // 1 + outLen + 1 + outLen
        var inLen = arr[i].length // outLen

        for(var j=0;j<inLen;j++) { // outLen + (inLen + 1) * outLen + inLen * outLen
            console.log(arr[i][j]) // inLen * outLen
        }
    }
}
```
所以以上代码执行次数是 1 + 1 + outLen + 1 + outLen + outLen + outLen + (inLen + 1) * outLen + inLen * outLen + inLen * outLen = 3 + 5outLen + 3inLen * outLen = 3n^2 + 5n + 3

##  T(n) 与 O(n)
	T(n) 就是 代码执行次数，但是评估起来比较麻烦，从而推导出O(n)表示法，来看变化的趋势
	
### O(n)规则
1. 若 T(n) 是常数，那么无脑简化为1
2. 若 T(n) 是多项式，比如 3n^2 + 5n + 3，我们只保留次数最高那一项，并且将其常数系数无脑改为1。

所以 T(10)就是O(1), T(3n^2 + 5n + 3) 就是 O(n^2)

### logn时间复杂度
```js
function fn(arr) {
    var len = arr.length  
    
    for(var i=1;i<len;i=i*2) {
        console.log(arr[i]) //执行了log2 len
    }
}
```
> 注意涉及到对数的时间复杂度，底数和系数都是要被简化掉的
所以log2 n就是 logn 即以上代码时间复杂度表示为O(n) = logn;

### 常用的时间复杂度排序
1. O(1)
2. O(logn)
3. O(n)
4. O(nlogn)
5. O(n^2)
6. O(n^3)
7. O(2^n)

## 空间复杂度
空间复杂度是对一个算法在运行过程中临时占用存储空间大小的量度。和时间复杂度相似，它是内存增长的趋势。

### 常见的空间复杂度
O(1), O(n), O(n^2)
```js
//占据空间的变量有 len, arr, i, 所以空间复杂度是O(1)
function traverse(arr) {
    var len = arr.length
    for(var i=0;i<len;i++) {
        console.log(arr[i])
    }
}

//占据空间的变量有 arr, i, n,arr的长度由n决定，所以复杂度是O(n)
function init(n) {
    var arr = []
    for(var i=0;i<n;i++) {
        arr[i] = i
    }
    return arr
}

//初始化二维数组，复杂度是O(n^2)
```