# CSS

## 面试题

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

[CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

`place-items`是`align-items`和`justify-items`两个 CSS 属性的简写

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

### transition 和 animation 的区别

animation 和 transition 大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是 transition 需要触发一个事件才能改变属性，而 animation 不需要触发任何事件的情况下才会随时间改变属性值，并且 transition 为 2 帧，从 from …. to，而 animation 可以一帧一帧的。

### 偶数选择器
