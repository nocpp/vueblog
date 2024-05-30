---
title: css常见知识
date: '2021-12-12'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - css
publish: true
---
## css 2倍，3倍背景图使用
```css
  .star.star-36 .star-item.on {
     background-image: url("./images/stars/star36_on@2x.png");
   }
   @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    .star.star-36 .star-item.on {
       background-image: url("./images/stars/star36_on@3x.png");
     }
   }
   
   bg-image($url)
     background-image url($url + "@2x.png")
     @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
       background-image url($url + "@3x.png")
```

## CSS中行内元素是否有margin和padding
- marginTop, marginBottom无效
- marginLeft，marginRight有效
- padding-top，padding-bottom内容范围是增大了，但是对其它元素没有效果

## css水平、垂直居中的写法，请至少写出4种?
### 水平居中
- 行内元素: text-align: center
- 块级元素: margin: 0 auto
- position:absolute +left:50%+ transform:translateX(-50%) || maringleft: -50%
- display:flex + justify-content: center

### 垂直居中
- 设置line-height 等于height
- position：absolute +top:50%+ transform:translateY(-50%) || maringTop: -50%
- display:flex + align-items: center
- display: table-cell;vertical-align: middle;

## 1rem、1em、1vh、1px各自代表的含义？
### rem
rem是全部的长度都相对于根元素html元素。通常做法是给html元素设置一个字体大小，然后其他元素的长度单位就为rem。

### em
- 子元素字体大小的em是相对于父元素字体大小
- 元素的width/height/padding/margin用em的话是相对于该元素的font-size

### vw/vh
全称是 Viewport Width 和 Viewport Height，视窗的宽度和高度，相当于 屏幕宽度和高度的 1%，不过，处理宽度的时候%单位更合适，处理高度的 话 vh 单位更好。

### px
px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。一般电脑的分辨率有1920*1024等不同的分辨率
，前者是屏幕宽度总共有1920个像素, 后者则是高度为1024个像素

## 画一条0.5px的直线？
```css
.box {
	height: 1px;
	transform: scaleY(0.5);
}
```

## 说一下盒模型？
1. 盒模型的组成  
    由里向外content,padding,border,margin.
2. 盒模型分为两种  
	- border-box: IE盒子模型中，width表示content+padding+border这三个部分的宽度
  - content-box: 在标准的盒子模型中，width指content部分的宽度 (默认是这个)

## 画一个简单的三角形(利用边框透明来画)
```css
 .a{
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    border-color: transparent #0099CC transparent transparent;
    transform: rotate(90deg); /*顺时针旋转90°*/
 }
```

## 实现一个扇形(比三角形多了圆角)
```css
div{
    border: 100px solid transparent;
    width: 0;
    height: 0;
    border-radius: 100px;
    border-top-color: red;
}
```

## 实现一个宽高自适应的正方形
- vw实现
```css
.square {
  width: 10%;
  height: 10vw;
  background: tomato;
}
```
- padding百分比
```css
.square {
  width: 20%;
  height: 0;
  padding-top: 20%;
  background: orange;
}
```
- 利用子元素的margin-top的值来实现：
```css
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}
.square::after {
  content: '';
  display: block;
  margin-top: 100%;
}
```

## 如何解决 1px 问题？
- 直接写 0.5px, IOS 系统需要8及以上的版本，安卓系统则直接不兼容
- 伪元素先放大后缩小
```css
#container[data-device="2"] {
    position: relative;
}
#container[data-device="2"]::after{
    position:absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    content:"";
    transform: scale(0.5);
    transform-origin: left top;
    box-sizing: border-box;
    border: 1px solid #333;
}
```

## viewport 缩放来解决
:::danger
但这样做的副作用也很大，整个页面被缩放了
:::
```html
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
```

## 清除浮动的几种方式
- 父级div定义height
- 父元素最后一个标签加空div标签 并添加样式clear:both。
- 创建父级 BFC,(浮动,绝对和固定定位, 行内块儿元素/弹性盒子/表格单元，标题，滚动) 
- clearfix方法
```less
.box {
    width: 100px;
    margin: 100px;
    zoom: 1;//父元素增加zoom: 1;是为了触发hasLayout,兼容IE7
    .inner {
        float: left;
    }
    &::after {content: '';clear: both;display: block;height: 0;}//伪元素一定要增加display: block;
}
```

## BFC （块级格式化上下文）
> BFC是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。
> BFC是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

### 触发条件:
- 根元素(html元素)
- 浮动元素
- 绝对和固定定位元素，position: absolute/fixed
- 行内块儿元素/弹性盒子/表格单元，标题，display: inline-block / (table-cell 、 table-caption此元素会作为一个表格标题显示), flex 、inline-flex 之一的元素
- 滚动相关元素 ovevflow !== visible
> IE下为 Layout，可通过 zoom:1 触发

