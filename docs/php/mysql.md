---
title: Mysql相关问题
date: '2022-11-05'
sidebar: 'auto'
categories:
 - react
tags:
 - react
publish: true
---


## mysql初次安装后设置密码
- [设置账号密码](https://developer.aliyun.com/article/1003260)
- alter user'root'@'localhost' IDENTIFIED BY 'zll@123456';
- 配置的目录
> /opt/homebrew/etc/my.cnf


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
- INT, 正常大小的整数，可以带符号
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
- SET类型，也是美剧，但是可以是多个，多选，区别是没得NULL，SET最多可以有64个不同的成员