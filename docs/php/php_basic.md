---
title: php基础
date: '2022-12-06'
sidebar: 'auto'
categories:
 - 后端相关
tags:
 - php
publish: true
---
## 常量
### 定义常量
```php
define('PRIMARY_COLOR', '#F00');
```
### PHP_EOL 
通用换行符号，不区分系统
### DS 分隔符，类似'/'
> 只有TP5才有，不是php原生

## 超级全局变量
### $_GET
```php
echo $_GET['name']; // 输出get请求的name参数
```
### $_POST

## 变量检测函数
### function_exists
函数是否存在
### empty
是否为空
### isset
变量是否定义
### is_dir
是否是目录

## 字符串函数
### strpos
类似JS的indexOf的，查找字符串中子串第一次出现的位置
### stripos
功能和上面一样，但是不区分大小写
### str_repeat('--', 10)
重复输出字符串
### strtoupper
转为大写
### substr函数，单字节截取字符串
### mb_substr，多字节截取，中文截取
### strlen函数，字符串长度
```php
strlen('123'); // 3
```

## 数组函数
### in_array
数组中是否存在数据
### array_search
数组搜索
### array_intersect
交集的元素

## 日期时间函数
### date 函数
```php
date('Y-m-d', [时间戳]); // '2022-11-30'
date('Y-m-d H:i:s', [时间戳]); // '2022-11-30 11:30:22'
```
### time 函数
```php
time(); // 时间戳
```
### strtotime 函数，字符串转日期
```php
strtotime('now'); // 时间戳
```

## 文件函数
### scandir 函数
获取指定目录下面文件和文件夹


## 调试方法
### die/exit
终止程序
### echo 函数
输出字符串
### var_dump
输出变量到屏幕
### dump 函数，tp5才有
美化输出变量

## 查看php信息函数
### phpinfo
```php
phpinfo();
```

## 变量作用域
### 超级作用域
哪里都可以访问，例如$_GET
### 全局作用域
函数内外都可以访问，例如define常量
### 外部作用域
函数外部定义的变量，函数内部不能直接访问，要访问要使用global关键字
### 函数内部作用域
函数内部使用

## 命名空间
主要是解决名字冲突的问题，通过命名空间，可以调用不同模块的同名函数
```php
namespace study;
namespace study\sub\segment;
use study\inner as inner; // 起别名，这样就可以用别名代替完整命名空间
inner\test(); // 实际就是\study\inner\test()

use study\inner; // 等价于use study\inner as inner;
// 导入一个全局类
use ArrayObject;

// 导入函数
use function My\Full\functionName;

// 为函数设置别名
use function My\Full\functionName as func;

// 导入常量
use const My\Full\CONSTANT;

namespace Foo\Bar;

/* 限定名称，类似相对路径 */
subnamespace\foo(); // 解析为函数 Foo\Bar\subnamespace\foo
subnamespace\foo::staticmethod(); // 解析为类 Foo\Bar\subnamespace\foo,

/* 完全限定名称，类似决定路径 */
\Foo\Bar\foo(); // 解析为函数 Foo\Bar\foo

// 调用全局的函数和变量
\strlen('hi'); // 调用全局函数strlen
\INI_ALL; // 访问全局常量 INI_ALL
```
### __NAMESPACE__魔术常量
```php
echo '"', __NAMESPACE__, '"'; // study\inner
```