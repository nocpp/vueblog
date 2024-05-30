---
title: 排序算法
date: '2021-11-8'
sidebar: 'auto'
categories:
 - 算法与数据结构
tags:
 - 排序算法
publish: true
---

## 常用排序算法
1. 冒泡排序
2. 选择排序
3. 插入排序
4. 归并排序
5. 快速排序
> 前三个是基础排序方法，后两个是进阶版，时间复杂度更好

> 以下排序默认是增序

## 冒泡排序法
冒泡排序法，顾名思义，每次比较是两两比较，如果前比后大，就换位置，然后继续比较。第一轮比较完之后，最大值就已经在最后了，就像冒泡一样，最大的冒在最上面。时间复杂度O(n^2)
```js
function bubble(arr) {
	const len = arr.length;
	for (let i = 0; i < len - 1; i++) {
		for (let j = 0; j < len - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
		}
	}
	
	return arr;
}
```

## 面向“最好情况”的进一步改进
> 如果数组本身已经是有序的了，就不用再比较了，直接返回。最好时间复杂度O(n)
```js
function bubble(arr) {
	const len = arr.length;
	for (let i = 0; i < len - 1; i++) {
		let flag = false;
		for (let j = 0; j < len - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				flag = true;
			}
		}
		
		if (flag === false) {
			return arr;
		}
	}
	
	return arr;
}
```
> 所以冒泡的平均时间复杂度就是O(n^2)

## 选择排序
选择排序的关键字是“最小值”：循环遍历数组，每次都找出当前范围内的最小值，把它放在当前范围的头部；然后缩小排序范围，继续重复以上操作，直至数组完全有序为止。
```js
//不知道叫啥排序
function select(arr) {
	const len = arr.length;
	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] > arr[j]) {
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
		}
	}
	
	return arr;
}
```

```js
//选择排序
function select(arr) {
	const len = arr.length;
	let minIndex;
	
	for (let i = 0; i < len - 1; i++) {
		minIndex = i;
		for (let j = i + 1; j < len; j++) {
			if (arr[minIndex] > arr[j]) {
				minIndex = j;
			}
		}
		
		if (minIndex !== i) {
			[arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
		}
	}
	
	return arr;
}
```

## 插入排序
> 遍历数组，把数组元素和有序的数组比较，然后插入，如果前面更大，就往后挪
- 当前元素前面的那个序列是有序的
- “正确的位置”如何定义——所有在当前元素前面的数都不大于它，所有在当前元素后面的数都不小于它
- 在有序序列里定位元素位置的时候，是从后往前定位的。只要发现一个比当前元素大的值，就需要为当前元素腾出一个新的坑位。
```js
function insertFn(arr) {
	const len = arr.length;
	let temp;
	
	for (let i = 0; i < len; i++) {
		let j = i;//从当前元素 往前 的指针
		temp = arr[i];//当前遍历的元素
		
		while (j > 0 && arr[j - 1] > temp) {//遍历的元素和它前面的元素比较
			arr[j] = arr[j - 1];//如果前面的元素更大就往后挪
			j--;//指针往前
		}
		
		arr[j] = temp;//位置找好后就放进去
	}
	
	return arr;
}
```
```js
function insertSort(arr) {
	const len = arr.length;
	
	let sortedIndex = 0;
	for (let i = 1; i < len; i++) {
		const current = arr[i];
		let sIndex = sortedIndex;
		
		while (sIndex >= 0 && arr[sIndex] > current) {
			arr[sIndex + 1] = arr[sIndex];
			sIndex--;
		}
		
		sIndex++;
		arr[sIndex] = current;
		sortedIndex++;
	}
	
	return arr;
}

```

> 最好时间复杂度：O(n)，最坏O(n^2)，平均O(n^2)

## “分治”思想
> “分治”，分而治之。其思想就是将一个大问题分解为若干个子问题，针对子问题分别求解后，再将子问题的解整合为大问题的解。

### 分治步骤
1. 分解子问题
2. 求解每个子问题
3. 合并子问题的解，得出大问题的解

## 归并排序
归并排序是对分治思想的典型应用

### 步骤
1. **分解子问题：**将需要被排序的数组从中间分割为两半，然后再将分割出来的每个子数组各分割为两半，重复以上操作，直到单个子数组只有一个元素为止。
2. **求解每个子问题：**从粒度最小的子数组开始，两两合并、确保每次合并出来的数组都是有序的。（这里的“子问题”指的就是对每个子数组进行排序）。
3. **合并子问题的解，得出大问题的解：**当数组被合并至原有的规模时，就得到了一个完全排序的数组

### 总结出归并排序中的两个主要动作：
- 分割 重复把数组一分为二的过程
- 合并 最后合并有序数组，穿针引线法
要把元素不断分割，是个重复的过程，要想到递归
```js
function combineFn(arr) {
	const len = arr.length;
	
	if (len <= 1) {//递归边界
		return arr;
	}
	
	const mid = Math.floor(len / 2);
	const leftArray = combineFn(arr.slice(0, mid));//分割左子数组
	const rightArray = combineFn(arr.slice(mid));//分割右子数组
	
	return meargeSorted(leftArray, rightArray);//合并有序数组
}

//穿针引线法
function meargeSorted(arr1, arr2) {
	let res = [], i = 0, j = 0;
	
	while (i < arr1.length && j < arr2.length) {
		if (arr1[i] < arr2[j]) {
			res.push(arr1[i]);
			i++;
		} else if (arr1[i] > arr2[j]) {
			res.push(arr2[j]);
			j++;
		} else {
			res.push(arr1[i], arr2[j]);
			i++;
			j++;
		}
	}
	
	return i < arr1.length ? [...res, ...(arr1.slice(i))] : [...res, ...(arr2.slice(j))];
}
```

> 时间复杂度，其中分割子数组需要logn次，然后加上合并就是O(nlogn)

## 快速排序
> 快速排序的基本思想和归并排序相同，区别在于快排不会真的把数组拆开合并到一个新数组，而是直接在数组内部排序
:::tip
快排思想
1. 选基准值，一般选中间
2. 根据基准值，把数组分为左右子数组
3. 使用left，right指针进行移动排序，使得左子数组元素都比基准值小，右子数组元素都比基准值大
4. 排序过程中遇见不符合的元素，则左右交换，左右指针共同前进
5. 左右子数组排序完成后，再递归排序左右子数组
:::
```js
function quickFn(arr, left = 0, right = arr.length - 1) {
	//递归边界
	if (arr.length > 1) {
		// lineIndex表示下一次划分左右子数组的索引位
		let lineIndex = priFn(arr, left, right);
		
		// 如果左边子数组的长度不小于1，则递归快排这个子数组
		if (left < lineIndex - 1) {
			quickFn(arr, left, lineIndex - 1);
		}
		
		// 如果右边子数组的长度不小于1，则递归快排这个子数组
		if (right > lineIndex) {
			quickFn(arr, lineIndex, right);
		}
	}
	
	return arr;
}

function priFn(arr, low, high) {
	const mid = Math.floor(low + (high - low) / 2);
	let i = low, j = high;
	
	while (i <= j) {
		while (arr[i] < arr[mid]) {
			i++;
		}
		
		while (arr[j] > arr[mid]) {
			j--
		};
		
		if (i <= j) {
			[arr[i], arr[j]] = [arr[j], arr[i]];
			i++;
			j--;
		}
	}
	
	return i;
}
```
