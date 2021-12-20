---
title: Webpack知识
date: '2021-11-16'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - webpack
publish: true
---

## webpack的基础知识
### webpack 是什么？
webpack 是一个现代 JavaScript 应用程序的静态模块打包器，当 webpack 处理应用程序时，会递归构建一个依赖关系图，
其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle。

### webpack 的核心概念
- entry: 入口
- output: 输出
- loader: 模块转换器，用于把模块原内容按照需求转换成新内容
- 插件(plugins): 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

## 配置优化

- 减少 resolve 的解析
- 把 loader 应用的文件范围缩小
- 减少 plugin 的消耗 区分mode
- 选择合适的 devtool,
开发环境推荐：
cheap-module-eval-source-map
生产环境推荐：
cheap-module-source-map

- 使用工具
thread-loader 是官方提供的一个可以利用多进程加速 loader 执行的 loader，如果项目中 loader 的运行处理占用比较多的时间，例如 babel 或者 typescript 解析和编译的代码量很大，或者 image—webpack-loader 处理图片耗时比较久，那么可以尝试使用 thread-loader 来提速。

## npx命令
npm 从5.2版开始，增加了 npx 命令。
npx 想要解决的主要问题，就是调用项目内部安装的模块。
下面两条语句是一样的效果
```js
$ node-modules/.bin/mocha --version
$ npx mocha --version
```
npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。

## package.json 中 scripts 快速执行
```js
  "scripts": {
    "build": "webpack"
  }
```

**main属性的作用**
解析相对路径
    查找相对当前模块的路径下是否有对应文件或文件夹
    是文件则直接加载
    是文件夹则继续查找文件夹下的 package.json 文件
    有 package.json 文件则按照文件中 main 字段的文件名来查找文件
    无 package.json 或者无 main 字段则查找 index.js 文件

## webpack.config.js

**entry两种写法**
>如上图所示，在多个代码模块中会有一个起始的 .js 文件，这个便是 webpack 构建的入口，即 entry。
>webpack 会读取这个文件，并从它开始解析依赖，在内部构件一个依赖图，这个依赖图会引用项目中使用到的各个模块，
>然后进行打包，生成一个或者多个 bundle 文件。

默认配置'./src/index.js'
```js
    entry: {
        main: './src/index.js'
    },
    
    entry: './src/index.js',
    
    //动态entry,应用于多页面
    const pagesRoot = path.resolve(__dirname, './src/pages');
    const entries = fs.readdirSync(pagesRoot).reduce((entries, page) => {
        entries[page] = path.resolve(pagesRoot, page);
        return entries;
    }, {});
    entry: entries
```

**output配置方式**
>webpack 的输出即指 webpack 最终构建出来的静态文件，可以看看上面 webpack 官方图片右侧的那些文件。

默认配置是'./dist/main.js''
```js
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'), //dist前面千万别写成'/dsit',这样不行，可以写相对路径'./dist'
  },
  
  output: {
    filename: '[name].js', // 使用 [name] 来引用 entry 名称，在这里即为 main
    path: path.join(__dirname, '/dist/[hash]'),
    // 路径中使用 hash，每次构建时会有一个不同 hash 值，可以用于避免发布新版本时浏览器缓存导致代码没有更新
    // 文件名中也可以使用 hash
  },
```

**loader**
我们在前端构建中会遇见需要使用各式各样的文件，例如 css 代码，图片，模板代码等。
webpack 中提供一种处理多种文件格式的机制，便是使用 loader。我们可以把 loader 理解为是一个转换器
，负责把某种文件格式的内容转换成 webpack 可以支持打包的模块。

