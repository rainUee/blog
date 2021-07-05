---
title: JavaScript
order: 1
toc: menu
nav:
  title: JS
  order: 2
---

# JavaScript

## 基础

### typeof

```js
typeof undefined === 'undefined';
typeof null === 'object';
typeof 123 === 'number';
typeof '123' === 'string';
typeof true === 'boolean';
typeof Symbol() === 'symbol';
typeof 123n === 'bigint';
// 一共七种基本类型，最后一种bigint为新增基本类型
typeof {} === 'object'; //array function null
typeof function () {} === 'function';
```

nullish null undefined

### 基本类型和引用类型

基本类型存放在栈，引用类型存放在堆

### 作用域

```js
for (var i = 0; i < 5; ++i) {
  setTimeout(() => console.log(i), 0);
}
//5、5、5、5、5
for (let i = 0; i < 5; ++i) {
  setTimeout(() => console.log(i), 0);
}
//0、1、2、3、4
```

1. var 声明的变量存在于上层作用域，不存在于 for 循环的块级作用域；
2. setTimeout 是异步操作；这里涉及到执行的顺序问题，setTimeout 后执行。
3. 代码执行 5 次循环后，i 变量的值变为 5，然后再执行五次 console.log 均打印的是 5
4. var 没有块级作用域，5 个 i 都指向一个内存(变量提升)；let 有作用域只会在循环本轮生效。

```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);
//undefined
//{n: 2}
```

### 闭包

JavaScript 采用的是词法作用域（或者叫静态作用域），也就是说**函数作用域的位置在声明函数的时候已经决定了**（注意只是决定了位置，函数只有调用的时候才会实际生成作用域）。

与之对应的是动态作用域（比如 Bash 脚本），此时**函数作用域的位置取决于调用该函数时的环境**。

另外，通常当一个函数调用完成后会销毁作用域以及作用域内部的变量，但是如果函数调用完成时内部的变量依然被外部引用了，那么该函数的作用域就不会被销毁。

**闭包**：能够读取到其他函数内部变量的函数，或者子函数在外调用，子函数所在的父函数的作用域不会被释放。

<!-- ### 条件运算符

```js
function checkTitle(score) {
  return score < 0 || score > 10
    ? '无效分数'
    : { 6: '秀才', 7: '进士', 8: '探花', 9: '榜眼', 10: '状元' }[~~score] ||
        '秀才';
}
``` -->

### forEach 和 map 的区别

forEach: 返回值为 undefined，无法中止，可以通过索引来修改原来的数组
map: 返回新数组，callback 需要有 return 值，若没有则返回 undefined

## 数组

### 数组去重

```js
[...new Set(arr)];
```

### 数组扁平化

```javascript
var arr = [1, 2, [3, [4, 5]]];
arr.flat(Infinity);
```

### 数组乱序

```javascript
let arr = [1, 2, 3, 4, 5];
arr.sort(() => {
  return Math.random() - 0.5;
});

// 加强版
// 遍历数组，每一项和该项之前的随机项交换位置
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = ~~(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

~ 相当于按位取反， ~15 等于 -16，即 ~n = -(n+1)

~~ 在处理正数的时候类似于 Math.floor，因为 -(-n-1)-1=n+1-1=n

`Math.floor()`为向下取整

### instanceof

```js
object instanceof constructor;
```

```js
({} instanceof Object); // true
[] instanceof Array; // true
[] instanceof Object; // true
var myNonObj = Object.create(null);
myNonObj instanceof Object; // 返回 false, 一种创建非 Object 实例的对象的方法
```

### 浅拷贝

```js
// Object.assign
let source = {
  name: 'akara',
  age: 20,
};
let target = Object.assign({}, source);

// 扩展运算符
let source = {
  name: 'panther',
  age: 20,
};
let target = { ...source };

// slice
let source = [1, 2, 3];
let target = source.slice();

