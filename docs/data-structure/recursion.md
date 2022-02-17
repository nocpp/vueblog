---
title: 递归和回溯思想的应用
date: '2021-10-28'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 递归
 - 回溯
publish: true
---
> 分析题目时，把思考过程用注释写下来，比脑子空想更有效

## 全排列问题
> 给定一个没有重复数字的序列，返回其所有可能的全排列。
:::tip
示例：   
输入: [1,2,3]  
输出: [  
[1,2,3],  
[1,3,2],  
[2,1,3],  
[2,3,1],  
[3,1,2],  
[3,2,1]  
]
:::

### 递归两要素
- 递归式，就是要重复的操作
- 递归边界，就是重复到什么是否停止

### 思路分析
此题可以把问题抽象成：每次从数组中拿出一个数字，放入一个坑位中，然后再去那个数组中，从剩下的数字中再拿一个出来，放入第二个坑位，然后重复，直到数组中数字被拿光为止，输出此时的结果。**发现有不断重复的操作，就要想到递归**
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const res = [];
    const basket = [];//存放每次选中的数字栈，当递归结束一次后，记得出栈当前数

    if (nums.length === 1) {
        return [nums];
    }

    function dfs(_nums) {
        const len = _nums.length;

        if (len === 1) {
            basket.push(_nums[0]);
            res.push(basket.slice());
            basket.pop();
            return;
        }

        for (let i = 0; i < len; i++) {
            const chosedNum = _nums[i];
            basket.push(chosedNum);

            let remainNums = _nums.slice();//复制一个数组的方法，还可以用数组结构[...arr]
            remainNums.splice(i, 1);
            dfs(remainNums);
            basket.pop();
        }
    }

    dfs(nums);

    return res;
};
```


```js
//参考答案，填坑法
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 入参是一个数组
const permute = function(nums) {
  // 缓存数组的长度
  const len = nums.length
  // curr 变量用来记录当前的排列内容
  const curr = []
  // res 用来记录所有的排列顺序
  const res = []
  // visited 用来避免重复使用同一个数字
  const visited = {}
  // 定义 dfs 函数，入参是坑位的索引（从 0 计数）
  function dfs(nth) {
      // 若遍历到了不存在的坑位（第 len+1 个），则触碰递归边界返回
      if(nth === len) {
          // 此时前 len 个坑位已经填满，将对应的排列记录下来
          res.push(curr.slice())
          return 
      }
      // 检查手里剩下的数字有哪些
      for(let i=0;i<len;i++) {
          // 若 nums[i] 之前没被其它坑位用过，则可以理解为“这个数字剩下了”
          if(!visited[nums[i]]) {
              // 给 nums[i] 打个“已用过”的标
              visited[nums[i]] = 1
              // 将nums[i]推入当前排列
              curr.push(nums[i])
              // 基于这个排列继续往下一个坑走去
              dfs(nth+1) 
              // nums[i]让出当前坑位
              curr.pop()
              // 下掉“已用过”标识
              visited[nums[i]] = 0
          }
      }
  }
  // 从索引为 0 的坑位（也就是第一个坑位）开始 dfs
  dfs(0)
  return res
};
```

## 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。说明：解集不能包含重复的子集。
:::tip
示例: 输入: nums = [1,2,3]  
输出:  
[  
[3],  
[1],  
[2],  
[1,2,3],  
[1,3],  
[2,3],  
[1,2],  
[]  
]
:::

### 思路分析
1. 先抽象问题，把问题抽象下看如何解决
2. 取子集，首先排除特殊情况，自己和空集肯定是子集
3. 然后每次取比自己少一个元素的子集，然后取子集的子集，直到空集
4. **把数组转为字符串数组进行去重**
```js
//解法1，最初解法
var subsets = function(nums) {
    let result = new Map();
    nums.sort((a, b) => (a - b));

    function getChild(arr) {
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            let tempArr = arr.filter((item, index) => i !== index);
            let stringTemp = tempArr.join(',');

            if (stringTemp && !result.has(stringTemp)) {
                result.set(stringTemp, tempArr);
                getChild(tempArr);
            }
        }
    }

    getChild(nums);

    return [...Array.from(result.values()), [], nums];
};
```

```js
//参考答案，填坑法
const subsets = function(nums) {
    // 初始化结果数组
    const res = []   
    // 缓存数组长度
    const len = nums.length
    // 初始化组合数组
    const subset = []
    // 进入 dfs
    dfs(0)  

    // 定义 dfs 函数，入参是 nums 中的数字索引
    function dfs(index) {
        // 每次进入，都意味着组合内容更新了一次，故直接推入结果数组
        res.push(subset.slice())
        // 从当前数字的索引开始，遍历 nums
        for(let i=index;i<len;i++) {
            // 这是当前数字存在于组合中的情况
            subset.push(nums[i]) 
            // 基于当前数字存在于组合中的情况，进一步 dfs
            dfs(i+1)
            // 这是当前数字不存在与组合中的情况
            subset.pop()
        }
    }
    // 返回结果数组
    return res 
};
```

```js
//解法3，同全排列思想差不多，此题是坑位数在变，子集就是坑位长度从0到len的排列
var subsets = function(nums) {
    const len = nums.length;
    const result = [[], nums];
    const curr = [];
	//时间复杂度过高
    for (let i = 1; i < len; i++) {
        dfs(i, 0);
    }

    //_num是坑位数，_start用于防止重复，从哪个数开始取
    function dfs(_num, _start) {
        if (_num < 1) {
            result.push(curr.slice());
            return;
        }

        for (let i = _start; i < len; i++) {
            if (_num - 1 > len - (i + 1)) {//剩余数量不足的就停止
                return;
            }
            
            curr.push(nums[i]);
            dfs(_num - 1, i + 1);
            curr.pop();
        }
    }

    return result;
};
```

## 限定组合问题：DFS就是回溯思想的体现，一直走一条路，找到答案了或者没有答案就往后退，走下一条路
> 题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
:::tip
示例: 输入: n = 4, k = 2  
输出:  
[  
[2,4],  
[3,4],  
[2,3],  
[1,2],  
[1,3],  
[1,4],  
]
:::

```js
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const ret = [];
    const cur = [];

    //[1,2,3,4] 2个数子集
    function dfs(start) {
		//提前剪枝，快很多
        if (cur.length + (n - start) < k) {
            return;
        }

        if (cur.length === k) {//1，2
            ret.push(cur.slice());//[[1,2]]
            return;
        }

        for (let i = start; i < n; i++) {//1
            cur.push(i + 1);//[1,2]
            dfs(i + 1);//df(2)
            cur.pop();//[1]
        }
    }

    dfs(0);//0,1,3

    return ret;
};
```

## 概念复盘：何为“回溯”？
> 回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就 “回溯” 返回，尝试别的路径。

> 回溯算法的基本思想是：从一条路往前走，能进则进，不能进则退回来，换一条路再试。 ——LeetCode

### 递归与回溯问题——解题模板总结
### 如何总结出一套解题模板？其实很简单，大家只需要搞清楚三个问题：   

- 什么时候用？（明确场景）  
- 为什么这样用？（提供依据）  
- 怎么用？（细化步骤）

#### 什么时候用？
看两个特征：

1. 题目中暗示了一个或多个解，并且要求我们详尽地列举出每一个解的内容时，一定要想到 DFS、想到递归回溯。  
2. 题目经分析后，可以转化为树形逻辑模型求解。

#### 为什么这样用?
递归与回溯的过程，本身就是穷举的过程。题目中要求我们列举每一个解的内容，解从哪来？解是基于穷举思想、对搜索树进行恰当地剪枝后得来的。   
> 这里需要大家注意到另一种问法：不问解的内容，只问解的个数。这类问题往往不用 DFS 来解，而是用动态规划（我们后面会学）。这里，大家先记下这个辨析，对以后做题会有帮助。

#### 怎么用?
一个模型——树形逻辑模型；两个要点——递归式和递归边界。  
树形逻辑模型的构建，关键在于找“坑位”，一个坑位就对应树中的一层，每一层的处理逻辑往往是一样的，这个逻辑就是递归式的内容。至于递归边界，要么在题目中约束得非常清楚、要么默认为“坑位”数量的边界。  
```js
//伪代码
function xxx(入参) {
  前期的变量定义、缓存等准备工作 
  
  // 定义路径栈
  const path = []
  
  // 进入 dfs
  dfs(起点) 
  
  // 定义 dfs
  dfs(递归参数) {
    if(到达了递归边界) {
      结合题意处理边界逻辑，往往和 path 内容有关
      return   
    }
    
    // 注意这里也可能不是 for，视题意决定
    for(遍历坑位的可选值) {
      path.push(当前选中值)
      处理坑位本身的相关逻辑
      path.pop()
    }
  }
}
```
> 在面试中，如果你隐约觉得这道题用递归回溯来解可能有戏，却一时间没办法明确具体的解法，那么不妨尝试把这段伪代码记在脑子里。


## 将对象flatten
```js
//输入
const obj = {
  a: {
    b: 1,
    c: 2,
    d: {
      e: 5
    }
  },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
}

//输出
// {
//   'a.b': 1,
//   'a.c': 2,
//   'a.d.e': 5,
//   'b[0]': 1,
//   'b[1]': 3,
//   'b[2].a': 2,
//   'b[2].b': 3
//    c: 3
// }
```
/**
 * 思路：重复把每个属性取出来，首选递归。每个元素大概三种类型，数组，对象，基本。分别处理
 */
```js
function flatten(obj) {
	const ret = {};
	
	for (let key in obj) {
		if (Array.isArray(obj[key])) {
			obj[key].forEach((item, index) => {
				if (typeof item === 'object') {
					const tempRet = flatten(item);
					for (let k in tempRet) {
						ret[`${key}[${index}].${k}`] = tempRet[k];
					}
				} else {
					ret[`${key}[${index}]`] = item;
				}
			});
		} else if (typeof obj[key] === 'object') {
			const tempRet = flatten(obj[key]);
			for (let k in tempRet) {
				ret[`${key}.${k}`] = tempRet[k];
			}
		} else {
			ret[key] = obj[key];
		}
	}
	
	return ret;
}
```