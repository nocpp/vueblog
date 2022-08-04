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
### createServer 创建服务，可以返回html页面或者json
```js
	var http = require('http');
	
	http.createServer((req, res) => {
		//req是请求参数
		//res是要返回的东西, 就是一个可写流
		res.write()
		res.writeHead(200, {
            'Content-Type': 'text/html;charset:utf-8;'
        });
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
### jsonp，接口
> jsonp请求和ajax请求区别，jsonp在network中会出现到js栏，而ajax是xhr栏
> jsonp 原理，动态创建script标签，绕过跨域限制，后端返回一个类似函数调用的字符串

### CORS 解决跨域
```js
res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8',
    'access-control-allow-origin': '*'
});
```

### get 请求，可以作为客户端，也可以作为服务端。也就是中层，中间层
> 大公司把nodejs作为中间层转发，中间件，作为集群，网关，聚合不同网站的数据
> 异步编程思想之回调函数
```js
http.get() //如果是http，可以直接这样
https.get(reqURL, (res) => {
    var data = "";
    res.on('data', (chunk) => {
        data += chunk;
    })//传输中

    res.on('end', () => {
        console.log(data);
    })//传输完成，才可以拿到最终数据
}) //如果要请求的是https的，要用https模块
```

### post 请求，可以作为客户端，也可以作为服务端
```js
var options = {
    hostname: '',
    port: "443",
    path: "",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
};
var req = https.request(options, (res) => {
    var data = "";
    res.on("data", (chunk) => {
        data += chunk;
    })

    res.on("end", () => {
        response.end(data);
    })
});

