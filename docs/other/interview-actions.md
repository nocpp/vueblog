---
title: JS手写题
date: '2021-12-20'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - 手写题
publish: true
---

## 用js递归的方式写1到100求和?
> 思路分析：使用倒推法推导出递归式，然后找到递归边界，然后编码
```js
function sumNum (endNum) {
    //求1+2+3...+99+100
    
    //递归式 f(n) = n + f(n-1)
    //递归边界 n < 1
    
    if (endNum < 1) {
        return 0;
    }
    
    const sum = endNum + sumNum(endNum - 1);
    
    return sum;
}
```

## sort 快速打乱数组
```js
var arr = [1,2,3,4,5,6,7,8,9,10];
arr.sort(()=> Math.random() - 0.5)
```

## 数组去重？
```js
var arr=['12','32','89','12','12','78','12','32'];
    // 最简单数组去重法
    function unique1(array){
        var n = []; //一个新的临时数组
        for(var i = 0; i < array.length; i++){ //遍历当前数组
            if (n.indexOf(array[i]) == -1) //或者用includes
                n.push(array[i]);
        }
        return n;
    }
    arr=unique1(arr);
    // 速度最快， 占空间最多（空间换时间），通过对象key不重复去重
	function testFn(arr) {
		const r = [];
		let obj = {};
		const len = arr.length;
		
		for (let i = 0; i < len; i++) {
			if (!obj[arr[i]]) {
				r.push(arr[i]);
				obj[arr[i]] = true;
			}
		}
		
		return r;
	}
    //数组下标判断法，从第二个开始提高性能
    function unique3(array){
        var n = [array[0]]; //结果数组
        for(var i = 1; i < array.length; i++) { //从第二项开始遍历
            if (array.indexOf(array[i]) == i) 
                n.push(array[i]);
        }
        return n;
    }
```

```js
//es6方法数组去重
arr=[...new Set(arr)];
//es6方法数组去重，第二种方法
function dedupe(array) {
  return Array.from(new Set(array));       //Array.from()能把set结构转换为数组
}
```

## 节流防抖
- 节流：每隔一段时间执行一次，通常用在高频率触发的地方，降低频率。--如：鼠标滑动 拖拽
```js
时间戳实现：
var throttle = function(func, delay){
    var prev = Date.now();
    return function(){
        var context = this;
        var args = arguments;
        var now = Date.now();
        if(now-prev >= delay){
            func.apply(context,args);
            prev = Date.now();
        }
    }
}

定时器实现：
var throttle = function(func, delay){
    var timer = null;
    return function(){
        var context = this;
        var args = arguments;
        if(!timer){
            timer = setTimeout(function(){
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}
```
- 防抖：一段时间内连续触发，不执行，直到超出限定时间执行最后一次。--如：input 模糊搜索
```js
// debounce 函数接受一个函数和延迟执行的时间作为参数, 此函数用作监听回调函数
function debounce(fn, delay){
    // 维护一个 timer
    let timer = null;
    
    return function() {
        // 获取函数的作用域和变量
        let context = this;
        let args = arguments;
        
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(context, args);
        }, delay)
    }
}
```

## 浅拷贝和深拷贝的区别
- 浅拷贝：一般指的是把对象的第一层拷贝到一个新对象上去，比如
```js
var a = { count: 1, deep: { count: 2 } }
var b = Object.assign({}, a)
// 或者
var b = {...a}
```

- 深拷贝：一般需要借助递归实现，如果对象的值还是个对象，要进一步的深入拷贝，完全替换掉每一个复杂类型的引用。
```js
var deepCopy = (obj) => {
    var ret = {}
    for (var key in obj) {
        var value = obj[key]
        ret[key] = typeof value === 'object' ? deepCopy(value) : value
    }
    return ret
}
```

## 手写各种原生方法
2. 如何模拟实现一个new的效果
> 箭头函数没用prototype，无法new
```js
首先我们需要了解new操作符干了哪些事情

new操作符返回的是一个对象。
对象的原型，指向的是构造函数的原型
如果构造函数有return的话，需要对return的进行判断，如果是对象，那么用函数return的，如果不是对象，那么直接返回新创建的对象

function myNew(fn, ...args) {
    let obj = Object.create(fn.prototype);
    let res = fn.apply(obj, args);
    return res instanceof Object ? res : obj;
}
```
3. 如何模拟实现一个 bind 的效果？

