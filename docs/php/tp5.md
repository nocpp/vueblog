---
title: php项目开发
date: '2022-11-28'
sidebar: 'auto'
categories:
 - 后端相关
tags:
 - thinkphp
publish: true
---
## phpstorm快捷键
- 搜索文件
```js
shift + shift
```
- 搜索和全局搜索
```js
cmd+f/cmd+shift+f
```
- 替换和全局替换
```js
cmd+r/cmd+shift+r
```
- 选中多个快捷键，叫 Add Select
```js
ctrl+g
```
- 格式化代码
```js
cmd+alt+l
```

## 开发流程
### 列出大概功能模块
### 引入后台模版
- 把模版中静态资源放入public/static下面
- 配置config.php中视图输出字符串内容替换
- 把模版放入模块view目录下面，替换静态文件

### 拆分模版公共部分
- 头部取出，叫top.htm
- 左侧取出，叫left.htm

### 完成左侧菜单
这样就可以完成分清主次，理清楚先做哪些功能，后做哪些功能

### 找到要做的模块
- 建表
- 新建控制器,controller
- 新建模版，增加,view
- 增加验证器,validate里面

### 做完一个模块，然后接着做下一个模块就好

## php如果要上传文件
- 需要enctype="multipart/form-data"

## 常用助手函数
### request()
可以用来获取请求信息
```php
request()->isPost(); // 是否是post请求
request()->domain(); // 当前域名
request()->module(); // 当前模块名称
request()->method(); // 当前请求方法
request()->ip(); // 当前请求ip
request()->param(); // 当前请求参数
request()->only(['name']); // 当前请求参数只包含name
```
### input函数
获取参数，支持get，post，cookie，session，request，server，file，route等
```php
input('?post.name'); // 是否post参数中有name
input('post.'); // 所有post参数
input('get.name'); // get中nam参数
input('param.name'); // get,post,put中name参数
input('param.'); // get,post,put中所有参数
input(''); // 默认也是param方式
```

### url助手函数
生成url
```php
url('index/blog/read','id=5&name=thinkphp');
```

## 视图常用方法
### fetch方法，要继承Controller才有
```php
$this->fetch('hello', ['name' => 'thinkphp']); // 渲染hello模版，注入数据
```
### view助手函数，无需继承，直接使用
```php
view('hello', ['name' => 'thinkphp']);
```
### display，渲染内容输出
### assign，模版变量赋值
### engine，初始化模版引擎
### 配置模版引擎
在config.php 中 修改 template选项

## 连接数据库
### 使用Db::table方法，完整表名，单例
```php
Db::table('user')->where('id',1)->find();
Db::table('user')->where('status',1)->select();
```
### Db::name方法，有前缀的话，用这个，单例
```php
Db::name('user')->where('id',1)->find();
Db::name('user')->where('status',1)->select();
```
### 助手函数db，使用db助手函数默认每次都会重新连接数据库
```php
db('user')->where('id',1)->find();
db('user')->where('status',1)->select();
```


## debug在生产环境要记得关闭
```php
config.php中 app_debug
```

## 表单提交，修改多行数据的某个字段时，要用name='sort[{$id}]'数组形式
如果只用sort，后台会只接收到一个


## 递归
- 可以递归处理无限极目录和文件夹
- 用静态变量配合更佳