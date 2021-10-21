---
title: 字符串的应用
date: '2021-10-20'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 字符串
publish: true
---

## 反转字符串
```js
let str = 'abcdefg';

console.log(str.split('').reverse().join(''))
```

## 判断一个字符串是否是回文字符串
:::tip
回文字符串，就是正着读和倒着读都一样的字符串，比如这样的：'yessey'
:::
```js
//解法1
function test(str) {
    let reverse = str.split('').reverse().join('');
    
    return reverse === str;
}
```

> 因为回文字符串具有对称性，从中间切开两半都一样，可以用这个特性来解题
```js
function test(str) {
    const len = str.length;
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - i - 1]) {
            return false;
        }
    }
    
    return true;
}
```

## 回文字符串衍生问题
> 真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

示例 1:  
输入: "aba"  
输出: True  
示例 2:  
输入: "abca"  
输出: True  
解释: 你可以删除c字符。  
注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
```js
//双指针，对称性
function test(str) {
    const len = str.length;
    let i = 0, j = len - 1;
    
    while(i < j && str[i] === str[j]) {
        i++;
        j--;
    }
    
    if (i >= j) {
        return true;
    }
    
    if (str[i + 1] === str[j]) {
        return isHw(i + 2, j - 1);
    }
    
    if (str[i] === str[j - 1]) {
        return isHw(i + 1, j - 2);
    }
    
    function isHw(begin, end) {
        while (begin < end) {
            if (str[begin] !== str[end]) {
                return false;
            }
            
            begin++;
            end--;
        }
        
        return true;
    }
    
    return false;
}
```