```js
Function.prototype.bind_ = function (obj) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    };
    var args = Array.prototype.slice.call(arguments, 1);
    var fn = this;
    //创建中介函数
    var fn_ = function () {};
    var bound = function () {
        var params = Array.prototype.slice.call(arguments);//函数柯里化，返回的函数也可以传参，一起算
        //通过constructor判断调用方式，为true this指向实例，否则为obj
        fn.apply(this.constructor === fn ? this : obj, args.concat(params));
        console.log(this);
    };
    fn_.prototype = fn.prototype;
    bound.prototype = new fn_();
    return bound;
};
```

4. 如何实现一个 call/apply 函数？

```js
Function.prototype.myApply = function(context, [...args]) {
    // 先判断context是否为空，如果为空则指向window对象
    context = context || window;
    context.fn = this;
    context.fn(...args);
    delete context.fn;
}

Function.prototype.myCall = function(context, ...args) {
    // 先判断context是否为空，如果为空则指向window对象
    context = context || window;
    context.fn = this;
    context.fn(...args);
    delete context.fn;
}
```

5. 手写Promise
```js
        const PENDING = 'PENDING';
        const FULFILLED = 'FULFILLED';
        const REJECTED = 'REJECTED';
        
        function resolveValue(_promise, _result, _resolve, _reject) {
            if (_promise === _result) {
                return new TypeError('不能返回相同promise');
            }
            
            if ((typeof _result === 'object' && _result !== null) || typeof _result === 'function') {
                if (typeof _result.then === 'function') {
                    try{
                        _result.then.call(_result, y => {
                            resolveValue(_promise, y, _resolve, _reject);
                        }, r => {
                            _reject(r);
                        });
                    }catch(e){
                        _reject(e);
                    }
                } else {
                    _resolve(_result);
                }
            } else {
                _resolve(_result);
            }
        }
        
        class MyPromise{
            constructor(_exector) {
                this.state = PENDING;
                this.value = null;
                this.reason = null;
                this.sbList = [];
                this.fbList = [];
                
                let resolve = (_value) => {//要用箭头函数声明才能在里面用this
                    if (_value instanceof MyPromise) {
                        _value.then(resolve, reject);//resolve和reject都是当前promise的， 递归解析直到是普通值, 这里的resolve,reject都取的到，因为resolve的执行是在这两个函数执行之后，这里递归是防止value也是一个promise
                        return;
                    }

                    if (this.state === PENDING) {
                        this.state = FULFILLED;
                        this.value = _value;
                        this.sbList.forEach(_item => _item());
                    }
                }
                
                let reject = (_value) => {
                    if (this.state === PENDING) {
                        this.state = REJECTED;
                        this.reason = _value;
                        this.sbList.forEach(_item => _item());
                    }
                }
                
                try{
                    _exector(resolve, reject);
                }catch(e){
                    reject(e);
                }
            }
            
            then(_resolve, _reject) {
                _resolve = typeof _resolve === 'function' ? _resolve : _data => _data;
                _reject = typeof _reject === 'function' ? _reject : error => {throw error};
                
                let that = this;
                let promise2 = new MyPromise((resolve, reject) => {
                    if (this.state === FULFILLED) {
                        setTimeout(() => {
                            try{
                                let ret = _resolve(this.value);
                                resolveValue(promise2, ret, resolve, reject);
                            }catch(e){
                                reject(e);
                            }
                        });
                    } else if (this.state === REJECTED) {
                        setTimeout(() => {
                            try{
                                let ret = _reject(this.value);
                                resolveValue(promise2, ret, resolve, reject);
                            }catch(e){
                                reject(e);
                            }
                        });
                    } else {
                        this.sbList.push(() => {
                            setTimeout(() => {
                                try{
                                    let ret = _resolve(this.value);
                                    resolveValue(promise2, ret, resolve, reject);
                                }catch(e){
                                    reject(e);
                                }
                            });
                        });
                        
                        this.fbList.push(() => {
                            setTimeout(() => {
                                try{
                                    let ret = _reject(this.reason);
                                    resolveValue(promise2, ret, resolve, reject);
                                }catch(e){
                                    reject(e);
                                }
                            });
                        });
                    }
                });
                
                return promise2;
            }
            
            catch(_cb){
                return this.then(null, _cb);
            }
        }
        
        MyPromise.resolve = function(_value){
            return new MyPromise((resolve, _) => {
                resolve(_value);
            });
        }
        
        MyPromise.reject = function(_value){
            return new MyPromise((_, reject) => {
                reject(_value);
            });
        }
        
        MyPromise.all = function(_promises) {
            return new MyPromise((_resolve, _reject) => {
                let result = [];
                let len = _promises.length;
                
                if (len === 0) {
                    _resolve(result);
                    return;
                }
                
                const handleData = (data, index) => {
                    result[index] = data;
                    
                    if (index === len - 1) {
                        _resolve(result);
                    }
                };
                
                for (let i = 0; i < len; i++) {
                    MyPromise.resolve(_promises[i]).then(v => {
                            handleData(v, i);
                        }).catch(e => {_reject(e);return;});
                }
            })
        }
        
        new MyPromise((resolve, _) => {
            setTimeout(() => {
                resolve('lavie xsd');
            }, 0);
        }).then((data) => {
            console.log(data);
            return new MyPromise((resolve, _) => {
                resolve(new MyPromise((resolve, _) => {
                    resolve('hello js');
                }));
            })
        }).then((data) => {
            console.log(data);
            return new MyPromise((resolve, _) => {
                resolve('hello ts');
            })
        }).then(data => console.log(data))
```

