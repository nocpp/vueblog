---
title: git相关知识
date: '2021-10-09'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - git
publish: true
---

## Git
	工作区-（add）->暂存区-（commit）->版本区-->远程仓库
	关联远程仓库 git remote add/remove origin https://ss.git

## 强制拉取线上最新的，覆盖本地，不进行合并
```git
git fetch --all //只是下载代码到本地，不进行合并操作
git reset --hard origin/master  //把HEAD指向最新下载的版本
```

## git 中 origin是什么意思？
	origin就是远程仓库链接的别名，可以修改为其它名字。origin是git默认的名字，master是其默认分支。没关联远程仓库时，默认指向本地仓库。
```git
git remote -v
```
使用以上git命令可以看到如下输出
```git
origin https://github.com/user1/repository.git (fetch)
origin https://github.com/user1/repository.git (push)
```
```git
git remote add upstream https://github.com/user1/repository.git
```
使用以上git命令可以看到如下输出
```git
origin https://github.com/user2/repository.git (fetch)
origin https://github.com/user2/repository.git (push)
upstream https://github.com/user1/repository.git (push)
upstream https://github.com/user1/repository.git (push)
```
增加了指向user1代码库的upstream