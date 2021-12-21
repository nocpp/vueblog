---
title: 动态规划【Dynamic Programming】
date: '2021-11-08'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 动态规划
publish: true
---

> 思想，所谓思想，就是非常好用，好用到爆的套路。
> 动态规划：穷举 + 剪枝

:::tip
动态规划就是递推，由简单的递推，然后解决复杂的
重点就是边界值和递推公式

边界值f(1) = 1; f(2) = 2; f(3) = 3;
递推公式f(n) = f(n - 1) + f(n - 2);
:::

## 爬楼梯问题
题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
> 注意：给定 n 是一个正整数。
:::tip
示例 1：
输入： 2  
输出： 2  
解释： 有两种方法可以爬到楼顶。  
1. 1阶 + 1 阶
2. 2阶
:::

> 思路分析，当看见求**解法个数**，且不求每种解法对应路径，就要考虑动态规划进行求解

### 记忆化搜索解法
```js
/**
 * 由倒推法可以得出规律，第n阶的路径 = 第n-1阶的路径 + 第n-2阶的路径
 */
const f = [];//不记忆路径，会造成很多重复计算，最后导致内存溢出
function run (n) {
    if (n === 1) {
        return 1;
    }
    
    if (n === 2) {
        return 2;
    }
    
    if (f[n] === undefined) {
        f[n] = run(n - 1) + run(n - 2);
    }
    
    return f[n];
}
```

### 动态规划解法
上面的记忆法是把题理解为树形结构，从上往下求解，而动态规划法则相反，是从下而上，通过f(1) f(2)以及f(n) = f(n-1) + f(n-2)正面计算出f(n)
```js
function run (n) {
    const f = [];
    
    f[1] = 1;
    f[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        f[i] = f[i-1]+ f[i-2];
    }
    
    return f[n];
}
```

```js
//优化内存版
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n <= 1) {
        return 1;
    }

    let n3 = 2, n2 = 2, n1 = 1;

    for (let i = 3; i <= n; i++) {
        n3 = n2 + n1;
        n1 = n2;
        n2 = n3;
    }

    return n3;
};
```

## 什么样的题应该用动态规划来做？我们要抓以下两个关键特征：
- 最优子结构
- 重叠子问题

**最优子结构，**它指的是问题的最优解包含着子问题的最优解——不管前面的决策如何，此后的状态必须是基于当前状态（由上次决策产生）的最优决策。就这道题来说，f(n)和f(n-1)、f(n-2)之间的关系印证了这一点（这玩意儿叫状态转移方程，大家记一下）。

**重叠子问题，**它指的是在递归的过程中，出现了反复计算的情况。就这道题来说，图上标红的一系列重复计算的结点印证了这一点。
因此，这道题适合用动态规划来做。

## “最值”型问题典范：如何优雅地找硬币
### 题目描述：给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
> 首先假如有36美分，那么对应状态转移方程是
- 状态转移方程：f(36) = Math.min(f(36-c1)+1,f(36-c2)+1,f(36-c3)+1......f(36-cn)+1)
- 基本子问题结果：f(0) = 0

```js
//没看懂
function run (coins, amount) {
    const f = [];
    
    f[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        f[i] = Infinity;
        
        for (let j = 0; j < coins.length; j++) {
            if (i - coins[j] >= 0) {
                f[i] = Math.min(f[i], f[i - coins[j]] + 1);
            }
        }
    }
    
    return f[amount] === Infinity ? -1 : f[amount]
}
```

## 背包问题
:::tip
有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。现在有一个容量为 c 的背包，问你如何选取物品放入背包，才能使得背包内的物品总价值最大？
:::

> 注意：每种物品都只有1件。

```js
//没看懂
/**
 * @param {Object} n 物品总数量
 * @param {Object} w 物品重量数组
 * @param {Object} value 物品价值数组
 * @param {Object} c 背包容量
 */
function back(n, w, value, c) {
	let d = (new Array(c + 1)).fill(0);
	
	let res = -Infinity;
	
	for (let i = 1; i <= n; i++) {
		for (let v = c; v >= w[i]; v--) {
			d[v] = Math.max(d[v], d[v - w[i]] + value[i])
			
			if (d[v] > res) {
				res = d[v];
			}
		}
	}
	
	return res;
}
```

## 已知一个无序数组，求这个数组的最长子序列的长度
```js
const list = [10,9,2,5,3,7,101,18];
function child(list) {
	const len = list.length;
	
	if (!len) return 0;
	
	const dp = (new Array(len)).fill(1);
	let maxLen = 1;
	
	for (let i = 1; i < len; i++) {
		for (let j = 0; j < i; j++) {
			if (list[j] < list[i]) {
				dp[i] = Math.max(dp[i], dp[j] + 1);
			}
		}
		
		if (dp[i] > maxLen) {
			maxLen = dp[i];
		}
	}
	
	return maxLen;
}
```

## 判断子序列
给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

> 用正则去test，会超时
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    const tLen = t.length;
    const sLen = s.length;
    let sIndex = 0;

    if (sLen === 0) {
        return true;
    }

    for (let i = 0; i < tLen; i++) {
        if (t[i] === s[sIndex]) {
            if (++sIndex === sLen) {
                return true;
            }
        }
    }

    return false;
};
```

## 求最长公共子序列
给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

- 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
[最长公共子序列](https://www.sohu.com/a/339112354_818692)
```js
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    //d[i][j]表示 text1.slice(0, i-1)和text2.slice(0,j-1)的最长公共子序列
    //从0开始推导，其中观察得知,当i或j等于0时，d[i][j] = 0
    //计算d[1][1]时，就是比较两个字符串第0个元素组成的子串的子序列
    //只需要比较他们是否相等，相等则+1
    
    const len1 = text1.length;
    const len2 = text2.length;
    const dp = new Array(len1 + 1);

    for (let i = 0; i < len1 + 1; i++) {
        dp[i] = new Array(len2 + 1).fill(0);
    }

    for (let i = 1; i < len1 + 1; i++) {
        for (let j = 1; j < len2 + 1; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[len1][len2];
};
```


## 让字符串成为回文串的最少插入次数
:::tip
给你一个字符串 s ，每一次操作你都可以在字符串的任意位置插入任意字符。

请你返回让 s 成为回文串的 最少操作次数 。

「回文串」是正读和反读都相同的字符串
:::

### 示例 1：
```
输入：s = "zzazz"
输出：0
解释：字符串 "zzazz" 已经是回文串了，所以不需要做任何插入操作。
```

### 示例 2:
```
输入：s = "leetcode"
输出：5
解释：插入 5 个字符后字符串变为 "leetcodocteel" 。
```

> 算法是字符长度 - 字符和相反字符最长公共子序列，怎么分析出来的没搞清楚

```js
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function(s) {
    const len = s.length;
    let dp = new Array(len + 1);

    for (let i = 0; i < len + 1; i++) {
        dp[i] = new Array(len + 1).fill(0);
    }

    const rS = s.split('').reverse().join('');

    for (let i = 1; i < len + 1; i++) {
        for (let j = 1; j < len + 1; j++) {
            if (s[i - 1] === rS[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return len - dp[len][len];
};
```


## 补充回溯和动态规划