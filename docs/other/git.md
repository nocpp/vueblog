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

## git 分支原理
- HEAD 指针，指向当前所在分支
- 分支名称 指针，指向的是最新的commit
- checkout testing 就是把HEAD指向testing分支
- 当提交新的commit时，分支指针会自动指向最新的提交
> 所以创建分支，就是创建一个分支指针，指向当前分支最新的commit

## git merge和rebase
- [merge 和 rebase](https://www.jianshu.com/p/fbf46dd9e71d)

## git pull 和 fetch 的区别
- 借助pull命令就可以将远程仓库中的代码更新到本地的仓库中了
- pull和fetch的区别，pull实现了一个合并的功能，等于fetch+merge
- pull和clone的区别，pull实现了更新，而clone实现的是从无到有的建立

## git 快照的理解
> 每次commit，都会生成变化了的文件的snapshot，在.git/object下，记录了变化的整个文件，所以在commit的时候比其它版本控制系统更快，并且由于git gc的存在，会把多余的bolb变成类似其它SVC的记录本法，记录文件的差异。这也是git更快的优势之一
- https://www.zhihu.com/question/27680108/answer/536099893

## git内部原理
- [内部原理](https://git-scm.com/book/zh/v2/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-Git-%E5%AF%B9%E8%B1%A1)

## 查看分支创建者，创建时间
- git reflog show date=iso branchname

## git refs
> 引用是一种对于提交的间接引用方式。你可以认为这是一种用户友好的哈希串别名。这其实也是Git表示分支和tag的内部机制。
> 引用的描述会以普通文件的形式存储在.git/refs目录下。为了更加详细的了解引用描述，可以进入.git/refs目录。你大概会看到一个类似下面结构的文件夹结构，当然由于你项目的仓库、分支、tag以及远程仓库不同，具体输出也会与下面不一样。
- [refs](https://zhuanlan.zhihu.com/p/521722781)