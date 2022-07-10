---
title: React常见问题
date: '2022-07-11'
sidebar: 'auto'
categories:
 - react
tags:
 - react
publish: true
---

## 页面切换时，出现can't change state after component unmount之类的错误
> 原因：比如，一个请求三秒钟，页面发出请求后，马上切换页面，此时组件被销毁了，然后请求在3s后返回，此时在请求回调中setData，就会出现这个错误

> 解决办法：异步操作回调修改state时，判断下当前组件的mount状态，确保没被卸载再改state


## useMemo和useCallback关键用法
> 当值作为useEffect依赖项时，如果不是state或者基本类型值，会导致无限刷新，因为对象比对是地址，总是会不同，会更新，如果有useMemo或者useCallback就可以解决这个问题