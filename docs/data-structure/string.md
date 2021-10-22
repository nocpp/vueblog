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


## 真题描述： 设计一个支持以下两种操作的数据结构
void addWord(word)
bool search(word)
search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
. 可以表示任何一个字母。

> 示例:
```js
addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search("bad") -> true
search(".ad") -> true
search("b..") -> true
```

:::tip
说明:
你可以假设所有单词都是由小写字母 a-z 组成的。
:::

> 思路分析：因为具备搜索功能，所以要存储输入的字符串，可以存储在数组中。为了提升检索效率，可以存储在对象或者Map中，用length做他们的key值，减少检索次数。然后搜索的字符串有两种类型，需要区分，如果是正则，创建正则对象去匹配。如果是字符串，直接搜索就好了。

### 方法1
```js
let testObj = {
	val: [],
	addWord: function(str) {
		this.val.push(str);
	},
	search: function(str) {
		if (str.indexOf('.') === -1) {
			return this.val.indexOf(str) !== -1;
		} else {
			let reg = new RegExp(str);
			return this.val.some(item => {
				return reg.test(item);
			});
		}
	}
};
```

### 方法2
```js
function CustomObject(str) {
	this.val = new Map();
}

CustomObject.prototype.addWord = function(str) {
	const length = str.length;
	if (this.val.has(length)) {
		this.val.get(length).push(str);
	} else {
		this.val.set(length, [str]);
	}
}

CustomObject.prototype.search = function(str) {
	const length = str.length;
	if (!this.val.has(length)) {
		return false;
	}
	const data = this.val.get(length);
	
	if (str.indexOf('.') === -1) {
		return data.indexOf(str) !== -1;
	} else {
		const reg = new RegExp(str);
		return data.some(item => reg.test(item));
	}
}
```

## 请你来实现一个 atoi 函数，使其能将字符串转换成整数。
:::tip
首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。
注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。
在任何情况下，若函数不能进行有效的转换时，请返回 0。

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−2^31,  2^31 − 1]。如果数值超过这个范围，请返回  INT_MAX (2^31 − 1) 或 INT_MIN (−2^31) 。
:::

> 思路分析：1.丢弃左侧空格，2，找到第一个是数组或者正负号的字符串，开始往后开始找连续数字，直到非数字为止，返回该数字，3. 如果存在全空字符，没有数字字符，第一个字符不是数字的返回0

```js
//个人写法
function atoi(str) {
	const formatStr = str.trim();
	
	if (formatStr.length === 0) return 0;
	
	if (!/\d+/.test(formatStr)) {
		return 0;
	}

	if (!/\d|\+|\-/.test(formatStr[0])) {
		return 0;
	}
	
	const rStr = formatStr.slice(1);
		
	const number = /^(\d+)/.exec(rStr);
	
	const resultNum = Number(formatStr[0] + number[0]);
	
	if (resultNum > Math.pow(2, 31) - 1) {
		return Math.pow(2, 31) - 1;
	}
	
	if (resultNum < -Math.pow(2, 31)) {
		return -Math.pow(2, 31);
	}
	
	return Number(formatStr[0] + number[0]);
}
```

```js
//参考答案
// 入参是一个字符串
const myAtoi = function(str) {
    // 编写正则表达式
    const reg = /\s*([-\+]?[0-9]*).*/
    // 得到捕获组
    const groups = str.match(reg)
    // 计算最大值
    const max = Math.pow(2,31) - 1
    // 计算最小值
    const min = -max - 1
    // targetNum 用于存储转化出来的数字
    let targetNum = 0
    // 如果匹配成功
    if(groups) {
        // 尝试转化捕获到的结构
        targetNum = +groups[1]
        // 注意，即便成功，也可能出现非数字的情况，比如单一个'+'
        if(isNaN(targetNum)) {
            // 不能进行有效的转换时，请返回 0
            targetNum = 0
        }
    }
    // 卡口判断
    if(targetNum > max) {
        return max
    } else if( targetNum < min) {
        return min
    }
    // 返回转换结果
    return targetNum
};
```

:::tip
什么是捕获组？其实就是正则表达式中被小括号括住的部分。在这道题里，我们需要从字符串中提取的其实只有“+/-”符号以及其后面的数字而已，同时这个字符串需要满足 可能存在的空格+正负号+数字字符串+其它字符内容 这样的格式才算合法，那我们就可以通过这样写正则表达式，实现“匹配”和“提取”的双重目的：
:::
```js
/\s*([-\+]?[0-9]*).*/
```

针对正则基础比较薄弱的同学，我来解释一下上面这个正则表达式：

- 首先，\s 这个符号，意味着空字符，它可以用来匹配回车、空格、换行等空白区域，这里，它用来被匹配空格。\*这个符号，跟在其它符号后面，意味着“前面这个符号可以出现0次或多次。\s*，这里的意思就是空格出现0次或多次，都可被匹配到。
- 接着 () 出现了。() 圈住的内容，就是我们要捕获起来额外存储的东西。
- []中的匹配符之间是“或”的关系，也就是说只要能匹配上其中一个就行了。这里[]中包括了-和\+，-不必说匹配的是对应字符，这个\+之所以加了一个斜杠符，是因为+本身是一个有特殊作用的正则匹配符，这里我们要让它回归+字符的本义，所以要用一个\来完成转义。
- [0-9]*结合咱们前面铺陈的知识，这个就不难理解了，它的意思是 0-9 之间的整数，能匹配到0个或多个就算匹配成功。
- 最后的 .这个是任意字符的意思, .\*用于字符串尾部匹配非数字的任意字符。我们看到.*是被排除捕获组之外的，所以说这个东西其实也不会被额外存储，它被“摘除”了。

使用match处理捕获组
match() 方法是一个在字符串中执行查找匹配的String方法，它返回一个数组，在未匹配到时会返回 null。
如果我们的正则表达式尾部有 g 标志，match()会返回与完整正则表达式匹配的所有结果，但不会返回捕获组。
这里我们没有使用g标志，match()就会返回第一个完整匹配（作为数组的第0项）及其相关的捕获组（作为数组的第1及第1+项）。
这里我们只定义了一个捕获组，因此可以从 groups[1] 里拿到我们捕获的结果。
