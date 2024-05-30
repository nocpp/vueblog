---
title: 链表的应用
date: '2021-10-22'
sidebar: 'auto'
categories:
 - 算法与数据结构
tags:
 - 链表
publish: true
---

## 链表的合并
> 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。 
示例：
输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4

思路分析：
1. 用两个指针，分别指向头结点
2. 双循环遍历，两个结点值比大小
3. 如果更大，放前面，如果更小，继续判断下一个值

> 处理链表的本质，是处理链表结点之间的指针关系。

```js
//个人版本
function ListNode(val) {
	this.val = val;
	this.next = null;
}

let listNode1Item1 = new ListNode(1);
let listNode1Item2 = new ListNode(2);
let listNode1Item3 = new ListNode(4);
listNode1Item1.next = listNode1Item2;
listNode1Item2.next = listNode1Item3;

let listNode2Item1 = new ListNode(1);
let listNode2Item2 = new ListNode(3);
let listNode2Item3 = new ListNode(4);
listNode2Item1.next = listNode2Item2;
listNode2Item2.next = listNode2Item3;

function combineListNode(list1, list2) {
	let result_head = new ListNode(null);
	result_head.next = list1;
	let i = result_head, j = list2;
	let dummy = list2;
	
	while (j && i.next) {
		if (i.next.val >= j.val) {
			dummy = j.next;
			j.next = i.next;
			if (result_head.next === list1) {
				result_head.next = j;
				i = j;
			} else {
				i.next = j;
			}
			j = dummy;
		} else {
			i = i.next;
		}
	}
	
	if (j && !i.next) {
		i.next = j;
	}
	
	return result_head;
}

function outPut(node) {
	if (node) {
		console.log(node.val);
		node = node.next;
		outPut(node);
	}
}
```

> 穿针引线法
```js
function combineListNode(l1, l2) {
	let head = new ListNode(null);
	let cur = head;
	
	while(l1 && l2) {
		if (l1.val <= l2.val) {
			cur.next = l1;
			l1 = l1.next;
		} else {
			cur.next = l2;
			l2 = l2.next;
		}
		
		cur = cur.next;
	}
	
	cur.next = l1 !== null ? l1 : l2;
	
	return head;
}
```