举个例子，在没有添加额外插件的情况下，webpack 会默认把所有依赖打包成 js 文件，
如果入口文件依赖一个 .hbs 的模板文件以及一个 .css 的样式文件，那么我们需要 handlebars-loader 来处理 .hbs 文件，
需要 css-loader 来处理 .css 文件（这里其实还需要 style-loader，后续详解），
最终把不同格式的文件都解析成 js 代码，以便打包后在浏览器中运行。
```js
module: {
  // ...
  rules: [
    {
      test: /\.jsx?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
      include: [    //配置include和exclude字段可以提升打包速度
        path.resolve(__dirname, 'src') // 指定哪些路径下的文件需要经过 loader 处理
      ],
      use: { // 指定使用的 loader
        loader: 'babel-loader', // babel-loader 可以使用 babel 来将 ES6 代码转译为浏览器可以执行的的 ES5 代码
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
  ],
}

```

### 用到的loader
- babel-loader, @babel/core, @babel/preset-env (ES6 -> ES5)
```js
    {
        test: /\.js$/i,
        include: [
            path.resolve(__dirname, 'src')
        ],
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }
```
- css-loader, style-loader (处理css文件，解析css代码并转为js通过style标签插入)
- less-loader, less (把less转为css)
```js
    {
        test: /\.less$/i,
        include: [
            path.resolve(__dirname, 'src')
        ],
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
        ]
    },
```
- file-loader 可以用于处理很多类型的文件，它的主要作用是直接输出文件，把构建后的文件路径返回
```js
    {
        test: /\.(png|jpe?g|gif)$/,
        include: [
            path.resolve(__dirname, 'src/img')
        ],
        use: {
            loader: 'file-loader',
            options: {
                outputPath: 'img',
                name() {
                    return '[name].[ext]'
                }
            }
        }
    },
```
- url-loader 把图片转成base64
- image-webpack-loader (图片压缩)
- postcss-loader 结合 cssnano 实现css压缩

**plugin**
在 webpack 的构建流程中，plugin 用于处理更多其他的一些构建任务。
可以这么理解，模块代码转换的工作由 loader 来处理，除此之外的其他任何工作都可以交由 plugin 来完成。
比如可以移动文件夹，copy-webpack-plugin，生成css等操作

>插件使用步骤
1. 安装插件 npm install
2. 引用插件 require
3. 在plugins中配置

### 用到的插件
- copy-webpack-plugin (复制文件)
- html-webpack-plugin (生成html并自动插入构建好的js，也可以在配置中提供html模板)
- webpack-dev-server
- mini-css-extract-plugin (单独把css文件分离出来)

**mode**
mode 可以是 development，production，none 其中的一个

这两个模式会使用 DefinePlugin 来将 process.env.NODE_ENV 的值分别设置为 development 和 production，方便开发者在项目业务代码中判断当前构建模式。
production 模式会启用 TerserPlugin 来压缩 JS 代码，让生成的代码文件更小。
development 模式会启用 devtools: 'eval' 配置，提升构建和再构建的速度。

**resolve 配置**
>resolve.alias 给路径定义别名
```js
resolve: {
    //模糊匹配，import('utils/query.js')，会替换
    alias: {
      utils: path.resolve(__dirname, 'src/utils') // 这里使用 path.resolve 和 __dirname 来获取绝对路径
    }
    
    //精确匹配，不会替换，只会替换import('utils')
    alias: {
      utils$: path.resolve(__dirname, 'src/utils') // 只会匹配 import 'utils'
    }
}

```

**resolve.extensions**
我们在引用模块时，其实可以直接这样：
```js
import * as common from './src/utils/common'
```

webpack 会自行补全文件后缀，而这个补全的行为，也是可以配置的。
```js
resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
}
```

**resolve.modules**
前面的内容有提到，对于直接声明依赖名的模块（如 react ），webpack 会类似 Node.js 一样进行路径搜索，
搜索 node_modules 目录，这个目录就是使用 resolve.modules 字段进行配置的，默认就是：
```js
resolve: {
  modules: ['node_modules'],
},
```

如果确定第三方库都在node_modules中，可以如下配置，提升构建速度
```js
resolve: {
  modules: [
    path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
    'node_modules', // 如果有一些类库是放在一些奇怪的地方的，你可以添加自定义的路径或者目录
  ],
},
```