### 解决问题
- margin重合问题【“给首个子元素添加20px的上边距，父元素竟跟着子元素下沉了”】
- 高度塌陷问题，清除浮动
- 阻止元素被浮动元素覆盖，做2栏布局，流式布局
```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动,也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```

## position值有哪些？
- static 默认值
- relative
- absolute
- fixed
- sticky 元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，包括table-related元素，基于top, right, bottom, 和 left的值进行偏移。

- initial CSS关键字，设置 CSS 属性为它的默认值
- inherit CSS关键字，如果是可继承的样式的话，继承父元素的值
- unset CSS关键字
	+ 如果该属性是默认继承属性，该值等同于 inherit
	+ 如果该属性是非继承属性，该值等同于 initial
- revert CSS关键字，(还原)，把样式还原为浏览器默认样式，或者默认值，和unset很像
	+ 如果没有继承的，还原为浏览器默认属性
	+ 如果有继承的，值就是inherit

> background-image:inherit 背景图也可以继承
![position](面试被问到的问题_files/1.jpg)

## all
> 表示重设除unicode-bidi和direction之外的所有CSS属性的属性值，取值只能是initial、inherit、unset和revert
```css
.box{
	all: initial;
	all: inherit;
	all: unset;
	all: revert;//把样式还原为浏览器默认样式
}
```

## inherit
> inherit 关键字使得元素获取其父元素的计算值。它可以应用于任何CSS属性，包括CSS简写 all。
- 对于继承属性，inherit 关键字只是增强了属性的默认行为，只有在重载(overload)其它规则的时候被使用。
- 对于非继承属性，inherit 这指定的行为通常没有多大意义，一般使用使用 initial 或 unset 作为替代。

## margin折叠的意义是什么？
是为了让多段落文章这种布局，更容易定义垂直间距，便于用户阅读。具体可以参照下面文章。在多个P段落中，如果想要保证每个段落间距是10px，并且开头结尾都要10px，只需要写margin 的top和bottom都等于10px就行了，如果没有这个特性，写了top 10px后，还得找到第一个一个元素写marginTop: 0