## 合并两个链表，删除list1中下标从a到b的，把list2的元素插入进去
[力扣地址](https://leetcode-cn.com/problems/merge-in-between-linked-lists/submissions/)
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {number} a
 * @param {number} b
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeInBetween = function(list1, a, b, list2) {
    //找到关键节点，连接起来即可
    //1. 要删除的结点是同一个，找到这个元素
    //2. 不是同一个，在中间
    //3. 不是同一个，在末尾

    let leftNode, rightNode, index = 0, cur = list1;

    while(cur && !rightNode) {
        if (index === a - 1 && !leftNode) {
            leftNode = cur;
        }

        if (index === b && !rightNode) {
            rightNode = cur.next;
        }

        cur = cur.next;
        index++;
    }

    leftNode.next = list2;
    
    cur = list2;
    while(cur.next) {
        cur = cur.next;
    }
    cur.next = rightNode;

    return list1;
};
```

## 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
示例：  
输入: 1->1->2  
输出: 1->2  
示例 2:  
输入: 1->1->2->3->3  
输出: 1->2->3

### 思路分析
> 删除链表结点，关键在于找到目标结点的前结点进行操作
定义一个头结点, 遍历链表，重复的删除
```js
function deleteFn(head) {
	let cur = head;
	
	while(cur && cur.next) {
		if (cur.val === cur.next.val) {
			cur.next = cur.next.next;
		} else {
			cur = cur.next;
		}
	}
	
	logList(head);
}
```

## 给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
### 示例：
:::tip
输入: 1->2->3->3->4->4->5  
输出: 1->2->5  
示例 2:  
输入: 1->1->1->2->3  
输出: 2->3
:::
### 思路分析
与上题有区别的地方在于，本题需要删除所有含有重复数字的结点，有可能删除第一个结点，所以需要引入dummy结点作为头结点
```js
function deleteFn(head) {
	if (!head || !head.next) return head;
	
	let dummy = new ListNode(null);
	dummy.next = head;
	
	let cur = dummy;
	
	while (cur.next && cur.next.next) {
		if (cur.next.val === cur.next.next.val) {
			let tempVal = cur.next.val;
			while (cur.next && cur.next.val === tempVal) {
				cur.next = cur.next.next;
			}
		} else {
			cur = cur.next;
		}
	}
	
	logList(dummy.next);
}
```

## 快慢指针与多指针
链表题目中，有一类会涉及到反复的遍历。涉及反复遍历的题目，题目本身虽然不会直接跟你说“你好，我是一道需要反复遍历的题目”，但只要你尝试用常规的思路分析它，你会发现它一定涉及反复遍历；同时，涉及反复遍历的题目，还有一个更明显的特征，就是它们往往会涉及相对复杂的链表操作，比如反转、指定位置的删除等等。

解决这类问题，我们用到的是双指针中的“快慢指针”。快慢指针指的是两个一前一后的指针，两个指针往同一个方向走，只是一个快一个慢。快慢指针严格来说只能有俩，不过实际做题中，可能会出现一前、一中、一后的三个指针，这种超过两个指针的解题方法也叫“多指针法”。


## 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。（快慢指针）
示例：
:::tip
给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个结点后，链表变为 1->2->3->5.

保证：n是有效的
:::
思路分析：  
1. 倒数变正数，链表正常是正向遍历的，无法倒着遍历。倒数n个就是正数len-n+1个，len代表链表的总长度
2. 为了求得len，一般思路是需要遍历一遍链表，算出len，然后再来一个遍历
3. 可以使用快慢指针来简化问题

```js
//快指针先走n步，等走到最后，慢指针下一个元素就是要删除的结点
function deleteFn(head, n) {
	let dummy = new ListNode(null);
	dummy.next = head;
	
	let slow = quick = dummy;
	
	let i = 0;
	while (quick && quick.next) {
		quick = quick.next;
		if (i > n) {
			slow = slow.next;
		}
	}
	
	slow.next = slow.next.next;
	
	logList(dummy.next);
}
```

## 定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。(多指针法)
:::tip
1->2->3->4->5->NULL
5->4->3->2->1->NULL
:::

```js
//使用三个指针，分别指向前一个，当前，下一个，每次替换前一个和当前，保存下一个
function reverseFn(head) {
	let pre = null;
	let cur = head;
	
	while (cur !== null) {
		let next = cur.next;
		
		cur.next = pre;
		pre = cur;
		cur = next;
	}
	
	logList(pre);
}
```

```js
//递归解法
function testFn(head) {
    let result = null;
    reverse(head);
    if (head) {
        head.next = null;
    }
    
    logList(result);
    
    function reverse(node) {
        if (!node) {
            return;
        }
        
        if (!node.next) {
            result = node;
            return node;
        }
        
        let next = reverse(node.next);
        next.next = node;
        return node;
    }
}
```

## 局部反转1个链表，反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
说明:  
1 ≤ m ≤ n ≤ 链表长度。  
示例:  
:::tip
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
:::
```js
function reverseFn(head, m, n) {
	let dummy = new ListNode(null);
	dummy.next = head;
	
	let p = dummy, pre = null, cur, leftHand, start;
	
	for (let i = 0; i < m - 1; i++) {
		p = p.next;
	}
	
	leftHand = p;
	cur = p.next;
	start = p.next;
	
	for (let i = m - 1; i < n; i++) {
		let next = cur.next;
		cur.next = pre;
		pre = cur;
		cur = next;
	}
	
	leftHand.next = pre;
	start.next = cur;
	
	logList(dummy.next);
}
```

```js
//递归解法
function testFn(head, left, right) {
    let step = right - left;
    if (step < 1) {
        return head;
    }
    
    const dummy = new ListNode();
    dummy.next = head;
    
    let curr = dummy;
    let start = null;
    let end = null;
    let result = null;
    while(left--) {
        start = curr;
        curr = curr.next;
    }
    
    reverse(curr, step);
    start.next.next = end;
    start.next = result;
    logList(dummy.next);
    
    function reverse(node, count) {
        if (count === 0) {
            result = node;
            end = node.next;
            return node;
        }
        
        let next = reverse(node.next, count - 1);
        next.next = node;
        return node;
    }
}
```