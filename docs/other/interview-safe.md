---
title: Web安全
date: '2021-11-16'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - 安全
publish: true
---

## 前端安全问题

1.前端有哪些攻击方式？

2.什么是XSS攻击？XSS攻击有几种类型？如果防范XSS攻击？

3.什么是CSRF攻击？如何防范CSRF攻击

4.如何检测网站是否安全？

## 1. XSS攻击

XSS(Cross-Site Scripting，跨站脚本攻击)是一种代码注入攻击。攻击者在目标网站上注入恶意代码，当被攻击者登陆网站时就会执行这些恶意代码，这些脚本可以读取 cookie，session tokens，或者其它敏感的网站信息，对用户进行钓鱼欺诈，甚至发起蠕虫攻击等。
XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。由于直接在用户的终端执行，恶意代码能够直接获取用户的信息，利用这些信息冒充用户向网站发起攻击者定义的请求。

**防御办法**

1.使用通用 XSS 攻击字串手动检测 XSS 漏洞

如: jaVasCript:/*-/*`/*\`/*'/*"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\x3csVg/<sVg/oNloAd=alert()//>\x3e
能够检测到存在于 HTML 属性、HTML 文字内容、HTML 注释、跳转链接、内联 JavaScript 字符串、内联 CSS 样式表等多种上下文中的 XSS 漏洞，也能检测 eval()、setTimeout()、setInterval()、Function()、innerHTML、document.write() 等 DOM 型 XSS 漏洞，并且能绕过一些 XSS 过滤器。
<img src=1 onerror=alert(1)>

2.使用第三方工具进行扫描

## 2. CSRF

CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

典型的CSRF攻击流程：

1. 受害者登录A站点，并保留了登录凭证（Cookie）。
2. 攻击者诱导受害者访问了站点B。
3. 站点B向站点A发送了一个请求，浏览器会默认携带站点A的Cookie信息。
4. 站点A接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是无辜的受害者发送的请求。
5. 站点A以受害者的名义执行了站点B的请求。
6. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者完成了攻击。

*CSRF的特点*

1. 攻击通常在第三方网站发起，如图上的站点B，站点A无法防止攻击发生。
2. 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；并不会去获取cookie信息(cookie有同源策略)
3. 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等(来源不明的链接，不要点击) 

*CSRF 攻击防御*

1. 添加验证码(体验不好)

验证码能够防御CSRF攻击，但是我们不可能每一次交互都需要验证码，否则用户的体验会非常差，但是我们可以在转账，交易等操作时，增加验证码，确保我们的账户安全。

2. 判断请求的来源：检测Referer(并不安全，Referer可以被更改)

3. 使用Token(主流)

4. Samesite Cookie属性
5. 
为了从源头上解决这个问题，Google起草了一份草案来改进HTTP协议，为Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站 Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax。
部署简单，并能有效防御CSRF攻击，但是存在兼容性问题。

Samesite=Strict

Samesite=Strict 被称为是严格模式,表明这个 Cookie 在任何情况都不可能作为第三方的 Cookie，有能力阻止所有CSRF攻击。此时，我们在B站点下发起对A站点的任何请求，A站点的 Cookie 都不会包含在cookie请求头中。

## 3. 点击劫持
> 是视觉欺骗，把需要骗取的网站放到自己网站的iframe中，弄个透明的遮罩之类的盖住它，然后诱导用户点击
点击劫持是指在一个Web页面中隐藏了一个透明的iframe，用外层假页面诱导用户点击，实际上是在隐藏的frame上触发了点击事件进行一些用户不知情的操作。
:::tip
使用X-FRAME-OPTIONS响应头解决
- DENY，表示页面不允许通过 iframe 的方式展示
- SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
- ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示
:::

## 4. 安全扫描工具
1. Arachni
2. Mozilla HTTP Observatory
3. w3af