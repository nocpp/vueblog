---
title: Mysql相关问题
date: '2022-11-05'
sidebar: 'auto'
categories:
 - 后端相关
tags:
 - mysql
publish: true
---
## mysql初次安装后设置密码
- [设置账号密码](https://developer.aliyun.com/article/1003260)
- alter user'root'@'localhost' IDENTIFIED BY 'test@123456';
- 配置的目录
> /opt/homebrew/etc/my.cnf

## datagrip快捷键
- sql执行
> cmd+enter
- 快捷查询
> shift+shift
- 创建表并生成语句
> cmd+b

## mysql字段datatype
- [详解数据类型](https://www.cnblogs.com/zhuyeshen/p/11642211.html)
### 数字类的类型
> 这里面的数字是显示宽度，显示宽度并不限制可以在列内保存的值的范围，也不限制超过列的指定宽度的值的显示
> (例如，INT(4))。该可选显示宽度规定用于显示宽度小于指定的列宽度的值时从左侧填满宽度
```tip
当结合可选扩展属性ZEROFILL使用时， 默认补充的空格用零代替。例如，对于声明为INT(5) ZEROFILL的列，值4检索为00004。
```
- TINYINT
1字节，-128～127，无符号0～256
- SMALLINT
2字节，-32768～32767，无符号0～65535
- MEDIUMINT
3字节，-8388608～8388607，无符号0～16777215
- INT, 正常大小的整数，可以带符号，10位数字
4字节，有符号的，它允许的范围是从-2147483648到2147483647。如果是无符号，允许的范围是从0到4294967295
- BIGINT
8字节，有符号-9【19位数字】，无符号1开后20位数字，毫秒级时间戳，13位数字
- FLOAT
单精度，4个字节，FLOAT(7,4)的一个列可以显示为-999.9999，存值时进行四舍五入，因此如果在FLOAT(7,4)列内插入999.00009，近似结果是999.0001
- DOUBLE
双精度，8个字节
- DECIMAL和NUMERIC类型在MySQL中视为相同的类型，保存必须为确切精度的值，例如货币数据
salary DECIMAL(5,2)，，5是精度，2是标度。精度表示保存值的主要位数，标度表示小数点后面可以保存的位数，在这种情况下可以保存在salary列的值的范围是从-999.99到999.99

### 日期类型
- DATETIME
当你需要同时包含日期和时间信息的值时则使用DATETIME类型。MySQL以'YYYY-MM-DD HH:MM:SS'格式检索和显示DATETIME值

- DATE
当你只需要日期值而不需要时间部分时应使用DATE类型。MySQL用'YYYY-MM-DD'格式检索和显示DATE值

- TIMESTAMP
TIMESTAMP列类型的属性不固定，取决于MySQL版本和服务器运行的SQL模式


### 字符类型
> 对于CHAR, VARCHAR, TEXT字符类型，长度的单位是字符；
> 对于BINARY,VARBINARY,BLOD二进制字符，长度单位是字节；
- CHAR
以长度为1到255之间，固定长度的字符串，性能更高，但是可能浪费存储，eg："ab"在CHAR(4)中也是占据4个字节
- VARCHAR
	+ 长度可以指定为0到65,535之间的值，mysql5以上100就代表100个汉字，字母
	+ (VARCHAR的最大有效长度由最大行大小和使用的字符集确定。整体最大长度是65,532字节），
	+ 可变长度的字符串，在innoDB引擎中建议使用，
	+ eg："ab"在VARCHAR(4)中占据2个字节；
	+ VARCHAR值保存时只保存需要的字符数，另加一个字节来记录长度(如果列声明的长度超过255，则使用两个字节)
- BINARY和VARBINARY，类类似于CHAR和VARCHAR，不同的是它们包含二进制字符串而不要非二进制字符串
- BLOB是，一个二进制大对象，可以容纳可变数量的数据
	+ TINYBLOB，用255个字符
	+ BLOB，大长度是65535个字符
	+ MEDIUMBLOB，16777215字符
	+ LONGBLOB，4294967295字符
- TEXT
	+ TINYTEXT，用255个字符
	+ TEXT，只能保存字符数据，，大长度是65535个字符
	+ MEDIUMTEXT，16777215字符
	+ LONGTEXT，4294967295字符
- ENUM，ENUM的列('one'，'two'，'three')=》NULL，“，one，two，three。枚举最多可以有65,535个元素
ENUM是一个字符串对象，其值来自表创建时在列规定中显式枚举的一列
- SET类型，也是枚举，但是可以是多个，多选，区别是没得NULL，SET最多可以有64个不同的成员

## 表的设计要点
- 避免过多冗余字段
比如把收获地址写到订单表中，有可能很多重复数据，最好放在用户表中，这样订单表中只需要用户id就可以了
- 避免太多空值
比如在图书表中增加一列评论，但是实际不可能每本书都有评论，就会造成很多空值。此时可以新建一个BOOK_REVIEW表，只保存有值的图书

### 两种类型的表
- 简单表，就是一般的表
- 关联表，简单表之间是多对多时，抽出关联

## mysql权限管理
> 一般来说，root用户只做管理，而每个网站都应该有自己的账户，密码

### 最少权限原则
权限应该到能满足运行条件就行了

### 权限命令
- GRANT 授权
- REVOKE 取消授权

### 权限级别
- 全局
- 数据库
- 表
- 列
- 存储过程
- 代理用户

### 权限命令
```shell
> CREATE USER user_info IDENTIFIED BY [PASSWORD] password | IDENTIFIED WITH [auth_plugin] [AS auth_string] # 创建用户
eg: 创建用户neil，密码为123456,允许在任何远程主机上登录MySQL
> CREATE USER 'neil'@'%' IDENTIFIED BY '123456'
eg: 创建用户neil，密码为123456,允许在主机192.168.1.10上登录MySQL
> CREATE USER 'neil'@'192.168.1.10' IDENTIFIED BY '123456'
eg: 创建用户neil，密码为空, 允许在任何远程主机上登录MySQL
CREATE USER 'neil'
```

### 查询mysql用户命令
```shell
> select user,host from mysql.user;
```

### GRANT命令
- 设置权限
- 指定列权限
- 指定数据库或表权限
- 指定SSL
- WITH GRANT OPTION 允许向其他人授权
- 可以限制每一个用户每小时执行查询的次数
```shell
# 普通数据用户
grant select on testdb.* to common_user@'%' # testdb.* 表示testdb数据库的所有表
grant insert on testdb.* to common_user@'%' # *.* 表示所有数据库
grant update on testdb.* to common_user@'%' # common_user表示用户名
grant delete on testdb.* to common_user@'%' # %表示允许所有的访问地址
grant select, insert, update, delete on testdb.* to common_user@'%' # 以上合一写法

# 数据库开发人员，创建表，索引，试图，存储过程，函数等权限
grant create on testdb.* to developer@'192.168.0.%';
grant alter on testdb.* to developer@'192.168.0.%';
grant drop on testdb.* to developer@'192.168.0.%';
grant references on testdb.* to developer@'192.168.0.%';
grant create temporary tables on testdb.* to developer@'192.168.0.%';
grant index on testdb.* to developer@'192.168.0.%';
grant create view on testdb.* to developer@'192.168.0.%';
grant show view on testdb.* to developer@'192.168.0.%';
grant create routine on testdb.* to developer@'192.168.0.%'; -- now, can show procedure status
grant alter routine on testdb.* to developer@'192.168.0.%'; -- now, you can drop a procedure
grant execute on testdb.* to developer@'192.168.0.%';
grant all privileges on testdb to dba@'localhost'
```
- [grant命令 完整版本](https://www.runoob.com/note/19873)

### 没有权限的命令
```shell
grant usage on tpshop.* [...]
```

### 权限的六张表
- mysql.user
- mysql.db
- mysql.host
- mysql.tables_pril
- mysql.cloumns_priv
- mysql.procs_priv

### revoke命令
- revoke 跟 grant 的语法差不多，只需要把关键字 to 换成 from 即可

## 数据库命令
```shell
> show databases; # 显示数据库
> show tables; # 显示表
> describle db.tables; # 显示表
```

## 常用命令
```shell
> mysql -h hostname -u root -p # 登录mysql, 执行后输入密码，就可以连接成功

mysql> create database dbname; # 创建数据库
```

## 创建索引
> 当需要对不是主键某个列多次查询时，可以创建索引提升性能
```shell
> CREATE INDEX index_sno on book1(sno); # 默认升序
```


## 操作数据库
> DDL就是数据定义语言（创建表的时候就是）
> DML数据操作语言（存储和读取数据）

### 插入
```shell
INSERT INTO customer VALUES (NULL, 'age', 18)
INSERT INTO customer(id, age) VALUES (NULL, 'age', 18)
```

### 查询
```shell
SELECT * from tb1,tb2 where tb1.id == tb2.tb1_id; # 相当于INNER JOIN，笛卡尔积，FULL JOIN
SELECT * from tb1,tb2,tb3 where tb1.id == tb2.id AND tb1.id == tb3.id;
```

### 找到不匹配的数据行
- 左连接，即支持ON，也支持USING
- 右连接
- USING语法连接两表，两个表都必须有同名的属性

### 子查询
- 嵌套在一个查询内部的查询，在某些情况下，可能比连接和临时表更具阅读性
- 可以作为查询条件

## 表引擎
> 也叫做数据引擎，支持大量不同引擎，每个表
- InnoDB，支持事务，外键，行锁，基本都用
- MyISAM，不支持事务，外键，使用表锁，可以压缩，全文搜索，低级别读和只读性能好
- Memory(HEAP)，内存中，速度快，容易崩。临时表或视图可以用
- MERGE，合并多个MyISAM
- ARCHIVE，存大型数据
- CSV，文件形式存储

## 外键的几种模式
- restrict 可以不允许父表删除
- cascade 父表更新，子表更新
- set null
- set default
- no action
- [详细外键模式](https://blog.csdn.net/weixin_39524183/article/details/111767161)