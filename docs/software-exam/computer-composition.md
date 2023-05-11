---
title: 计算机网络概述
date: '2022-09-14'
sidebar: 'auto'
categories:
 - 软考
tags:
 - 计算机系统,计算机体系,安全可靠性
publish: true
---
## 计算机系统
由硬件系统和软件系统组成

## 基本硬件系统，五部分
- 运算器，CPU组成
- 控制器，CPU组成
- 存储器
- 输入设备
- 输出设备

## 中央处理单元CPU（Central Processing Unit）
> 获取程序指令，对指令进行译码，并加以执行
### 组成
- 运算器
- 控制器
- 寄存器组
- 内部总线

### 中央处理单元功能
- 程序控制，控制程序的执行顺序
- 操作控制，操作信号送往对应部件，控制部件执行
- 时间控制，对操作进行时间控制
- 数据处理，对数据进行算术运算和逻辑运算，对数据进行加工

### 运算器组成
- 算数逻辑单元ALU（Airthmetic and Login Unit），实现数据的算术和逻辑运算
- 累加寄存器AC（Accumulate），运算结果或源操作数的存放区
- 数据缓冲器寄存器DR（Data Register）, 暂时存放由内存储器读出的一条指令或一个数据字
- 状态条件寄存器PSW（Program Status Word），保存指令运行结果的条件码内容，如溢出标志等组成

### 运算器功能
- 执行所有算术运算，加减乘除等
- 执行逻辑运算，与或非比较

### 控制器（CPU中最重要的）
#### 组成
- 指令寄存器IR（Instruction Register），暂存CPU执行指令，当执行一条指令时，先把它从内存取到数据寄存器（DR）中，然后再传送至IR
- 程序计数器PC（program counter），存放指令执行地址，很重要，保证下一次执行什么
- 地址寄存器AR（Address Register），保存当前CPU所访问的内存地址
- 指令译码器ID（Instruction Decoder），分析指令操作码

#### 功能
- 控制整个CPU的工作，程序控制，时序控制

## 数据表示
- 原码
- 反码
- 补码
- 移码

## 浮点数
N = F * 2^E , F是尾数（纯小数），E是阶数（纯整数），0.10111 * 2^3
> 数值范围由阶码确定，数值精度由尾数确定

### 尾数的表示采用规格化方法
> 负数尾数，1.0xxxx，正数尾数，0.1xxxx

### 浮点数运算
- 对阶，是两个数阶码相同，小阶向大阶看齐
- 尾数计算，如果是减法，就加负数
- 结果规格化

### 校验码
> 主要用来对编码进行检错和纠错
- 码距，从A码转变到B码之间，需要改变的位数，单个编码的码距为1，因为只需要改变一位，码距越大，越利于纠错和检错
- 奇偶校验码，在编码中增加1位校验码来使编码中1的个数为奇数（奇校验）或者偶数（偶校验），从而使码距变成2【只能检1位错，无法纠错】
- 奇校验，接收方收到编码后，判断编码里面1的个数是不是奇数，如果是就没问题，否则就有问题
- 偶校验，和奇校验相反

#### 循环冗余检验码（CRC）Cylic Redundancy Check
> 只能检错，不能纠错，可以检多位
格式：数据位 + 校验码
- 原始报文,11001010101 不能直接参与运算，要在后面补上多项式的位数-1个0，现在是11001010101 0000，被除数
- 生成的多项式，x^4 + X^3 + x + 1 ==》 11011，除数，模二运算，一直上1。就是0-1等于1，但是不会向前借位
- 求CRC编码后结果，最后的余数就是结果，然后数据就是 11001010101  0011
- 接收方用 11001010101  0011 除以 多项式 11011，可以整除，就说明正确


#### 海明校验码（可以纠错和检错）
> 本质也是利用奇偶性来检错和纠错，在数据位之间插入k个校验位，校验位在2的n次方位。从1开始
重点： n是数据位，校验位是k，则2^k - 1 >= n+k。是插如原数据里面，形成编码。比如1011 --》 101r1rr
> 校验位的计算，信息位的位置拆分位校验位的位置相加，7 = 4 + 2 + 1，第四位校验码就等于拆分出来有4的的信息位异或值