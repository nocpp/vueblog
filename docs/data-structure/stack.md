---
title: 栈的应用
date: '2021-10-26'
sidebar: 'auto'
categories:
 - 算法与数据结构
tags:
 - 栈
publish: true
---

## 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
> 有效字符串需满足：左括号必须用相同类型的右括号闭合。左括号必须以正确的顺序闭合。注意空字符串可被认为是有效字符串。

### 示例 1:
输入: "()"  
输出: true

### 示例 2:
输入: "()[]{}"  
输出: true

### 示例 3:
输入: "(]"  
输出: false

### 示例 4:
输入: "([)]"  
输出: false  

### 示例 5:
输入: "{[]}"  
输出: true

```js
function isValid(str) {
    if (str.length % 2 === 1) {
        return false;
    }
        
    if (str === '') return true;
    const KH_MAP = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    let stack = [];
    for (let i = 0; i < str.length; i++) {
        if (/\(|\[|\{/.test(str[i])) {
            stack.push(str[i]);
        } else {
            const stackTop = stack.pop();
            if (KH_MAP[stackTop] !== str[i]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}
```

:::tip
根据栈的后进先出原则，一组数据的入栈和出栈顺序刚好是对称的。比如说1、2、3、4、5、6按顺序入栈，其对应的出栈序列就是 6、5、4、3、2、1：因此这里大家可以记下一个规律：题目中若涉及括号问题，则很有可能和栈相关。
:::

## 每日温度问题
根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。

> 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
> 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。

### 暴力双循环法
使用双重循环，比较温度值和这个温度值后面的值，获得索引差就是结果

### 栈的方法
> 栈结构可以帮我们避免重复操作。避免重复操作的秘诀就是及时地将不必要的数据出栈，避免它对我们后续的遍历产生干扰。
> 维护“递减栈”
```js
/**
 * @param {Object} arr
 *  1. 栈中存的是索引，才能计算索引差
 *  2. 用栈要想到及时出栈
 */
function testFn(arr) {
    const len = arr.length;
    let result = (new Array(len)).fill(0);
    
    let stack = [];
    for (let i = 0; i < len; i++) {
        while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            const popIndex = stack.pop();
            result[popIndex] = i - popIndex;
        }
        
        stack.push(i);
    }
    
    return result;
}
```

## “最小栈”问题
:::tip
题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
:::

push(x) —— 将元素 x 推入栈中。  
pop() —— 删除栈顶的元素。  
top() —— 获取栈顶元素  
getMin() —— 检索栈中的最小元素。  

> 示例:
```js
let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); --> 返回 -3.
minStack.pop();
minStack.top(); --> 返回 0.
minStack.getMin(); --> 返回 -2.
```

思路分析：递减栈
```js
const MinStack = function() {
    this.stack = [];
    this.stack2 = [];
};

MinStack.prototype.push = function(val) {
    this.stack.push(val);
    
    if (this.stack2.length === 0 || this.stack2[this.stack2.length - 1] >= val) {
        this.stack2.push(val);
    }
};

MinStack.prototype.pop = function() {
    const popVal = this.stack.pop();
    if (popVal === this.stack2[this.stack2.length - 1]) {
        this.stack2.pop();
    }
    
    return popVal;
};

MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.stack2[this.stack2.length - 1];
};
```