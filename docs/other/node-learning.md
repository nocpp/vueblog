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
- app.get的第三个参数，回调的next方法，就是中间件，如果next传参数，就是传error，下一个中间件的回调第一个参数就是error
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
app.get('/')
app.post('/')
app.use(express.static('public')); //托管静态文件，直接就可以吧public文件夹里的静态资源直接访问了
app.use('/static', express.static('public')); //虚拟目录，访问static就等同于public
```
- 路由级
挂在路由对象上
```js
const router = express.Router();
app.use(express.urlencoded({ extended: false }));//配置解析post参数的中间件，这是响应x-www-form-urlencoded 格式
app.use(express.json()); //配置解析post参数的中间件，解析json格式参数
router.get('/home', (req, res) => {});//通过req.query获取参数
router.post(); //参数通过req.body获取参数，但是必须配置中间件
//
```
- 错误处理
- 内置
- 第三方

## 服务端渲染（SSR）和客户端渲染（BSR）
- 客户端渲染，由前端组装页面，前后端分离，一定能找到提供数据的接口
- SSR的网站找不到数据的接口，在服务端就组装好了数据页面了
	+ 前端做好静态页面，模版，假数据，做好跳转
	+ 后端取数据，删除模版的假数据，利用模版语法替换假数据
> 同构JS应用既能seo（服务端renderToString），又能快速交互（前端路由）。jsp只是前者。而且用三大框架开发，只操作数据，对比以前拿到数据后还要手动更新dom节点来说，方便了很多，代码量也少了不少，代码都是复用的，一端编写，两端执行


### 老的JSP，PHP这种纯服务端渲染缺点
> 解决办法，前后端分离（解决开发维护问题），动态静态分离（解决并发问题，减轻服务器压力，静态资源加载更快并且可以缓存加速，但是html是算静态还是动态呢？所以有了前后分层）
- 耦合性不好，前端改个字，然后前后端都要重新部署
- 开发协作困难，维护性不好，前后端代码都在一起
- 性能不好，数据逻辑和视图逻辑每次请求后都要执行，动态生成html
- 服务器成本高，由于Tomcat/Apache并发能力不如nginx，所以需要更多服务器

:::tip
- 静态资源:图片、CSS、JS等公共资源，与特定用户无关的资源  
- 动态资源:应用逻辑、数据操作等与特定用户密切相关的资源 
:::

### 前后端分离
> 前端后端都可以操作视图层，客户端驱动的话，不需要刷新页面，就可以通过ajax请求数据更新页面，还可以减轻服务器压力，所以把视图逻辑放到客户端
### SPA应用的缺点
- 依赖客户端的设备
- 首屏性能问题，组件树渲染前，白屏问题，是因为组件渲染进程是同步阻塞的，影响了首屏性能问题，性能较差的设备，白屏很长时间
	+ 性能较差的设备，白屏很长时间
	+ 网络较差，会加载很长时间
- SEO问题
- [参考](http://www.ayqy.net/blog/diference-between-ssr-and-jsp-php/)

### 还有SSG 生成静态的网站，可以和SSR结合使用，NEXT框架


### 服务端渲染（频繁更新的，首页用SSR，其余静态生成）
- 首屏采用服务端渲染，解决白屏问题，确保首屏打开更快速，更稳定
- 更成熟，基于前端组件化开发，现代生态，基于NODEJS同构方案成为最佳体验
- 独立性，仍然是前后端分层
- EJS模版

## EJS模版渲染
```js
app.use("views", '/views')
app.use("view engine", "ejs")

//router中使用res.render方法
res.render('loign', { title: '111' });
res.redirect('home'); //重定向
```
### 支持直接渲染html
```js
app.use("view engine", "html");
app.engine("html", require("ejs").renderFile)
```

## 关系型数据库和非关系型数据库
- 关系型，表表和有关联，删除的话会删除关联表的内容，外键关系等，用sql语句
- 非关系型，no sql，not only sql，轻量高效，mongoDB, redis等，不用sql语句，使用BSON的方式。语句方法类似JS调用方法
- MongoDB一个集合里，字段可以不一致，数量也可以不同，很自由[但是要限制]

## MongoDB
> 轻量，查询很快，耗内存
### 术语
- 数据库
- 集合/表
- 文档/数据行
- 域/字段
- 索引
- 主键

### 命令
- use 创建数据库
- db 查看当前数据库
- show dbs 看全部
- db.createCollection 创建集合/表
- db.dropDatabase 删除数据库
- db.getCollectionNames 查询所有数据库
- db.[集合名].dorp() 删除集合
- db.[集合名].save({ name: "张三" }) 给集合插入数据
- db.[集合名].update() 更新
- db.[集合名].remove（{"myAge": 100}) 删除myAge是100的数据，传空对象是删除所有
- db.[集合名].update({"name": "张三"}, {$set: {"age": 200}}) 更新, 不加$set，会是直接替换
- db.[集合名].update({"name": "张三"}, {$inc: {"age": 200}}) 更新, $inc 增加
- db.[集合名].update({"name": "张三"}, {$inc: {"age": -200}}) 更新, 减


### 查询命令
- db.[集合名].find({"user": "az", "password": 100}) 条件查询, 不传条件就查所有
- db.[集合名].find({"age": {"$gte": 100}}) 条件查询, 大于100
- db.[集合名].distinct("name") 查询某字段，去重复
- db.[集合名].find({"name": /k/}) 模糊查询，用正则写法 
- db.[集合名].find({}, {name: 1, age: 1, _id: 0}) 只查某个列/域，就不会返回_id
- db.[集合名].find({}).sort({age: -1}) 排序，1是升序, -1是倒序
- db.[集合名].find({}).skip(5).limt(5) 分页，查询5-10条
- db.[集合名].find({"$or": [{age: {$gte: 100}}]}) 或
- db.[集合名].findOne() 查询第一条
- db.[集合名].find().count() 聚合查询，查询数量


### nodejs操作mongoDb
```js
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/[数据库名字]");

