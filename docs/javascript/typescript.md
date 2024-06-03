---
title: TypeScript
date: '2022-07-08'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - ts
publish: true
---

## const 和 let 类型推断
```ts
const strA = 'abc';//是'abc'字面量类型
let strN = 'def';//是string类型
```

## 数组不同类型的值的问题
```ts
const test = ['123', {}, function];//test 是 number | {} | () => {}[]
const test2 = ['123', {}, function] as const;//可以解决类型问题
```
## type和interface的区别
- 类型别名 (type) 更灵活，可以定义联合类型、交叉类型和其他高级类型
- type可以创建utility types,比如Parameter&lt;typeof http&gt;
- 虽然很多时候可以互换
- interface 同名会合并

## utility types
> [参考](https://juejin.cn/post/6994038108543156238#heading-11)
- Parameter, 可以读取后面函数的的参数类型，返回元组
- Partial&lt;Props&gt;，它会将Type内所有属性置为可选，返回一个给定类型Type的子集
- Required&lt;Props&gt;，与上面的Partial相反，构建返回一个Type的所有属性为必选的新类型
- Intersection<T, U>的作用是取T的属性,此属性同样也存在与U
- Merge&lt;O1, O2&gt; 是将两个对象的属性合并
- Omit，返回一个类型，可以删除一些属性的类型，剩余类型必须传
- Pick，构建返回一个根据Keys从类型Type拣选所需的属性的新类型
- Exclude，从Type中排除可以分配给ExcludedUnion的类型

## 联合类型和交叉类型
- 联合类型Union Types，something: string | number。keyof Person返回的是联合类型
- 交叉类型：a & n

## React中获取一个组件的属性值
- React.componentProps<Select.Option>可以获取

## .d.ts文件作用
统一被称为描述文件，至于前面的文字是什么无所谓，不管是a.d.ts还是jQuery.d.ts都可以，它的作用就是为js文件描述类型
> .d.ts描述文件，它的主要作用就是弥补一些缺失的类型，使得Javascript文件也可以在Typescript中继续使用，比如使用jquery
> 其主要方式就是通过关键词declare来描述各种类型，比如变量，对象，函数等等，描述完成后，Typescript可以自动的去识别.ts文件里对应的变量、函数、对象；
- 关键字：declare，它代表是一个声明，声明后面为定义类型的代码的类型
- [参考](https://blog.csdn.net/zy21131437/article/details/121946978)
- declare function
- declare module
- declare const
- declare namespace,描述用点表示法访问的类型或值
- declare interface

## extends的作用
- 泛型约束：使用extends来限制泛型参数的类型范围，确保类型安全
- 接口继承：使用extends使一个接口可以继承另一个接口的属性和方法
- 类继承：使用extends使一个类可以继承另一个类的属性和方法，从而实现代码复用和层次结构

## in操作符的用法
- 在类型上下文中，in 操作符主要用于映射类型（Mapped Types），可以遍历某个联合类型并生成新的类型。
```ts
type Person = {
  name: string;
  age: number;
};

type ReadonlyPerson = {
  readonly [K in keyof Person]: Person[K];
};

// 在这个例子中，[K in keyof Person] 使用了 in 操作符遍历 Person 类型的所有键，并生成一个新的类型 ReadonlyPerson，其中所有属性都是只读的。
```
- 在运行时上下文中，in 操作符用于检查对象上是否存在某个属性。这在类型检查和条件逻辑中非常有用。
```ts
const person = {
  name: "Alice",
  age: 30
};

console.log("name" in person); // true
console.log("address" in person); // false
```

## 条件类型（Conditional Types）是一种基于条件表达式动态选择类型的方式
```ts
T extends U ? X : Y

type NonNullable<T> = T extends null | undefined ? never : T;

type A = NonNullable<string | number | null>; // string | number
type B = NonNullable<string | undefined>;     // string
```

### 条件类型的分布特性
> 条件类型在处理联合类型时具有分布特性。它会自动将联合类型拆分成单个类型进行条件判断，并最终合并结果类型。
```ts
type Example<T> = T extends string ? "Yes" : "No";

type A = Example<string | number>; // "Yes" | "No"
// 在这个例子中，Example<string | number> 会被拆分成 Example<string> 和 Example<number>，然后分别计算结果类型，最终合并成 "Yes" | "No"。
```

## 手写实现
### 手写 Pick
```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type PersonNameAndAge = Pick<Person, "name" | "age">;
```

### 手写 Exclude
> Exclude 类型的实现方式是：对于联合类型中的每一个成员，检查它是否可以分配给另一个类型，如果不能，就保留该成员。
```ts
type Exclude<T, K> = T extends K ? never : T;

type A = "a" | "b" | "c" | "d";
type B = "b" | "d" | "e" | "f";
type C = Exclude<A, B>; // "a" | "c"
```

### 手写Omit
```ts
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type PersonNameAndAge = Omit<Person, "address">;
```

### 手写Partial
```ts
type Partial<T> = {
  [K in keyof T]?: T[K]
}

interface Person {
  name: string;
  age: number;
}

type PartialPerson = Partial<Person>;

let person1: PartialPerson = { name: "Alice" }; // age 是可选属性，值默认为 undefined
let person2: PartialPerson = { }; // name 和 age 都是可选属性，值默认为 undefined
let person3: Partial<Person> = { name: "Bob", age: 20 }; // 和 Person 一样，都是必选属性
```

### 手写 Readonly
```ts
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person>;

let person: ReadonlyPerson = { name: "Alice", age: 30 };
person.name = "Bob"; // 报错，因为 name 是只读属性
person.age = 40; // 报错，因为 age 是只读属性
person = { name: "Carol", age: 50 }; // 可以修改整体属性值
```

### 手写Required
```ts
type Required<T> = {
  [K in keyof T]-?: T[k]
}

interface Person {
  name?: string;
  age?: number;
}

type RequiredPerson = Required<Person>;

let person: RequiredPerson = { name: "Alice", age: 30 };
person.name = "Carol"; // 正常
person.age = 50; // 正常
person = { }; // 报错，因为 name 和 age 是必选属性
```

## 参考
- [TS面试题](https://juejin.cn/post/6999985372440559624?searchId=202406030956405F5CB60A7AACE77EC9E4)
- [TS手写题](https://juejin.cn/post/7239296984984862781?searchId=202406031038243B0F852EC9CED985E5AF)