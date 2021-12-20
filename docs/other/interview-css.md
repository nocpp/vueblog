---
title: css面试知识
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
- marinTop, marinBottom无效
- marinLeft，marinRight有效
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
- margin重合问题【“为首个子元素添加20px的上边距，父元素竟跟着子元素下沉了”】
- 高度塌陷问题，（包含浮动元素，高度塌陷问题：在通常情况下父元素的高度会被子元素撑开，而在这里因为其子元素为浮动元素所以父元素发生了高度坍塌，上下边界重合。这时就可以用bfc来清除浮动了。）
- 阻止元素被浮动元素覆盖，做流式布局
```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动,也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```

## position值有哪些？inherit什么时候会用到？可以用来制作列表的固定表头？父级固定定位，子元素继承
![position](面试被问到的问题_files/1.jpg)
- background-image:inherit 背景图也可以继承

## margin折叠的意义是什么？
是为了让多段落文章这种布局，更容易定义垂直间距，便于用户阅读。具体可以参照下面文章。在多个P段落中，如果想要保证每个段落间距是10px，并且开头结尾都要10px，只需要写margin 的top和bottom都等于10px就行了，如果没有这个特性，写了top 10px后，还得找到最后一个元素写10pxbottom
[margin折叠的意义](https://medium.com/@joseph0crick/margin-collapse-in-css-what-why-and-how-328c10e37ca0)

## 圣杯布局和双飞翼布局
### 圣杯布局
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
### flex-grow 与 flex的区别
1. 剩余宽度计算方式不同, flex-grow的剩余宽度等于容器宽度减去所有项目宽度和, 而flex的剩余宽度等于容器宽度减去设置了flex属性的项的宽度和
2. 计算宽度方式都是剩余宽度*设置比例/设置了项目个数
3. flex是几个值的简写，flex-grow, flex-basis, flex-shrink

### 容器的属性
- flex-direction
- flex-wrap
- flex-flow flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
- justify-content
- align-items 将所有直接子节点上的align-self值设置为一个组。 align-self属性设置项目在其包含块中在交叉轴方向上的对齐方式。
- align-content 属性设置了浏览器如何沿着弹性盒子布局的纵轴和网格布局的主轴在内容项之间和周围分配空间。（start，center等）

### 子元素属性
- order  属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- flex-grow 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
- flex-shrink 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- flex-basis 指定了 flex 元素在主轴方向上的初始大小。默认（auto）
- flex 是（flex-grow，flex-shrink，flex-basis）的合写，可以使用一个，两个或三个值来指定 flex属性。
	+ 一个无单位数代表（flex-grow 1 0） 一个有单位值会当作flex-basis的值
	+ 第一个值必须为一个无单位数，当作flex-grow，第二个值根据有无单位来作为flex-basis或者shrink
	+ 第一/二个值必须为一个无单位数，第三个值必须有单位
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
-  CSS3实现
- jQuery实现
- 插件实现方式,例如：parallax-scrolling，兼容性十分好

## png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？
1. png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。
2. jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
3. gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.
4. webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。

## style标签写在body后与body前有什么区别？
页面加载自上而下 当然是先加载样式。写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）