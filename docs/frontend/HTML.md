---
title: HTML
order: 1
---

## 浏览器加载资源的过程

### 加载资源的形式

- html 代码
- 媒体文件，如图片、视频等
- JavaScript CSS

### 加载一个资源的过程

- DNS 解析：域名 -> IP 地址
- 浏览器根据 IP 地址向服务器发起 http 请求
- 服务器处理 http 请求，并返回给浏览器
- 浏览器得到返回内容

## 浏览器渲染页面的过程

- 根据 HTML 结构生成 DOM Tree
- 根据 CSS 生成 CSSOM
- 将 DOM 和 CSSOM 整合形成 Render Tree
- 根据 Render Tree 渲染页面
- 遇到`<script>`则暂停渲染，优先加载并执行 JS 代码，完成再继续
- 直至把 Render Tree 渲染完成

![过程](https://pic3.zhimg.com/v2-1f9f6062ac51ed944e2dcbfd618636ca_r.jpg)

### 为何要把 css 放在 head 中？

在 DOM Tree 生成之前加载完 CSS，DOM Tree 生成之后直接和 CSSOM 整合渲染，一步到位

### 为何要把 JS 放在 body 最后？

极端情况下，js 在 body 中间会出现渲染过程阻塞，停止渲染，js 加载完之后重新开始渲染。所以建议 js 放在 body 最后。

img 不会导致渲染阻塞
引出`window.onload`和`DOMContentLoaded`

```js
window.addEventListener('load', function () {
  // 页面的全部资源加载完才会执行，包括图片、视频等
});
document.addEventListener('DOMContentLoaded', function () {
  // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
});
```
