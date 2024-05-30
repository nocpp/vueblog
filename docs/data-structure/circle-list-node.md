---
title: 环形链表
date: '2021-10-25'
sidebar: 'auto'
categories:
 - 算法与数据结构
tags:
 - 环形链表
publish: true
---

:::tip
环形链表是链表中的一类特殊问题，它和链表反转一样，有着相对恒定的解题思路和适当的变体。
:::

## 给定一个链表，判断链表中是否有环。
示例：  
3->2->0->4  
其中4.next 指向2，代表有环
### 思路分析
立Flag法，给结点立下Flag，如果能找到Flag，说明有环
```js
function testFn(head) {
    let cur = head;
    while (cur) {
        if (cur.flag) {
            return true;
        } else {
            cur.flag = true;
            cur = cur.next;
        }
    }
    
    return false;
}
```

## 定位环的起点
:::tip
给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null。
:::

示例：
如上题，应该返回index 1, 因为是index为1的那个结点首先发现Flag的
```js
function testFn(head) {
    let cur = head;
    while (cur) {
        if (cur.flag) {
            return cur;
        } else {
            cur.flag = true;
            cur = cur.next;
        }
    }
    
    return null;
}
```

### 快慢指针
```js
function testFn(head) {
    let slow = head;
    let fast = head;
    // 01 让两个指针第一次相交 此时slow指针走了n*b步
    while(true){
        if(fast === null || fast.next === null){
            return null;
        }
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast){
            break;
        }
    }
    // 02 换新的结点从头结点开始丈量a步 保证slow指针一共走了a+n*b步
    let newFast = head;
    while(slow !== newFast){
        newFast = newFast.next;
        slow = slow.next;
    }
    // 03 返回slow指向的结点 一定刚好走完一整圈
    return slow;
}
```