**resolve.mainFields**
有 package.json 文件则按照文件中 main 字段的文件名来查找文件

我们之前有提到这么一句话，其实确切的情况并不是这样的，webpack 的 resolve.mainFields 配置可以进行调整。当引用的是一个模块或者一个目录时，会使用 package.json 文件的哪一个字段下指定的文件，默认的配置是这样的：
```js
resolve: {
  // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
  mainFields: ['browser', 'module', 'main'],

  // target 的值为其他时，mainFields 默认值为：
  mainFields: ["module", "main"],
},
```

**resolve.mainFiles**
当目录下没有 package.json 文件时，我们说会默认使用目录下的 index.js 这个文件，
其实这个也是可以配置的，是的，使用 resolve.mainFiles 字段，默认配置是：
```js
resolve: {
  mainFiles: ['index'], // 你可以添加其他默认使用的文件名
},
```

**resolve.resolveLoader**
这个字段 resolve.resolveLoader 用于配置解析 loader 时的 resolve 配置，原本 resolve 的配置项在这个字段下基本都有。我们看下默认的配置：
基本不改
```js
resolve: {
  resolveLoader: {
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main'],
  },
},
```

## loader 匹配规则
loader 的匹配规则中有两个最关键的因素：一个是匹配条件，一个是匹配规则后的应用。

匹配条件通常都使用请求资源文件的绝对路径来进行匹配，在官方文档中称为 resource，除此之外还有比较少用到的 issuer，则是声明依赖请求的源文件的绝对路径。

举个例子：在 /path/to/app.js 中声明引入 import './src/style.scss'，resource 是「/path/to/src/style.scss」，issuer 是「/path/to/app.js」，规则条件会对这两个值来尝试匹配。

上述代码中的 test 和 include 都用于匹配 resource 路径，是 resource.test 和 resource.include 的简写，你也可以这么配置：
```js
module.exports = {
  // ...
  rules: [ 
      {
        resource: { // resource 的匹配条件
          test: /\.jsx?/, 
          include: [ 
            path.resolve(__dirname, 'src'),
          ],
        },
        // 如果要使用 issuer 匹配，便是 issuer: { test: ... }
        // ...
      },
      // ...
    ], 
}
```

## 规则条件配置
- { test: ... } 匹配特定条件
- { include: ... } 匹配特定路径
- { exclude: ... } 排除特定路径
- { and: [...] }必须匹配数组中所有条件
- { or: [...] } 匹配数组中任意一个条件
- { not: [...] } 排除匹配数组中所有条件

上述的所谓条件的值可以是：

- 字符串：必须以提供的字符串开始，所以是字符串的话，这里我们需要提供绝对路径
- 正则表达式：调用正则的 test 方法来判断匹配
- 函数：(path) => boolean，返回 true 表示匹配
- 数组：至少包含一个条件的数组
- 对象：匹配所有属性值的条件

```js
rules: [
  {
    test: /\.jsx?/, // 正则
    include: [
      path.resolve(__dirname, 'src'), // 字符串，注意是绝对路径
    ], // 数组
    // ...
  },
  {
    resource: {
      test: {
        js: /\.js/,
        jsx: /\.jsx/,
      }, // 对象，不建议使用
      not: [
        (value) => { /* ... */ return true; }, // 函数，通常需要高度自定义时才会使用
      ],
    }
  },
],
```
test/include/exclude 是 resource.(test/include/exclude) 的简写，and/or/not 这些则需要放到 resource 中进行配置。

上述多个配置形式结合起来就能够基本满足各种各样的构建场景了，通常我们会结合使用 test/and 和 include&exclude 来配置条件，如上述那个简单的例子。