6. 实现一个深拷贝
```js
function deepClone(obj) {
    let ret = {};
    
    for (let key in obj) {
        ret[key] = typeof obj[key] === object ? obj[key] : deepClone(obj[key]);
    }
    
    return ret;
}
```

7. 实现一个instanceof
```js
function test(left, right) {
    if (typeof left !== 'object' || left === null) return false;
    let proto = Object.getPrototypeof(left);
    while(true) {
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        proto = Object.getPrototypeof(proto);
    }
}
```

8. 实现一个ajax
```js
    function ajax({url, methods, body, headers}) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(url, methods);
            for (let key in headers) {
                let value = headers[key];
                request.setRequestHeader(key, value);
            }
            
            request.onreadystatechange = () => {
                if(request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(request.responseText);
                    } else {
                        reject(request);
                    }
                }
            }
            
            request.send(body);
        });
    }
```

[最全的手写](https://juejin.cn/post/6844904135603519495)

9. 数组排序方法
sort方法在chrome的V8引擎里有两种排序方法：
1、插入排序（数组 length<10）
2、快速排序（数组 length>10）
```js
        //sort函数
        let testArr = [5, 4, 1, 2, 3];
        testArr.sort((a, b) => (a - b));//增序
        testArr.sort((a, b) => (b - a));//增序
        
        //选择排序
        for (let i = 0; i < testArr.length - 1; i++) {
            for (let j = i + 1; j < testArr.length; j++) {
                if (testArr[i] > testArr[j]) {
                    [testArr[i], testArr[j]] = [testArr[j], testArr[i]];
                }
            }
        }
        
        //冒泡排序
        for (let i = 0; i < testArr.length - 1; i++) {
            for (let j = 0; j < testArr.length - i - 1; j++) {
                if (testArr[j] > testArr[j + 1]) {
                    [testArr[j], testArr[j + 1]] = [testArr[j + 1], testArr[j]];
                }
            }
        }
        
        //插入排序
        function insertionSort(arr) {
            var preIndex, current;
            for(var i = 1; i < arr.length; i++) {
                preIndex = i - 1;//已经排好序的索引
                current = arr[i];//要比较的元素，把它和排好序的数组进行比较
                while(preIndex >= 0 && arr[preIndex] > current) {//两两比较，如果更大就往后移一位
                    arr[preIndex + 1] = arr[preIndex];
                    preIndex--;
                }
                arr[preIndex + 1] = current;//比较完了就插进去
            }
            return arr;
        }
        
        //快速排序
        function Quick_Sort(arr, begin, end){
            begin = typeof begin === 'number' ? begin : 0;
            end = typeof end === 'number' ? end : arr.length - 1;
            
            if(begin > end)
                return;

            let tmp = arr[begin];
            let i = begin;
            let j = end;
            while(i != j){
                while(arr[j] >= tmp && j > i)
                    j--;
                while(arr[i] <= tmp && j > i)
                    i++;
                if(j > i){
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            arr[begin] = arr[i];
            arr[i] = tmp;
            Quick_Sort(arr, begin, i-1);
            Quick_Sort(arr, i+1, end);
        }

```
[快速排序详解](https://blog.csdn.net/qq_40941722/article/details/94396010)

10. 数组扁平化
```js
1. arr_flat = arr.flat(Infinity);
2. ary = ary.toString().replace(/(\[\]))/g, '').split(',');
3. let result = [];
let fn = function(ary) {
    for(let i = 0; i < ary.length; i++) }{
        let item = ary[i];
        if (Array.isArray(ary[i])){
            fn(item);
        } else {
            result.push(item);
        }
    }
}
4. function flatten(ary) {
    return ary.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    })
}
let ary = [1, 2, [3, 4], [5, [6, 7]]]
console.log(ary.MyFlat(Infinity))
5. while (ary.some(Array.isArray)) {
    ary = [].concat(...ary);
    }
```