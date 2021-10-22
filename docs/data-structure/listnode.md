---
title: 链表的应用
date: '2021-10-22'
sidebar: 'auto'
categories:
 - 数据结构
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