[margin折叠的意义](https://medium.com/@joseph0crick/margin-collapse-in-css-what-why-and-how-328c10e37ca0)

## CSS实现三栏布局，左右两栏固定宽度，中间自适应
### 圣杯布局
1. 容器包含三块儿，顺序必须是中左右，中必须在最前面，左右是浮动
2. 容器利用padding预留出左右栏空间
3. 左右栏利用相对定位和负margin值移到正确位置
```html
<div class="outer">
    <div class="center"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
```
```css
.outer {
  height: 100px;
  padding-left: 100px;
  padding-right: 200px;
}

.left {
  position: relative;
  left: -100px;

  float: left;
  margin-left: -100%;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: relative;
  left: 200px;

  float: right;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}
```

### 双飞翼布局
1. 容器只包着中间
2. 中间用margin给左右栏留出空间
3. 左右栏利用负margin值移到正确位置
```html
<div class="outer">
    <div class="center"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```
```css
.outer {
    float: left;
    height: 100px;
    width: 100%;
}

.center {
    margin-left: 100px;
    margin-right: 200px;
    background-color: lightgreen;
    height: 100px;
    width: auto;
}

.left {
    float: left;
    width: 100px;
    background-color: tomato;
    height: 100px;
    margin-left: -100%;
}

.right {
    float: left;
    width: 200px;
    background-color: gold;
    height: 100px;
    margin-left: -200px;
}
```

## flex属性
### flex-grow
- 这个属性规定了 flex-grow 项在 flex 容器中分配剩余空间的相对比例。 主尺寸是项的宽度或高度，这取决于flex-direction值。
- <number [0,∞]> 
- 默认：0
### flex-shrink
- flex-shrink 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。
- <number [0,∞]> 
- 默认：1
### flex-basis
- flex-basis 指定了 flex 元素在主轴方向上的初始大小，如果不使用 box-sizing 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸
- 值可以是具体宽度，百分比，auto，content等关键字
- 默认为: auto
> 参考元素的宽度/高度（width/height）属性：如果元素有设置具体的宽度或高度（对于水平和垂直的弹性容器分别是 width 和 height），则 flex-basis 会使用这个设置值作为初始基础大小。
> 内容大小：如果元素没有设置宽度或高度，那么 flex-basis 将会自动根据内容的大小来决定元素的基础大小。
- flex-basis: 0表示，当 flex-basis: 0 时，项目的初始主尺寸为零，布局引擎会根据 flex-grow 或 flex-shrink 属性来动态调整项目的最终尺寸

### flex属性
- flex是几个值的简写，flex-grow，flex-shrink，flex-basis
- 可以有1个参数，2个参数，3个参数
- 其中1~2个参数有多种情况，大致分为：
  + 根据值可以分为basis和非basis
  + 所以不写basis，则flex-basis: 0
  + 写了basis，则flex-shrink: 1

### flex-grow: 1 与 flex: 1的区别
- 就是flex-basis的区别，flex: 1的basis是0，flex-grow的basis则是auto

### 容器的属性
- flex-direction
- flex-wrap
- flex-flow是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
- justify-content
- align-items 将所有直接子节点上的align-self值设置为一个组。 align-self属性设置项目在其包含块中在交叉轴方向上的对齐方式。
- align-content 属性设置了浏览器如何沿着弹性盒子布局的纵轴和网格布局的主轴在内容项之间和周围分配空间。（start，center等）

### 子元素属性
- order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- align-self 会对齐当前 grid 或 flex 行中的元素，并覆盖已有的 align-items 的值。

## display:none与visibility：hidden的区别？
- display：none 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）
- visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘），会被子元素继承，可以通过设置子元素visibility:visible 使子元素显示出来
- opacity: 0 也会被子元素继承，但是不能通过设置子元素opacity: 1 使其重新显示

## CSS优化、提高性能的方法有哪些？
1. 避免过度约束
2. 避免后代选择符
3. 避免链式选择符
4. 使用紧凑的语法
5. 避免不必要的命名空间
6. 避免不必要的重复
7. 最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么
8. 避免！important，可以选择其他选择器
9. 尽可能的精简规则，你可以合并不同类里的重复规则
10. 对属性频繁变动的元素使用will-change, 比如移动的，滚动的，让浏览器能提前准备，但不能过度使用，不变了记得关闭
```css
will-change: transform, opacity;
will-change: auto; // 关闭will-change
```

## 浏览器是怎样解析CSS选择器的？
- CSS选择器的解析是从右向左解析的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。
- 两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面
- 而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。

## 全屏滚动的原理是什么？用到了CSS的哪些属性？
原理：有点类似于轮播，整体的元素一直排列下去，假设有5个需要展示的全屏页面，那么高度是500%，只是展示100%，剩下的可以通过transform进行y轴定位，也可以通过margin-top实现.
```css
.page {
	overflow：hidden；
	transition：all 1000ms ease；
}
```

## 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？
- 响应式网站设计(Responsive Web design)是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。
- 基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理,页面头部必须有meta声明的viewport。

## 视差滚动效果？
视差滚动（Parallax Scrolling）通过在网页向下滚动的时候，控制背景的移动速度比前景的移动速度慢来创建出令人惊叹的3D效果。
- CSS3实现
- jQuery实现
- 插件实现方式,例如：parallax-scrolling，兼容性十分好

## png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？
1. png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。
2. jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
3. gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.
4. webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。

## style标签写在body后与body前有什么区别？
页面加载自上而下 当然是先加载样式。写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

## 网格布局（Grid）是最强大的 CSS 布局方案
> Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。
```css
div {
  display: grid;
  display: inline-grid;
}
/* 以下定义了一个三行三列的网格，九宫格 */
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;//列宽，也可以使用百分比
  grid-template-rows: 100px 100px 100px;//行高，也可以使用百分比
}
/* 可以使用repeat函数简写 */
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}
/* 自动填充，换行 */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
/* 为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。 */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
/* 两栏布局 */
.wrapper {
  display: grid;
  grid-template-columns: 70% 30%;
}
/* 十二网格布局 */
.box {
	grid-template-columns: repeat(12, 1fr);
}
/* 设置行列间距 */
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-gap: 20px 20px; //为以上合写
}
```
> 可以做九宫格，图片墙。可以设置间距，flex不行
[参考GRID详解](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)


## 线性渐变参数意义
- 180deg代表渐变方向角度，180deg表示从上到下，也可以写作to bottom。0deg是从下到上，角度增加，方向顺时针旋转
- red表示渐变开始的颜色，30%表示在这个位置开始red的渐变，没有写0%的话，默认是第一个颜色，当前就是red
- 40%表示red到green渐变的中间位置，不写的话默认是中间位置
- green表示渐变过程的颜色，70%表示在这个位置开始green的渐变，没有100%的颜色的话，默认是最后一个颜色
```css
background-image: linear-gradient(180deg, red 30%, 40%, green 70%);
```

## 参考的文章
[300题](https://juejin.cn/post/6914831351271292936)
[中高级](https://juejin.cn/post/6844903776512393224)
[2021中高级](https://juejin.cn/post/6905539198107942919)
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)