// concat
let source = [1, 2, 3];
let target = source.concat();
```

浅拷贝复制的是 source 的引用地址，而并非堆里面的值。

### 深拷贝

```js
function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        //判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key]);
        } else {
          //如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
let a = [1, 2, 3, 4],
  b = deepClone(a);
a[0] = 2;
console.log(a, b);
```

```js
function deepClone(obj) {
  let _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone;
}
let a = [0, 1, [2, 3], 4],
  b = deepClone(a);
a[0] = 1;
a[2][0] = 1;
console.log(a, b);
```

深拷贝，是拷贝对象各个层级的属性。

## 函数

### 防抖

（多次变为最后一次）

当你触发事件后，如果在 n 秒内，没有再次触发该事件，那么就执行函数；如果在 n 秒内，再次触发了该事件，那么就取消计时器，重新开始计时

- 监听一个输入框，文字变化后触发 change 事件
- 直接用 keyup 事件，则会频繁触发 change 事件
- 防抖：用户输入结束或暂停时，才会触发 change 事件

```js
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
```

### 节流

（多次变为隔一段时间一次）

- 拖拽一个元素时，要随时拿到该元素被拖拽的位置
- 直接用 drag 事件，则会频发触发，很容易导致卡顿
- 节流：无论拖拽速度多快，都会每隔 100ms 触发一次

例如要在文字改变时触发一个 change 事件，通过 keyup 来监听。使用节流。

```js
var textarea = document.getElementById('text');
var timeoutId;
textarea.addEventListener('keyup', function () {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(function () {
    // 触发 change 事件
  }, 100);
});
```

## Promise

### 三种状态

pending fulfilled rejected

链式调用->解决回调地狱

```js
// callback-hell
console.log('start');
$.get('./data1.json', function (data1) {
  console.log(data1);
  $.get('./data2.json', function (data2) {
    console.log(data2);
    $.get('./data3.json', function (data3) {
      console.log(data3);
      $.get('./data4.json', function (data4) {
        console.log(data4);
        // ...继续嵌套...
      });
    });
  });
});
console.log('end');
```

### 实现 promise

```js
// 定义三种状态
const PENDING = 'PENDING'; // 进行中
const FULFILLED = 'FULFILLED'; // 已成功
const REJECTED = 'REJECTED'; // 已失败

class Promise {
  constructor(exector) {
    // 初始化状态
    this.status = PENDING;
    // 将成功、失败结果放在this上，便于then、catch访问
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };
    const reject = (reason) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    };
    // 立即执行exector
    // 把内部的resolve和reject传入executor，用户可调用resolve和reject
    exector(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    // then是微任务，这里用setTimeout模拟
    setTimeout(() => {
      if (this.status === FULFILLED) {
        // FULFILLED状态下才执行
        onFulfilled(this.value);
      } else if (this.status === REJECTED) {
        // REJECTED状态下才执行
        onRejected(this.reason);
      }
    });
  }
}
```

<!-- TODO: promise的优缺点 -->

[ES6 中的 Promise](http://www.cnblogs.com/wangfupeng1988/p/6515855.html)

### reject 和 catch 处理上有什么区别

reject 用来抛出异常，catch 用来处理异常
reject 是 Promise 的方法，而 then 和 catch 是 Promise 的实例的方法（Promise.prototype.then 和 Promise.prototype.catch）。

(catch 是语法糖)

### Event Loop

![参考](http://vimeo.com/96425312)

### 宏任务和微任务

微任务和宏任务是异步任务的两个分类。
宏任务：`script` `setTimeOut` `setInterval` `setImmediate`
微任务：`Promise.then` `process` `nextTick` `Object.observe`

## 算法

洗牌算法

```js
function shuffle(arr) {
  var result = [],
    random;
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random]);
    arr.splice(random, 1);
  }
  return result;
}
```

将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组

```js
arr = [[3, 12, 1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [14], 13]], 10];
Array.from(new Set(arr.flat(Infinity))).sort((a, b) => {
  return a - b;
});
```

使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

```js
arr = [3, 15, 8, 29, 102, 22];
arr.sort();
//[102, 15, 22, 29, 3, 8]
//元素按照转换为的字符串的各个字符的Unicode位点进行排序
arr.sort((a, b) => a - b);
//[3, 8, 15, 22, 29, 102]
```

[实现模糊搜索结果的关键词高亮显示](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/141)

## 前端安全

### 跨站脚本攻击（XSS）

将用户输入的东西作为脚本输出
解决方法：
过滤输入/转义输出
把半角转义为全角
eval/v-html 可能会导致 xss？
eval 将字符串解析成 js 并执行，消耗性能（一次解析，一次执行）

## 面向对象的特点

抽象、继承、多态

## 如何检测浏览器的类型

```javascript
var ua = navigator.userAgent;
var isChrome = ua.indexOf('Chrome');
console.log(isChrome);
```

## 拆解 url 的各部分

```javascript
console.log(location.href);
console.log(location.protocol); // 'http:' 'https:'
console.log(location.pathname); // '/learn/199'
console.log(location.search);
console.log(location.hash);
```

<!-- TODO: history 和 hash -->

## 前端路由 history 和 hash

hash 模式：监听浏览器地址 hash 值（# 以及后的字符）变化，执行相应 js 切换网页
history 模式： 利用 history API 实现 url 地址改变，网页内容改变