## module type
webpack 4.x 版本强化了 module type，即模块类型的概念，不同的模块类型类似于配置了不同的 loader，webpack 会有针对性地进行处理，现阶段实现了以下 5 种模块类型。
```js
{
  test: /\.js/,
  include: [
    path.resolve(__dirname, 'src'),
  ],
  type: 'javascript/esm', // 这里指定模块类型
},
```
- javascript/auto：即 webpack 3 默认的类型，支持现有的各种 JS 代码模块类型 —— CommonJS、AMD、ESM
- javascript/esm：ECMAScript modules，其他模块系统，例如 CommonJS 或者 AMD 等不支持，是 .mjs 文件的默认类型
- javascript/dynamic：CommonJS 和 AMD，排除 ESM
- javascript/json：JSON 格式数据，require 或者 import 都可以引入，是 .json 文件的默认类型
- webassembly/experimental：WebAssembly modules，当前还处于试验阶段，是 .wasm 文件的默认类型

## 使用 loader 配置
```js
rules: [
  {
    test: /\.less/,
    use: [
      'style-loader', // 直接使用字符串表示 loader
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        },
      }, // 用对象表示 loader，可以传递 loader 配置等
      {
        loader: 'less-loader',
        options: {
          noIeCompat: true
        }, // 传递 loader 配置
      },
    ],
  },
],
```

## loader 应用顺序
前面提到，一个匹配规则中可以配置使用多个 loader，即一个模块文件可以经过多个 loader 的转换处理，执行顺序是从最后配置的 loader 开始，一步步往前。
例如，对于上面的 less 规则配置，一个 style.less 文件会途径 less-loader、css-loader、style-loader 处理，成为一个可以打包的模块。

对于这种分开的，使用enforce来判断，值可以是'pre', 'post',没有就是普通
```js
rules: [
  {
    enforce: 'pre', // 指定为前置类型
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  },
],
```
所有的 loader 按照前置 -> 行内 -> 普通 -> 后置的顺序执行。
还有一种行内 loader，即我们在应用代码中引用依赖时直接声明使用的 loader，如 const json = require('json-loader!./file.json') 这种。
不建议在应用开发中使用这种 loader，后续我们还会再提到。

## 使用 noParse
有一个 module.noParse 字段，可以用于配置哪些模块文件的内容不需要进行解析。
对于一些不需要解析依赖（即无依赖） 的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度。
> 使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制。
```js
module.exports = {
  // ...
  module: {
    noParse: /jquery|lodash/, // 正则表达式

    // 或者使用 function
    noParse(content) {
      return /jquery|lodash/.test(content)
    },
  }
}
```

# plugins
在不同mode下，启用的插件不同
development:
    - NamedChunksPlugin 
    - NamedModulesPlugin 热更新时提示chunk和module名称

production:
    - FlagDependencyUsagePlugin 
    - FlagIncludedChunksPlugin 
    - ModuleConcatenationPlugin 
    - NoEmitOnErrorsPlugin 
    - OccurrenceOrderPlugin 
    - SideEffectsFlagPlugin 
    - TerserPlugin 主要作用压缩代码，优化代码量

## DefinePlugin
DefinePlugin 是 webpack 内置的插件，可以使用 webpack.DefinePlugin 直接获取
，前边也提过，在不同的 mode 中，会使用 DefinePlugin 来设置运行时的 process.env.NODE_ENV 常量。

DefinePlugin 用于创建一些在编译时可以配置值，在运行时可以使用的常量，我们来看下如何使用它。
```js
module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
      VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
      BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
      TWO: '1+1', // const TWO = 1 + 1,
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
      }
    }),
  ],
}
```

```js
console.log("Running App version " + VERSION);

if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");
```

## TerserPlugin
```js
module.exports = {
  // ...
  // TerserPlugin 的使用比较特别，需要配置在 optimization 字段中，属于构建代码优化的一部分
  optimization: {
    minimize: true, // 启用代码压缩
    minimizer: [new TerserPlugin({
      test: /\.js(\?.*)?$/i, // 只处理 .js 文件
      cache: true, // 启用缓存，可以加速压缩处理
    })], // 配置代码压缩工具
  },
}
```

