---
title: 数据结构类型
date: '2021-10-13'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 类型
publish: true
---

## 需要掌握以下几种数据结构
- 数组
- 栈
- 队列
- 链表
- 树

## 数组（线性表的顺序存储结构）
> 指的是用一段地址连续的存储单元依次存储线性表的数据元素

### 数组的创建
1. 方括号+元素方式创建
```js
const arr = [1, 2, 3];
```

2. 构造函数方式创建
```js
const arr = new Array();
//等同于
const arr = [];
```

3. 创建指定长度的数组
```js
const arr = new Array(7);
```

4. 创建指定长度，指定值的数组
```js
const arr = (new Array(7)).fill(7)
```
::: warning
当使用fill填充对象时，改变其中一个，其它元素也会跟着改变
:::

### 数组的遍历和访问
> 数组的访问
```js
arr[0] //使用索引访问即可
```

> 数组的遍历
通过数组的遍历，获取到数组的每个元素和对应下标
1. for循环
通过循环数组的下标来访问数组的元素，**性能最高**
```js
// 获取数组的长度
const len = arr.length
for(let i=0;i<len;i++) {
    // 输出数组的元素值，输出当前索引
    console.log(arr[i], i)
}
```

2. forEach方法
通过取 forEach 方法中传入函数的第一个入参和第二个入参，我们也可以取到数组每个元素的值及其对应索引：
```js
arr.forEach((item, index)=> {
    // 输出数组的元素值，输出当前索引
    console.log(item, index)
})
```

3. map方法
map 方法在调用形式上与 forEach 无异，区别在于 map 方法会根据你传入的函数逻辑对数组中每个元素进行处理、进而返回一个全新的数组。
```js
const newArr = arr.map((item, index)=> {
    // 输出数组的元素值，输出当前索引
    console.log(item, index)
    // 在当前元素值的基础上加1
    return item+1
})
```

> 数组中增加元素的三种方法
- unshift 方法-添加元素到数组的头部
```js
const arr = [1,2]
arr.unshift(0) // [0,1,2]
```
- push 方法-添加元素到数组的尾部
```js
const arr = [1,2]
arr.push(3) // [1,2,3]
```
- splice 方法-添加元素到数组的任何位置
```js
const arr = [1,2] 
arr.splice(1,0,3) // [1,3,2], 参数分别对应(索引值, 删除的元素个数，要插入的元素)
```

> 数组中删除元素的三种方法
- shift 方法-删除数组头部的元素
```js
const arr = [1,2,3]
arr.shift() // [2,3]
```
- pop 方法-删除数组尾部元素
```js
const arr = [1,2,3]
arr.pop() // [1,2]
```
- splice 方法-删除指定位置元素
```js
const arr = [1,2,3]
arr.splice(1, 1) // [1,3]
```

### 二维数组
就是数组里面元素是数组
```js
const twoArr = [[], []]
```

> 二维数组初始化
```js
const len = arr.length
for(let i=0;i<len;i++) {
    // 将数组的每一个坑位初始化为数组
    arr[i] = []
}
```

> 二维数组的访问
使用双重循环
```js
// 缓存外部数组的长度
const outerLen = arr.length
for(let i=0;i<outerLen;i++) {
    // 缓存内部数组的长度
    const innerLen = arr[i].length
    for(let j=0;j<innerLen;j++) {
        // 输出数组的值，输出数组的索引
        console.log(arr[i][j],i,j)
    }
}
```

::: tip
N 维数组需要 N 层循环来完成遍历。
:::

## 栈--只用 pop 和 push 完成增删的“数组”
栈是一种后进先出(LIFO，Last In First Out)的数据结构
比如数组，只能由尾部添加元素，尾部取元素
```js
// 初始状态，栈空
const stack = []  
// 入栈过程
stack.push('东北大板')
stack.push('可爱多')
stack.push('巧乐兹')
stack.push('冰工厂')
stack.push('光明奶砖')

// 出栈过程，栈不为空时才执行
while(stack.length) {
    // 单纯访问栈顶元素（不出栈）
    const top = stack[stack.length-1]
    console.log('现在取出的冰淇淋是', top)  
    // 将栈顶元素出栈
    stack.pop()
}

// 栈空
stack // []
```

## 队列——只用 push 和 shift 完成增删的“数组”
队列是一种先进先出（FIFO，First In First Out）的数据结构。
```js
const queue = []  
queue.push('小册一姐')
queue.push('小册二姐')
queue.push('小册三姐')  
  
while(queue.length) {
    // 单纯访问队头元素（不出队）
    const top = queue[0]
    console.log(top,'取餐')
    // 将队头元素出队
    queue.shift()
}

// 队空
queue // []
```

## 链表
链表和数组类似，只不过数组是连续的存储空间，而链表是可以离散的，元素通过每个结点的next指针关联

### 链表结点的创建
```js
function ListNode(val) {
    this.val = val;
    this.next = null;
}
```

在使用构造函数创建结点时，传入 val （数据域对应的值内容）、指定 next （下一个链表结点）即可：
```js
const node = new ListNode(1)  
node.next = new ListNode(2)
```

### 链表元素的添加
如果是插入
```js
// 如果目标结点本来不存在，那么记得手动创建
const node3 = new ListNode(3)     
// 把node3的 next 指针指向 node2（即 node1.next）
node3.next = node1.next
// 把node1的 next 指针指向 node3
node1.next = node3
```