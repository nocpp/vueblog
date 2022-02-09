---
title: 堆结构
date: '2021-11-8'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 堆
publish: true
---

## 完全二叉树
完全二叉树是指同时满足以下两个条件的二叉树
1. 从第一层到倒数第二层，每一层结点都是满的
2. 倒数第一层结点排列顺序是从左到右，不存在跳跃结点的情况

## 完全二叉树特性
> 二叉树的结点索引是从根结点开始数，然后从左到右，索引值和数组一样，从0开始。
假设当前结点的索引为n，那么它的父结点和子结点索引满足以下规律
1. 父结点索引为(n - 1) / 2
2. 左子结点索引为2*n + 1
3. 右子结点索引为2*n + 2

## 什么是堆？
堆是完全二叉树的一种特例，分为以下两种
1. 大顶堆
2. 小顶堆

### 大顶堆
大顶堆，顾名思义就是每个结点的值，要大于左右子结点的值

### 小顶堆
小顶堆，每个结点的值，要小于左右子结点的值

> 以下操作默认是大顶堆

## 取出堆顶元素
1. 用堆里的最后一个元素（对应图中的数字1）替换掉堆顶元素。
2. 对比新的堆顶元素（1）与其左右孩子的值，如果其中一个孩子大于堆顶元素，则交换两者的位置：
```js
//向下对比和交换
function down(low, high) {
	let i = low, j = 2 * i + 1;
	
	while (j <= high) {
		if (j + 1 <= high && heap[j + 1] > heap[j]) {
			j = j + 1;
		}
		
		if (heap[i] < heap[j]) {
			const temp = heap[i];
			heap[i] = heap[j];
			heap[j] = temp;
			
			i = j;
			j = 2 * i + 1;
		} else {
			break;
		}
	}
}
```

## 往堆里追加一个元素
1. 新来的数据首先要追加到当前堆里最后一个元素的后面。比如我现在要新增一个10，它就应该排在最后一层的最后一个位置
2. 不断进行向上对比+交换的操作：如果发现10比父结点的结点值要大，那么就和父结点的元素相互交换，再接着往上进行比较，直到无法再继续交换为止。首先被比下去的是值为6的直接父结点
```js
function upHeap(low, high) {
	let i = high;
	let j = Math.floor((i - 1) / 2);
	
	while (j >= low) {
		if (heap[i] > heap[j]) {
			const temp = heap[i];
			heap[i] = heap[j];
			heap[j] = temp;
			
			i = j;
			j = Math.floor((i - 1) / 2);
		} else {
			break;
		}
	}
}
```

## 优先队列
:::tips
当题目中出现类似于“第k大”或者“第k高“这样的关键字时，就是在暗示你用优先队列/堆结构来做题——这样的手法可以允许我们在不对序列进行完全排序的情况下，找到第 k 个最值。
:::
> 题目描述：在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

```js
//利用排序的方法
findKMax(arr, k) {
	arr.sort((a, b) => b - a);
	return arr[k - 1];
}
```


### 小顶堆方法
> 要想求出第 k 大的元素，我们可以维护一个大小为 k 的小顶堆。
1. 创建一个大小为k的最小堆，插入数组[0, k-1]的元素
2. 然后用[k, arr.length - 1]的元素取更新堆，如果比堆顶元素大，就插入，否则忽略
3. 最后堆顶元素就是第k个最大的元素
```js
function findKMax(arr, k) {
	const heap = [];//堆数组
	let n = 0; //当前堆最大索引
	
	function createHeap() {
		for (let i = 0; i < k; i++) {
			insertNode(arr[i]);
		}
	}
	
	function insertNode(val) {
		heap[n] = val;
		upCompare(0, n);
		n++;
	}
	
	function updateHeap() {
		for (let i = k; i < arr.length; i++) {
			if (arr[i] > heap[0]) {
				heap[0] = arr[i];
				downHeap(0, k);
			}
		}
	}
	
	function downHeap(low, high) {
		let i = low;
		let j = 2 * i + 1;
		
		while (j <= high) {
			if (j + 1 <= high && heap[j + 1] < heap[j]) {
				j = j + 1;
			}
			
			if (heap[i] > heap[j]) {
				const temp = heap[i];
				heap[i] = heap[j];
				heap[j] = temp;
				
				i = j;
				j = 2 * i + 1;
			} else {
				break;
			}
		}
	}
	
	function upCompare(low, high) {
		let i = high;
		let j = Math.floor((i - 1) / 2);
		
		while (i >= low) {
			if (heap[i] < heap[j]) {
				const temp = heap[i];
				heap[i] = heap[j];
				heap[j] = temp;
				
				i = j;
				j = Math.floor((i - 1) / 2);
			} else {
				break;
			}
		}
	}
	
	createHeap();
	updateHeap();
	
	return heap[0];
}
```