(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{513:function(e,t,_){"use strict";_.r(t);var v=_(2),i=Object(v.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"前端安全问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前端安全问题"}},[e._v("#")]),e._v(" 前端安全问题")]),e._v(" "),t("ol",[t("li",[e._v("前端有哪些攻击方式？")]),e._v(" "),t("li",[e._v("什么是XSS攻击？XSS攻击有几种类型？如果防范XSS攻击？")]),e._v(" "),t("li",[e._v("什么是CSRF攻击？如何防范CSRF攻击")]),e._v(" "),t("li",[e._v("如何检测网站是否安全？")])]),e._v(" "),t("h2",{attrs:{id:"_1-xss攻击"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-xss攻击"}},[e._v("#")]),e._v(" 1. XSS攻击")]),e._v(" "),t("blockquote",[t("p",[e._v("XSS(Cross-Site Scripting，跨站脚本攻击)是一种代码注入攻击。攻击者在目标网站上注入恶意代码，当被攻击者登陆网站时就会执行这些恶意代码，这些脚本可以读取 cookie，session tokens，或者其它敏感的网站信息，对用户进行钓鱼欺诈，甚至发起蠕虫攻击等。")])]),e._v(" "),t("blockquote",[t("p",[e._v("XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。由于直接在用户的终端执行，恶意代码能够直接获取用户的信息，利用这些信息冒充用户向网站发起攻击者定义的请求。")])]),e._v(" "),t("h3",{attrs:{id:"开发遇到的实际情况"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开发遇到的实际情况"}},[e._v("#")]),e._v(" 开发遇到的实际情况")]),e._v(" "),t("p",[e._v("用户在意见反馈，用户名等地方提交恶意代码，如果没做处理的话，后台在查看这个文本的时候，就会执行他的脚本，将用户的所有存储信息和网址发送给他，这样他可以利用用户信息进入到后台")]),e._v(" "),t("h3",{attrs:{id:"防御办法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#防御办法"}},[e._v("#")]),e._v(" 防御办法")]),e._v(" "),t("p",[e._v("1.前端在使用html或者富文本的地方，将利用xss防范库将xss攻击相关字段替换为实体符。还有就是尽量避免直接使用innerHTML\n2.后端在存储用户提交文本的时候，过滤掉xss相关字符")]),e._v(" "),t("h2",{attrs:{id:"_2-csrf"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-csrf"}},[e._v("#")]),e._v(" 2. CSRF")]),e._v(" "),t("p",[e._v("CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。")]),e._v(" "),t("p",[e._v("典型的CSRF攻击流程：")]),e._v(" "),t("ol",[t("li",[e._v("受害者登录A站点，并保留了登录凭证（Cookie）。")]),e._v(" "),t("li",[e._v("攻击者诱导受害者访问了站点B。")]),e._v(" "),t("li",[e._v("站点B向站点A发送了一个请求，浏览器会默认携带站点A的Cookie信息。")]),e._v(" "),t("li",[e._v("站点A接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是无辜的受害者发送的请求。")]),e._v(" "),t("li",[e._v("站点A以受害者的名义执行了站点B的请求。")]),e._v(" "),t("li",[e._v("攻击完成，攻击者在受害者不知情的情况下，冒充受害者完成了攻击。")])]),e._v(" "),t("p",[t("em",[e._v("CSRF的特点")])]),e._v(" "),t("ol",[t("li",[e._v("攻击通常在第三方网站发起，如图上的站点B，站点A无法防止攻击发生。")]),e._v(" "),t("li",[e._v("攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；并不会去获取cookie信息(cookie有同源策略)")]),e._v(" "),t("li",[e._v("跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等(来源不明的链接，不要点击)")])]),e._v(" "),t("p",[t("em",[e._v("CSRF 攻击防御")])]),e._v(" "),t("ol",[t("li",[e._v("添加验证码(体验不好)")])]),e._v(" "),t("p",[e._v("验证码能够防御CSRF攻击，但是我们不可能每一次交互都需要验证码，否则用户的体验会非常差，但是我们可以在转账，交易等操作时，增加验证码，确保我们的账户安全。")]),e._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[t("p",[e._v("判断请求的来源：检测Referer(并不安全，Referer可以被更改)")])]),e._v(" "),t("li",[t("p",[e._v("使用Token(主流)")])]),e._v(" "),t("li",[t("p",[e._v("Samesite Cookie属性")])]),e._v(" "),t("li",[t("p",[e._v("为了从源头上解决这个问题，Google起草了一份草案来改进HTTP协议，为Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站 Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax。部署简单，并能有效防御CSRF攻击，但是存在兼容性问题。")])])]),e._v(" "),t("p",[e._v("Samesite=Strict")]),e._v(" "),t("p",[e._v("Samesite=Strict 被称为是严格模式,表明这个 Cookie 在任何情况都不可能作为第三方的 Cookie，有能力阻止所有CSRF攻击。此时，我们在B站点下发起对A站点的任何请求，A站点的 Cookie 都不会包含在cookie请求头中。")]),e._v(" "),t("h2",{attrs:{id:"_3-点击劫持"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-点击劫持"}},[e._v("#")]),e._v(" 3. 点击劫持")]),e._v(" "),t("blockquote",[t("p",[e._v("是视觉欺骗，把需要骗取的网站放到自己网站的iframe中，弄个透明的遮罩之类的盖住它，然后诱导用户点击\n点击劫持是指在一个Web页面中隐藏了一个透明的iframe，用外层假页面诱导用户点击，实际上是在隐藏的frame上触发了点击事件进行一些用户不知情的操作。")])]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[e._v("使用X-FRAME-OPTIONS响应头解决")]),e._v(" "),t("ul",[t("li",[e._v("DENY，表示页面不允许通过 iframe 的方式展示")]),e._v(" "),t("li",[e._v("SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示")]),e._v(" "),t("li",[e._v("ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示")])])]),t("h2",{attrs:{id:"_4-安全扫描工具"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-安全扫描工具"}},[e._v("#")]),e._v(" 4. 安全扫描工具")]),e._v(" "),t("ol",[t("li",[e._v("Arachni")]),e._v(" "),t("li",[e._v("Mozilla HTTP Observatory")]),e._v(" "),t("li",[e._v("w3af")])]),e._v(" "),t("h2",{attrs:{id:"cookie安全"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cookie安全"}},[e._v("#")]),e._v(" Cookie安全")]),e._v(" "),t("blockquote",[t("p",[e._v("场景：用户使用iframe嵌入了我们网页，在我们网页中使用Cookie存储token，在发送接口请求时，从Cookie中获取token并传递。但是由于同源限制，我们的网页无法设置Cookie。")])]),e._v(" "),t("blockquote",[t("p",[e._v("需要在设置Cookie的代码中加上SameSite: None;Secure。必须要Secure才能生效，并且设置好https与http不能相容")])])])}),[],!1,null,null,null);t.default=i.exports}}]);