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

4. for of遍历
for of遍历可以遍历所有实现iterator**（具有[Symbol.iterator]属性）**接口的数据结构,

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

:::tip
在涉及链表删除操作的题目中，重点不是定位目标结点，而是定位目标结点的前驱结点。
:::

### 链表元素的删除
链表有node1,node2,node3结点，现在要删除node2结点
```js
node1.next = node2.next;
```


### 数组和链表的复杂度
1. 数组的增删操作时间复杂度是O(n)，而链表是O(1)
2. 数组的查询操作时间复杂度是O(1)，而链表是O(n)

:::danger
JS中数组不一定是连续存储的，当存入的是对象时可能是非连续存储
:::


## 树与二叉树
树存储结构形状类似一棵倒过来的树，由根节点，结点，叶子结点组成，也叫做父结点，子结点，兄弟结点

### 树的相关概念
1. 树的层次计算规则：根结点所在的那一层记为第一层，其子结点所在的就是第二层，以此类推
2. 结点和树的“高度”计算规则：叶子结点高度记为1，每向上一层高度就加1，逐层向上累加至目标结点时，所得到的的值就是目标结点的高度。树中结点的最大高度，称为“树的高度”。
3. “度”的概念：一个结点开叉出去多少个子树，被记为结点的“度”。比如我们上图中，根结点的“度”就是3。
4. “叶子结点”：叶子结点就是度为0的结点。在上图中，最后一层的结点的度全部为0，所以这一层的结点都是叶子结点

### 理解二叉树结构
二叉树是指满足以下要求的树：
1. 它可以没有根结点，作为一棵空树存在
2. 如果它不是空树，那么必须由根结点、左子树和右子树组成，且左右子树都是二叉树。

### 二叉树编码
在 JS 中，二叉树使用对象来定义。它的结构分为三块：
- 数据域
- 左侧子结点（左子树根结点）的引用
- 右侧子结点（右子树根结点）的引用
```js
function TreeNode(val){
	this.val = val;
	this.leftNode = this.rightNode = null;
}
 ```
 
 ```js
 const node  = new TreeNode(1) //创建二叉树结点
 ```
 
 然后以这个结点为根结点，我们可以通过给 left/right 赋值拓展其子树信息，延展出一棵二叉树。