req.write(JSON.stringify([{}, {"name": "zhangsan"}]));
req.end();
```

### 爬虫，直接抓取网页（如果页面是后端渲染出来的，就没有接口，只能用爬虫抓取网页分析）
> 性能不如python专业爬虫的
```js
http.get(url, (res) => {
    //使用cheerio 解析抓取的html，解析的像jquery一样

    let $ = cheerio.loda(data);
    let $data = $('.content');
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
```js
const querystring = require('querystring');
var obj = querystring.parse('name=avb&age=1000'); // { name: 'avb', age: 100 }
var str = querystring.stringify({ name: 'avb', age: 100 });//转化成字符串
```

- escape/unescape(mysql,和querystring 都有)
转义替换，类似encodeUrlComponent，防止sql注入，XSS攻击


## 内置模块之event模块
> 订阅发布模式
```js
const EventEmit = require("event");

const event = new EventEmit(); //每次请求需要重新创建，移到外面会导致多次监听

event.on("play", () => {

})

event.emit("play");
```

## fs内置模块
### 创建文件夹
```js
fs.mkdir("./avatar", (err) => {
	console.log(err);
});
```
### 修改文件夹名
```js
fs.rename("./avatar", "./avatar2", (err) => {
	console.log(err);
})
```

### 删除目录
> 只能删空目录，有文件的话，需要先删除文件删完
```js
fs.rmdir("./avatar", (err) => {
	
})
```

### 读取文件夹目录
```js
fs.readDir("./avatar", (err, data) => {
	
});
```

### 创建文件
```js
//如果有文件，会覆盖内容
fs.writeFile("./avatar/a.txt", "Hello", (err) => {
	
});
```

### 追加文件内容
```js
fs.appendFile("./avatar/a.txt", "Hello2", (err) => {
	
});
```

### 读取文件
```js
//error-first 风格，错误在前
fs.readFile("./avatar/a.txt", (err, data) => {
	console.log(data)//data 会是buffer对象
	data.toString('utf-8') //按utf8
});

//这样指定字符集也可以
fs.readFile("./avatar/a.txt", "utf-8",(err, data) => {
	console.log(data)//data
});
```

### 删除文件
```js
fs.unlink("./avatar/a.txt", err => {
	console.log(err);
})
```


### 查看文件信息
```js
fs.stat("./avatar/a.txt", (err, data) => {
	console.log(err);
})
```

### 文件是否存在
```js
fs.existsSync();
```

### 使用同步方法
```js
fs.readFileSync //以上方法都可以加上sync变成同步，但是需要用try catch包裹，不然报错就会程序退出。会影响其他人使用，卡住
//同步方法谨慎使用
```

### 基于promise同步写法
```js
const fs = require('fs').promises;

fs.readDir('./avatar').then(() => {})
```

### 常见错误码
```js
ENOENT: "ERROR NO ENTRY" //找不到文件或目录
```

## stream 流模块
> 读取大文件时，使用流模块，占用内存比较小
```js
var fs = require('fs');
var rs = fs.createReadStream("sample.txt", 'utf-8');
var ws = fs.createWriteStream("sample.txt", 'utf-8'); //写流
ws.write("1111");
ws.write("222");
ws.end();



rs.on("data", chunk => {
	console.log(chunk);
})

rs.on("end", () => {
	console.log('end');
})

rs.on("error", err => {
	console.log(err);
})
```

### pipe 高性能复制文件的方法
```js
readStream.pip(writeStream) //自动write end
```

## zlib 模块
> 压缩文件，加快传输速度
```js
const zlib = require("zlib");
const gzip = zlib.createGzip();

res.writeHead(200, {
    "Content-Encoding": "gzip"
});

readStream.pip(gzip).pipe(res);
```

## crypto 模块
> 加密和哈希算法模块
- MD5算法，不可逆的算法，可以用作密码保存，文件完整性校验
- AES加密算法
```js
const crypto = require('crypto');

const hash = crypto.createHash("md5");//还支持sha1, sha256

hash.update("Hello");

hash.digest("hex");//可以传hex或者base64，两种形式


const hash2 = crypto.createHmac('md5', 'secret-key'); //操作和上面一样，但是有密钥，更安全，不容易被比对出来

//对称加密算法
function encrypt(key, iv, data) {
    let dep = crypto.createCipheriv("aes-128-cbc", key, iv);//128 所以key和iv都是16字节，16*8=128

    return dep.update(data, "binary", "hex") + dep.final("hex");
}

function decrypt(key, iv, crypted) {
    crypted = Buffer.from(crypted, "hex").toString("binary");//Buffer 是 nodejs 核心 API，它提供我们处理二进制数据流的功能

    let dep = crypto.createDecipheriv("aes-128-cbc", key, iv);
    return dep.update(crypted, "binary", "urf8") + dep.final("utf8");
}
```

### path 内置模块，处理linux和windows路径，不同系统，斜线不同
```js
path.join(__dirname, '/static', '/css/login.css'); //拼接路径
```

## 路由，url和资源的一个映射，可能是页面或者接口或者文件
> route 就放路由，页面
> api 放接口

## 静态服务路由
- 返回的css文件，js文件，需要根据文件类型返回对应Content-Type,使用mime模块可以解决

## node全局变量
- __dirname 当前路径



## Express 框架
> 快速，开放，极简的框架，由路由和中间件组成
- app = express() 函数，生成一个服务，类似http.createServer
- app.get, res.send 函数，自动end，会自动判断返回内容，生成对应Content-Type
- app.get的第三个参数，回调的next方法，就是中间件
- app.get的第二个参数可以传函数数组

### 路由
- 字符串，固定字符串
- 字符串模式，带参数，支持动态匹配，类似正则。也可以直接写正则表达式作为url


## 中间件
> 以为把代码都放入回调函数中，回调函数会很臃肿，并且代码复用性不好，所以抽出中间件的概念，把处理函数分为多个中间件，这样更好理解，其它地方也能复用中间件。本质就是一个函数
- 中间件之间如何通信，可以在res中上加属性值
- 中间件三个参数，req，res，和next。如果中间没有next，就会挂起

### 中间件类别
- 应用级, 挂在app上面的都叫做应用级中间件
```js
app.use(func1) //全部，注意先后顺序，只管他后面的
app.use('/home', func1) //只响应/home
```
- 路由级
挂在路由对象上
```js
const router = express.Router();
router.get('/home', (req, res) => {});
router.post();
```
- 错误处理
- 内置
- 第三方

## 常用工具
- nodemon 保存后自动重启node服务，不重新运行会不生效
- mime 模块，文件类型返回对应Content-Type


## 思考
- 麻烦的东西封装成模块或者找第三方模块
- 学指定新东西时，要专注于这个技术本身，其他不相关的尽量简单，这样才能高效。比如学node，涉及到样式啥的都按最简单的来。发散的东西可以先记录，下次补充
- 自己学学SSR，手动试试
