---
title: 队列的应用
date: '2021-10-26'
sidebar: 'auto'
categories:
 - 算法与数据结构
tags:
 - 队列
publish: true
---

## 如何用栈实现一个队列？
> 题目描述：使用栈实现队列的下列操作：

push(x) -- 将一个元素放入队列的尾部。  
pop() -- 从队列首部移除元素。  
peek() -- 返回队列首部的元素。  
empty() -- 返回队列是否为空。  

> 示例:
```js
let queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek(); // 返回 1
queue.pop(); // 返回 1
queue.empty(); // 返回 false
```

:::tip
说明:
- 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
- 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
- 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。
:::

> 思路分析，按照常理来说，栈的特点是后进先出，队列是先进先出，栈是无法变成队列的。但是当使用两个栈时，可以模拟出队列效果，把一个栈的元素全部pop出去，再push到另一个栈里去。这样另一个栈再出栈就是按队列的方式出栈了。
```js
const MyQueue = function() {
    this.stack = [];
    this.stack2 = [];
};

MyQueue.prototype.push = function(val) {
    this.stack.push(val);
};

MyQueue.prototype.pop = function() {
    if (this.stack2.length === 0) {
        while (this.stack.length > 0) {
            this.stack2.push(this.stack.pop());
        }
    }
    
    return this.stack2.pop();
};

MyQueue.prototype.peek = function() {
    if (this.stack2.length === 0) {
        while (this.stack.length > 0) {
            this.stack2.push(this.stack.pop());
        }
    }
    
    return this.stack2[this.stack2.length - 1];
};

MyQueue.prototype.empty = function() {
    return this.stack.length === 0 && this.stack2.length === 0;
};
```

## 双端队列(滑动窗口问题)
**双端队列就是允许在队列的两端进行插入和删除的队列。**
:::tip
具体来说，双端队列就是push,pop,shift,unshift都可以用的的队列，至少用到3个吧
:::
```js
const queue = [1,2,3,4] // 定义一个双端队列   
queue.push(1) // 双端队列尾部入队 
queue.pop() // 双端队列尾部出队   
queue.shift() // 双端队列头部出队 
queue.unshift(1) // 双端队列头部入队
```

## 滑动窗口问题
> 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。

> 示例:
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]

解释: 滑动窗口的位置
:::tip
[1 3 -1] -3 5 3 6 7 ---> 3  
1 [3 -1 -3] 5 3 6 7 ---> 3  
1 3 [-1 -3 5] 3 6 7 ---> 5  
1 3 -1 [-3 5 3] 6 7 ---> 5  
1 3 -1 -3 [5 3 6] 7 ---> 6  
1 3 -1 -3 5 [3 6 7] ---> 7
:::

### 解法1，双指针+遍历法
因此我这里定义一个 left 左指针、定义一个 right 右指针，分别指向窗口的两端，接下来我们可以把这个窗口里的数字取出来，直接遍历一遍、求出最大值，然后把最大值存进结果数组。这样第一个窗口的最大值就有了。
```js
function testFn(arr, num) {
    let res = [];
    
    for (let i = 0; i <= arr.length - num; i++) {
        let left = i, right = i + num - 1;
        let winArr = arr.slice(left, right + 1);
        res.push(Math.max.apply(null, winArr));
    }
    
    console.log(res);
}
```

### 解法2，双端队列法
使用双端队列法，核心的思路是维护一个有效的递减队列。
```js
function testFn(arr, num) {
    let res = [];
    
    let dequee = [];
    for (let i = 0; i < arr.length; i++) {
        while (dequee.length && arr[dequee[dequee.length - 1]] < arr[i]) {
            dequee.pop();//维护递减队列的核心方法，从尾部开始比较，把更小的都出队
        }
        
        dequee.push(i);//插入符合递减的索引
        
        while (dequee.length && dequee[0] <= i - num) {//确定最大值在有效范围，如果不符合，出队，取更小的那个
            dequee.shift();
        }
        
        if (i >= num - 1) {//到了需要取值的时候，把值推入result中
            res.push(arr[dequee[0]]);
        }
    }
    
    console.log(res);
}
```