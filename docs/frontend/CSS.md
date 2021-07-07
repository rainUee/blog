---
title: CSS
order: 2
---

### 盒模型

`box-sizing`: `border-box` `content-box` `inherit`.
context-box: W3C 盒模型，width = content
border-box: IE 盒模型， width = border + padding + content

### 画一条 0.5px 的线

```html
<meta
  name="viewport"
  content="initial-scale=0.5,minimum-scale=0.5,maximun-scale=0.5,user-scalable=no"
/>
```

```css
transform: scale(0.5, 0.5);
```

### link 和 import 的区别

@import 引用的 css 会等到页面加载结束后加载。

### transition 和 animation 的区别

animation 和 transition 大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是 transition 需要触发一个事件才能改变属性，而 animation 不需要触发任何事件的情况下才会随时间改变属性值，并且 transition 为 2 帧，从 from …. to，而 animation 可以一帧一帧的。

<!-- TODO: 使用场景 -->
<!-- 导航的 tab 的切换（只有开始和结束 -->

### 哪些元素会生成 BFC

根元素 (`<htmL>`)
overflow 不为 visible 的块元素
float 不为 none 的元素
position 为 fixed 和 absolute 的元素
display 为 `inline-block` `table-cell` `table-caption` `flex` `inline-flex`的元素

### 怎么让一个 div 水平垂直居中

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
div.parent {
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid #000;
}
div.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
}
```

```css
div.parent {
  display: table;
}
div.child {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
/* or */
div.parent {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

```css
div.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* or */
div.parent {
  display: flex;
}
div.child {
  margin: auto;
}
```

```css
div.parent {
  display: grid;
}
div.child {
  justify-self: center;
  align-self: center;
}
/* or */
div.parent {
  display: grid;
  place-items: center;
}
```

[Grid 布局](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

`place-items`是`align-items`和`justify-items`两个 CSS 属性的简写

### CSS 选择器

内联样式(`style="font-weight:bold"`) > 类型选择器(`h1`)，伪元素(`::before`) > 类选择器，属性选择器(`[type="radio"]`)，伪类(`:hover`) > ID 选择器(`#example`)
!important 的缺点：破坏了样式表中的固有的级联规则

### 奇数/偶数选择器

```css
/* 奇数行 */
div:nth-child(odd) {
}
/* 偶数行 */
div:nth-child(even) {
}
```

### `inline` `block` `inline-block` 的区别

`inline`: 不会独占一行，设置宽高无效
`inline-block`: 既具有`block`的宽高属性，又具有`inline`的同行属性

### 实现一个三角形

```html
<div class="triangle"></div>
```

```css
.triangle {
  width: 0;
  height: 0;
  border: 50px solid;
  border-color: transparent transparent #d9534f;
}
```

### 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改

```html
<img src="1.jpg" style="width:480px!important;”>
```

```css
max-width: 300px;
transform: scale(300/480);
/*box-sizing: border-box;
padding: 0 90px;*/
zoom: 0.625;
```

### 比较 opacity: 0、visibility: hidden、display: none

- `display: none;`
  1. **DOM 结构**：浏览器不会渲染 `display` 属性为 `none` 的元素，不占据空间；
  2. **事件监听**：无法进行 DOM 事件监听；
  3. **性能**：动态改变此属性时会引起重排，性能较差；
  4. **继承**：不会被子元素继承，毕竟子类也不会被渲染；
  5. **transition**：`transition` 不支持 `display`。
- `visibility: hidden;`
  1. **DOM 结构**：元素被隐藏，但是会被渲染不会消失，占据空间；
  2. **事件监听**：无法进行 DOM 事件监听；
  3. **性 能**：动态改变此属性时会引起重绘，性能较高；
  4. **继 承**：会被子元素继承，子元素可以通过设置 `visibility: visible;` 来取消隐藏；
  5. **transition**：`transition` 不支持 `display`。
- `opacity: 0;`
  1. **DOM 结构**：透明度为 100%，元素隐藏，占据空间；
  2. **事件监听**：可以进行 DOM 事件监听；
  3. **性 能**：提升为合成层，不会触发重绘，性能较高；
  4. **继 承**：会被子元素继承,且子元素并不能通过 `opacity: 1` 来取消隐藏；
  5. **transition**：`transition` 不支持 `opacity`。