## IgnorePlugin
IgnorePlugin 和 DefinePlugin 一样，也是一个 webpack 内置的插件，可以直接使用 webpack.IgnorePlugin 来获取。

这个插件用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去。例如我们使用 moment.js，直接引用后，里边有大量的 i18n 的代码，
导致最后打包出来的文件比较大，而实际场景并不需要这些 i18n 的代码，这时我们可以使用 IgnorePlugin 来忽略掉这些代码文件，配置如下：

```js
module.exports = {
  // ...
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
```
IgnorePlugin 配置的参数有两个，第一个是匹配引入模块路径的正则表达式，第二个是匹配模块的对应上下文，即所在目录名。

## webpack-bundle-analyzer
这个 plugin 可以用于分析 webpack 构建打包的内容，用于查看各个模块的依赖关系和各个模块的代码内容多少，便于开发者做性能优化。

webpack-bundle-analyzer 是第三方的包，使用前需要安装，配置上很简单，仅仅引入 plugin 即可，在构建时可以在浏览器中查看分析结果：

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // ...
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
}
```
使用这个可以配合 IgnorePlugin 来过滤掉部分大而无用的第三方模块。后续的代码加载优化部分内容会再使用到 webpack-bundle-analyzer。

## 优化 JS 代码

### Tree shaking
Tree shaking 这个术语起源于 ES2015 模块打包工具 rollup，依赖于 ES2015 模块系统中的静态结构特性，可以移除 JavaScript 上下文中的未引用代码
，删掉用不着的代码，能够有效减少 JS 代码文件的大小。拿官方文档的例子来说明一下。
```js
module.exports = {
  mode: 'development',
  //...
  optimization: { 
    useExports: true, // 模块内未使用的部分不进行导出
  },
}
```

### sideEffects
由于 lodash-es 这个模块的「package.json」文件有 sideEffects: false 的声明，最终的结果类似于 webpack 将上述的代码转换为以下的代码去处理：

import { default as forEach } from 'lodash-es/forEach'
import { default as includes } from 'lodash-es/includes'

// ... 其他代码
webpack 不会把 lodash-es 所有的代码内容打包进来，只是打包了你用到的那两个模块相关的代码，这便是 sideEffects 的作用。

### concatenateModules
通过查看 webpack 构建生成的代码可以发现，每个模块都会使用 (function(module, __webpack_exports__, __webpack_require__) { ... } 的函数包起来，我们可以使用 optimization.concatenateModules: true 的配置来移除这一部分多余的代码。

## 拆分公共的 JS 代码，一个最简单的例子
```js
module.exports = {
  // ... webpack 配置

  optimization: {
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      name: 'common', // 给分离出来的 chunk 起个名字
    },
  },
}
```

```html
<script src="commons.bundle.js" charset="utf-8"></script>
<script src="index.bundle.js" charset="utf-8"></script>
```

如果你使用了 html-webpack-plugin，那么对应需要的 JS 文件都会在 HTML 文件中正确引用，不用担心。如果你会根据页面区分不同的 JS 入口的话，那么在使用 html-webpack-plugin 时需要指定对应的 chunk：
```js
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'page.html',
      chunks: ['common', 'page'], // 这里要包括 common 部分和页面业务部分
    }),
  ]
}
```

### splitChunks 配置项
1. chunks 表示从哪些模块中抽取代码，可以设置 all/async/initial 三个值其中一个，分别表示 所有模块/异步加载的模块/同步加载的模块，或者也可以设置一个 function，用于过滤掉不需要抽取代码的模块，例如：

### 按需加载
import(/* webpackChunkName: "jquery" */ 'jquery').then(($) => { 
  console.log($);
});

### devtool
```js
devtool: 'eval-cheap-source-map', // 不同环境的配置文件使用不同的值
```