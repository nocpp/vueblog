---
title: node总结
date: '2022-08-12'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - node
publish: true
---
## 模块规范
- commonjs 自带的
- ES Module 在package.js中配置type: module可以开启

## 自带模块
- http 模块创建服务
```js
	var http = require('http');
	
	http.createServer((req, res) => {
		//req是请求参数
		//res是要返回的东西
		res.write()
		res.writeHead('Content-Type', 'text/html;charset:utf-8;')
		res.end()//必须有这个，不会一直等待
	}).listen(9000, () => {
		//创建成功后返回
	})
	
	//和上面一样的
	var server = http.createServer();
	server.on('request', (req, res) => {
		
	})
	
	server.listen('9000', () => {
		
	})
```
- url 模块
包含parse和format方法，用来解析URL的参数，也可以你把对象生成url。redolve是拼接。（后面没有/, （加在后面或者直接替换最后这个），加/，直接在域名后面）

```js
//新版
const urlObj = new URL(url, 'http://127.0.0.1:3000');
urlObj.pathname //是一样的
urlObj.searchParam //参数
```
- querystring 模块
把参数路径结构转化为参数对象


## 常用工具
- nodemon 保存后自动重启node服务，不重新运行会不生效
