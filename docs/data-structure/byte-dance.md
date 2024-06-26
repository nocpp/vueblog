---
title: 字节真题
date: '2021-11-26'
sidebar: 'auto'
categories:
 - 算法与数据结构
tags:
 - 字节真题
publish: true
---
## “接雨水”问题
:::tip
题目描述：给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

示例：

输入: [0,1,0,2,1,0,1,3,2,1,2,1]  
输出: 6  
:::
> 思路分析，先要把问题抽象出来，搞清楚怎么才能有凹槽，然后凹槽的深度如何结算。
> 经过分析，凹槽形成是有两根柱子夹住低谷形成，可以想到可能和对撞指针有关。

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let leftCur = 0;//初始化左指针
    let rightCur = height.length - 1;//初始化右指针

    let res = 0;//初始化结果

    let leftMax = 0;//初始化左边柱子最高值
    let rightMax = 0;//初始化右边柱子最高值

    while (leftCur < rightCur) {
        let left = height[leftCur];//当前左指针的值
        let right = height[rightCur];//当前右指针的值

        if (left < right) {//右边更高，就算左边的值
            leftMax = Math.max(left, leftMax);//更新左边最大值

            res += leftMax - left;

            leftCur++;
        } else {//左边更高，就算有右边的值
            rightMax = Math.max(right, rightMax);

            res += rightMax - right;

            rightCur--;
        }
    }

    return res;
};
```

## 翻转k个数的链表
> 思路分析，明确翻转连标的实质就是处理指针关系
```js
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    let cur = head, lastNode = null, prevEndNode = [], changedHead = null;

    if (k === 1) {
        return head;
    }

    while (cur) {
        for (let i = 0; i < k; i++) {
			let temp = cur.next;
            if (i === 0) {
                lastNode = cur;
				
				let p = cur, isEnough = true;
				for (let j = 0; j < k - 1; j++) {
				    if (p.next) {
				        p = p.next;
				    } else {
				        isEnough = false;
				        break;
				    }
				}

                if (!isEnough) {
					let q = changedHead;
					while (q) {
						if (q.next) {
							q = q.next;
						} else {
							q.next = cur;
							break;
						}
					}
					
                    return changedHead;
                }
				
				cur.next = null;
				prevEndNode.push(cur);
            } else {
                cur.next = lastNode;
                lastNode = cur;
				
				if (i === k - 1) {
					if (!changedHead) {
						changedHead = cur;
					}
					
					if (prevEndNode.length >= 2) {
						const prevNode = prevEndNode.shift();
						prevNode.next = cur;
					}
				}
            }
			cur = temp;
        }
    }

    return changedHead;
};
```

## 求最大矩形
> 题目描述：给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。求在该柱状图中，能够勾勒出来的矩形的最大面积。
```js
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    if (!heights || heights.length == 0) {
        return 0;
    }

    let max = 0;
    const len = heights.length;

    for (let i = 0; i < len; i++) {
        if (i === len - 1 || heights[i] > heights[i + 1]) {
            let minHeight = heights[i];

            for (let j = i; j >= 0; j--) {
                minHeight = Math.min(minHeight, heights[j]);
                max = Math.max(max, minHeight * (i - j + 1));
            }
        }
    }

    return max;
};
```