---
title: GulpJS
date: '2023-09-15'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - webAssembly
publish: true
---

# GulpJS

## GulpJS是什么？
基于NodeJS的一个自动化构建工具

## 作用？
gulp 将开发流程中让人痛苦或耗时的任务自动化，从而减少你所浪费的时间、创造更大价值。
- 代码转换：将 TypeScript 编译成JavaScript、将 SCSS 编译成 CSS等；
- 文件优化：压缩JavaScript、CSS、HTML 代码，压缩合并图片等；
- 代码分割：提取多个页面的公共代码，提取首屏不需要执行部分代码让其异步加载；
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要通过构建功能将模块分类合并成一个文件；
- 自动刷新：监听本地源代码变化，自动重新构建、刷新浏览器；
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过；
- 自动发布：更新代码后，自动构建出线上发布代码并传输给发布系统。
> 常见的构建工具有：Npm、Grunt、Gulp、Fis 3、Webpack、Rollup等

## 优势
- 简单，代码优于配置、node 最佳实践、精简的 API 集
- 高效，基于 node 强大的流(stream)能力，gulp 在构建过程中并不把文件立即写入磁盘，从而提高了构建速度。
- 生态，插件丰富

## 入门概念
### 任务
> 每个 gulp 任务（task）都是一个异步的 JavaScript 函数，此函数是一个可以接收 callback 作为参数的函数，或者是一个返回 stream、promise、event emitter、child process 或 observable (后面会详细讲解) 类型值的函数。
- 公开任务（Public tasks） 从 gulpfile 中被导出（export），可以通过 gulp 命令直接调用。
- 私有任务（Private tasks） 被设计为在内部使用，通常作为 series() 或 parallel() 组合的组成部分。
> 当使用 series() 组合多个任务（task）时，任何一个任务（task）的错误将导致整个任务组合结束，并且不会进一步执行其他任务。当使用 parallel() 组合多个任务（task）时，一个任务的错误将结束整个任务组合的结束，但是其他并行的任务（task）可能会执行完，也可能没有执行完。并且需要有结果，不然会输出警告。

### 组合任务
- series：让任务（task）按顺序执行
- parallel：并发来运行的任务（tasks）

## 常用API
- src：读取文件
- dest：输出文件
- watch：检测文件

## 常用插件
- gulp-rename：文件重命名
- gulp-livereload：热加载
- gulp-inject：给html注入JS，CSS，webcomponent
- gulp-stylus：编译stylus
- gulp-uglify：压缩JS
- gulp-clean：删除指定目录文件
- gulp-if：条件运行任务
- [其他](https://gulpjs.com/plugins/)

## 实际用途
- 压缩图片小工具