//连接完成后，用模型，可以限制类型去关联集合，操作
const mongoose = require("mongoose");
const UserType = {
    username: String,
    password: String,
    age: Number
};
const Schema = mongoose.Schema();
const userModal = mongoose.useModel("user", new Schema(UserType)); //userModal会对应user集合，并且会自动创建user
```

## RestFul API 风格
> url中只包含资源名称，利用请求method来区分创建还是修改，请求参数模版，page，limit, offet, orderBy
```js
// api/getUserList GET 这种不是   api/user GET 这种是
// api/updateUserList POST 这种不是   api/user PUT 这种是
// api/AddUserList POST 这种不是   api/user POST 这种是
// api/DelUserList POST 这种不是   api/user/:id DELETE 这种是
```

### graphql 
根据前端，自己获取想要的字段

## MVC架构
> 当业务变得很复杂时，不分层会很难理解和维护，以及复用
- 把业务抽象为控制层
- 目录结构就有了
    + routes 路由层
    + controllers 路由里的回调函数，逻辑处理
    + model 直接操作数据库
    + services  调model的方法
    + view 视图层

## cookie和session
- cookie 是存在客户端
- session 是存在服务端，与cookie结合，用cookie存储sessionId。解决cookie可能被盗用session服务端可以控制它失效

### session缺点
- 多个服务时，session复制的问题，可以通过专门弄个数据库存解决
- 安全问题，浏览器会自动发送cookie。（请求伪造，CSRF）

## JWT解决cookie问题 Json Web Token
- 存在localStorage中，避免被串改
- 可以避免CSRF，请求不会自动携带token

## 常用工具
- nodemon 保存后自动重启node服务，不重新运行会不生效
- mime 模块，文件类型返回对应Content-Type
- FeHelper Chrome 插件
- Robomongo 可视化MongoDB工具
- mongoose nodejs链接mongodb
- express-session 生成session的模块
- connect-mongo
- jsonwebtoken 模块 JWT
- axios
	+ 拦截器，interceptors 可以在请求前，响应后执行某个方法，任何地方都会调用
- multer 处理 multipart/form-data 格式，上传文件
- apidoc API文档生成工具，抓取注释色生成文档

## Koa 和 Express 的区别
- Express 上手更容易，生态更丰富，基于connext中间件模型，是线性的，流水线般，如果一个中间件没有执行next，就会卡住
- Koa 不会提供内置中间件，更轻量
- Koa Context 参数
- Koa 洋葱模型
- Express 使用回调处理异步，Koa v1使用generator , v2使用async await
- next不同，Koa的next控制权会回到自己，是Promise的，Express 的next不是

## Koa 中 回调参数不同
> (ctx, next)

## 思考
- 麻烦的东西封装成模块或者找第三方模块
- 学指定新东西时，要专注于这个技术本身，其他不相关的尽量简单，这样才能高效。比如学node，涉及到样式啥的都按最简单的来。发散的东西可以先记录，下次补充
- 自己学学SSR，手动试试
- 随着代码越来越多，越来越复杂，要抽象分层


## mongodb查询
### 聚合查询
```shell
db
.getCollection("web_errors_ftbqp8h1671594554364")
.aggregate([
	{
		$match: {
			"create_time": {"$gt":ISODate("2023-05-01T00:00:00.000Z"),"$lt":ISODate("2023-05-04T00:00:00.000Z")}
		}
	}, {
		$group: {_id: "$msg", counter: {$sum: 1}}
	}, {
		$sort: { "counter": -1 }
	}])
```
### 查询页面总次数
```shell
db
.getCollection("web_pages_ftbqp8h1671594554364")
.aggregate([
	{
		$match: {
			"create_time": {"$gt":ISODate("2023-05-01T00:00:00.000Z"),"$lt":ISODate("2023-05-04T00:00:00.000Z")}
		}
	}, {
		$group: {_id: "_id", counter: {$sum: 1}}
	}])
```

101834

133559