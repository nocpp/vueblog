(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{500:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"webassembly"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#webassembly"}},[s._v("#")]),s._v(" WebAssembly")]),s._v(" "),t("p",[s._v("WebAssembly 是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如 C / C ++等语言提供一个编译目标，以便它们可以在 Web 上运行。它也被设计为可以与 JavaScript 共存，允许两者一起工作。")]),s._v(" "),t("h2",{attrs:{id:"工作原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#工作原理"}},[s._v("#")]),s._v(" 工作原理")]),s._v(" "),t("p",[s._v("工作原理是将高级编程语言（如C、C++、Rust、Golang等）编译为WebAssembly字节码，再通过WebAssembly的解释器或者即时编译器，将字节码转换为机器码，最终在浏览器上执行")]),s._v(" "),t("h2",{attrs:{id:"优点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#优点"}},[s._v("#")]),s._v(" 优点")]),s._v(" "),t("ul",[t("li",[s._v("高效性：浏览器运行时只需要加载编译成的字节码，以浏览器可以识别的二进制格式传输")]),s._v(" "),t("li",[s._v("高性能：由于WebAssembly是一种低级字节码，可以直接被机器执行，因此在执行性能上要优于JavaScript")]),s._v(" "),t("li",[s._v("加载快：由于文件体积小，再加上无需解释运行，WebAssembly 能够更快的加载实例化，减少运行等待时间")]),s._v(" "),t("li",[s._v("可移植性：可以将webassembly移植到其他平台。这意味着，如果用编译为webAssembly的语言编写软件，就能够在.NET上运行它。它允许我们重用Web上现有的JavaScript基础结构")]),s._v(" "),t("li",[s._v("安全性：可以放hash和签名等，同时在 Wasm 运行时中运行的代码是内存沙盒和功能受限的，这意味着它仅限于执行明确允许执行的操作")])]),s._v(" "),t("h2",{attrs:{id:"应用场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[s._v("#")]),s._v(" 应用场景")]),s._v(" "),t("ul",[t("li",[s._v("游戏：WebAssembly可以用于在浏览器中运行复杂的游戏，实现比较高效的游戏渲染。")]),s._v(" "),t("li",[s._v("图形处理：WebAssembly可以用于在浏览器中进行图像处理、视频处理等复杂的图形处理任务。")]),s._v(" "),t("li",[s._v("数据分析：WebAssembly可以用于在浏览器中进行大规模数据分析，提高数据分析的性能。")]),s._v(" "),t("li",[s._v("应用迁移：WebAssembly可以用于将现有的桌面应用迁移到Web平台上，实现跨平台的应用。")]),s._v(" "),t("li",[s._v("库的移植：WebAssembly可以用于将现有的库移植到Web平台上，使得这些库可以在浏览器中运行。")]),s._v(" "),t("li",[s._v("安全相关：可以应用于前端参数加密")])]),s._v(" "),t("h2",{attrs:{id:"应用实例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#应用实例"}},[s._v("#")]),s._v(" 应用实例")]),s._v(" "),t("ul",[t("li",[s._v("使用Go语言打包生成wasm，前端使用JS调用进行加密")]),s._v(" "),t("li",[s._v("与纯JS加密进行对比")])]),s._v(" "),t("h3",{attrs:{id:"操作步骤"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#操作步骤"}},[s._v("#")]),s._v(" 操作步骤")]),s._v(" "),t("ol",[t("li",[s._v("编写Go语言代码")]),s._v(" "),t("li",[s._v("绑定到JS层面")]),s._v(" "),t("li",[s._v("使用打包命令生成wasm")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("GOOS")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("js "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("GOARCH")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("wasm go build "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-o")]),s._v(" main.wasm main.go\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ol",{attrs:{start:"4"}},[t("li",[s._v("在JS中加在wasm_exec.js和wasm，调用Go模块的函数")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" go "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Go")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" importObject "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" go"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("importObject\nWebAssembly"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("instantiateStreaming")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("fetch")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'main.wasm'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" importObject"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("then")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("result")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    go"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("run")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("result"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("instance"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("handleClick")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'qxdlog: '")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("DecryptByAes")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2A9TwbKn00vZFI4semM0\\/Rv9Nhq4htGO+jRam1grANGgAr1cyycifprI319h7d3Z3UnULUmZ87f2X+K01kOaCk4ObwEZMFyvtfsaXviTgLeSMdqepThw10TvXhy6d8Di\\/V0qGHA32cB\\/FkiBB3a0v12+ALQLJN68F++7PuIuL0mz6Xk\\/Hz6F+Y74RvVdFHYGxh9o7npDoRHDaaUKYMf64PEtkMeEJs9Ubar+w3kXZrqMdBZ6PftE27ttfkTWai1ATgNQNRSUzrnaHgrgssChKfXA3wMsgkwuw0QjL2V5I5bWCZ\\/Xmd9Kl05XQBqv85DfaTNQkIktW\\/20zcYWhFyh\\/dae0kLLJYt1BXEGcNh67TYhj4nxG0v0utoYG1X9pODg172sKXU1lQoBDnxWwuDpYbix5uPpLfwx1YdBbM8\\/WsQEBxetFz0QAp46Llj2rW94Pvt40Sv0niZ2QL5tMC0vd4uwvbJz9f5j8YFAHBeVBnXva97g+FS+Jh\\/EMLylnhcWavoR+20LX40kNXcvR6sBZxDHCCgAMn+zCVp\\/QdIAS9rqPQMAwCOtpzlb11DLMdVNnk0SVyp2dpR2bDc7fTshIhjYjmGQXbRxaxZrFyreiTR\\/q1VkjkuhlOzfG0OzDjzy\\/Yx\\/MMoNI3wu+W4U1O8ZTUjrwgb9\\/pDANBGSV\\/LTDP2RIs4qYbAA8U1TeNzNad0cY0kiJ2QmXQQS8+MKSr3WR2RDtQ\\/Z\\/4IF61ljO5ADxhMn3Wj\\/GkCiOTXd3jkK0b3QDylQHtL8PVX+WaHQgE6U5TuMRrnqTcsB3VAt0wFjgAspqS+FyzAPhIjKI5ntNo7q"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);